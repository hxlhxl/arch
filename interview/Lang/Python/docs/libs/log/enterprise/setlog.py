import logging
import sys
import os
from cStringIO import StringIO
import string

# helper
# CONSTANTS
AGENT_VERSION = "5.16.0"
JMX_VERSION = "0.15.0"
DATADOG_CONF = "datadog.conf"
UNIX_CONFIG_PATH = '/etc/dd-agent'
MAC_CONFIG_PATH = '/opt/datadog-agent/etc'
DEFAULT_CHECK_FREQUENCY = 15   # seconds
LOGGING_MAX_BYTES = 10 * 1024 * 1024
SDK_INTEGRATIONS_DIR = 'integrations'
SD_PIPE_NAME = "dd-service_discovery"
SD_PIPE_UNIX_PATH = '/opt/datadog-agent/run'
SD_PIPE_WIN_PATH = "\\\\.\\pipe\\{pipename}"

class PathNotFound(Exception):
    pass


class Platform(object):
    """
    Return information about the given platform.
    """
    @staticmethod
    def is_darwin(name=None):
        name = name or sys.platform
        return 'darwin' in name

    @staticmethod
    def is_mac(name=None):
        return Platform.is_darwin(name)

    @staticmethod
    def is_freebsd(name=None):
        name = name or sys.platform
        return name.startswith("freebsd")

    @staticmethod
    def is_linux(name=None):
        name = name or sys.platform
        return 'linux' in name

    @staticmethod
    def is_bsd(name=None):
        """ Return true if this is a BSD like operating system. """
        name = name or sys.platform
        return Platform.is_darwin(name) or Platform.is_freebsd(name)

    @staticmethod
    def is_solaris(name=None):
        name = name or sys.platform
        return name == "sunos5"

    @staticmethod
    def is_unix(name=None):
        """ Return true if the platform is a unix, False otherwise. """
        name = name or sys.platform
        return (
            Platform.is_darwin()
            or Platform.is_linux()
            or Platform.is_freebsd()
        )

    @staticmethod
    def is_win32(name=None):
        name = name or sys.platform
        return name == "win32"

    @staticmethod
    def is_windows(name=None):
        return Platform.is_win32(name)

    @staticmethod
    def python_architecture():
        if sys.maxsize > 2**32:
            return "64bit"
        else:
            return "32bit"

    @staticmethod
    def is_ecs_instance():
        from utils.dockerutil import DockerUtil
        return DockerUtil().is_ecs()

    @staticmethod
    def is_containerized():
        return os.environ.get("DOCKER_DD_AGENT") == "yes"

    @staticmethod
    def is_k8s():
        from utils.dockerutil import DockerUtil
        return DockerUtil().is_k8s()

    @staticmethod
    def is_rancher():
        from utils.dockerutil import DockerUtil
        return DockerUtil().is_rancher()

    @staticmethod
    def is_swarm():
        from utils.dockerutil import DockerUtil
        return DockerUtil().is_swarm()

    @staticmethod
    def is_nomad():
        from utils.orchestrator import NomadUtil
        return NomadUtil.is_detected()

    @staticmethod
    def is_mesos():
        from utils.orchestrator import MesosUtil
        return MesosUtil.is_detected()
def skip_leading_wsp(f):
    "Works on a file, returns a file-like object"
    return StringIO("\n".join(map(string.strip, f.readlines())))

def _config_path(directory):
    path = os.path.join(directory, DATADOG_CONF)
    if os.path.exists(path):
        return path
    raise PathNotFound(path)

def get_os():
    "Human-friendly OS name"
    if sys.platform == 'darwin':
        return 'mac'
    elif sys.platform.find('freebsd') != -1:
        return 'freebsd'
    elif sys.platform.find('linux') != -1:
        return 'linux'
    elif sys.platform.find('win32') != -1:
        return 'windows'
    elif sys.platform.find('sunos') != -1:
        return 'solaris'
    else:
        return sys.platform

def _windows_commondata_path():
    """Return the common appdata path, using ctypes
    From http://stackoverflow.com/questions/626796/\
    how-do-i-find-the-windows-common-application-data-folder-using-python
    """
    import ctypes
    from ctypes import wintypes, windll

    CSIDL_COMMON_APPDATA = 35

    _SHGetFolderPath = windll.shell32.SHGetFolderPathW
    _SHGetFolderPath.argtypes = [wintypes.HWND,
                                 ctypes.c_int,
                                 wintypes.HANDLE,
                                 wintypes.DWORD, wintypes.LPCWSTR]

    path_buf = wintypes.create_unicode_buffer(wintypes.MAX_PATH)
    _SHGetFolderPath(0, CSIDL_COMMON_APPDATA, 0, 0, path_buf)
    return path_buf.value

def get_config_path(cfg_path=None, os_name=None):
    # Check if there's an override and if it exists
    if cfg_path is not None and os.path.exists(cfg_path):
        return cfg_path

    # Check if there's a config stored in the current agent directory
    try:
        path = os.path.realpath(__file__)
        path = os.path.dirname(path)
        return _config_path(path)
    except PathNotFound as e:
        pass

    # Check for an OS-specific path, continue on not-found exceptions
    bad_path = ''
    try:
        if Platform.is_windows():
            common_data = _windows_commondata_path()
            return _config_path(os.path.join(common_data, 'Datadog'))
        elif Platform.is_mac():
            return _config_path(MAC_CONFIG_PATH)
        else:
            return _config_path(UNIX_CONFIG_PATH)
    except PathNotFound as e:
        if len(e.args) > 0:
            bad_path = e.args[0]

    # If all searches fail, exit the agent with an error
    sys.stderr.write("Please supply a configuration file at %s or in the directory where "
                     "the Agent is currently deployed.\n" % bad_path)
    sys.exit(3)

# logging
log = logging.getLogger(__name__)


def get_log_date_format():
    return "%Y-%m-%d %H:%M:%S %Z"


def get_log_format(logger_name):
    if get_os() != 'windows':
        return '%%(asctime)s | %%(levelname)s | dd.%s | %%(name)s(%%(filename)s:%%(lineno)s) | %%(message)s' % logger_name
    return '%(asctime)s | %(levelname)s | %(name)s(%(filename)s:%(lineno)s) | %(message)s'


def get_syslog_format(logger_name):
    return 'dd.%s[%%(process)d]: %%(levelname)s (%%(filename)s:%%(lineno)s): %%(message)s' % logger_name


def get_logging_config(cfg_path=None):
    system_os = get_os()
    logging_config = {
        'log_level': None,
        'log_to_event_viewer': False,
        'log_to_syslog': False,
        'syslog_host': None,
        'syslog_port': None,
    }
    if system_os == 'windows':
        logging_config['collector_log_file'] = os.path.join(_windows_commondata_path(), 'Datadog', 'logs', 'collector.log')
        logging_config['forwarder_log_file'] = os.path.join(_windows_commondata_path(), 'Datadog', 'logs', 'forwarder.log')
        logging_config['dogstatsd_log_file'] = os.path.join(_windows_commondata_path(), 'Datadog', 'logs', 'dogstatsd.log')
        logging_config['jmxfetch_log_file'] = os.path.join(_windows_commondata_path(), 'Datadog', 'logs', 'jmxfetch.log')
        logging_config['service_log_file'] = os.path.join(_windows_commondata_path(), 'Datadog', 'logs', 'service.log')
        logging_config['log_to_syslog'] = False
    else:
        logging_config['collector_log_file'] = '/var/log/datadog/collector.log'
        logging_config['forwarder_log_file'] = '/var/log/datadog/forwarder.log'
        logging_config['dogstatsd_log_file'] = '/var/log/datadog/dogstatsd.log'
        logging_config['jmxfetch_log_file'] = '/var/log/datadog/jmxfetch.log'
        logging_config['go-metro_log_file'] = '/var/log/datadog/go-metro.log'
        logging_config['trace-agent_log_file'] = '/var/log/datadog/trace-agent.log'
        logging_config['log_to_syslog'] = True

    config_path = get_config_path(cfg_path, os_name=system_os)
    config = ConfigParser.ConfigParser()
    config.readfp(skip_leading_wsp(open(config_path)))

    if config.has_section('handlers') or config.has_section('loggers') or config.has_section('formatters'):
        if system_os == 'windows':
            config_example_file = "https://github.com/DataDog/dd-agent/blob/master/packaging/datadog-agent/win32/install_files/datadog_win32.conf"
        else:
            config_example_file = "https://github.com/DataDog/dd-agent/blob/master/datadog.conf.example"

        sys.stderr.write("""Python logging config is no longer supported and will be ignored.
            To configure logging, update the logging portion of 'datadog.conf' to match:
             '%s'.
             """ % config_example_file)

    for option in logging_config:
        if config.has_option('Main', option):
            logging_config[option] = config.get('Main', option)

    levels = {
        'CRITICAL': logging.CRITICAL,
        'DEBUG': logging.DEBUG,
        'ERROR': logging.ERROR,
        'FATAL': logging.FATAL,
        'INFO': logging.INFO,
        'WARN': logging.WARN,
        'WARNING': logging.WARNING,
    }
    if config.has_option('Main', 'log_level'):
        logging_config['log_level'] = levels.get(config.get('Main', 'log_level'))

    if config.has_option('Main', 'log_to_syslog'):
        logging_config['log_to_syslog'] = config.get('Main', 'log_to_syslog').strip().lower() in ['yes', 'true', 1]

    if config.has_option('Main', 'log_to_event_viewer'):
        logging_config['log_to_event_viewer'] = config.get('Main', 'log_to_event_viewer').strip().lower() in ['yes', 'true', 1]

    if config.has_option('Main', 'syslog_host'):
        host = config.get('Main', 'syslog_host').strip()
        if host:
            logging_config['syslog_host'] = host
        else:
            logging_config['syslog_host'] = None

    if config.has_option('Main', 'syslog_port'):
        port = config.get('Main', 'syslog_port').strip()
        try:
            logging_config['syslog_port'] = int(port)
        except Exception:
            logging_config['syslog_port'] = None

    if config.has_option('Main', 'disable_file_logging'):
        logging_config['disable_file_logging'] = config.get('Main', 'disable_file_logging').strip().lower() in ['yes', 'true', 1]
    else:
        logging_config['disable_file_logging'] = False

    return logging_config


def initialize_logging(logger_name):
    try:
        logging_config = get_logging_config()

        logging.basicConfig(
            format=get_log_format(logger_name),
            level=logging_config['log_level'] or logging.INFO,
        )

        log_file = logging_config.get('%s_log_file' % logger_name)
        if log_file is not None and not logging_config['disable_file_logging']:
            # make sure the log directory is writeable
            # NOTE: the entire directory needs to be writable so that rotation works
            if os.access(os.path.dirname(log_file), os.R_OK | os.W_OK):
                file_handler = logging.handlers.RotatingFileHandler(log_file, maxBytes=LOGGING_MAX_BYTES, backupCount=1)
                formatter = logging.Formatter(get_log_format(logger_name), get_log_date_format())
                file_handler.setFormatter(formatter)

                root_log = logging.getLogger()
                root_log.addHandler(file_handler)
            else:
                sys.stderr.write("Log file is unwritable: '%s'\n" % log_file)

        # set up syslog
        if logging_config['log_to_syslog']:
            try:
                from logging.handlers import SysLogHandler

                if logging_config['syslog_host'] is not None and logging_config['syslog_port'] is not None:
                    sys_log_addr = (logging_config['syslog_host'], logging_config['syslog_port'])
                else:
                    sys_log_addr = "/dev/log"
                    # Special-case BSDs
                    if Platform.is_darwin():
                        sys_log_addr = "/var/run/syslog"
                    elif Platform.is_freebsd():
                        sys_log_addr = "/var/run/log"

                handler = SysLogHandler(address=sys_log_addr, facility=SysLogHandler.LOG_DAEMON)
                handler.setFormatter(logging.Formatter(get_syslog_format(logger_name), get_log_date_format()))
                root_log = logging.getLogger()
                root_log.addHandler(handler)
            except Exception as e:
                sys.stderr.write("Error setting up syslog: '%s'\n" % str(e))
                traceback.print_exc()

        # Setting up logging in the event viewer for windows
        if get_os() == 'windows' and logging_config['log_to_event_viewer']:
            try:
                from logging.handlers import NTEventLogHandler
                nt_event_handler = NTEventLogHandler(logger_name, get_win32service_file('windows', 'win32service.pyd'), 'Application')
                nt_event_handler.setFormatter(logging.Formatter(get_syslog_format(logger_name), get_log_date_format()))
                nt_event_handler.setLevel(logging.ERROR)
                app_log = logging.getLogger(logger_name)
                app_log.addHandler(nt_event_handler)
            except Exception as e:
                sys.stderr.write("Error setting up Event viewer logging: '%s'\n" % str(e))
                traceback.print_exc()

    except Exception as e:
        sys.stderr.write("Couldn't initialize logging: %s\n" % str(e))
        traceback.print_exc()

        # if config fails entirely, enable basic stdout logging as a fallback
        logging.basicConfig(
            format=get_log_format(logger_name),
            level=logging.INFO,
        )

    # re-get the log after logging is initialized
    global log
    log = logging.getLogger(__name__)
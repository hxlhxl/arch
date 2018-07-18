# Installation From Source


```
[root@archlinux ~]# pacman -Ss sysstat
community/libsysstat 0.4.0-1
    Library to query system statistics (net, resource usage, ...)
community/sysstat 11.7.3-1
    a collection of performance monitoring tools (iostat,isag,mpstat,pidstat,sadf,sar)
archlinuxcn/libsysstat-git 0.4.1-1
    Library to query system statistics (net, resource usage, ...)
[root@archlinux ~]# pacman -S sysstat
resolving dependencies...
looking for conflicting packages...

Packages (1) sysstat-11.7.3-1

Total Download Size:   0.34 MiB
Total Installed Size:  1.69 MiB

:: Proceed with installation? [Y/n]
:: Retrieving packages...
 sysstat-11.7.3-1-x86_64                                                                                                             351.3 KiB   174K/s 00:02 [#################################################################################################] 100%
(1/1) checking keys in keyring                                                                                                                                [#################################################################################################] 100%
(1/1) checking package integrity                                                                                                                              [#################################################################################################] 100%
(1/1) loading package files                                                                                                                                   [#################################################################################################] 100%
(1/1) checking for file conflicts                                                                                                                             [#################################################################################################] 100%
(1/1) checking available disk space                                                                                                                           [#################################################################################################] 100%
:: Processing package changes...
(1/1) installing sysstat                                                                                                                                      [#################################################################################################] 100%
Optional dependencies for sysstat
    tk: to use isag
    gnuplot: to use isag
:: Running post-transaction hooks...
(1/2) Reloading system manager configuration...
(2/2) Arming ConditionNeedsUpdate...
[root@archlinux ~]# DD_API_KEY=be8485be695a531af050918abad54e08 sh -c "$(curl -L https://raw.githubusercontent.com/DataDog/dd-agent/master/packaging/datadog-agent/source/setup_agent.sh)"
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100 24002  100 24002    0     0  33853      0 --:--:-- --:--:-- --:--:-- 33853
Checking that logfile is writable
OK
Checking installation requirements
* uname Linux
* sysstat is installed
* python found, using `python2.7`
* downloader found, using `curl -k -L -o`
* sed found, using `sed`


Installing Datadog Agent 5.25.2
Installation is logged at /root/.datadog-agent/ddagent-install.log

* Setting up a python virtual env
Done
* Activating the virtual env
Done
* Setting up setuptools
Done
* Setting up pip
Done
* Installing requirements
Done
* Downloading agent version 5.25.2 from GitHub (~5 MB)
Done
* Uncompressing tarball
Done
* Downloading integrations from GitHub
Done
* Uncompressing tarball
Done
* Setting up integrations
Done
* Trying to install optional requirements
Done
* Trying to install JMXFetch jarfile from http://dd-jmxfetch.s3.amazonaws.com
Done
* Setting up a datadog.conf generic configuration file
Done
* Setting up init scripts
Done
* Setting up supervisord
Done
* Starting the agent
    - supervisord started

Your Agent has started up for the first time. We're currently verifying
that data is being submitted. You should see your Agent show up in Datadog
shortly at:

      https://app.datadoghq.com/infrastructure

* Waiting 30s to see if the Agent submits metrics correctly
..............................
* Testing if the Agent is submitting metrics
.......
Success! Your Agent is functioning properly, and will continue to run
in the foreground. To stop it, simply press CTRL-C. To start it back
up again in the foreground, run the following command from the /root/.datadog-agent directory:

    bin/agent



```


1. Use our one-step source install script:
```
DD_API_KEY=be8485be695a531af050918abad54e08 sh -c "$(curl -L https://raw.githubusercontent.com/DataDog/dd-agent/master/packaging/datadog-agent/source/setup_agent.sh)"
```
The Agent will be installed in its own self-contained sandbox located at ~/.datadog-agent.

2. To make it permanent, set up your init daemon to run $sandbox_dir/bin/agent with $sandbox_dir set at the current working directory. The sandbox dir (~/.datadog-agent by default) is portable. It can run from any location on your filesystem you'd like.


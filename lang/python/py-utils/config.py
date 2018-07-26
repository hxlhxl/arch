import json
import psutil

class AppConfig:
    def __init__(self):
        pass
    @staticmethod
    def loadConfig(config_file):
        with open(config_file) as conf_handler:
            config = json.load(conf_handler)
        config["cpu_count"] = psutil.cpu_count()
        return config

app_config = AppConfig.loadConfig("config.json")

if __name__ == '__main__':
    print(app_config)
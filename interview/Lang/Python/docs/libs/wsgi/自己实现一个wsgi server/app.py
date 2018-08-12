from flask import Flask

flask_app = Flask(__name__)

@flask_app.route('/')
def index():
    return 'hello world!'

app = flask_app.wsgi_app

if __name__ == '__main__':
    flask_app.run('0.0.0.0',8000)
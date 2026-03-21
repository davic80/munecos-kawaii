from flask import Flask
from dotenv import load_dotenv
import os

load_dotenv()

def create_app():
    app = Flask(
        __name__,
        template_folder='templates',
        static_folder='../static',
        static_url_path='/static',
    )
    app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', 'dev-secret')

    from .routes import bp
    app.register_blueprint(bp)

    return app

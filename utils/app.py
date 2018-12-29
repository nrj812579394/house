from flask import Flask
from app.house_views import blue_house
from app.models import db
from app.order_views import blue_order
from app.user_views import blue_user
from utils.config import Config
from utils.settings import STATIC_DIR, TEMPLATES_DIR


def create_app():
    app = Flask(__name__,
                static_folder=STATIC_DIR,
                template_folder=TEMPLATES_DIR)

    app.register_blueprint(blueprint=blue_user, url_prefix='/user')
    app.register_blueprint(blueprint=blue_order, url_prefix='/order')
    app.register_blueprint(blueprint=blue_house, url_prefix='/house')

    app.config.from_object(Config)

    db.init_app(app)

    return app

from utils.functions import get_sql_url
from utils.settings import DATABASE


class Config():
    SQLALCHEMY_DATABASE_URI = get_sql_url(DATABASE)
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SECRET_KEY = 'okok'
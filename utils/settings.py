import os


BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
STATIC_DIR = os.path.join(BASE_DIR, 'static')
TEMPLATES_DIR = os.path.join(BASE_DIR, 'templates')
MEDIA_PATH = os.path.join(STATIC_DIR, 'media')
IMAGE_PATH = os.path.join(STATIC_DIR, 'images')

DATABASE = {
        'NAME': 'flask_house',
        'USER': 'root',
        'PASSWORD': '123456',
        'HOST': '127.0.0.1',
        'PORT': '3306',
        'ENGINE': 'mysql',
        'DRIVER': 'pymysql'
}
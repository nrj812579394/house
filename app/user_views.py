import os
import random
import re
from flask import Blueprint, request, render_template, jsonify, session
from app.models import db, User
from utils.settings import MEDIA_PATH

blue_user = Blueprint('user', __name__)


@blue_user.route('/create/')
def create():
    db.create_all()
    return 'OK'


@blue_user.route('/random_num/',  methods=['GET'])
def random_num():
    str1 = ''
    s = '0123456789qwertyuiopasdfghjklzxcvbnm'
    for _ in range(4):
        str1 += random.choice(s)
    session['code'] = str1
    return jsonify({'code': 200, 'msg': '请求成功', 'data': str1})


@blue_user.route('/register/', methods=['GET', 'POST'])
def register():
    if request.method == 'GET':
        return render_template('register.html')

    if request.method == 'POST':
        mobile = request.form.get('mobile')
        if not mobile:
            return jsonify({'code': 1001, 'msg': '该字段不能为空'})
        r_mobie = '^[1][3,4,5,7,8][0-9]{9}$'
        result = re.match(r_mobie, mobile)
        if not result:
            return jsonify({'code': 1002, 'msg': '请输入有效的手机号'})
        password = request.form.get('password')
        password2 = request.form.get('password2')
        imagecode = request.form.get('imagecode')
        user = User.query.filter(User.phone == mobile).first()
        if user:
            return jsonify({'code': 1003, 'msg': '账号已经注册了'})
        if not password and password2:
            return jsonify({'code': 1004, 'msg': '密码不能为空'})
        if password != password2:
            return jsonify({'code': 1005, 'msg': '两次的密码不一致'})
        if session['code'] != imagecode:
            return jsonify({'code': 1006, 'msg': '验证码错误'})
        user = User()
        user.phone = mobile
        user.password = password
        db.session.add(user)
        db.session.commit()
        return jsonify({'code': 200, 'msg': '请求成功'})


@blue_user.route('/login/', methods=['GET', 'POST'])
def login():
    if request.method == 'GET':
        return render_template('login.html')

    if request.method == 'POST':
        phone = request.form.get('mobile')
        password = request.form.get('password')
        user = User.query.filter(User.phone == phone).first()
        if not user:
            return jsonify({'code': 1001, 'msg': '用户不存在请去注册'})
        pwd = user.check_pwd(password)
        if not pwd:
            return jsonify({'code': 1002, 'msg': '密码错误'})
        session['user_id'] = user.id
        return jsonify({'code': 200, 'msg': '登陆成功！'})


@blue_user.route('/my/', methods=['GET'])
def my():
    if request.method == 'GET':
        return render_template('my.html')


@blue_user.route('/my_info/', methods=['GET'])
def my_info():
    if request.method == 'GET':
        user = User.query.filter(User.id == session['user_id']).first()
        return jsonify({'code': 200, 'icon': user.avatar, 'name': user.name, 'phone': user.phone})


@blue_user.route('/profile/', methods=['GET'])
def profile():
    if request.method == 'GET':
        return render_template('profile.html')


@blue_user.route('/profile_image/', methods=['PATCH'])
def add_profile():
    if request.method == 'PATCH':
        id = session['user_id']
        user = User.query.filter(User.id == id).first()
        picture = request.files.get('avatar')
        path = os.path.join(MEDIA_PATH, picture.filename)
        picture.save(path)
        user.avatar = picture.filename
        user.save()
        return jsonify({'code': 200, 'icon': user.avatar})


@blue_user.route('/profile_name/', methods=['PATCH'])
def add_name():
    if request.method == 'PATCH':
        user = User.query.filter(User.id == session['user_id']).first()
        name = request.form.get('name')
        if user.name == name:
            return jsonify({'code': 1006, 'msg': '用户名已经存在了'})
        user.name = name
        user.save()
        return jsonify({'code': 200, 'name': user.name})


@blue_user.route('/auth/', methods=['GET', 'POST'])
def auth():
    if request.method == 'GET':
        return render_template('auth.html')

    if request.method == 'POST':
        id_name = request.form.get('real_name')
        id_card = request.form.get('id_card')
        user = User.query.filter(User.id_card == id_card).first()
        if not [id_card, id_name]:
            return jsonify({'code': 1007, 'msg': '必须填上！'})
        id = '(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)'
        result = re.match(id, id_card)
        if not result:
            return jsonify({'code': 1008, 'msg': '写错了吧'})
        if user:
            return jsonify({'code': 1009, 'msg': '已经写了嗷'})
        user = User.query.filter(User.id == session['user_id']).first()
        user.id_card = id_card
        user.id_name = id_name
        user.save()
        return jsonify({'code': 200, 'msg': '请求成功', 'id_card': id_card, 'id_name': id_name})


@blue_user.route('/id_name/', methods=['GET'])
def id_name():
    user = User.query.filter(User.id == session['user_id']).first()
    if not user.id_card:
        return jsonify({'code': 1009, 'msg': '你还没有实名认证'})

    return jsonify({'code': 200, 'id_card': user.id_card, 'id_name': user.id_name})


@blue_user.route('/logout/', methods=['GET'])
def logout():
    session.clear()
    return jsonify({'code': 200, 'msg': '退出成功'})
import os
from flask import Blueprint, request, render_template, session, jsonify
from app.models import User, Facility, House, Area, db, HouseImage
from utils.settings import IMAGE_PATH

blue_house = Blueprint('house', '/house/')


@blue_house.route('/my_index/', methods=['GET', 'POST'])
def my_index():
    if request.method == 'GET':
        return render_template('index.html')

    if request.method == 'POST':
        try:
            id = session['user_id']
            user = User.query.filter(User.id == id).first()
        except:
            user = ''
        return jsonify({'code': 200, 'msg': '请求成功', 'user': user.phone})


@blue_house.route('/my_house/', methods=['GET'])
def my_house():
    if request.method == 'GET':
        return render_template('myhouse.html')


@blue_house.route('/house_info/', methods=['GET'])
def house_info():
    houses = House.query.filter(House.user_id == User.id).all()
    home_info = [house.to_dict() for house in houses]
    return jsonify({'code': 200, 'msg': '请求成功', 'home_info': home_info})


@blue_house.route('/area/', methods=['GET'])
def area():
    areas = Area.query.all()
    data = [area.to_dict() for area in areas]
    return jsonify({'code': 200, 'data': data})


@blue_house.route('/facility_num/', methods=['GET'])
def facility_num():
    facilities = Facility.query.all()
    data = [facility.to_dict() for facility in facilities]
    return jsonify({'code': 200, 'data': data})


@blue_house.route('/user_h/', methods=['GET'])
def user_h():
    if request.method == 'GET':
        user = User.query.filter(User.id == session['user_id']).first()
        if not user.id_card:
            return jsonify({'code': 1010, 'msg': '赶快去实名认证嗷'})
        return jsonify({'code': 200, 'msg': '好公民'})


@blue_house.route('/new_house/', methods=['GET', 'POST'])
def new_house():
    if request.method == 'GET':
        return render_template('newhouse.html')

    if request.method == 'POST':
        house = House()
        house.title = request.form.get('title')
        house.price = request.form.get('price')
        house.address = request.form.get('address')
        house.room_count = request.form.get('room_count')
        house.acreage = request.form.get('acreage')
        house.unit = request.form.get('unit')
        house.capacity = request.form.get('capacity')
        house.beds = request.form.get('beds')
        house.deposit = request.form.get('deposit')
        house.min_days = request.form.get('min_days')
        house.max_day = request.form.get('max_days')
        area_id = request.form.get('area_id')
        area = Area.query.filter(Area.name == area_id).first()
        house.area_id = area.id

        user = User.query.filter(User.id == session['user_id']).first()
        house.user_id = user.id

        facilities_list = request.form.getlist('facility')
        for facility_id in facilities_list:
            facility = Facility.query.filter(Facility.id == facility_id).first()
            house.facilities.append(facility)
        db.session.add(house)
        db.session.commit()
        id = house.id
        return jsonify({'code': 200, 'msg': '成了！', 'id': id})


@blue_house.route('/house_images/', methods=['POST'])
def house_images():
    if request.method == 'POST':
        images = HouseImage()
        house_id = request.form.get('house_id')
        house = House.query.filter(House.id == house_id).first()
        icon = request.files.get('house_image')
        path = os.path.join(IMAGE_PATH, icon.filename)
        icon.save(path)
        url = icon.filename
        images.house_id = house_id
        images.url = url
        house.index_image_url = url
        db.session.add(house)
        db.session.commit()
        db.session.add(images)
        db.session.commit()
        return jsonify({'code': 200})


@blue_house.route('/detail/', methods=['GET'])
def detail():
    if request.method == 'GET':
        return render_template('detail.html')


@blue_house.route('/house_detail/<int:id>/', methods=['GET'])
def house_detail(id):
    house = House.query.filter(House.id == id).first()
    booking = 1
    if 'user_id' in session:
        if house.user_id == session['user_id']:
            booking = 0
    return jsonify({'code': 200, 'house': house.to_full_dict(), 'booking': booking})


@blue_house.route('/booking/', methods=['GET'])
def booking():
    if request.method == 'GET':
        return render_template('booking.html')


@blue_house.route('/booking_house/<int:id>/', methods=['GET'])
def booking_house(id):
    house = House.query.get(id)
    return jsonify({'code': 200, 'house': house.to_full_dict()})


@blue_house.route('/search/', methods=['GET'])
def search():
    if request.method == 'GET':
        return render_template('search.html')


@blue_house.route('/areas/', methods=['GET'])
def areas():
    if request.method == 'GET':
        i_areas = Area.query.all()
        i_area = [i_area.to_dict() for i_area in i_areas]
        return jsonify({'code': 200, 'data': i_area})


@blue_house.route('/my_search/', methods=['GET'])
def my_search():
    aid = request.args.get('aid')
    sd = request.args.get('sd')
    ed = request.args.get('ed')
    houses = House.query.filter(House.area_id == aid).all()
    if not houses:
        return jsonify({'code': 1011, 'msg': '没有可提供的房源'})
    house = [house.to_dict() for house in houses]
    return jsonify({'code': 200, 'data': house})


@blue_house.route('/s_areas/', methods=['GET'])
def s_areas():
    if request.method == 'GET':
        i_areas = Area.query.all()
        i_area = [i_area.to_dict() for i_area in i_areas]
        return jsonify({'code': 200, 'data': i_area})

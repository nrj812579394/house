import datetime
from flask import Blueprint, request, render_template, jsonify, session
from app.models import Order, House, db

blue_order = Blueprint('order', __name__)


@blue_order.route('/orders/', methods=['GET', 'POST'])
def orders():
    if request.method == 'GET':
        return render_template('orders.html')

    if request.method == 'POST':
        order = Order()
        house_id = request.form.get('id')
        house = House.query.filter(House.id == house_id).first()
        user_id = session['user_id']
        start = request.form.get('start')
        end = request.form.get('end')
        start_date = datetime.datetime.strptime(start, '%Y-%m-%d')
        end_date = datetime.datetime.strptime(end, '%Y-%m-%d')
        days = (end_date - start_date).days
        totle_days = days + 1
        house_price = house.price
        money = totle_days * house_price
        order.user_id = user_id
        order.house_id = house_id
        order.begin_date = start_date
        order.end_date = end_date
        order.days = totle_days
        order.house_price = house_price
        order.amount = money
        db.session.add(order)
        db.session.commit()
        return jsonify({'code': 200, 'msg': '上传订单成功'})


@blue_order.route('/my_order/', methods=['GET'])
def my_order():
    if request.method == 'GET':
        return render_template('orders.html')


@blue_order.route('/my_order_info/', methods=['GET'])
def my_order_info():
    ors = Order.query.filter(Order.user_id == session['user_id']).all()
    orders = [order.to_dict() for order in ors]
    return jsonify({'code': 200, 'data': orders})


@blue_order.route('/i_order/', methods=['GET'])
def i_order():
    if request.method == 'GET':
        return render_template('lorders.html')


@blue_order.route('/i_order_info/', methods=['GET'])
def i_order_info():
    if request.method == 'GET':
        house = House.query.filter(House.user_id == session['user_id']).first()
        orders = Order.query.filter(Order.house_id == house.id).all()
        order = [order.to_dict() for order in orders]
        return jsonify({'code': 200, 'data': order})



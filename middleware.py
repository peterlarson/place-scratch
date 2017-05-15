from flask import Flask, request, jsonify

import redis

r = redis.StrictRedis(
    host='4902-11.csse.rose-hulman.edu',
    port=6379,
    db=0,
    password='peterpeterpeter123123123123123123123123123213123123')

app = Flask(__name__)

height = 10
width = 10
default_color = "#234234"

def r_name(x,y):
    return str(x) + '-' + str(y)

@app.route("/")
def hello():
    return app.send_static_file('index.html')


@app.route("/update", methods=['POST'])
def update():
    x_coord = request.form['x']
    y_coord = request.form['y']
    color = request.form['color']
    r.set(str(x_coord) + '-' + str(y_coord), color.encode('utf-8')) 
    print("Setting: " + str(x_coord) + '-' + str(y_coord)) 
    return "ok"


@app.route("/canvas") 
def get_canvas():
    canvas = []
    for i in range(width): 
        row = []
        for j in range(height):
            value = r.get(r_name(i,j))
            if(value is None):
                r.set(r_name(i,j), default_color.encode('utf-8'))
                value = default_color
            else: 
                value = value.decode('utf-8')
            row.append(value)
        canvas.append(row)
    return jsonify(canvas)

if __name__ == "__main__":
    app.run()

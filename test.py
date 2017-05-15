from flask import Flask, request, jsonify, render_template
import redis

r = redis.StrictRedis(host='4902-11.csse.rose-hulman.edu', port=6379, db=0, \
    password ='peterpeterpeter123123123123123123123123123213123123')

app = Flask(__name__)


@app.route("/")
def hello():
    return app.send_static_file('blank.html')

@app.route("/update", methods=['POST'])
def update():
    x_coord = request.form['x']
    y_coord = request.form['y']
    color = request.form['color']
    r.set(str(x_coord)+'-'+str(y_coord), color.encode('utf-8'))
    print("Setting: " + str(x_coord)+'-'+str(y_coord) )
    return "ok"

@app.route("/canvas")
def get_canvas():
    value = r.get('0-0').decode('utf-8')
    print("returning: "+value)
    return jsonify([[value]])

if __name__ == "__main__":
    app.run()

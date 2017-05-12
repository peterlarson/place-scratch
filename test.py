from flask import Flask, request, jsonify, render_template
import redis

r = redis.StrictRedis(host='localhost', port=6379, db=0)

app = Flask(__name__)

#canvas = [["#FF0000"]]

@app.route("/")
def hello():
    return app.send_static_file('blank.html')

@app.route("/update", methods=['POST'])
def update():
    x_coord = 0 #request.form['x']
    y_coord = 0 #request.form['y']
    color = request.form['color']
    r.set(str(x_coord)+'-'+str(y_coord), color)
    print("Setting: " + str(x_coord)+'-'+str(y_coord) )
    return "ok"

@app.route("/canvas")
def get_canvas():
    return jsonify([[r.get('0-0')]])

if __name__ == "__main__":
    app.run()
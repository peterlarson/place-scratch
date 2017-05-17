from flask import Flask, request, jsonify
import redis
import redis_db

'''
r = redis.StrictRedis(
    host='4902-11.csse.rose-hulman.edu',
    port=6379,
    db=0,
    password='peterpeterpeter123123123123123123123123123213123123')
'''
app = Flask(__name__)


height = 200
width = 200
default_color = "#234234"

redisdb = redis_db.redis_db(width, height, default_color)

def r_name(x,y):
    return str(x) + '-' + str(y)

@app.route("/")
def hello():
    return app.send_static_file('index.html')


@app.route("/update", methods=['POST'])
def update():
    if False: #TODO: if user has no permission to write this pixel
        return "NOT_OK"

    x_coord = request.form['x']
    y_coord = request.form['y']
    color = request.form['color']
    #r.set(str(x_coord) + '-' + str(y_coord), color.encode('utf-8'))
    redisdb.update_canvas(x_coord, y_coord, color, request.form['canvas'])
    print("Setting: " + str(x_coord) + '-' + str(y_coord))
    return "OK"


@app.route("/canvas") 
def get_canvas():
    return jsonify(redisdb.get_canvas(request.args['canvas']))

if __name__ == "__main__":
    app.run()

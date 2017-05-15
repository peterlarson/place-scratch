import redis
from random import randint

class redis_db:

    #conn = None

    def __init__(self, width, height, default_color, canvas_key="canvas1", hostname="4902-24.csse.rose-hulman.edu"):
        self.conn = redis.Redis(host=hostname,port=6379)
        self.height = height
        self.width = width
        self.default_color = default_color

        # if not self.conn.exists(canvas_key):
        #     print("canvas get reset")
        #     for i in range (0,width):
        #         for j in range (0,height):
        #             key = str(i)+"-"+str(j)
        #             self.conn.hset(canvas_key, key.encode('utf-8'),default_color.encode('utf-8'))


    def get_canvas(self, canvas_id = "canvas1"):
        canvas = [[self.default_color for i in range(self.width)] for j in range(self.height)]

        result = self.conn.hgetall(canvas_id)
        for record in result:
            key = record.decode("utf-8")
            coords = key.split("-")
            x = int(coords[0])
            y = int(coords[1])
            c = ((result[record]).decode('utf-8'))
            canvas[x][y] = c
        return (canvas)

    def update_canvas(self, i,j,color,canvas_id = "canvas1"):
        key = str(i)+"-"+str(j)
        self.conn.hset(canvas_id,key,color)


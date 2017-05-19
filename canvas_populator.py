from PIL import Image
import google_images_download

'''
Adapted from 
http://stackoverflow.com/questions/4296249/how-do-i-convert-a-hex-triplet-to-an-rgb-tuple-and-back
'''

_NUMERALS = '0123456789abcdefABCDEF'
_HEXDEC = {v: int(v, 16) for v in (x+y for x in _NUMERALS for y in _NUMERALS)}
LOWERCASE, UPPERCASE = 'x', 'X'

def canvas_initializer(name, max_height, max_width):
    if(google_images_download.get_image_from_keyword(name)):
        im = Image.open(name+".jpg")
       
        #height, width = im.size
        #if(height > max_height or width > max_width):
        im = im.resize((max_height, max_width))
        #height, width = im.size
        pix = im.load()
        canvas = []
        for x in range(max_width):
            canvas_row = []
            for y in range(max_height):
                rgb = pix[x,y]
                if(type(rgb) == int):
                    print(rgb)
                    return -1
                hexv = '#'+triplet((rgb[0], rgb[1], rgb[2]), UPPERCASE)
                canvas_row.append(hexv)
            canvas.append(canvas_row)
        return canvas
    else:
        #random
        return -1




def rgb(triplet):
    return _HEXDEC[triplet[0:2]], _HEXDEC[triplet[2:4]], _HEXDEC[triplet[4:6]]

def triplet(rgb, lettercase=LOWERCASE):
    return format(rgb[0]<<16 | rgb[1]<<8 | rgb[2], '06'+lettercase)

from skimage import io
import time

img = io.imread("pic.png")

sz = 0
for i in range(16):
    for j in range(16):
        print(i, j)
        io.imsave("%d.png" % (sz),img[i * 128: i * 128 + 127, j * 128: j * 128 + 127])
        sz += 1


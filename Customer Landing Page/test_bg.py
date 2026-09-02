from PIL import Image
img = Image.open('public/images/categories/grocery.png')
print("grocery.png top-left pixel:", img.getpixel((0,0)))
print("grocery.png center pixel:", img.getpixel((512,512)))
print("grocery.png pixel at 100,100:", img.getpixel((100,100)))

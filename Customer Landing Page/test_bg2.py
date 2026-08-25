from PIL import Image
img = Image.open('public/images/categories/grocery.png')
print("grocery.png 200,200:", img.getpixel((200,200)))
print("grocery.png 256,256:", img.getpixel((256,256)))

from PIL import Image
img = Image.open('public/images/categories/electronics.png')
print("electronics center:", img.getpixel((512,512)))
print("electronics 200,200:", img.getpixel((200,200)))
print("electronics 300,300:", img.getpixel((300,300)))

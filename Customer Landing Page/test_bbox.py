from PIL import Image
img = Image.open('public/images/categories/grocery.png')
print("Image size:", img.size)
print("Bounding box:", img.getbbox())

import sys
from rembg import remove
print("Starting rembg...", flush=True)
try:
    with open('public/images/categories/grocery.png', 'rb') as i:
        input_data = i.read()
    print("Read image...", flush=True)
    output_data = remove(input_data)
    print("Removed bg...", flush=True)
    with open('public/images/categories/grocery_test.png', 'wb') as o:
        o.write(output_data)
    print("Success!", flush=True)
except Exception as e:
    print("ERROR:", e, flush=True)

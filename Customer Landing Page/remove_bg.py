import os
from rembg import remove

dirs = [
    'public/images/categories',
    'public/assets/furniture',
    'public/assets/beauty'
]

count = 0
for d in dirs:
    if not os.path.exists(d):
        continue
    for filename in os.listdir(d):
        if filename.lower().endswith(('.png', '.jpg', '.jpeg')):
            filepath = os.path.join(d, filename)
            try:
                print(f"Processing {filepath}...")
                with open(filepath, 'rb') as i:
                    input_data = i.read()
                
                output_data = remove(input_data)
                
                with open(filepath, 'wb') as o:
                    o.write(output_data)
                count += 1
            except Exception as e:
                print(f"Error on {filepath}: {e}")

print(f"Processed {count} images.")

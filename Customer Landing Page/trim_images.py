import os
from PIL import Image

dirs = [
    'public/images/categories',
    'public/assets/furniture',
    'public/assets/beauty'
]

for d in dirs:
    if not os.path.exists(d):
        continue
    for filename in os.listdir(d):
        if filename.lower().endswith('.png'):
            filepath = os.path.join(d, filename)
            try:
                img = Image.open(filepath)
                # Get bounding box of non-zero alpha
                bbox = img.getbbox()
                if bbox:
                    cropped = img.crop(bbox)
                    cropped.save(filepath)
                    print(f"Trimmed {filepath}")
            except Exception as e:
                print(f"Error on {filepath}: {e}")

import os
import numpy as np
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
                if img.mode != 'RGBA':
                    continue
                data = np.array(img)
                alpha = data[:, :, 3]
                non_empty_columns = np.where(alpha.max(axis=0) > 10)[0]
                non_empty_rows = np.where(alpha.max(axis=1) > 10)[0]

                if len(non_empty_columns) > 0 and len(non_empty_rows) > 0:
                    left = non_empty_columns.min()
                    right = non_empty_columns.max()
                    top = non_empty_rows.min()
                    bottom = non_empty_rows.max()
                    
                    if left > 0 or top > 0 or right < img.size[0] or bottom < img.size[1]:
                        cropped = img.crop((left, top, right, bottom))
                        cropped.save(filepath)
                        print(f"Trimmed {filepath}")
            except Exception as e:
                pass

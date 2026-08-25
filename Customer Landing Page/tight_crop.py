import os
import numpy as np
from PIL import Image

filepath = 'public/images/categories/grocery.png'
img = Image.open(filepath)
data = np.array(img)

# Find where alpha > 10 (out of 255)
alpha = data[:, :, 3]
non_empty_columns = np.where(alpha.max(axis=0) > 10)[0]
non_empty_rows = np.where(alpha.max(axis=1) > 10)[0]

if len(non_empty_columns) > 0 and len(non_empty_rows) > 0:
    left = non_empty_columns.min()
    right = non_empty_columns.max()
    top = non_empty_rows.min()
    bottom = non_empty_rows.max()
    
    print(f"Old size: {img.size}")
    cropped = img.crop((left, top, right, bottom))
    print(f"New size: {cropped.size}")
    cropped.save(filepath)
    print("Cropped successfully!")
else:
    print("No visible pixels found")

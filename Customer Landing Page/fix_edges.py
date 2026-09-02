import cv2
import numpy as np
from PIL import Image

# Read image with alpha channel
img = cv2.imread('public/images/categories/grocery.png', cv2.IMREAD_UNCHANGED)
if img.shape[2] == 4:
    # Extract alpha channel
    alpha = img[:, :, 3]
    
    # Create a kernel for erosion
    kernel = np.ones((5,5), np.uint8)
    
    # Erode the alpha channel
    # This shrinks the mask, hiding the edge pixels
    eroded_alpha = cv2.erode(alpha, kernel, iterations=1)
    
    # Blur the edge slightly for a smooth anti-aliased look
    eroded_alpha = cv2.GaussianBlur(eroded_alpha, (3,3), 0)
    
    # Replace alpha channel
    img[:, :, 3] = eroded_alpha
    
    cv2.imwrite('public/images/categories/grocery.png', img)
    print("Successfully eroded edges for grocery.png")
else:
    print("No alpha channel found!")

# Same for electronics if needed
try:
    img = cv2.imread('public/images/categories/electronics.png', cv2.IMREAD_UNCHANGED)
    if img.shape[2] == 4:
        alpha = img[:, :, 3]
        kernel = np.ones((3,3), np.uint8)
        eroded_alpha = cv2.erode(alpha, kernel, iterations=1)
        eroded_alpha = cv2.GaussianBlur(eroded_alpha, (3,3), 0)
        img[:, :, 3] = eroded_alpha
        cv2.imwrite('public/images/categories/electronics.png', img)
        print("Successfully eroded edges for electronics.png")
except Exception as e:
    print(e)

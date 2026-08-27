import numpy as np
from PIL import Image
import cv2
import colorsys

img = Image.open('/Users/nikita/.gemini/antigravity/brain/a7136a33-0416-4bae-98ee-9399f070806f/.user_uploaded/media_1787649577362.png')
data = np.array(img)

# We want 3 layers:
# 1. Navy text ('saath', 'TM')
# 2. Green text & icon ('app', icon, tagline)
# Wait, do we need to separate 'tagline' from 'app'?
# Prompt: "Keep app green, but slightly brighten the green gradient... Make the Always With You tagline a lighter green for readability"
# Actually, if we just apply brightness to all green parts in dark mode, that might be enough.
# Let's separate into 2 layers first: Navy and Green.

r, g, b, a = data[:,:,0], data[:,:,1], data[:,:,2], data[:,:,3]

navy_layer = np.zeros_like(data)
green_layer = np.zeros_like(data)

# Convert to HSV to separate
for i in range(data.shape[0]):
    for j in range(data.shape[1]):
        if a[i,j] > 0:
            hue, sat, val = colorsys.rgb_to_hsv(r[i,j]/255., g[i,j]/255., b[i,j]/255.)
            # Green hue is typically 0.2 to 0.45.
            # But there are some white/bright highlights in the green 3D bevels (low sat).
            # And some dark shadows.
            # Navy has hue ~0.6-0.7 (blueish), but low value.
            # Let's just use the bounding boxes to be 100% accurate without artifacts!
            # The bounding boxes were:
            # saath: x < 480
            # app & icon: x >= 470
            # Wait, they overlap in x.
            # But wait, 'saath' is navy, 'app' is green. 
            # If they overlap, we can use color to resolve the overlap!
            
            # Simple heuristic:
            is_green_part = False
            
            if j < 450 and i < 260:
                is_green_part = False # definitely saath
            elif j > 485 and i < 260:
                # app or TM. TM is at j > 950.
                if j > 950 and i < 150:
                    is_green_part = False # TM
                else:
                    is_green_part = True # app
            elif i >= 260:
                is_green_part = True # tagline
            else:
                # Overlap region 450 <= j <= 485. 
                # Use color to decide! Green vs Navy.
                # Green has G > B. Navy has B > G.
                if g[i,j] > b[i,j]:
                    is_green_part = True
                else:
                    is_green_part = False

            if is_green_part:
                green_layer[i,j] = data[i,j]
            else:
                navy_layer[i,j] = data[i,j]

Image.fromarray(navy_layer).save('Customer Landing Page/src/assets/saathapp-logo-navy.png')
Image.fromarray(green_layer).save('Customer Landing Page/src/assets/saathapp-logo-green.png')


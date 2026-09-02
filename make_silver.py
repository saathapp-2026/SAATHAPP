import numpy as np
from PIL import Image
import colorsys

navy_img = Image.open('Customer Landing Page/src/assets/saathapp-logo-navy.png')
data = np.array(navy_img)

r, g, b, a = data[:,:,0], data[:,:,1], data[:,:,2], data[:,:,3]

silver_data = np.zeros_like(data)
silver_data[:,:,3] = a

for i in range(data.shape[0]):
    for j in range(data.shape[1]):
        if a[i,j] > 0:
            # Convert to HSV
            h, s, v = colorsys.rgb_to_hsv(r[i,j]/255., g[i,j]/255., b[i,j]/255.)
            
            # Reduce saturation completely to make it silver/white
            s = 0.0
            
            # Remap value (brightness)
            # Base navy is around v=0.2. We want it to be v=0.85 (silver)
            # 0 -> 0
            # 0.2 -> 0.85
            # 1.0 -> 1.0
            # We can use a piecewise linear function or a power function.
            # Let's use a simple power function: v = v ** 0.2
            # 0.2 ** 0.25 = 0.66, 0.2 ** 0.2 = 0.72, 0.2 ** 0.15 = 0.79
            
            new_v = v ** 0.25
            # Let's adjust so it looks like silver (not pure white)
            # And we want shadows to stay somewhat dark, but not too dark.
            
            # Let's use a smooth interpolation
            if v < 0.2:
                new_v = v * (0.85 / 0.2)
            else:
                new_v = 0.85 + (v - 0.2) * (0.15 / 0.8)
                
            # Add a slight blueish tint to make it "light silver" rather than flat gray
            # Silver hue ~ 0.6, sat ~ 0.05
            h = 0.6
            s = 0.05
            
            nr, ng, nb = colorsys.hsv_to_rgb(h, s, new_v)
            silver_data[i,j,0] = int(nr * 255)
            silver_data[i,j,1] = int(ng * 255)
            silver_data[i,j,2] = int(nb * 255)

Image.fromarray(silver_data).save('Customer Landing Page/src/assets/saathapp-logo-silver.png')


import sys
from rembg import remove

filepath = sys.argv[1]
try:
    with open(filepath, 'rb') as i:
        input_data = i.read()
    output_data = remove(input_data)
    with open(filepath, 'wb') as o:
        o.write(output_data)
    print("SUCCESS")
except Exception as e:
    print(f"FAILED: {e}")

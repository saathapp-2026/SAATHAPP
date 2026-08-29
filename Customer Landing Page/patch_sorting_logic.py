with open('./src/pages/saathapp-products/ProductListing.jsx', 'r') as f:
    content = f.read()

content = content.replace("sort === 'price-low'", "sort === 'price_low'")
content = content.replace("sort === 'price-high'", "sort === 'price_high'")

with open('./src/pages/saathapp-products/ProductListing.jsx', 'w') as f:
    f.write(content)

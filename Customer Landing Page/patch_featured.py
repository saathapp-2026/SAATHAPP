import re

with open("src/components/FeaturedProducts.jsx", "r") as f:
    content = f.read()

# Make sure useNavigate is imported correctly
if "useNavigate" not in content:
    content = content.replace("import React", "import { useNavigate } from 'react-router-dom';\nimport React")

# Make sure const navigate = useNavigate(); is added at the top of the component
if "const navigate =" not in content:
    content = re.sub(r'export default function FeaturedProducts\(\{[^}]+\}\)\s*\{', 
                     lambda m: m.group(0) + '\n  const navigate = useNavigate();', 
                     content)

# Add onClick to Image and Info section
# Find the div that wraps image
image_div = r'<div className="w-full aspect-square rounded-card overflow-hidden bg-page mb-3 relative flex items-center justify-center">'
image_div_new = r'<div onClick={() => navigate(`/product/${product.slug || product.id}`)} className="cursor-pointer w-full aspect-square rounded-card overflow-hidden bg-page mb-3 relative flex items-center justify-center">'
content = content.replace(image_div, image_div_new)

# Find the info section div
info_div = r'<div className="flex-1">'
info_div_new = r'<div onClick={() => navigate(`/product/${product.slug || product.id}`)} className="flex-1 cursor-pointer">'
content = content.replace(info_div, info_div_new)

# Fix quick view button to just navigate if it wasn't working
quickview_btn = r'onClick={() => onQuickView(product)}'
quickview_btn_new = r'onClick={() => navigate(`/product/${product.slug || product.id}`)}'
content = content.replace(quickview_btn, quickview_btn_new)

with open("src/components/FeaturedProducts.jsx", "w") as f:
    f.write(content)


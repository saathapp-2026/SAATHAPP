import re

with open("src/components/FlashDeals.jsx", "r") as f:
    content = f.read()

if "useNavigate" not in content:
    content = content.replace("import React", "import { useNavigate } from 'react-router-dom';\nimport React")

if "const navigate =" not in content:
    content = re.sub(r'export default function FlashDeals\(\{[^}]+\}\)\s*\{', 
                     lambda m: m.group(0) + '\n  const navigate = useNavigate();', 
                     content)

# Image div
image_div = r'<div className="w-full aspect-square rounded-card overflow-hidden bg-page mb-3 relative flex items-center justify-center">'
image_div_new = r'<div onClick={() => navigate(`/product/${deal.slug || deal.id}`)} className="cursor-pointer w-full aspect-square rounded-card overflow-hidden bg-page mb-3 relative flex items-center justify-center">'
content = content.replace(image_div, image_div_new)

# Info section
# We'll just add it to the Title if there is no wrapper
title_div = r'<h3 className="font-bold text-sm text-slate-800 dark:text-slate-100 line-clamp-2 leading-tight">'
title_div_new = r'<h3 onClick={() => navigate(`/product/${deal.slug || deal.id}`)} className="cursor-pointer font-bold text-sm text-slate-800 hover:text-primary dark:text-slate-100 line-clamp-2 leading-tight">'
content = content.replace(title_div, title_div_new)

quickview_btn = r'onClick={() => onQuickView(deal)}'
quickview_btn_new = r'onClick={() => navigate(`/product/${deal.slug || deal.id}`)}'
content = content.replace(quickview_btn, quickview_btn_new)

with open("src/components/FlashDeals.jsx", "w") as f:
    f.write(content)

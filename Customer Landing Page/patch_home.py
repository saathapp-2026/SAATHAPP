import re

with open("src/pages/Home.jsx", "r") as f:
    content = f.read()

categories_block = """          <Categories
            activeCategory={selectedCategory}
            onCategorySelect={(cat) => {
              setSelectedCategory(cat);
              document.getElementById('products-section')?.scrollIntoView({ behavior: 'smooth' });
            }}
          />"""

new_categories_block = """          <Categories
            activeCategory={selectedCategory}
            onCategorySelect={(cat) => {
              if (cat === 'all') {
                navigate('/products');
              } else if (cat === 'services') {
                navigate('/services');
              } else {
                navigate(`/products/${cat}`);
              }
            }}
          />"""

content = content.replace(categories_block, new_categories_block)

with open("src/pages/Home.jsx", "w") as f:
    f.write(content)

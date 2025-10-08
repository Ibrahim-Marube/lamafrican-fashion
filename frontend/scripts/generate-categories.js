const fs = require('fs');
const path = require('path');

const imagesDir = path.join(__dirname, '../public/images/products');

const categoryConfig = {
  'sun-hats': { name: 'Accessories - Sun Hats', price: 2500, pattern: /sun(\d+)\./i },
  'men-shirts': { name: 'African Men Shirts', price: 6500, pattern: /men-shirt-(\d+)\./i },
  'bomber-jackets': { name: 'Ankara Bomber Jackets', price: 11500, pattern: /bomber(\d+)\./i },
  'kitenge-prints': { name: 'Ankara Kitenge Prints', price: 3500, pattern: /ankaraprint(\d+)\./i },
  'ladies-tops': { name: 'Ankara Ladies Tops', price: 5500, pattern: /top(\d+)\./i },
  'maxi-dress': { name: 'Ankara Maxi Dress', price: 8500, pattern: /maxi(\d+)\./i },
  'patched-dresses': { name: 'Ankara Patched Dresses', price: 7500, pattern: /pdress(\d+)\./i },
  'patched-hoodies': { name: 'Ankara Patched Hoodies', price: 6500, pattern: /hoodie(\d+)\./i },
  'patched-snoodies': { name: 'Ankara Patched Snoodies', price: 5500, pattern: /snoody(\d+)\./i },
  'patched-tshirts': { name: 'Ankara Patched T-Shirts', price: 4500, pattern: /ptshirt(\d+)\./i },
  'skarters': { name: 'Ankara Skarters', price: 6000, pattern: /skarter(\d+)\./i },
  'blazers': { name: 'Blazers', price: 9500, pattern: /blazer(\d+)\./i },
  'bridesmaids': { name: 'Bridesmaids Dresses', price: 10500, pattern: /bridesmaid(\d+)\./i },
  'free-ankara': { name: 'Free Ankara Dresses', price: 7000, pattern: /free(\d+)\./i },
  'his-hers': { name: 'His and Hers', price: 15000, pattern: /hh(\d+)\./i },
  'top-skirt': { name: 'Ladies Top and Skirt', price: 7500, pattern: /topskirt(\d+)\./i },
  'senator-suits': { name: 'Men Senator Suits', price: 12000, pattern: /senator(\d+)\./i },
  'smookie': { name: 'Smookie Thread Dress', price: 8000, pattern: /smookie(\d+)\./i },
  'traditional-wedding': { name: 'Traditional Wedding Dresses', price: 18000, pattern: /wedding(\d+)\./i },
};

const outputPath = path.join(__dirname, '../src/data/generated-categories.json');

function generateCategories() {
  const categories = {};
  
  Object.keys(categoryConfig).forEach(slug => {
    const config = categoryConfig[slug];
    const folderPath = path.join(imagesDir, slug);
    
    if (!fs.existsSync(folderPath)) {
      console.warn(`Warning: Folder not found for ${slug}, skipping...`);
      return;
    }

    const files = fs.readdirSync(folderPath)
      .filter(file => /\.(jpe?g|png|gif)$/i.test(file))
      .sort((a, b) => {
        const aNum = parseInt((a.match(/\d+/) || [0])[0]);
        const bNum = parseInt((b.match(/\d+/) || [0])[0]);
        return aNum - bNum;
      });

    const images = [];
    files.forEach((file, index) => {
      const fullPath = `/images/products/${slug}/${file}`;
      let title = config.name;

      if (config.pattern) {
        const match = file.match(config.pattern);
        if (match) {
          title = `${config.name} ${match[1]}`;
        } else {
          title = `${config.name} ${index + 1}`;
        }
      }

      images.push({
        id: `${slug}-${index + 1}`,
        title,
        image: fullPath,
        price: config.price,
        alt: title
      });
    });

    categories[slug] = {
      slug,
      name: config.name,
      price: config.price,
      images,
      count: images.length
    };
  });

  fs.writeFileSync(outputPath, JSON.stringify(categories, null, 2));
  console.log(`Generated categories.json with ${Object.keys(categories).length} categories (${Object.values(categories).reduce((sum, cat) => sum + cat.count, 0)} total images)`);
}

generateCategories();

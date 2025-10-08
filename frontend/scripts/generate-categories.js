const fs = require('fs');
const path = require('path');

const imagesDir = path.join(__dirname, '../public/images/products');

const categoryConfig = {
  'skarters': { name: 'Ankara Skarters', price: 6000, pattern: /skarter(\d+)\.jpe?g/i },
  'bomber-jackets': { name: 'Ankara Bomber Jackets', price: 11500, pattern: /bomber(\d+)\.jpe?g/i },
  'maxi-dress': { name: 'Ankara Maxi Dress', price: 8500, pattern: /maxi(\d+)\.jpe?g/i },
  'patched-hoodies': { name: 'Ankara Patched Hoodies', price: 6500, pattern: /hoodie(\d+)\.jpe?g/i },
};

const outputPath = path.join(__dirname, '../src/data/generated-categories.json');

function generateCategories() {
  const categories = {};
  const categoryFolders = fs.readdirSync(imagesDir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory() && categoryConfig[dirent.name]);

  categoryFolders.forEach(folder => {
    const slug = folder.name;
    const config = categoryConfig[slug];
    const folderPath = path.join(imagesDir, slug);
    const files = fs.readdirSync(folderPath)
      .filter(file => /\.(jpe?g|png|gif)$/i.test(file))
      .sort((a, b) => a.localeCompare(b));

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

    if (images.length > 0) {
      categories[slug] = {
        slug,
        name: config.name,
        price: config.price,
        images,
        count: images.length
      };
    }
  });

  fs.writeFileSync(outputPath, JSON.stringify(categories, null, 2));
  console.log(`Generated categories.json with ${Object.keys(categories).length} categories (${Object.values(categories).reduce((sum, cat) => sum + cat.count, 0)} total images)`);
}

generateCategories();

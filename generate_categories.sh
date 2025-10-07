#!/bin/bash

PRODUCTS_DIR="$HOME/lamafrican-fashion/frontend/public/images/products"
cd "$PRODUCTS_DIR" || exit

echo "const categories = ["

id=1

declare -A category_names=(
  ["sun-hats"]="Accessories - Sun Hats"
  ["men-shirts"]="African Men Shirts"
  ["bomber-jackets"]="Ankara Bomber Jackets"
  ["ladies-tops"]="Ankara Ladies Tops"
  ["maxi-dress"]="Ankara Maxi Dress"
  ["patched-dresses"]="Ankara Patched Dresses"
  ["patched-hoodies"]="Ankara Patched Hoodies"
  ["patched-snoodies"]="Ankara Patched Snoodies"
  ["patched-tshirts"]="Ankara Patched T-Shirts"
  ["skarters"]="Ankara Skarters"
  ["blazers"]="Blazers"
  ["bridesmaids"]="Bridesmaids Dresses"
  ["free-ankara"]="Free Ankara Dresses"
  ["his-hers"]="His and Hers"
  ["top-skirt"]="Ladies Top and Skirt"
  ["senator-suits"]="Men Senator Suits"
  ["smookie"]="Smookie Thread Dress"
  ["traditional-wedding"]="Traditional Wedding Dresses"
)

for folder in */; do
  folder_name="${folder%/}"
  
  if [[ -z "${category_names[$folder_name]}" ]]; then
    continue
  fi
  
  image_count=$(find "$folder_name" -maxdepth 1 \( -name "*.jpg" -o -name "*.JPG" -o -name "*.jpeg" \) | wc -l | tr -d ' ')
  
  if [ "$image_count" -eq 0 ]; then
    continue
  fi
  
  first_file=$(find "$folder_name" -maxdepth 1 \( -name "*.jpg" -o -name "*.JPG" -o -name "*.jpeg" \) | sort | head -1 | xargs basename)
  extension="${first_file##*.}"
  
  case "$folder_name" in
    "men-shirts")
      echo "  { id: $id, name: '${category_names[$folder_name]}', slug: '$folder_name', images: ["
      first=true
      for file in $(find "$folder_name" -name "*.jpg" | sort); do
        filename=$(basename "$file")
        if [ "$first" = true ]; then
          echo -n "'/images/products/$folder_name/$filename'"
          first=false
        else
          echo -n ", '/images/products/$folder_name/$filename'"
        fi
      done
      echo "] },"
      ;;
    "ladies-tops")
      echo "  { id: $id, name: '${category_names[$folder_name]}', slug: '$folder_name', images: ["
      first=true
      for file in $(find "$folder_name" -name "*.jpg" -o -name "*.JPG" | sort); do
        filename=$(basename "$file")
        if [ "$first" = true ]; then
          echo -n "'/images/products/$folder_name/$filename'"
          first=false
        else
          echo -n ", '/images/products/$folder_name/$filename'"
        fi
      done
      echo "] },"
      ;;
    *)
      base_name="${first_file%%[0-9]*}"
      echo "  { id: $id, name: '${category_names[$folder_name]}', slug: '$folder_name', images: Array.from({ length: $image_count }, (_, i) => \`/images/products/$folder_name/${base_name}\${i + 1}.$extension\`) },"
      ;;
  esac
  
  ((id++))
done

echo "];"


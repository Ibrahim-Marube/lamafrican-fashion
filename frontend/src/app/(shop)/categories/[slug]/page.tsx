'use client';

import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingBag, ArrowLeft } from 'lucide-react';

// ALL CATEGORIES AND PRODUCTS WITH GALLERY SUPPORT
const categoryData: Record<string, { name: string; products: any[] }> = {
  
  'sun-hats': {
    name: 'Accessories - Sun Hats',
    products: [
      {
        id: 'ankara-sun-hat',
        name: 'Ankara Sun Hat - Premium Collection',
        slug: 'ankara-sun-hat',
        price: 1500,
        image: '/images/products/sun-hats/sun1.JPG',
        gallery: [
          '/images/products/sun-hats/sun1.JPG',
          '/images/products/sun-hats/sun2.JPG',
          '/images/products/sun-hats/sun3.JPG',
          '/images/products/sun-hats/sun4.JPG',
          '/images/products/sun-hats/sun5.JPG',
        ],
        description: 'Premium Ankara sun hat with beautiful African prints. Perfect for outdoor events, beach trips, and sunny days.',
      },
    ],
  },
  
'men-shirts': {
  name: 'African Men Shirts',
  products: [
    { id: 'men-shirt-1', name: 'African Men Shirt 1', slug: 'men-shirt-1', price: 3500, image: '/images/products/men-shirts/men-shirt-1.jpg' },
    { id: 'men-shirt-2', name: 'African Men Shirt 2', slug: 'men-shirt-2', price: 3800, image: '/images/products/men-shirts/men-shirt-2.jpg' },
    { id: 'men-shirt-3', name: 'African Men Shirt 3', slug: 'men-shirt-3', price: 4100, image: '/images/products/men-shirts/men-shirt-3.jpg' },
    { id: 'men-shirt-4', name: 'African Men Shirt 4', slug: 'men-shirt-4', price: 4400, image: '/images/products/men-shirts/men-shirt-4.jpg' },
    { id: 'men-shirt-5', name: 'African Men Shirt 5', slug: 'men-shirt-5', price: 4700, image: '/images/products/men-shirts/men-shirt-5.jpg' },
    { id: 'men-shirt-6', name: 'African Men Shirt 6', slug: 'men-shirt-6', price: 5000, image: '/images/products/men-shirts/men-shirt-6.jpg' },
    { id: 'men-shirt-7', name: 'African Men Shirt 7', slug: 'men-shirt-7', price: 5300, image: '/images/products/men-shirts/men-shirt-7.jpg' },
    { id: 'men-shirt-8', name: 'African Men Shirt 8', slug: 'men-shirt-8', price: 5600, image: '/images/products/men-shirts/men-shirt-8.jpg' },
    { id: 'men-shirt-9', name: 'African Men Shirt 9', slug: 'men-shirt-9', price: 5900, image: '/images/products/men-shirts/men-shirt-9.jpg' },
    { id: 'men-shirt-10', name: 'African Men Shirt 10', slug: 'men-shirt-10', price: 6200, image: '/images/products/men-shirts/men-shirt-10.jpg' },
    { id: 'men-shirt-11', name: 'African Men Shirt 11', slug: 'men-shirt-11', price: 6500, image: '/images/products/men-shirts/men-shirt-11.jpg' },
    { id: 'men-shirt-12', name: 'African Men Shirt 12', slug: 'men-shirt-12', price: 6800, image: '/images/products/men-shirts/men-shirt-12.jpg' },
    { id: 'men-shirt-13', name: 'African Men Shirt 13', slug: 'men-shirt-13', price: 7100, image: '/images/products/men-shirts/men-shirt-13.jpg' },
  ],
},

'bomber-jackets': {
  name: 'Ankara Bomber Jackets',
  products: [
    {
      id: 'ankara-bomber-jacket',
      name: 'Ankara Bomber Jacket - Premium Collection',
      slug: 'ankara-bomber-jacket',
      price: 6500,
      image: '/images/products/bomber-jackets/bomber1.jpg',  // Main thumbnail
      gallery: [  // All 30 photos for gallery
        '/images/products/bomber-jackets/bomber1.jpg',
        '/images/products/bomber-jackets/bomber2.jpg',
        '/images/products/bomber-jackets/bomber3.jpg',
        '/images/products/bomber-jackets/bomber4.jpg',
        '/images/products/bomber-jackets/bomber5.jpg',
        '/images/products/bomber-jackets/bomber6.jpg',
        '/images/products/bomber-jackets/bomber7.jpg',
        '/images/products/bomber-jackets/bomber8.jpg',
        '/images/products/bomber-jackets/bomber9.jpg',
        '/images/products/bomber-jackets/bomber10.jpg',
        '/images/products/bomber-jackets/bomber11.jpg',
        '/images/products/bomber-jackets/bomber12.jpg',
        '/images/products/bomber-jackets/bomber13.jpg',
        '/images/products/bomber-jackets/bomber14.jpg',
        '/images/products/bomber-jackets/bomber15.jpg',
        '/images/products/bomber-jackets/bomber16.jpg',
        '/images/products/bomber-jackets/bomber17.jpg',
        '/images/products/bomber-jackets/bomber18.jpg',
        '/images/products/bomber-jackets/bomber19.jpg',
        '/images/products/bomber-jackets/bomber20.jpg',
        '/images/products/bomber-jackets/bomber21.jpg',
        '/images/products/bomber-jackets/bomber22.jpg',
        '/images/products/bomber-jackets/bomber23.jpg',
        '/images/products/bomber-jackets/bomber24.jpg',
        '/images/products/bomber-jackets/bomber25.jpg',
        '/images/products/bomber-jackets/bomber26.jpg',
        '/images/products/bomber-jackets/bomber27.jpg',
        '/images/products/bomber-jackets/bomber28.jpg',
        '/images/products/bomber-jackets/bomber29.jpg',
        '/images/products/bomber-jackets/bomber30.jpg',
      ],
      description: 'Premium Ankara bomber jacket with authentic African prints. Perfect for casual wear and street style. Comfortable fit with quality fabric.',
    },
  ],
},
'kitenge-prints': {
  name: 'Ankara Kitenge Prints',
  products: [
    {
      id: 'ankara-kitenge-prints',
      name: 'Ankara Kitenge Print Fabrics - Premium Collection',
      slug: 'ankara-kitenge-prints',
      price: 2800,
      image: '/images/products/kitenge-prints/ankaraprint1.jpeg',
      gallery: [
        '/images/products/kitenge-prints/ankaraprint1.jpeg',
        '/images/products/kitenge-prints/ankaraprint2.jpeg',
        '/images/products/kitenge-prints/ankaraprint3.jpeg',
        '/images/products/kitenge-prints/ankaraprint4.jpeg',
        '/images/products/kitenge-prints/ankaraprint5.jpeg',
        '/images/products/kitenge-prints/ankaraprint6.jpeg',
        '/images/products/kitenge-prints/ankaraprint7.jpeg',
        '/images/products/kitenge-prints/ankaraprint8.jpeg',
        '/images/products/kitenge-prints/ankaraprint9.jpeg',
        '/images/products/kitenge-prints/ankaraprint10.jpeg',
        '/images/products/kitenge-prints/ankaraprint11.jpeg',
        '/images/products/kitenge-prints/ankaraprint12.jpeg',
        '/images/products/kitenge-prints/ankaraprint13.jpeg',
        '/images/products/kitenge-prints/ankaraprint14.jpeg',
        '/images/products/kitenge-prints/ankaraprint15.jpeg',
        '/images/products/kitenge-prints/ankaraprint16.jpeg',
        '/images/products/kitenge-prints/ankaraprint17.jpeg',
        '/images/products/kitenge-prints/ankaraprint18.jpeg',
        '/images/products/kitenge-prints/ankaraprint19.jpeg',
        '/images/products/kitenge-prints/ankaraprint20.jpeg',
        '/images/products/kitenge-prints/ankaraprint21.jpeg',
        '/images/products/kitenge-prints/ankaraprint22.jpeg',
        '/images/products/kitenge-prints/ankaraprint23.jpeg',
        '/images/products/kitenge-prints/ankaraprint24.jpeg',
        '/images/products/kitenge-prints/ankaraprint25.jpeg',
        '/images/products/kitenge-prints/ankaraprint26.jpeg',
        '/images/products/kitenge-prints/ankaraprint27.jpeg',
        '/images/products/kitenge-prints/ankaraprint28.jpeg',
        '/images/products/kitenge-prints/ankaraprint29.jpeg',
        '/images/products/kitenge-prints/ankaraprint30.jpeg',
        '/images/products/kitenge-prints/ankaraprint31.jpeg',
      ],
      description: 'Premium Ankara Kitenge print fabrics. Authentic African designs, vibrant colors, high-quality material. Perfect for dresses, shirts, and custom tailoring.',
    },
  ],
},

 'ladies-tops': {
  name: 'Ankara Ladies Tops',
  products: [
    {
      id: 'ankara-ladies-tops',
      name: 'Ankara Ladies Tops - Premium Collection',
      slug: 'ankara-ladies-tops',
      price: 2500,
      image: '/images/products/ladies-tops/top1.jpg',
      gallery: [
        '/images/products/ladies-tops/top1.jpg',
        '/images/products/ladies-tops/top2.jpg',
        '/images/products/ladies-tops/top3.jpg',
        '/images/products/ladies-tops/top4.jpg',
        '/images/products/ladies-tops/top5.jpg',
        '/images/products/ladies-tops/top6.jpg',
        '/images/products/ladies-tops/top7.jpg',
        '/images/products/ladies-tops/top8.jpg',
        '/images/products/ladies-tops/top9.jpg',
        '/images/products/ladies-tops/top10.jpg',
        '/images/products/ladies-tops/top11.jpg',
        '/images/products/ladies-tops/top12.jpg',
        '/images/products/ladies-tops/top13.jpg',
        '/images/products/ladies-tops/top14.jpg',
        '/images/products/ladies-tops/top15.jpg',
        '/images/products/ladies-tops/top16.jpg',
        '/images/products/ladies-tops/top17.jpg',
        '/images/products/ladies-tops/top18.jpg',
        '/images/products/ladies-tops/top19.jpg',
      ],
      description: 'Premium Ankara ladies tops with vibrant African prints. Perfect for casual wear, office style, or special occasions. Comfortable fit, quality fabric.',
    },
  ],
},
'maxi-dress': {
  name: 'Ankara Maxi Dress',
  products: [
    {
      id: 'ankara-maxi-dress',
      name: 'Ankara Maxi Dress - Premium Collection',
      slug: 'ankara-maxi-dress',
      price: 4500,
      image: '/images/products/maxi-dress/maxi1.jpg',
      gallery: [
        '/images/products/maxi-dress/maxi1.jpg',
        '/images/products/maxi-dress/maxi2.jpg',
        '/images/products/maxi-dress/maxi3.jpg',
        '/images/products/maxi-dress/maxi4.jpg',
        '/images/products/maxi-dress/maxi5.jpg',
        '/images/products/maxi-dress/maxi6.jpg',
        '/images/products/maxi-dress/maxi7.jpg',
        '/images/products/maxi-dress/maxi8.jpg',
        '/images/products/maxi-dress/maxi9.jpg',
        '/images/products/maxi-dress/maxi10.jpg',
        '/images/products/maxi-dress/maxi11.jpg',
        '/images/products/maxi-dress/maxi12.jpg',
        '/images/products/maxi-dress/maxi13.jpg',
        '/images/products/maxi-dress/maxi14.jpg',
        '/images/products/maxi-dress/maxi15.jpg',
        '/images/products/maxi-dress/maxi16.jpg',
        '/images/products/maxi-dress/maxi17.jpg',
        '/images/products/maxi-dress/maxi18.jpg',
        '/images/products/maxi-dress/maxi19.jpg',
        '/images/products/maxi-dress/maxi20.jpg',
        '/images/products/maxi-dress/maxi21.jpg',
        '/images/products/maxi-dress/maxi22.jpg',
        '/images/products/maxi-dress/maxi23.jpg',
        '/images/products/maxi-dress/maxi24.jpg',
        '/images/products/maxi-dress/maxi25.jpg',
      ],
      description: 'Stunning Ankara maxi dresses with elegant African prints. Perfect for weddings, parties, or special occasions. Flowing silhouette, comfortable fit, premium quality fabric.',
    },
  ],
},

  
  'patched-dresses': {
    name: 'Ankara Patched Dresses',
    products: [
      { id: 'patched-dress-1', name: 'Patched Ankara Dress 1', slug: 'patched-dress-1', price: 5200, image: '/images/products/patched-dresses/pdress1.jpg' },
      { id: 'patched-dress-2', name: 'Patched Ankara Dress 2', slug: 'patched-dress-2', price: 5500, image: '/images/products/patched-dresses/pdress2.jpg' },
      { id: 'patched-dress-3', name: 'Patched Ankara Dress 3', slug: 'patched-dress-3', price: 5800, image: '/images/products/patched-dresses/pdress3.jpg' },
      { id: 'patched-dress-4', name: 'Patched Ankara Dress 4', slug: 'patched-dress-4', price: 6100, image: '/images/products/patched-dresses/pdress4.jpg' },
      { id: 'patched-dress-5', name: 'Patched Ankara Dress 5', slug: 'patched-dress-5', price: 6400, image: '/images/products/patched-dresses/pdress5.jpg' },
      { id: 'patched-dress-6', name: 'Patched Ankara Dress 6', slug: 'patched-dress-6', price: 6700, image: '/images/products/patched-dresses/pdress6.jpg' },
    ],
  },
  
  'patched-hoodies': {
    name: 'Ankara Patched Hoodies',
    products: [
      { id: 'hoodie-1', name: 'Patched Hoodie 1', slug: 'hoodie-1', price: 4800, image: '/images/products/patched-hoodies/hoodie1.jpg' },
      { id: 'hoodie-2', name: 'Patched Hoodie 2', slug: 'hoodie-2', price: 5100, image: '/images/products/patched-hoodies/hoodie2.jpg' },
      { id: 'hoodie-3', name: 'Patched Hoodie 3', slug: 'hoodie-3', price: 5400, image: '/images/products/patched-hoodies/hoodie3.jpg' },
      { id: 'hoodie-4', name: 'Patched Hoodie 4', slug: 'hoodie-4', price: 5700, image: '/images/products/patched-hoodies/hoodie4.jpg' },
      { id: 'hoodie-5', name: 'Patched Hoodie 5', slug: 'hoodie-5', price: 6000, image: '/images/products/patched-hoodies/hoodie5.jpg' },
      { id: 'hoodie-6', name: 'Patched Hoodie 6', slug: 'hoodie-6', price: 6300, image: '/images/products/patched-hoodies/hoodie6.jpg' },
    ],
  },
  
  'patched-snoodies': {
    name: 'Ankara Patched Snoodies',
    products: [
      { id: 'snoody-1', name: 'Patched Snoody 1', slug: 'snoody-1', price: 4200, image: '/images/products/patched-snoodies/snoody1.jpg' },
      { id: 'snoody-2', name: 'Patched Snoody 2', slug: 'snoody-2', price: 4400, image: '/images/products/patched-snoodies/snoody2.jpg' },
      { id: 'snoody-3', name: 'Patched Snoody 3', slug: 'snoody-3', price: 4600, image: '/images/products/patched-snoodies/snoody3.jpg' },
      { id: 'snoody-4', name: 'Patched Snoody 4', slug: 'snoody-4', price: 4800, image: '/images/products/patched-snoodies/snoody4.jpg' },
      { id: 'snoody-5', name: 'Patched Snoody 5', slug: 'snoody-5', price: 5000, image: '/images/products/patched-snoodies/snoody5.jpg' },
      { id: 'snoody-6', name: 'Patched Snoody 6', slug: 'snoody-6', price: 5200, image: '/images/products/patched-snoodies/snoody6.jpg' },
    ],
  },
  
  'skarters': {
    name: 'Ankara Skarters',
    products: [
      { id: 'skarter-1', name: 'Ankara Skarter 1', slug: 'skarter-1', price: 3800, image: '/images/products/skarters/skarter1.jpg' },
      { id: 'skarter-2', name: 'Ankara Skarter 2', slug: 'skarter-2', price: 4050, image: '/images/products/skarters/skarter2.jpg' },
      { id: 'skarter-3', name: 'Ankara Skarter 3', slug: 'skarter-3', price: 4300, image: '/images/products/skarters/skarter3.jpg' },
      { id: 'skarter-4', name: 'Ankara Skarter 4', slug: 'skarter-4', price: 4550, image: '/images/products/skarters/skarter4.jpg' },
      { id: 'skarter-5', name: 'Ankara Skarter 5', slug: 'skarter-5', price: 4800, image: '/images/products/skarters/skarter5.jpg' },
      { id: 'skarter-6', name: 'Ankara Skarter 6', slug: 'skarter-6', price: 5050, image: '/images/products/skarters/skarter6.jpg' },
    ],
  },
  
  'blazers': {
    name: 'Blazers',
    products: [
      { id: 'blazer-1', name: 'African Print Blazer 1', slug: 'blazer-1', price: 7500, image: '/images/products/blazers/blazer1.jpg' },
      { id: 'blazer-2', name: 'African Print Blazer 2', slug: 'blazer-2', price: 7750, image: '/images/products/blazers/blazer2.jpg' },
      { id: 'blazer-3', name: 'African Print Blazer 3', slug: 'blazer-3', price: 8000, image: '/images/products/blazers/blazer3.jpg' },
      { id: 'blazer-4', name: 'African Print Blazer 4', slug: 'blazer-4', price: 8250, image: '/images/products/blazers/blazer4.jpg' },
      { id: 'blazer-5', name: 'African Print Blazer 5', slug: 'blazer-5', price: 8500, image: '/images/products/blazers/blazer5.jpg' },
      { id: 'blazer-6', name: 'African Print Blazer 6', slug: 'blazer-6', price: 8750, image: '/images/products/blazers/blazer6.jpg' },
    ],
  },
  
  'bridesmaids': {
    name: 'Bridesmaids Dresses',
    products: [
      { id: 'bridesmaid-1', name: 'Bridesmaids Dress 1', slug: 'bridesmaid-1', price: 8500, image: '/images/products/bridesmaids/bride1.jpg' },
      { id: 'bridesmaid-2', name: 'Bridesmaids Dress 2', slug: 'bridesmaid-2', price: 8800, image: '/images/products/bridesmaids/bride2.jpg' },
      { id: 'bridesmaid-3', name: 'Bridesmaids Dress 3', slug: 'bridesmaid-3', price: 9100, image: '/images/products/bridesmaids/bride3.jpg' },
      { id: 'bridesmaid-4', name: 'Bridesmaids Dress 4', slug: 'bridesmaid-4', price: 9400, image: '/images/products/bridesmaids/bride4.jpg' },
      { id: 'bridesmaid-5', name: 'Bridesmaids Dress 5', slug: 'bridesmaid-5', price: 9700, image: '/images/products/bridesmaids/bride5.jpg' },
      { id: 'bridesmaid-6', name: 'Bridesmaids Dress 6', slug: 'bridesmaid-6', price: 10000, image: '/images/products/bridesmaids/bride6.jpg' },
    ],
  },
  
  'free-ankara': {
    name: 'Free Ankara Dresses',
    products: [
      { id: 'free-dress-1', name: 'Free Ankara Dress 1', slug: 'free-dress-1', price: 4000, image: '/images/products/free-ankara/free1.jpg' },
      { id: 'free-dress-2', name: 'Free Ankara Dress 2', slug: 'free-dress-2', price: 4200, image: '/images/products/free-ankara/free2.jpg' },
      { id: 'free-dress-3', name: 'Free Ankara Dress 3', slug: 'free-dress-3', price: 4400, image: '/images/products/free-ankara/free3.jpg' },
      { id: 'free-dress-4', name: 'Free Ankara Dress 4', slug: 'free-dress-4', price: 4600, image: '/images/products/free-ankara/free4.jpg' },
      { id: 'free-dress-5', name: 'Free Ankara Dress 5', slug: 'free-dress-5', price: 4800, image: '/images/products/free-ankara/free5.jpg' },
      { id: 'free-dress-6', name: 'Free Ankara Dress 6', slug: 'free-dress-6', price: 5000, image: '/images/products/free-ankara/free6.jpg' },
    ],
  },
  
  'his-hers': {
    name: 'His and Hers',
    products: [
      { id: 'his-hers-1', name: 'His & Hers Set 1', slug: 'his-hers-1', price: 9500, image: '/images/products/his-hers/couple1.jpg' },
      { id: 'his-hers-2', name: 'His & Hers Set 2', slug: 'his-hers-2', price: 10100, image: '/images/products/his-hers/couple2.jpg' },
      { id: 'his-hers-3', name: 'His & Hers Set 3', slug: 'his-hers-3', price: 10700, image: '/images/products/his-hers/couple3.jpg' },
      { id: 'his-hers-4', name: 'His & Hers Set 4', slug: 'his-hers-4', price: 11300, image: '/images/products/his-hers/couple4.jpg' },
      { id: 'his-hers-5', name: 'His & Hers Set 5', slug: 'his-hers-5', price: 11900, image: '/images/products/his-hers/couple5.jpg' },
      { id: 'his-hers-6', name: 'His & Hers Set 6', slug: 'his-hers-6', price: 12500, image: '/images/products/his-hers/couple6.jpg' },
    ],
  },
  
  'top-skirt': {
    name: 'Ladies Top and Skirt',
    products: [
      { id: 'topskirt-1', name: 'Ladies Top & Skirt 1', slug: 'topskirt-1', price: 5200, image: '/images/products/top-skirt/topskirt1.jpg' },
      { id: 'topskirt-2', name: 'Ladies Top & Skirt 2', slug: 'topskirt-2', price: 5600, image: '/images/products/top-skirt/topskirt2.jpg' },
      { id: 'topskirt-3', name: 'Ladies Top & Skirt 3', slug: 'topskirt-3', price: 6000, image: '/images/products/top-skirt/topskirt3.jpg' },
      { id: 'topskirt-4', name: 'Ladies Top & Skirt 4', slug: 'topskirt-4', price: 6400, image: '/images/products/top-skirt/topskirt4.jpg' },
      { id: 'topskirt-5', name: 'Ladies Top & Skirt 5', slug: 'topskirt-5', price: 6800, image: '/images/products/top-skirt/topskirt5.jpg' },
      { id: 'topskirt-6', name: 'Ladies Top & Skirt 6', slug: 'topskirt-6', price: 7200, image: '/images/products/top-skirt/topskirt6.jpg' },
    ],
  },
  
  'patched-tshirts': {
    name: 'Men Ankara Patched T-shirts',
    products: [
      { id: 'tshirt-1', name: 'Men Patched T-shirt 1', slug: 'tshirt-1', price: 2200, image: '/images/products/patched-tshirts/tshirt1.jpg' },
      { id: 'tshirt-2', name: 'Men Patched T-shirt 2', slug: 'tshirt-2', price: 2400, image: '/images/products/patched-tshirts/tshirt2.jpg' },
      { id: 'tshirt-3', name: 'Men Patched T-shirt 3', slug: 'tshirt-3', price: 2600, image: '/images/products/patched-tshirts/tshirt3.jpg' },
      { id: 'tshirt-4', name: 'Men Patched T-shirt 4', slug: 'tshirt-4', price: 2800, image: '/images/products/patched-tshirts/tshirt4.jpg' },
      { id: 'tshirt-5', name: 'Men Patched T-shirt 5', slug: 'tshirt-5', price: 3000, image: '/images/products/patched-tshirts/tshirt5.jpg' },
      { id: 'tshirt-6', name: 'Men Patched T-shirt 6', slug: 'tshirt-6', price: 3200, image: '/images/products/patched-tshirts/tshirt6.jpg' },
    ],
  },
  
  'senator-suits': {
    name: 'Men Senator Suits',
    products: [
      { id: 'senator-1', name: 'Men Senator Suit 1', slug: 'senator-1', price: 12500, image: '/images/products/senator-suits/senator1.jpg' },
      { id: 'senator-2', name: 'Men Senator Suit 2', slug: 'senator-2', price: 13300, image: '/images/products/senator-suits/senator2.jpg' },
      { id: 'senator-3', name: 'Men Senator Suit 3', slug: 'senator-3', price: 14100, image: '/images/products/senator-suits/senator3.jpg' },
      { id: 'senator-4', name: 'Men Senator Suit 4', slug: 'senator-4', price: 14900, image: '/images/products/senator-suits/senator4.jpg' },
      { id: 'senator-5', name: 'Men Senator Suit 5', slug: 'senator-5', price: 15700, image: '/images/products/senator-suits/senator5.jpg' },
      { id: 'senator-6', name: 'Men Senator Suit 6', slug: 'senator-6', price: 16500, image: '/images/products/senator-suits/senator6.jpg' },
    ],
  },
  
  'smookie': {
    name: 'Smookie Thread Dress',
    products: [
      { id: 'smookie-1', name: 'Smookie Thread Dress 1', slug: 'smookie-1', price: 5600, image: '/images/products/smookie/smookie1.jpg' },
      { id: 'smookie-2', name: 'Smookie Thread Dress 2', slug: 'smookie-2', price: 6000, image: '/images/products/smookie/smookie2.jpg' },
      { id: 'smookie-3', name: 'Smookie Thread Dress 3', slug: 'smookie-3', price: 6400, image: '/images/products/smookie/smookie3.jpg' },
      { id: 'smookie-4', name: 'Smookie Thread Dress 4', slug: 'smookie-4', price: 6800, image: '/images/products/smookie/smookie4.jpg' },
      { id: 'smookie-5', name: 'Smookie Thread Dress 5', slug: 'smookie-5', price: 7200, image: '/images/products/smookie/smookie5.jpg' },
      { id: 'smookie-6', name: 'Smookie Thread Dress 6', slug: 'smookie-6', price: 7600, image: '/images/products/smookie/smookie6.jpg' },
    ],
  },
  
  'traditional-wedding': {
    name: 'Traditional Wedding Dresses',
    products: [
      { id: 'wedding-1', name: 'Traditional Wedding Dress 1', slug: 'wedding-1', price: 18500, image: '/images/products/traditional-wedding/wedding1.jpg' },
      { id: 'wedding-2', name: 'Traditional Wedding Dress 2', slug: 'wedding-2', price: 19500, image: '/images/products/traditional-wedding/wedding2.jpg' },
      { id: 'wedding-3', name: 'Traditional Wedding Dress 3', slug: 'wedding-3', price: 20500, image: '/images/products/traditional-wedding/wedding3.jpg' },
      { id: 'wedding-4', name: 'Traditional Wedding Dress 4', slug: 'wedding-4', price: 21500, image: '/images/products/traditional-wedding/wedding4.jpg' },
      { id: 'wedding-5', name: 'Traditional Wedding Dress 5', slug: 'wedding-5', price: 22500, image: '/images/products/traditional-wedding/wedding5.jpg' },
      { id: 'wedding-6', name: 'Traditional Wedding Dress 6', slug: 'wedding-6', price: 23500, image: '/images/products/traditional-wedding/wedding6.jpg' },
    ],
  },
  
};

export default function CategoryPage() {
  const params = useParams();
  const slug = params.slug as string;
  const data = categoryData[slug];

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Category Not Found</h1>
          <Link href="/" className="text-[#2C5326] hover:underline">
            Return to Homepage
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white py-12 px-6 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <Link 
          href="/"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-[#2C5326] mb-8 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Categories
        </Link>

        <h1 className="text-4xl md:text-5xl font-semibold text-gray-900 mb-4">
          {data.name}
        </h1>
        <p className="text-lg text-gray-600 mb-12">
          {data.products.length} items available
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {data.products.map((product, idx) => (
            <article 
              key={product.id} 
              className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
            >
              <Link href={`/products/${product.slug}`}>
                <div className="relative h-72 bg-gray-100 overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
              </Link>
              <div className="p-5">
                <Link href={`/products/${product.slug}`}>
                  <h3 className="font-semibold text-lg mb-3 line-clamp-2 group-hover:text-[#2C5326] transition-colors">
                    {product.name}
                  </h3>
                </Link>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-semibold text-[#2C5326]">
                    KSh {product.price.toLocaleString()}
                  </span>
                  <button className="bg-[#2C5326] text-white p-3 rounded-full hover:bg-[#234219] transition-all hover:scale-110 transform">
                    <ShoppingBag className="w-5 h-5" />
                  </button>
                </div>
                <a
                  href={`https://wa.me/254712345678?text=Hello%20Lamafrican!%20I%20want%20to%20order:%20${encodeURIComponent(product.name)}%20for%20KSh%20${product.price.toLocaleString()}`}
                  target="_blank"
                  className="block w-full bg-green-500 text-white text-center py-2.5 rounded-full hover:bg-green-600 transition-all text-sm font-medium"
                >
                  Order via WhatsApp
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/discovery_engine';

const User = require('../models/User');
const Product = require('../models/Product');
const Category = require('../models/Category');
const Order = require('../models/Order');

function imgUrl(text) {
  return `https://placehold.co/600x600/1a1a2e/ffffff?text=${encodeURIComponent(text)}`;
}

function slug(name) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

const categoriesData = [
  { name: 'Electronics', slug: 'electronics', description: 'Gadgets, devices and tech accessories', image: imgUrl('Electronics') },
  { name: 'Fashion', slug: 'fashion', description: 'Clothing, shoes and accessories', image: imgUrl('Fashion') },
  { name: 'Home & Kitchen', slug: 'home-kitchen', description: 'Appliances, cookware and home essentials', image: imgUrl('Home+%26+Kitchen') },
  { name: 'Sports & Outdoors', slug: 'sports-outdoors', description: 'Fitness equipment and outdoor gear', image: imgUrl('Sports') },
  { name: 'Books', slug: 'books', description: 'Physical and digital books', image: imgUrl('Books') },
  { name: 'Beauty & Personal Care', slug: 'beauty-personal-care', description: 'Skincare, haircare and grooming products', image: imgUrl('Beauty') },
  { name: 'Toys', slug: 'toys', description: 'Toys, games and collectibles', image: imgUrl('Toys') },
  { name: 'Grocery', slug: 'grocery', description: 'Food, beverages and pantry staples', image: imgUrl('Grocery') },
];

const productsData = [
  // Electronics
  {
    title: 'Sony WH-1000XM5 Headphones',
    description: 'Industry-leading noise cancellation with Auto NC Optimizer. Crystal-clear hands-free calling with 4 beamforming microphones. Up to 30 hours of battery life with quick charging.',
    brand: 'Sony', category: 'Electronics', subcategory: 'Headphones',
    price: 348.00, originalPrice: 399.99, discount: 13,
    images: [imgUrl('Sony+WH-1000XM5'), imgUrl('Sony+WH-1000XM5+Side')],
    colors: ['Black', 'Silver', 'Midnight Blue'], sizes: [],
    rating: 4.8, numReviews: 2847, countInStock: 45,
    tags: ['wireless', 'noise-cancelling', 'bluetooth', 'premium'],
    views: 15230, purchases: 1842,
  },
  {
    title: 'Apple MacBook Pro 14-inch M3',
    description: 'Supercharged by M3 chip. Stunning Liquid Retina XDR display. Up to 18 hours of battery life. 1080p FaceTime HD camera. Six-speaker sound system with Spatial Audio.',
    brand: 'Apple', category: 'Electronics', subcategory: 'Laptops',
    price: 1999.99, originalPrice: 2199.99, discount: 9,
    images: [imgUrl('MacBook+Pro+14'), imgUrl('MacBook+Pro+14+Open')],
    colors: ['Space Black', 'Silver'], sizes: [],
    rating: 4.9, numReviews: 1523, countInStock: 12,
    tags: ['laptop', 'apple', 'm3', 'professional'],
    views: 22100, purchases: 890,
  },
  {
    title: 'Samsung Galaxy S24 Ultra',
    description: 'Galaxy AI is here. Search like never before with Circle to Search. Translate calls in real-time. 200MP camera with AI-powered photo editing. Titanium frame with Corning Gorilla Armor.',
    brand: 'Samsung', category: 'Electronics', subcategory: 'Smartphones',
    price: 1299.99, originalPrice: 1419.99, discount: 8,
    images: [imgUrl('Galaxy+S24+Ultra'), imgUrl('Galaxy+S24+Ultra+Back')],
    colors: ['Titanium Black', 'Titanium Gray', 'Titanium Violet'], sizes: ['256GB', '512GB', '1TB'],
    rating: 4.7, numReviews: 3421, countInStock: 28,
    tags: ['smartphone', 'samsung', 'galaxy', 'ai'],
    views: 31500, purchases: 2105,
  },
  {
    title: 'Logitech MX Master 3S Mouse',
    description: 'Quiet clicks and ultra-fast scrolling with MagSpeed electromagnetic scroll wheel. 8K DPI tracking on any surface including glass. Connect up to 3 devices with Flow cross-computer control.',
    brand: 'Logitech', category: 'Electronics', subcategory: 'Mice',
    price: 99.99, originalPrice: 119.99, discount: 17,
    images: [imgUrl('MX+Master+3S'), imgUrl('MX+Master+3S+Side')],
    colors: ['Graphite', 'Pale Gray', 'Rose'], sizes: [],
    rating: 4.7, numReviews: 4521, countInStock: 89,
    tags: ['mouse', 'wireless', 'ergonomic', 'productivity'],
    views: 12400, purchases: 3201,
  },
  {
    title: 'iPad Air M2 11-inch',
    description: 'M2 chip delivers blazing-fast performance. 11-inch Liquid Retina display with P3 wide color. Supports Apple Pencil Pro. 12MP front and back cameras. Touch ID for secure authentication.',
    brand: 'Apple', category: 'Electronics', subcategory: 'Tablets',
    price: 599.00, originalPrice: 649.00, discount: 8,
    images: [imgUrl('iPad+Air+M2'), imgUrl('iPad+Air+M2+Back')],
    colors: ['Space Gray', 'Blue', 'Purple', 'Starlight'], sizes: ['64GB', '256GB', '512GB', '1TB'],
    rating: 4.8, numReviews: 1876, countInStock: 34,
    tags: ['tablet', 'apple', 'ipad', 'm2'],
    views: 18900, purchases: 1245,
  },
  {
    title: 'Apple AirPods Pro 2nd Gen',
    description: 'Active Noise Cancellation reduces unwanted background noise. Adaptive Transparency lets outside sounds in. Personalized Spatial Audio with dynamic head tracking. Up to 6 hours of listening time.',
    brand: 'Apple', category: 'Electronics', subcategory: 'Earbuds',
    price: 249.99, originalPrice: 279.99, discount: 11,
    images: [imgUrl('AirPods+Pro+2'), imgUrl('AirPods+Pro+2+Case')],
    colors: ['White'], sizes: [],
    rating: 4.7, numReviews: 8923, countInStock: 120,
    tags: ['earbuds', 'wireless', 'apple', 'noise-cancelling'],
    views: 28700, purchases: 5430,
  },
  {
    title: 'Dell UltraSharp 27 4K USB-C Hub Monitor',
    description: '27-inch 4K UHD IPS panel with 99% sRGB and 95% DCI-P3 color coverage. Built-in USB-C hub with 90W power delivery. VESA DisplayHDR 400. Height, tilt, swivel and pivot adjustable.',
    brand: 'Dell', category: 'Electronics', subcategory: 'Monitors',
    price: 619.99, originalPrice: 749.99, discount: 17,
    images: [imgUrl('Dell+UltraSharp+27'), imgUrl('Dell+UltraSharp+27+Side')],
    colors: ['Silver'], sizes: [],
    rating: 4.6, numReviews: 892, countInStock: 18,
    tags: ['monitor', '4k', 'usb-c', 'professional'],
    views: 7800, purchases: 534,
  },
  {
    title: 'JBL Flip 6 Portable Bluetooth Speaker',
    description: 'Powerful JBL Pro Sound with optimized dual bass radiators. IP67 waterproof and dustproof. 12 hours of playtime. PartyBoost for linking multiple speakers. Bold design in vibrant colors.',
    brand: 'JBL', category: 'Electronics', subcategory: 'Speakers',
    price: 129.95, originalPrice: 149.95, discount: 13,
    images: [imgUrl('JBL+Flip+6'), imgUrl('JBL+Flip+6+Colors')],
    colors: ['Black', 'Blue', 'Red', 'Pink', 'Green', 'White', 'Gray'], sizes: [],
    rating: 4.6, numReviews: 6234, countInStock: 67,
    tags: ['speaker', 'bluetooth', 'waterproof', 'portable'],
    views: 9800, purchases: 2890,
  },
  // Fashion
  {
    title: 'Nike Air Max 270 Running Shoes',
    description: 'The Nike Air Max 270 features the tallest Max Air unit yet for unmatched comfort. Engineered mesh upper provides breathability. Foam midsole delivers lightweight cushioning.',
    brand: 'Nike', category: 'Fashion', subcategory: 'Shoes',
    price: 89.99, originalPrice: 150.00, discount: 40,
    images: [imgUrl('Nike+Air+Max+270'), imgUrl('Nike+Air+Max+270+Side')],
    colors: ['Black/White', 'White/Blue', 'Red/Black', 'Gray'], sizes: ['7', '8', '9', '10', '11', '12'],
    rating: 4.5, numReviews: 12340, countInStock: 156,
    tags: ['running', 'shoes', 'nike', 'air-max'],
    views: 34200, purchases: 8765,
  },
  {
    title: 'Adidas Ultraboost 23 Running Shoes',
    description: 'Responsive BOOST midsole returns energy with every stride. PRIMESH upper hugs the foot for a sock-like fit. Continental rubber outsole provides superior traction on any surface.',
    brand: 'Adidas', category: 'Fashion', subcategory: 'Shoes',
    price: 189.99, originalPrice: 200.00, discount: 5,
    images: [imgUrl('Adidas+Ultraboost+23'), imgUrl('Adidas+Ultraboost+23+Side')],
    colors: ['Black', 'White', 'Core Black', 'Cloud White'], sizes: ['7', '8', '9', '10', '11', '12', '13'],
    rating: 4.5, numReviews: 5670, countInStock: 78,
    tags: ['running', 'shoes', 'adidas', 'boost'],
    views: 19800, purchases: 4320,
  },
  {
    title: "Levi's 501 Original Fit Jeans",
    description: "The original straight-leg jean since 1873. Button fly. Iconic red Tab. Signature leather patch. 100% cotton denim that gets better with age. Available in multiple washes.",
    brand: "Levi's", category: 'Fashion', subcategory: 'Jeans',
    price: 59.99, originalPrice: 69.50, discount: 14,
    images: [imgUrl("Levi's+501"), imgUrl("Levi's+501+Folded")],
    colors: ['Medium Stonewash', 'Dark Indigo', 'Black', 'Light Wash'], sizes: ['28x30', '30x30', '32x32', '34x32', '36x34', '38x34'],
    rating: 4.4, numReviews: 18920, countInStock: 234,
    tags: ['jeans', 'denim', 'levis', 'classic'],
    views: 27600, purchases: 11230,
  },
  {
    title: 'Ralph Lauren Classic Fit Polo Shirt',
    description: 'Iconic Ralph Lauren polo in breathable cotton mesh. Classic fit with a ribbed collar and two-button placket. Signature embroidered pony on the chest. Machine washable.',
    brand: 'Ralph Lauren', category: 'Fashion', subcategory: 'Shirts',
    price: 98.50, originalPrice: 110.00, discount: 10,
    images: [imgUrl('RL+Polo+Shirt'), imgUrl('RL+Polo+Shirt+Back')],
    colors: ['White', 'Navy', 'Red', 'Light Blue', 'Black'], sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    rating: 4.4, numReviews: 7650, countInStock: 145,
    tags: ['polo', 'ralph-lauren', 'cotton', 'classic'],
    views: 16400, purchases: 5670,
  },
  {
    title: 'Ray-Ban Aviator Classic Sunglasses',
    description: 'Iconic teardrop-shaped lenses with lightweight metal frames. 100% UV protection. Green crystal lenses with gold-tone frames. Includes protective case and cleaning cloth.',
    brand: 'Ray-Ban', category: 'Fashion', subcategory: 'Sunglasses',
    price: 158.00, originalPrice: 173.00, discount: 9,
    images: [imgUrl('RayBan+Aviator'), imgUrl('RayBan+Aviator+Case')],
    colors: ['Gold/Green', 'Silver/Blue', 'Gunmetal/Black'], sizes: ['55mm', '58mm', '62mm'],
    rating: 4.3, numReviews: 9870, countInStock: 89,
    tags: ['sunglasses', 'ray-ban', 'aviator', 'classic'],
    views: 21300, purchases: 6540,
  },
  {
    title: 'Nike Dri-FIT Training T-Shirt',
    description: 'Nike Dry technology moves sweat away from your skin for quicker evaporation. Standard fit for a relaxed, easy feel. Short sleeves. Crew neck. Logo graphic on the left chest.',
    brand: 'Nike', category: 'Fashion', subcategory: 'T-Shirts',
    price: 35.00, originalPrice: 40.00, discount: 13,
    images: [imgUrl('Nike+DriFIT'), imgUrl('Nike+DriFIT+Back')],
    colors: ['Black', 'White', 'Gray', 'Navy', 'Red'], sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    rating: 4.4, numReviews: 15670, countInStock: 312,
    tags: ['t-shirt', 'nike', 'dri-fit', 'training'],
    views: 18900, purchases: 9870,
  },
  {
    title: 'Puma RS-X Sneakers',
    description: 'Chunky retro-inspired silhouette with RS foam cushioning for ultimate comfort. Mesh and synthetic upper. Rubber outsole for durability. Bold colorways and oversized branding.',
    brand: 'Puma', category: 'Fashion', subcategory: 'Shoes',
    price: 110.00, originalPrice: 130.00, discount: 15,
    images: [imgUrl('Puma+RSX'), imgUrl('Puma+RSX+Side')],
    colors: ['White/Blue/Red', 'Black/Gray', 'White/Peach'], sizes: ['7', '8', '9', '10', '11', '12'],
    rating: 4.3, numReviews: 3450, countInStock: 67,
    tags: ['sneakers', 'puma', 'retro', 'chunky'],
    views: 8700, purchases: 2340,
  },
  // Home & Kitchen
  {
    title: 'Dyson V15 Detect Absolute Vacuum',
    description: 'Laser reveals microscopic dust. LCD screen shows scientific proof of a deep clean. Automatically adapts suction power. HEPA whole-machine filtration traps 99.99% of particles.',
    brand: 'Dyson', category: 'Home & Kitchen', subcategory: 'Vacuums',
    price: 749.99, originalPrice: 849.99, discount: 12,
    images: [imgUrl('Dyson+V15+Detect'), imgUrl('Dyson+V15+Detect+Head')],
    colors: ['Gold/Nickel', 'Yellow/Nickel'], sizes: [],
    rating: 4.7, numReviews: 2340, countInStock: 15,
    tags: ['vacuum', 'dyson', 'cordless', 'laser'],
    views: 14500, purchases: 980,
  },
  {
    title: 'Instant Pot Duo 7-in-1 Electric Pressure Cooker',
    description: '7-in-1 functionality: pressure cooker, slow cooker, rice cooker, steamer, saut pan, food warmer and yogurt maker. 13 customizable Smart Programs. Stainless steel inner pot.',
    brand: 'Instant Pot', category: 'Home & Kitchen', subcategory: 'Cookware',
    price: 89.95, originalPrice: 119.99, discount: 25,
    images: [imgUrl('Instant+Pot+Duo'), imgUrl('Instant+Pot+Duo+Open')],
    colors: ['Stainless Steel/Black'], sizes: ['3 Quart', '6 Quart', '8 Quart'],
    rating: 4.7, numReviews: 34560, countInStock: 89,
    tags: ['pressure-cooker', 'instant-pot', '7-in-1', 'kitchen'],
    views: 26700, purchases: 18900,
  },
  {
    title: 'Nespresso Vertuo Coffee Maker',
    description: 'Centrifusion brewing technology delivers perfect coffee and espresso at the touch of a button. 5 cup sizes from espresso to alto. Adjustable cup support. 30-second heat-up time.',
    brand: 'Nespresso', category: 'Home & Kitchen', subcategory: 'Coffee Makers',
    price: 219.00, originalPrice: 249.00, discount: 12,
    images: [imgUrl('Nespresso+Vertuo'), imgUrl('Nespresso+Vertuo+Capsules')],
    colors: ['Graphite Metal', 'Chrome', 'Black'], sizes: [],
    rating: 4.5, numReviews: 4560, countInStock: 45,
    tags: ['coffee', 'nespresso', 'espresso', 'machine'],
    views: 11200, purchases: 3450,
  },
  {
    title: 'Philips Hue White & Color Ambiance Starter Kit',
    description: 'Includes 4 A19 smart bulbs and Hue Bridge. 16 million colors and shades of white light. Control with voice or app. Set schedules and routines. Requires Hue Bridge for full functionality.',
    brand: 'Philips', category: 'Home & Kitchen', subcategory: 'Smart Home',
    price: 179.99, originalPrice: 209.99, discount: 14,
    images: [imgUrl('Philips+Hue+Kit'), imgUrl('Philips+Hue+Kit+Bulbs')],
    colors: ['White/Color Ambiance'], sizes: [],
    rating: 4.6, numReviews: 8760, countInStock: 56,
    tags: ['smart-home', 'philips-hue', 'lighting', 'led'],
    views: 13400, purchases: 4560,
  },
  {
    title: 'iRobot Roomba j7+ Robot Vacuum',
    description: 'PrecisionVision Navigation avoids obstacles like cords and pet waste. Self-emptying for up to 60 days. Smart mapping learns your home. Works with Alexa and Google Assistant.',
    brand: 'iRobot', category: 'Home & Kitchen', subcategory: 'Vacuums',
    price: 599.99, originalPrice: 799.99, discount: 25,
    images: [imgUrl('Roomba+j7+'), imgUrl('Roomba+j7++Base')],
    colors: ['Black'], sizes: [],
    rating: 4.5, numReviews: 3450, countInStock: 23,
    tags: ['robot-vacuum', 'irobot', 'smart', 'self-emptying'],
    views: 16700, purchases: 2340,
  },
  // Sports & Outdoors
  {
    title: 'Manduka PRO Yoga Mat 6mm',
    description: 'Dense cushioning for joint protection. Closed-cell surface keeps moisture out. Lifetime guarantee. Oeko-Tex certified free from harmful substances. Non-slip grip even when wet.',
    brand: 'Manduka', category: 'Sports & Outdoors', subcategory: 'Yoga',
    price: 80.00, originalPrice: 120.00, discount: 33,
    images: [imgUrl('Manduka+Yoga+Mat'), imgUrl('Manduka+Yoga+Mat+Rolled')],
    colors: ['Black', 'Sage', 'Midnight', 'Thunder'], sizes: ['71 inch', '85 inch'],
    rating: 4.4, numReviews: 5670, countInStock: 78,
    tags: ['yoga', 'mat', 'manduka', 'fitness'],
    views: 8900, purchases: 3450,
  },
  {
    title: 'Bowflex SelectTech 552 Adjustable Dumbbells',
    description: 'Replace 15 sets of weights. Adjusts from 5 to 52.5 pounds. Dial system for quick weight changes. Durable molding around metal plates. Sold as a pair.',
    brand: 'Bowflex', category: 'Sports & Outdoors', subcategory: 'Weights',
    price: 349.99, originalPrice: 429.99, discount: 19,
    images: [imgUrl('Bowflex+Dumbbells'), imgUrl('Bowflex+Dumbbells+Stand')],
    colors: ['Black/Red'], sizes: [],
    rating: 4.6, numReviews: 8920, countInStock: 34,
    tags: ['dumbbells', 'adjustable', 'bowflex', 'home-gym'],
    views: 12300, purchases: 4560,
  },
  {
    title: 'Fitbit Charge 6 Advanced Fitness Tracker',
    description: 'Built-in GPS, heart rate monitoring, SpO2 tracking. 7-day battery life. Google apps built in. Active Zone Minutes and Daily Readiness Score. Water resistant to 50 meters.',
    brand: 'Fitbit', category: 'Sports & Outdoors', subcategory: 'Wearables',
    price: 159.95, originalPrice: 179.95, discount: 11,
    images: [imgUrl('Fitbit+Charge+6'), imgUrl('Fitbit+Charge+6+Band')],
    colors: ['Black', 'Porcelain', 'Coral'], sizes: ['S', 'L'],
    rating: 4.3, numReviews: 6780, countInStock: 89,
    tags: ['fitness-tracker', 'fitbit', 'wearable', 'health'],
    views: 15600, purchases: 5670,
  },
  {
    title: 'Wilson Pro Staff 97 V14 Tennis Racket',
    description: '16x19 string pattern for excellent spin potential. 315g unstrung weight. Perimeter weighting system for added stability. Braided Graphite construction for pure, connected feel.',
    brand: 'Wilson', category: 'Sports & Outdoors', subcategory: 'Tennis',
    price: 229.00, originalPrice: 249.00, discount: 8,
    images: [imgUrl('Wilson+Pro+Staff'), imgUrl('Wilson+Pro+Staff+Head')],
    colors: ['Black/Red'], sizes: ['Grip 2', 'Grip 3', 'Grip 4'],
    rating: 4.5, numReviews: 1230, countInStock: 28,
    tags: ['tennis', 'racket', 'wilson', 'pro-staff'],
    views: 5600, purchases: 890,
  },
  {
    title: 'Hydro Flask 32 oz Wide Mouth Water Bottle',
    description: 'TempShield double-wall vacuum insulation keeps drinks cold up to 24 hours or hot up to 12 hours. 18/8 pro-grade stainless steel. BPA-free. Wide mouth for easy filling and cleaning.',
    brand: 'Hydro Flask', category: 'Sports & Outdoors', subcategory: 'Hydration',
    price: 44.95, originalPrice: 49.95, discount: 10,
    images: [imgUrl('Hydro+Flask+32'), imgUrl('Hydro+Flask+32+Colors')],
    colors: ['Black', 'Pacific', 'Honey', 'Alpine', 'Stone'], sizes: ['32 oz', '40 oz'],
    rating: 4.7, numReviews: 12340, countInStock: 156,
    tags: ['water-bottle', 'hydro-flask', 'insulated', 'stainless'],
    views: 18900, purchases: 8760,
  },
  // Books
  {
    title: 'Atomic Habits by James Clear',
    description: 'Tiny changes, remarkable results. Learn how to build good habits and break bad ones. Practical strategies backed by science. #1 New York Times Bestseller with over 10 million copies sold.',
    brand: 'Penguin Random House', category: 'Books', subcategory: 'Self-Help',
    price: 16.99, originalPrice: 27.00, discount: 37,
    images: [imgUrl('Atomic+Habits'), imgUrl('Atomic+Habits+Back')],
    colors: [], sizes: ['Hardcover', 'Paperback', 'Kindle'],
    rating: 4.8, numReviews: 45670, countInStock: 234,
    tags: ['self-help', 'habits', 'bestseller', 'productivity'],
    views: 34500, purchases: 23400,
  },
  {
    title: 'Deep Learning by Ian Goodfellow, Yoshua Bengio and Aaron Courville',
    description: 'The definitive textbook on deep learning. Covers mathematical and conceptual background, deep learning techniques, and research perspectives. Ideal for graduate students and practitioners.',
    brand: 'MIT Press', category: 'Books', subcategory: 'Technology',
    price: 72.99, originalPrice: 89.99, discount: 19,
    images: [imgUrl('Deep+Learning+Book'), imgUrl('Deep+Learning+Book+Pages')],
    colors: [], sizes: ['Hardcover', 'Paperback'],
    rating: 4.5, numReviews: 2340, countInStock: 45,
    tags: ['textbook', 'deep-learning', 'AI', 'machine-learning'],
    views: 8900, purchases: 1230,
  },
  {
    title: 'The Pragmatic Programmer by David Thomas and Andrew Hunt',
    description: 'Your journey to mastery. A guide to becoming a better programmer through practical advice, real-world examples, and timeless wisdom. Updated 20th Anniversary Edition.',
    brand: 'Addison-Wesley', category: 'Books', subcategory: 'Technology',
    price: 49.99, originalPrice: 59.99, discount: 17,
    images: [imgUrl('Pragmatic+Programmer'), imgUrl('Pragmatic+Programmer+Pages')],
    colors: [], sizes: ['Paperback', 'eBook'],
    rating: 4.7, numReviews: 3450, countInStock: 67,
    tags: ['programming', 'software-engineering', 'classic', 'career'],
    views: 7800, purchases: 2340,
  },
  {
    title: 'Thinking, Fast and Slow by Daniel Kahneman',
    description: 'Nobel laureate reveals how two systems drive the way we think. System 1 is fast, intuitive and emotional. System 2 is slower, more deliberative and logical. A groundbreaking tour of the mind.',
    brand: 'Farrar, Straus and Giroux', category: 'Books', subcategory: 'Psychology',
    price: 14.99, originalPrice: 19.00, discount: 21,
    images: [imgUrl('Thinking+Fast+Slow'), imgUrl('Thinking+Fast+Slow+Back')],
    colors: [], sizes: ['Paperback', 'Hardcover', 'Kindle'],
    rating: 4.6, numReviews: 23450, countInStock: 189,
    tags: ['psychology', 'economics', 'nobel', 'decision-making'],
    views: 19800, purchases: 12340,
  },
  // Beauty & Personal Care
  {
    title: 'Olaplex No. 3 Hair Perfector',
    description: 'At-home hair treatment that reduces breakage and strengthens damaged hair. Works on all hair types. Use before shampooing. Builds bonds within the hair shaft for healthier, stronger hair.',
    brand: 'Olaplex', category: 'Beauty & Personal Care', subcategory: 'Hair Care',
    price: 30.00, originalPrice: 38.00, discount: 21,
    images: [imgUrl('Olaplex+No3'), imgUrl('Olaplex+No3+Texture')],
    colors: [], sizes: ['3.3 oz', '8.5 oz'],
    rating: 4.6, numReviews: 8920, countInStock: 145,
    tags: ['hair-care', 'olaplex', 'treatment', 'damaged-hair'],
    views: 16700, purchases: 6780,
  },
  {
    title: 'CeraVe Moisturizing Cream 16 oz',
    description: 'Developed with dermatologists. 3 essential ceramides restore and maintain skin barrier. MVE Technology provides 24-hour hydration. Fragrance-free and non-comedogenic.',
    brand: 'CeraVe', category: 'Beauty & Personal Care', subcategory: 'Skin Care',
    price: 18.99, originalPrice: 22.99, discount: 17,
    images: [imgUrl('CeraVe+Cream'), imgUrl('CeraVe+Cream+Open')],
    colors: [], sizes: ['12 oz', '16 oz', '19 oz'],
    rating: 4.7, numReviews: 34560, countInStock: 234,
    tags: ['moisturizer', 'cerave', 'dermatologist', 'sensitive-skin'],
    views: 28900, purchases: 18900,
  },
  {
    title: 'The Ordinary Niacinamide 10% + Zinc 1% Serum',
    description: 'Reduces the appearance of blemishes and congestion. High-strength vitamin and mineral blemish formula. Niacinamide reduces sebum production while zinc balances visible aspects of skin health.',
    brand: 'The Ordinary', category: 'Beauty & Personal Care', subcategory: 'Skin Care',
    price: 11.90, originalPrice: 14.90, discount: 20,
    images: [imgUrl('Ordinary+Niacinamide'), imgUrl('Ordinary+Niacinamide+Drop')],
    colors: [], sizes: ['1 oz', '2 oz'],
    rating: 4.5, numReviews: 12340, countInStock: 189,
    tags: ['serum', 'the-ordinary', 'niacinamide', 'acne'],
    views: 19800, purchases: 8900,
  },
  {
    title: 'Dyson Airwrap Multi-Styler Complete',
    description: 'Uses the Coanda effect to curl, wave, smooth and dry with no extreme heat. Includes multiple attachments for different hair types and styles. Intelligent heat control measures air temperature 40 times per second.',
    brand: 'Dyson', category: 'Beauty & Personal Care', subcategory: 'Hair Tools',
    price: 599.99, originalPrice: 649.99, discount: 8,
    images: [imgUrl('Dyson+Airwrap'), imgUrl('Dyson+Airwrap+Attachments')],
    colors: ['Nickel/Copper', 'Black/Nickel'], sizes: [],
    rating: 4.4, numReviews: 3450, countInStock: 12,
    tags: ['hair-styler', 'dyson', 'airwrap', 'premium'],
    views: 22100, purchases: 1230,
  },
];

async function seed() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGO_URI);
    console.log('MongoDB connected successfully.\n');

    // Clear all collections
    console.log('Clearing existing data...');
    await User.deleteMany({});
    await Product.deleteMany({});
    await Category.deleteMany({});
    await Order.deleteMany({});
    console.log('All collections cleared.\n');

    // Create admin user
    console.log('Creating admin user...');
    const admin = await User.create({
      name: 'Admin',
      email: 'admin@discoverai.com',
      password: 'admin123',
      role: 'admin',
      phone: '+1-555-0100',
      address: { street: '123 Admin Blvd', city: 'San Francisco', state: 'CA', zip: '94102', country: 'US' },
    });
    console.log('  Admin user created: admin@discoverai.com');

    // Create demo user
    console.log('Creating demo user...');
    const demo = await User.create({
      name: 'Demo User',
      email: 'demo@discoverai.com',
      password: 'demo123',
      role: 'customer',
      phone: '+1-555-0200',
      address: { street: '456 Demo Ave', city: 'New York', state: 'NY', zip: '10001', country: 'US' },
      preferences: {
        categories: ['Electronics', 'Fashion'],
        brands: ['Nike', 'Apple', 'Sony'],
        sizes: ['M', 'L', '10'],
      },
    });
    console.log('  Demo user created: demo@discoverai.com\n');

    // Create categories
    console.log('Creating categories...');
    const categories = await Category.insertMany(categoriesData);
    console.log(`  ${categories.length} categories created.`);

    // Create products
    console.log('Creating products...');
    const products = await Product.insertMany(productsData);
    console.log(`  ${products.length} products created.\n`);

    // Create orders for demo user
    console.log('Creating sample orders...');
    const statuses = ['delivered', 'shipped', 'processing', 'confirmed'];
    const shippingAddresses = [
      { street: '456 Demo Ave', city: 'New York', state: 'NY', zip: '10001', country: 'US' },
      { street: '789 Test St', city: 'Brooklyn', state: 'NY', zip: '11201', country: 'US' },
    ];

    const ordersData = [];
    for (let i = 0; i < 5; i++) {
      const numItems = Math.floor(Math.random() * 3) + 1;
      const selectedProducts = [];
      const usedIndices = new Set();
      for (let j = 0; j < numItems; j++) {
        let idx;
        do { idx = Math.floor(Math.random() * products.length); } while (usedIndices.has(idx));
        usedIndices.add(idx);
        const p = products[idx];
        const qty = Math.floor(Math.random() * 2) + 1;
        selectedProducts.push({
          product: p._id,
          title: p.title,
          thumbnail: p.images[0],
          price: p.price,
          quantity: qty,
          subtotal: p.price * qty,
        });
      }
      const itemsPrice = selectedProducts.reduce((sum, it) => sum + it.subtotal, 0);
      const taxPrice = Math.round(itemsPrice * 0.08 * 100) / 100;
      const shippingPrice = itemsPrice > 100 ? 0 : 9.99;
      const status = statuses[i % statuses.length];
      const createdDate = new Date();
      createdDate.setDate(createdDate.getDate() - (10 - i * 2));

      ordersData.push({
        user: demo._id,
        items: selectedProducts,
        shippingAddress: shippingAddresses[i % shippingAddresses.length],
        paymentMethod: 'card',
        itemsPrice: Math.round(itemsPrice * 100) / 100,
        taxPrice,
        shippingPrice,
        totalPrice: Math.round((itemsPrice + taxPrice + shippingPrice) * 100) / 100,
        status,
        paidAt: createdDate,
        deliveredAt: status === 'delivered' ? new Date(createdDate.getTime() + 5 * 86400000) : undefined,
        trackingNumber: status === 'shipped' || status === 'delivered' ? `TRK${Date.now()}${i}` : undefined,
        createdAt: createdDate,
      });
    }

    await Order.insertMany(ordersData);
    console.log(`  ${ordersData.length} orders created for demo user.\n`);

    console.log('=== Seed Complete ===');
    console.log(`  Users:    2 (admin + demo)`);
    console.log(`  Categories: ${categories.length}`);
    console.log(`  Products: ${products.length}`);
    console.log(`  Orders:   ${ordersData.length}`);
    console.log('');
    console.log('Admin login:   admin@discoverai.com / admin123');
    console.log('Demo login:    demo@discoverai.com / demo123');
    console.log('');
    process.exit(0);
  } catch (error) {
    console.error('Seed failed:', error);
    process.exit(1);
  }
}

seed();

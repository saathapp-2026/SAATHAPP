import React, { useState } from 'react';
import { useParams, useNavigate, useLocation as useReactLocation } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ProductGrid from '../../components/saathapp-product/ProductGrid';
import ProductFilters from '../../components/saathapp-product/ProductFilters';
import { products, categories, subcategories, festivals } from '../../data/products';
import { mockSaathAppProducts } from '../../data/saathAppProducts';
import { MASTER_CATEGORIES, getCategoryByIdOrSlug, getDynamicProductCount } from '../../config/categoryConfig';
import {
  ChevronLeft, ChevronRight, Home, Leaf, Smartphone, Cross, Shirt, Package, Hammer, Wrench,
  BookOpen, Footprints, Gift, Sparkles, Sprout, HardHat, Car, Flame, ShoppingBag
} from 'lucide-react';
import { trackEvent } from '../../utils/analytics';
import normalGroceryImg from '../../assets/grocery/normal-grocery.jpg';
import premiumGroceryImg from '../../assets/grocery/premium-grocery.jpg';
import dairyBakeryImg from '../../assets/grocery/dairy-bakery.jpg';
import fruitsVegImg from '../../assets/grocery/fruits-veg.jpg';
import dealsImg from '../../assets/grocery/deals.jpg';
import meatChickenImg from '../../assets/grocery/meat-chicken.jpg';

const FASHION_SUBCATEGORY_CARDS = [
  { id: 't-shirts', name: 'T-Shirts', emoji: '👕', iconSrc: '/assets/fashion/tshirts-icon.png' },
  { id: 'shirts', name: 'Shirts', emoji: '👔', iconSrc: '/assets/fashion/shirts-icon.png' },
  { id: 'jeans-trousers', name: 'Jeans & Trousers', emoji: '👖', iconSrc: '/assets/fashion/jeans-icon.png' },
  { id: 'shorts-track-pants', name: 'Shorts & Track Pants', emoji: '🩳', iconSrc: '/assets/fashion/shorts-icon.png' },
  { id: 'dresses', name: 'Dresses', emoji: '👗', iconSrc: '/assets/fashion/dresses-icon.png' },
  { id: 'tops-tunics', name: 'Tops & Tunics', emoji: '👚', iconSrc: '/assets/fashion/tops-icon.png' },
  { id: 'sarees', name: 'Sarees', emoji: '🥻', iconSrc: '/assets/fashion/sarees-icon.png' },
  { id: 'kurtis-ethnic-wear', name: 'Kurtis & Ethnic Wear', emoji: '👘', iconSrc: '/assets/fashion/kurtis-icon.png' },
  { id: 'jackets-sweaters', name: 'Jackets & Sweaters', emoji: '🧥', iconSrc: '/assets/fashion/jackets-icon.png' },
  { id: 'childrens-wear', name: 'Children\'s Wear', emoji: '🧒', iconSrc: '/assets/fashion/childrens-icon.png' },
  { id: 'baby-wear', name: 'Baby Wear', emoji: '👶', iconSrc: '/assets/fashion/baby-icon.png' },
  { id: 'innerwear-sleepwear', name: 'Innerwear & Sleepwear', emoji: '🩱', iconSrc: '/assets/fashion/innerwear-icon.png' },
  { id: 'ethnic-traditional-wear', name: 'Ethnic & Traditional Wear', emoji: '🧣', iconSrc: '/assets/fashion/ethnic-icon.png' },
  { id: 'fashion-accessories', name: 'Fashion Accessories', emoji: '🧢', iconSrc: '/assets/fashion/accessories-icon.png' },
  { id: 'bags-wallets', name: 'Bags & Wallets', emoji: '👜', iconSrc: '/assets/fashion/bags-icon.png' },
  { id: 'jewellery-accessories', name: 'Jewellery & Accessories', emoji: '💍', iconSrc: '/assets/fashion/jewellery-icon.png' },
  { id: 'sunglasses', name: 'Sunglasses', emoji: '🕶️', iconSrc: '/assets/fashion/sunglasses-icon.png' },
  { id: 'socks-legwear', name: 'Socks & Legwear', emoji: '🧦', iconSrc: '/assets/fashion/socks-icon.png' },
  { id: 'womens-clothing', name: 'Women\'s Clothing', emoji: '👗', iconSrc: '/assets/fashion/womens-icon.png' },
  { id: 'mens-clothing', name: 'Men\'s Clothing', emoji: '👔', iconSrc: '/assets/fashion/mens-icon.png' },
];

const CONSTRUCTION_SUBCATEGORY_CARDS = [
  { id: 'cement', name: 'Cement', emoji: '🪨', iconSrc: '/assets/construction/cement-icon.png' },
  { id: 'bricks-blocks', name: 'Bricks & Blocks', emoji: '🧱', iconSrc: '/assets/construction/bricks-icon.png' },
  { id: 'steel-tmt', name: 'Steel & TMT Bars', emoji: '🔩', iconSrc: '/assets/construction/steel-icon.png' },
  { id: 'sand-aggregates', name: 'Sand & Aggregates', emoji: '🏖️', iconSrc: '/assets/construction/sand-icon.png' },
  { id: 'tiles-flooring', name: 'Tiles & Flooring', emoji: '🧱', iconSrc: '/assets/construction/tiles-icon.png' },
  { id: 'paints-finishes', name: 'Paints & Wall Finishes', emoji: '🎨', iconSrc: '/assets/construction/paints-icon.png' },
  { id: 'doors-windows', name: 'Doors & Windows', emoji: '🚪', iconSrc: '/assets/construction/doors-icon.png' },
  { id: 'construction-tools', name: 'Construction Tools & Equipment', emoji: '🔧', iconSrc: '/assets/construction/tools-icon.png' },
  { id: 'glass-glazing', name: 'Glass & Glazing', emoji: '🪟', iconSrc: '/assets/construction/glass-icon.png' },
  { id: 'ladders-scaffolding', name: 'Ladders & Scaffolding', emoji: '🪜', iconSrc: '/assets/construction/ladders-icon.png' },
  { id: 'safety-equipment', name: 'Safety Equipment', emoji: '🦺', iconSrc: '/assets/construction/safety-icon.png' },
  { id: 'plumbing-materials', name: 'Plumbing Materials', emoji: '💧', iconSrc: '/assets/construction/plumbing-icon.png' },
  { id: 'electrical-materials', name: 'Electrical Construction Materials', emoji: '⚡', iconSrc: '/assets/construction/electrical-icon.png' },
  { id: 'wood-boards', name: 'Wood & Boards', emoji: '🪵', iconSrc: '/assets/construction/wood-icon.png' },
  { id: 'roofing-materials', name: 'Roofing Materials', emoji: '🧱', iconSrc: '/assets/construction/roofing-icon.png' },
  { id: 'false-ceiling-interior', name: 'False Ceiling & Interior Materials', emoji: '🏠', iconSrc: '/assets/construction/ceiling-icon.png' },
  { id: 'adhesives-chemicals', name: 'Adhesives, Sealants & Chemicals', emoji: '🧴', iconSrc: '/assets/construction/adhesives-icon.png' },
  { id: 'fasteners-hardware', name: 'Nails, Screws & Fasteners', emoji: '🔨', iconSrc: '/assets/construction/fasteners-icon.png' },
  { id: 'sanitary-materials', name: 'Sanitary & Bathroom Materials', emoji: '🛁', iconSrc: '/assets/construction/sanitary-icon.png' },
  { id: 'construction-fittings', name: 'Construction Hardware & Fittings', emoji: '🏗️', iconSrc: '/assets/construction/fittings-icon.png' },
];

const AGRICULTURE_SUBCATEGORY_CARDS = [
  { id: 'seeds', name: 'Seeds', emoji: '🌱', iconSrc: '/assets/agriculture/seeds-icon.png' },
  { id: 'fertilizers', name: 'Fertilizers', emoji: '🌿', iconSrc: '/assets/agriculture/fertilizers-icon.png' },
  { id: 'pesticides-crop-protection', name: 'Pesticides & Crop Protection', emoji: '🧪', iconSrc: '/assets/agriculture/pesticides-icon.png' },
  { id: 'irrigation-drip-systems', name: 'Irrigation & Drip Systems', emoji: '💧', iconSrc: '/assets/agriculture/irrigation-icon.png' },
  { id: 'sprayers-spray-pumps', name: 'Sprayers & Spray Pumps', emoji: '🚿', iconSrc: '/assets/agriculture/sprayers-icon.png' },
  { id: 'farming-tools', name: 'Farming Tools', emoji: '🌾', iconSrc: '/assets/agriculture/farming-tools-icon.png' },
  { id: 'agricultural-machinery', name: 'Agricultural Machinery', emoji: '🚜', iconSrc: '/assets/agriculture/machinery-icon.png' },
  { id: 'nursery-gardening', name: 'Nursery & Gardening', emoji: '🪴', iconSrc: '/assets/agriculture/nursery-icon.png' },
  { id: 'plant-growth-products', name: 'Plant Growth Products', emoji: '🌱', iconSrc: '/assets/agriculture/plant-growth-icon.png' },
  { id: 'harvesting-post-harvest', name: 'Harvesting & Post-Harvest', emoji: '🧺', iconSrc: '/assets/agriculture/harvesting-icon.png' },
  { id: 'grains-crop-storage', name: 'Grains & Crop Storage', emoji: '🌾', iconSrc: '/assets/agriculture/storage-icon.png' },
  { id: 'agricultural-containers', name: 'Agricultural Containers', emoji: '🪣', iconSrc: '/assets/agriculture/containers-icon.png' },
  { id: 'animal-feed-cattle-care', name: 'Animal Feed & Cattle Care', emoji: '🐄', iconSrc: '/assets/agriculture/cattle-care-icon.png' },
  { id: 'poultry-farming-supplies', name: 'Poultry Farming Supplies', emoji: '🐔', iconSrc: '/assets/agriculture/poultry-icon.png' },
  { id: 'beekeeping-supplies', name: 'Beekeeping Supplies', emoji: '🐝', iconSrc: '/assets/agriculture/beekeeping-icon.png' },
  { id: 'organic-farming-products', name: 'Organic Farming Products', emoji: '🌱', iconSrc: '/assets/agriculture/organic-icon.png' },
  { id: 'farm-safety-equipment', name: 'Farm Safety Equipment', emoji: '🧤', iconSrc: '/assets/agriculture/safety-icon.png' },
  { id: 'agricultural-packaging', name: 'Agricultural Packaging', emoji: '📦', iconSrc: '/assets/agriculture/packaging-icon.png' },
  { id: 'farm-monitoring-equipment', name: 'Farm Monitoring & Equipment', emoji: '🌡️', iconSrc: '/assets/agriculture/monitoring-icon.png' },
  { id: 'agricultural-spare-parts', name: 'Agricultural Spare Parts', emoji: '🔧', iconSrc: '/assets/agriculture/spare-parts-icon.png' },
];

const HOUSEHOLD_SUBCATEGORY_CARDS = [
  { id: 'buckets-tubs', name: 'Buckets & Tubs', emoji: '🪣', iconSrc: '/assets/household/buckets-icon.png' },
  { id: 'mugs-water-containers', name: 'Mugs & Water Containers', emoji: '🥤', iconSrc: '/assets/household/mugs-icon.png' },
  { id: 'brooms-sweepers', name: 'Brooms & Sweepers', emoji: '🧹', iconSrc: '/assets/household/brooms-icon.png' },
  { id: 'mops-floor-cleaners', name: 'Mops & Floor Cleaners', emoji: '🧽', iconSrc: '/assets/household/mops-icon.png' },
  { id: 'dustbins-waste-bins', name: 'Dustbins & Waste Bins', emoji: '🗑️', iconSrc: '/assets/household/dustbins-icon.png' },
  { id: 'floor-toilet-cleaners', name: 'Floor & Toilet Cleaners', emoji: '🧴', iconSrc: '/assets/household/floor-cleaners-icon.png' },
  { id: 'detergents-laundry', name: 'Detergents & Laundry', emoji: '🧼', iconSrc: '/assets/household/detergents-icon.png' },
  { id: 'cleaning-supplies', name: 'Cleaning Supplies', emoji: '🧽', iconSrc: '/assets/household/cleaning-supplies-icon.png' },
  { id: 'bathroom-essentials', name: 'Bathroom Essentials', emoji: '🪥', iconSrc: '/assets/household/bathroom-icon.png' },
  { id: 'storage-organizers', name: 'Storage & Organizers', emoji: '🧺', iconSrc: '/assets/household/storage-icon.png' },
  { id: 'kitchen-utility', name: 'Kitchen Utility', emoji: '🍽️', iconSrc: '/assets/household/kitchen-utility-icon.png' },
  { id: 'containers-jars', name: 'Containers & Jars', emoji: '🥣', iconSrc: '/assets/household/containers-icon.png' },
  { id: 'brushes-scrubbers', name: 'Brushes & Scrubbers', emoji: '🧹', iconSrc: '/assets/household/brushes-icon.png' },
  { id: 'tissues-paper', name: 'Tissues & Household Paper', emoji: '🧻', iconSrc: '/assets/household/tissues-icon.png' },
  { id: 'glass-surface-cleaners', name: 'Glass & Surface Cleaners', emoji: '🪟', iconSrc: '/assets/household/glass-cleaners-icon.png' },
  { id: 'cleaning-gloves-safety', name: 'Cleaning Gloves & Safety', emoji: '🧤', iconSrc: '/assets/household/gloves-icon.png' },
  { id: 'laundry-baskets', name: 'Laundry Baskets & Hampers', emoji: '🧺', iconSrc: '/assets/household/laundry-baskets-icon.png' },
  { id: 'hangers-cloth-drying', name: 'Hangers & Cloth Drying', emoji: '🪢', iconSrc: '/assets/household/hangers-icon.png' },
  { id: 'home-linen', name: 'Home Linen', emoji: '🛏️', iconSrc: '/assets/household/home-linen-icon.png' },
  { id: 'home-utility-essentials', name: 'Home Utility & Essentials', emoji: '🕯️', iconSrc: '/assets/household/utility-essentials-icon.png' },
];

const FOOTWEAR_SUBCATEGORY_CARDS = [
  { id: 'sports-shoes', name: 'Sports Shoes', emoji: '👟', iconSrc: '/assets/footwear/sports-shoes-icon.png' },
  { id: 'running-shoes', name: 'Running Shoes', emoji: '🏃', iconSrc: '/assets/footwear/running-shoes-icon.png' },
  { id: 'formal-shoes', name: 'Formal Shoes', emoji: '👞', iconSrc: '/assets/footwear/formal-shoes-icon.png' },
  { id: 'casual-shoes', name: 'Casual Shoes', emoji: '👟', iconSrc: '/assets/footwear/casual-shoes-icon.png' },
  { id: 'slippers', name: 'Slippers', emoji: '🩴', iconSrc: '/assets/footwear/slippers-icon.png' },
  { id: 'sandals', name: 'Sandals', emoji: '👡', iconSrc: '/assets/footwear/sandals-icon.png' },
  { id: 'sneakers', name: 'Sneakers', emoji: '👟', iconSrc: '/assets/footwear/sneakers-icon.png' },
  { id: 'kids-footwear', name: 'Kids Footwear', emoji: '🧒', iconSrc: '/assets/footwear/kids-footwear-icon.png' },
  { id: 'boots', name: 'Boots', emoji: '🥾', iconSrc: '/assets/footwear/boots-icon.png' },
  { id: 'flip-flops', name: 'Flip-Flops', emoji: '🩴', iconSrc: '/assets/footwear/flip-flops-icon.png' },
  { id: 'heels', name: 'Heels', emoji: '👠', iconSrc: '/assets/footwear/heels-icon.png' },
  { id: 'flats', name: 'Flats', emoji: '🥿', iconSrc: '/assets/footwear/flats-icon.png' },
  { id: 'loafers', name: 'Loafers', emoji: '👞', iconSrc: '/assets/footwear/loafers-icon.png' },
  { id: 'baby-footwear', name: 'Baby Footwear', emoji: '👶', iconSrc: '/assets/footwear/baby-footwear-icon.png' },
  { id: 'home-bathroom-slippers', name: 'Home & Bathroom Slippers', emoji: '🏠', iconSrc: '/assets/footwear/bathroom-slippers-icon.png' },
  { id: 'work-safety-shoes', name: 'Work & Safety Shoes', emoji: '🥾', iconSrc: '/assets/footwear/safety-shoes-icon.png' },
  { id: 'ethnic-footwear', name: 'Ethnic & Traditional Footwear', emoji: '🩰', iconSrc: '/assets/footwear/ethnic-footwear-icon.png' },
  { id: 'school-shoes', name: 'School Shoes', emoji: '🦶', iconSrc: '/assets/footwear/school-shoes-icon.png' },
  { id: 'outdoor-sandals', name: 'Outdoor & Casual Sandals', emoji: '🏖️', iconSrc: '/assets/footwear/outdoor-sandals-icon.png' },
  { id: 'socks-accessories', name: 'Socks & Footwear Accessories', emoji: '🧦', iconSrc: '/assets/footwear/socks-accessories-icon.png' },
];

const ELECTRONICS_SUBCATEGORY_CARDS = [
  { id: 'lights-bulbs', name: 'Lights & Bulbs', emoji: '💡', iconSrc: '/assets/electronics/lights-icon.png' },
  { id: 'switches-sockets', name: 'Switches & Sockets', emoji: '🔘', iconSrc: '/assets/electronics/switches-icon.png' },
  { id: 'fans', name: 'Fans', emoji: '🌀', iconSrc: '/assets/electronics/fans-icon.png' },
  { id: 'air-conditioners', name: 'Air Conditioners', emoji: '❄️', iconSrc: '/assets/electronics/ac-icon.png' },
  { id: 'air-coolers', name: 'Air Coolers', emoji: '🌬️', iconSrc: '/assets/electronics/coolers-icon.png' },
  { id: 'heaters', name: 'Heaters', emoji: '🔥', iconSrc: '/assets/electronics/heaters-icon.png' },
  { id: 'geysers', name: 'Geysers', emoji: '🚿', iconSrc: '/assets/electronics/geysers-icon.png' },
  { id: 'wires-cables', name: 'Wires & Cables', emoji: '⚡', iconSrc: '/assets/electronics/wires-icon.png' },
  { id: 'extension-plugs', name: 'Extension Boards & Plugs', emoji: '🔌', iconSrc: '/assets/electronics/extension-icon.png' },
  { id: 'inverters-batteries', name: 'Inverters & Batteries', emoji: '🔋', iconSrc: '/assets/electronics/inverters-icon.png' },
  { id: 'televisions', name: 'Televisions', emoji: '📺', iconSrc: '/assets/electronics/tv-icon.png' },
  { id: 'dth-set-top-boxes', name: 'DTH & Set-Top Boxes', emoji: '📡', iconSrc: '/assets/electronics/dth-icon.png' },
  { id: 'cctv-security', name: 'CCTV & Security', emoji: '📹', iconSrc: '/assets/electronics/cctv-icon.png' },
  { id: 'doorbells', name: 'Doorbells', emoji: '🔔', iconSrc: '/assets/electronics/doorbells-icon.png' },
  { id: 'smart-home-electronics', name: 'Smart Home Electronics', emoji: '🏠', iconSrc: '/assets/electronics/smart-home-icon.png' },
  { id: 'kitchen-appliances', name: 'Kitchen Appliances', emoji: '🍳', iconSrc: '/assets/electronics/kitchen-appliances-icon.png' },
  { id: 'cleaning-appliances', name: 'Cleaning Appliances', emoji: '🧹', iconSrc: '/assets/electronics/cleaning-appliances-icon.png' },
  { id: 'small-home-appliances', name: 'Small Home Appliances', emoji: '☕', iconSrc: '/assets/electronics/small-appliances-icon.png' },
  { id: 'refrigerators-freezers', name: 'Refrigerators & Freezers', emoji: '🧊', iconSrc: '/assets/electronics/refrigerators-icon.png' },
  { id: 'washing-machines', name: 'Washing Machines', emoji: '🧺', iconSrc: '/assets/electronics/washing-machines-icon.png' },
];

const MEDICINE_SUBCATEGORY_CARDS = [
  { id: 'otc-medicines', name: 'OTC Medicines', emoji: '💊', iconSrc: '/assets/medicine/otc-icon.png' },
  { id: 'first-aid', name: 'First Aid & Wound Care', emoji: '🩹', iconSrc: '/assets/medicine/first-aid-icon.png' },
  { id: 'health-monitoring', name: 'Health Monitoring Devices', emoji: '🌡️', iconSrc: '/assets/medicine/monitoring-icon.png' },
  { id: 'medical-equipment', name: 'Medical Equipment', emoji: '🩺', iconSrc: '/assets/medicine/equipment-icon.png' },
  { id: 'personal-care-hygiene', name: 'Personal Care & Hygiene', emoji: '🧴', iconSrc: '/assets/medicine/personal-care-icon.png' },
  { id: 'vitamins-supplements', name: 'Vitamins & Nutritional Supplements', emoji: '💪', iconSrc: '/assets/medicine/vitamins-icon.png' },
  { id: 'baby-healthcare', name: 'Baby Healthcare', emoji: '👶', iconSrc: '/assets/medicine/baby-healthcare-icon.png' },
  { id: 'orthopedic-support', name: 'Orthopedic & Support Products', emoji: '🦵', iconSrc: '/assets/medicine/orthopedic-icon.png' },
  { id: 'surgical-supplies', name: 'Surgical & Medical Supplies', emoji: '💉', iconSrc: '/assets/medicine/surgical-icon.png' },
  { id: 'oral-care', name: 'Oral Care', emoji: '🦷', iconSrc: '/assets/medicine/oral-care-icon.png' },
  { id: 'eye-care', name: 'Eye Care & Vision', emoji: '👓', iconSrc: '/assets/medicine/eye-care-icon.png' },
  { id: 'masks-protection', name: 'Masks & Protective Care', emoji: '😷', iconSrc: '/assets/medicine/masks-icon.png' },
  { id: 'womens-healthcare', name: 'Women\'s Healthcare', emoji: '👩', iconSrc: '/assets/medicine/womens-healthcare-icon.png' },
  { id: 'elderly-care', name: 'Elderly Care', emoji: '👴', iconSrc: '/assets/medicine/elderly-care-icon.png' },
  { id: 'wellness-recovery', name: 'Wellness & Recovery', emoji: '🧘', iconSrc: '/assets/medicine/wellness-icon.png' },
  { id: 'disinfectants-sanitization', name: 'Disinfectants & Sanitization', emoji: '🧼', iconSrc: '/assets/medicine/disinfectants-icon.png' },
  { id: 'mobility-accessibility', name: 'Mobility & Accessibility', emoji: '🧑‍🦽', iconSrc: '/assets/medicine/mobility-icon.png' },
  { id: 'diagnostic-testing', name: 'Diagnostic & Testing Products', emoji: '🧪', iconSrc: '/assets/medicine/diagnostic-icon.png' },
];

const VEHICLES_SUBCATEGORY_CARDS = [
  { id: 'bikes-motorcycles', name: 'Bikes & Motorcycles', emoji: '🏍️', iconSrc: '/assets/vehicles/bikes-icon.png' },
  { id: 'scooters', name: 'Scooters', emoji: '🛵', iconSrc: '/assets/vehicles/scooters-icon.png' },
  { id: 'cars', name: 'Cars', emoji: '🚗', iconSrc: '/assets/vehicles/cars-icon.png' },
  { id: 'auto-rickshaws', name: 'Auto Rickshaws', emoji: '🛺', iconSrc: '/assets/vehicles/auto-rickshaws-icon.png' },
  { id: 'commercial-vehicles', name: 'Commercial Vehicles', emoji: '🚚', iconSrc: '/assets/vehicles/commercial-vehicles-icon.png' },
  { id: 'tyres-tubes', name: 'Tyres & Tubes', emoji: '🛞', iconSrc: '/assets/vehicles/tyres-tubes-icon.png' },
  { id: 'helmets-riding-gear', name: 'Helmets & Riding Gear', emoji: '🪖', iconSrc: '/assets/vehicles/helmets-icon.png' },
  { id: 'vehicle-parts-spares', name: 'Vehicle Parts & Spares', emoji: '🔧', iconSrc: '/assets/vehicles/spares-icon.png' },
  { id: 'tractors-utility-vehicles', name: 'Tractors & Utility Vehicles', emoji: '🚜', iconSrc: '/assets/vehicles/tractors-icon.png' },
  { id: 'batteries', name: 'Batteries', emoji: '🔋', iconSrc: '/assets/vehicles/batteries-icon.png' },
  { id: 'tools-garage-equipment', name: 'Tools & Garage Equipment', emoji: '🛠️', iconSrc: '/assets/vehicles/garage-tools-icon.png' },
  { id: 'lights-electrical-accessories', name: 'Lights & Electrical Accessories', emoji: '💡', iconSrc: '/assets/vehicles/lights-accessories-icon.png' },
  { id: 'engine-oil-lubricants', name: 'Engine Oil & Lubricants', emoji: '🛢️', iconSrc: '/assets/vehicles/lubricants-icon.png' },
  { id: 'car-bike-care', name: 'Car & Bike Care', emoji: '🧼', iconSrc: '/assets/vehicles/vehicle-care-icon.png' },
  { id: 'vehicle-electronics', name: 'Vehicle Electronics & Accessories', emoji: '📱', iconSrc: '/assets/vehicles/electronics-accessories-icon.png' },
  { id: 'seat-covers-interior', name: 'Seat Covers & Interior Accessories', emoji: '🪑', iconSrc: '/assets/vehicles/interior-accessories-icon.png' },
  { id: 'safety-security-accessories', name: 'Safety & Security Accessories', emoji: '🛡️', iconSrc: '/assets/vehicles/safety-security-icon.png' },
  { id: 'parking-utility-accessories', name: 'Parking & Utility Accessories', emoji: '🅿️', iconSrc: '/assets/vehicles/parking-accessories-icon.png' },
];

const BOOKS_STATIONERY_SUBCATEGORY_CARDS = [
  { id: 'books', name: 'Books', emoji: '📖', iconSrc: '/assets/stationery/books-icon.png' },
  { id: 'notebooks-registers', name: 'Notebooks & Registers', emoji: '📓', iconSrc: '/assets/stationery/notebooks-icon.png' },
  { id: 'pens-pencils', name: 'Pens & Pencils', emoji: '✏️', iconSrc: '/assets/stationery/pens-pencils-icon.png' },
  { id: 'art-craft-supplies', name: 'Art & Craft Supplies', emoji: '🖍️', iconSrc: '/assets/stationery/art-craft-icon.png' },
  { id: 'geometry-math-tools', name: 'Geometry & Math Tools', emoji: '📐', iconSrc: '/assets/stationery/geometry-icon.png' },
  { id: 'files-folders', name: 'Files & Folders', emoji: '📁', iconSrc: '/assets/stationery/files-folders-icon.png' },
  { id: 'school-supplies', name: 'School Supplies', emoji: '🎒', iconSrc: '/assets/stationery/school-supplies-icon.png' },
  { id: 'diaries-planners', name: 'Diaries & Planners', emoji: '🗓️', iconSrc: '/assets/stationery/diaries-planners-icon.png' },
  { id: 'rulers-measuring-tools', name: 'Rulers & Measuring Tools', emoji: '📏', iconSrc: '/assets/stationery/rulers-icon.png' },
  { id: 'paper-sheets', name: 'Paper & Sheets', emoji: '📄', iconSrc: '/assets/stationery/paper-sheets-icon.png' },
  { id: 'office-stationery', name: 'Office Stationery', emoji: '📋', iconSrc: '/assets/stationery/office-stationery-icon.png' },
  { id: 'writing-accessories', name: 'Writing Accessories', emoji: '🖊️', iconSrc: '/assets/stationery/writing-accessories-icon.png' },
  { id: 'glue-tape-adhesives', name: 'Glue, Tape & Adhesives', emoji: '🧴', iconSrc: '/assets/stationery/adhesives-icon.png' },
  { id: 'scissors-cutters', name: 'Scissors & Cutters', emoji: '✂️', iconSrc: '/assets/stationery/scissors-cutters-icon.png' },
  { id: 'college-supplies', name: 'College Supplies', emoji: '🎓', iconSrc: '/assets/stationery/college-supplies-icon.png' },
  { id: 'printer-paper-supplies', name: 'Printer Paper & Supplies', emoji: '🖨️', iconSrc: '/assets/stationery/printer-paper-icon.png' },
  { id: 'educational-study-material', name: 'Educational & Study Material', emoji: '📚', iconSrc: '/assets/stationery/educational-material-icon.png' },
  { id: 'calculators', name: 'Calculators', emoji: '🧮', iconSrc: '/assets/stationery/calculators-icon.png' },
  { id: 'desk-organizers', name: 'Desk Organizers', emoji: '🗃️', iconSrc: '/assets/stationery/desk-organizers-icon.png' },
  { id: 'clips-pins-small-stationery', name: 'Clips, Pins & Small Stationery', emoji: '🖇️', iconSrc: '/assets/stationery/clips-pins-icon.png' },
];

const HARDWARE_SUBCATEGORY_CARDS = [
  { id: 'taps-faucets', name: 'Taps & Faucets', emoji: '🚰', iconSrc: '/assets/hardware/taps-faucets-icon.png' },
  { id: 'water-pumps', name: 'Water Pumps', emoji: '💧', iconSrc: '/assets/hardware/water-pumps-icon.png' },
  { id: 'pipes-fittings', name: 'Pipes & Fittings', emoji: '🚿', iconSrc: '/assets/hardware/pipes-fittings-icon.png' },
  { id: 'valves-water-controls', name: 'Valves & Water Controls', emoji: '🪠', iconSrc: '/assets/hardware/valves-icon.png' },
  { id: 'hand-tools', name: 'Hand Tools', emoji: '🔧', iconSrc: '/assets/hardware/hand-tools-icon.png' },
  { id: 'power-tools', name: 'Power Tools', emoji: '⚙️', iconSrc: '/assets/hardware/power-tools-icon.png' },
  { id: 'nuts-bolts-fasteners', name: 'Nuts, Bolts & Fasteners', emoji: '🔩', iconSrc: '/assets/hardware/fasteners-icon.png' },
  { id: 'locks-security-hardware', name: 'Locks & Security Hardware', emoji: '🔒', iconSrc: '/assets/hardware/locks-icon.png' },
  { id: 'bathroom-hardware', name: 'Bathroom Hardware', emoji: '🛁', iconSrc: '/assets/hardware/bathroom-hardware-icon.png' },
  { id: 'screwdrivers-tool-sets', name: 'Screwdrivers & Tool Sets', emoji: '🪛', iconSrc: '/assets/hardware/screwdrivers-icon.png' },
  { id: 'hammers-cutting-tools', name: 'Hammers & Cutting Tools', emoji: '🔨', iconSrc: '/assets/hardware/hammers-icon.png' },
  { id: 'tool-boxes-storage', name: 'Tool Boxes & Storage', emoji: '🧰', iconSrc: '/assets/hardware/tool-boxes-icon.png' },
  { id: 'door-window-hardware', name: 'Door & Window Hardware', emoji: '🚪', iconSrc: '/assets/hardware/door-hardware-icon.png' },
  { id: 'cabinet-furniture-hardware', name: 'Cabinet & Furniture Hardware', emoji: '🪟', iconSrc: '/assets/hardware/cabinet-hardware-icon.png' },
  { id: 'building-hardware', name: 'Building Hardware', emoji: '🧱', iconSrc: '/assets/hardware/building-hardware-icon.png' },
  { id: 'ladders-safety-equipment', name: 'Ladders & Safety Equipment', emoji: '🪜', iconSrc: '/assets/hardware/ladders-icon.png' },
  { id: 'adhesives-sealants', name: 'Adhesives & Sealants', emoji: '🧴', iconSrc: '/assets/hardware/adhesives-icon.png' },
  { id: 'drilling-cutting-accessories', name: 'Drilling & Cutting Accessories', emoji: '🪚', iconSrc: '/assets/hardware/drilling-icon.png' },
  { id: 'clamps-measuring-tools', name: 'Clamps & Measuring Tools', emoji: '🧲', iconSrc: '/assets/hardware/clamps-icon.png' },
  { id: 'other-hardware', name: 'Other Hardware', emoji: '🛠️', iconSrc: '/assets/hardware/other-hardware-icon.png' },
];

const MOBILES_SUBCATEGORY_CARDS = [
  { id: 'smartphones', name: 'Smartphones', emoji: '📱', iconSrc: '/assets/mobiles/smartphones-icon.png' },
  { id: 'feature-phones', name: 'Feature Phones', emoji: '📲', iconSrc: '/assets/mobiles/feature-phones-icon.png' },
  { id: 'tablets', name: 'Tablets', emoji: '📟', iconSrc: '/assets/mobiles/tablets-icon.png' },
  { id: 'smartwatches', name: 'Smartwatches', emoji: '⌚', iconSrc: '/assets/mobiles/smartwatches-icon.png' },
  { id: 'earphones-headphones', name: 'Earphones & Headphones', emoji: '🎧', iconSrc: '/assets/mobiles/earphones-icon.png' },
  { id: 'chargers-adapters', name: 'Chargers & Adapters', emoji: '🔌', iconSrc: '/assets/mobiles/chargers-icon.png' },
  { id: 'power-banks', name: 'Power Banks', emoji: '🔋', iconSrc: '/assets/mobiles/power-banks-icon.png' },
  { id: 'mobile-cases-covers', name: 'Mobile Cases & Covers', emoji: '📱', iconSrc: '/assets/mobiles/cases-covers-icon.png' },
  { id: 'bluetooth-speakers', name: 'Bluetooth Speakers', emoji: '🔊', iconSrc: '/assets/mobiles/speakers-icon.png' },
  { id: 'screen-protectors', name: 'Screen Protectors', emoji: '🛡️', iconSrc: '/assets/mobiles/screen-protectors-icon.png' },
  { id: 'charging-cables', name: 'Charging Cables', emoji: '🔗', iconSrc: '/assets/mobiles/charging-cables-icon.png' },
  { id: 'mobile-holders-stands', name: 'Mobile Holders & Stands', emoji: '🚗', iconSrc: '/assets/mobiles/mobile-holders-icon.png' },
  { id: 'gaming-accessories', name: 'Gaming Accessories', emoji: '🎮', iconSrc: '/assets/mobiles/gaming-accessories-icon.png' },
  { id: 'memory-cards-storage', name: 'Memory Cards & Storage', emoji: '💾', iconSrc: '/assets/mobiles/memory-cards-icon.png' },
  { id: 'laptops-accessories', name: 'Laptops & Accessories', emoji: '💻', iconSrc: '/assets/mobiles/laptops-icon.png' },
  { id: 'computer-accessories', name: 'Computer Accessories', emoji: '🖱️', iconSrc: '/assets/mobiles/computer-accessories-icon.png' },
  { id: 'printers-accessories', name: 'Printers & Accessories', emoji: '🖨️', iconSrc: '/assets/mobiles/printers-icon.png' },
  { id: 'cameras-accessories', name: 'Cameras & Accessories', emoji: '🎥', iconSrc: '/assets/mobiles/cameras-icon.png' },
  { id: 'microphones', name: 'Microphones', emoji: '🎙️', iconSrc: '/assets/mobiles/microphones-icon.png' },
  { id: 'smart-gadgets', name: 'Smart Gadgets', emoji: '🕶️', iconSrc: '/assets/mobiles/smart-gadgets-icon.png' },
];

function SubcategoryScrollStrip({ items, activeSubcategoryId, onSelectSubcategory }) {
  const scrollRef = React.useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="mb-10 relative group/strip">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-black text-slate-800 dark:text-slate-100 tracking-tight">Shop by Category</h2>
        <button
          type="button"
          onClick={() => { }}
          className="text-xs sm:text-sm font-bold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 hover:underline cursor-pointer transition-colors"
        >
          View All Categories
        </button>
      </div>

      <div className="relative">
        {/* Left Scroll Chevron Button (Brand Green Filled Circle) */}
        <button
          type="button"
          onClick={() => scroll('left')}
          className="absolute -left-3.5 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white shadow-md flex items-center justify-center transition-all opacity-0 group-hover/strip:opacity-100 focus:opacity-100 hover:scale-105 active:scale-95 cursor-pointer"
          aria-label="Scroll left"
        >
          <ChevronLeft size={18} />
        </button>

        {/* Scrollable Container */}
        <div
          ref={scrollRef}
          className="flex gap-4 sm:gap-6 overflow-x-auto pb-4 pt-1.5 px-1.5 scrollbar-thin scrollbar-thumb-slate-300 dark:scrollbar-thumb-slate-700 scrollbar-track-transparent snap-x scroll-smooth"
        >
          {items.map((cat) => {
            const isSelected = activeSubcategoryId === cat.id;

            return (
              <div
                key={cat.id}
                onClick={() => onSelectSubcategory(cat.id)}
                className={`flex-none min-w-[105px] sm:min-w-[120px] max-w-[130px] flex flex-col items-center cursor-pointer group snap-start p-4 rounded-2xl bg-white dark:bg-slate-900 border transition-all duration-200 ease-out shrink-0 ${
                  isSelected
                    ? 'border-emerald-500 ring-2 ring-emerald-500/30 shadow-md -translate-y-1 bg-emerald-50/20 dark:bg-emerald-950/20'
                    : 'border-slate-200/90 dark:border-slate-800/90 shadow-[0_2px_8px_rgba(0,0,0,0.06)] dark:shadow-[0_2px_8px_rgba(0,0,0,0.3)] hover:-translate-y-1 hover:shadow-[0_8px_20px_rgba(0,0,0,0.08)] dark:hover:shadow-[0_8px_20px_rgba(0,0,0,0.4)] hover:border-emerald-500'
                }`}
              >
                <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl p-2 flex items-center justify-center transition-all duration-200 mb-3 overflow-hidden relative border border-emerald-100/80 dark:border-emerald-900/40 group-hover:scale-105 ${
                  isSelected
                    ? 'bg-[#DCF2E3] dark:bg-emerald-900/50 border-emerald-300 dark:border-emerald-700'
                    : 'bg-[#EAF7EF] dark:bg-emerald-950/40 group-hover:bg-[#DCF2E3] dark:group-hover:bg-emerald-900/50'
                }`}>
                  <span className="text-3.5xl sm:text-[42px] select-none flex items-center justify-center transform group-hover:scale-105 transition-transform duration-200">{cat.emoji}</span>
                  <img
                    src={cat.iconSrc}
                    alt={cat.name}
                    className="absolute inset-0 w-full h-full object-contain p-2 bg-white dark:bg-slate-900"
                    onError={(e) => { e.currentTarget.style.display = 'none'; }}
                  />
                </div>
                <span className={`text-xs sm:text-sm font-extrabold text-center transition-colors line-clamp-2 leading-snug tracking-tight ${
                  isSelected ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-800 dark:text-slate-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400'
                }`}>
                  {cat.name}
                </span>
              </div>
            );
          })}
        </div>

        {/* Right Scroll Chevron Button (Brand Green Filled Circle) */}
        <button
          type="button"
          onClick={() => scroll('right')}
          className="absolute -right-3.5 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white shadow-md flex items-center justify-center transition-all opacity-0 group-hover/strip:opacity-100 focus:opacity-100 hover:scale-105 active:scale-95 cursor-pointer"
          aria-label="Scroll right"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}

// Icon Map for Category Cards per PDF Spec Visual Language
const CATEGORY_ICON_MAP = {
  grocery: Leaf,
  electronics: Smartphone,
  mobiles: Smartphone,
  'medicine-healthcare': Cross,
  fashion: Shirt,
  'household-items': Package,
  hardware: Hammer,
  services: Wrench,
  'books-stationery': BookOpen,
  footwear: Footprints,
  gifts: Gift,
  saathapp: Sparkles,
  agriculture: Sprout,
  construction: HardHat,
  vehicles: Car,
  'spiritual-puja': Flame
};

export default function ProductListing({
  cartCount,
  location,
  onCartClick,
  onLocationClick,
  onSearch,
  searchQuery,
  onLogin,
  onSignup,
  onLogout,
  isAuthenticated,
  user,
  darkMode,
  toggleDarkMode,
  handleAddToCart,
}) {
  const navigate = useNavigate();
  const reactLocation = useReactLocation();
  const searchParams = new URLSearchParams(reactLocation.search);
  const festivalFilter = searchParams.get('festival');

  const pathParts = reactLocation.pathname.split('/').filter(Boolean);
  let categoryId = null;
  let subCategoryId = null;

  if (pathParts[0] === 'products') {
    if (pathParts[1] && pathParts[1] !== 'all' && pathParts[1] !== 'search') {
      categoryId = pathParts[1];
    }
    if (pathParts[2]) subCategoryId = pathParts[2];
  }

  const isSearch = pathParts[1] === 'search' || !!searchQuery;
  const isOffersPage = pathParts[1] === 'offers';
  const isAllCategories = pathParts[1] === 'all' || (!categoryId && !festivalFilter && !isSearch && !isOffersPage);

  React.useEffect(() => {
    if (categoryId && categoryId !== 'all') {
      trackEvent('category_view', {
        category: categoryId,
        subCategory: subCategoryId || null,
        festival: festivalFilter || null,
        isSearch: !!searchQuery
      });
    }
  }, [categoryId, subCategoryId, festivalFilter, searchQuery]);

  const categoryInfo = getCategoryByIdOrSlug(categoryId) || (categories ? categories.find(c => c.id === categoryId) : null);
  const subCategoryInfo = categoryId && subCategoryId && subcategories[categoryId] ? subcategories[categoryId].find(s => s.id === subCategoryId) : null;

  let title = 'All Products';
  let seoTitle = 'Buy Products Online | SaathApp';

  if (isSearch) {
    title = `Search Results for "${searchQuery || ''}"`;
    seoTitle = title;
  } else if (isOffersPage) {
    title = 'Special Offers';
    seoTitle = title;
  } else if (isAllCategories) {
    title = 'All Categories';
    seoTitle = 'All Marketplace Categories | SaathApp';
  } else if (festivalFilter) {
    const fest = festivals ? festivals.find(f => f.id === festivalFilter) : null;
    title = fest ? `${fest.name} Collection` : 'Festival Collection';
    seoTitle = `${title} | SaathApp`;
  } else if (subCategoryInfo) {
    title = subCategoryInfo.name;
    seoTitle = categoryId === 'spiritual-puja'
      ? `${subCategoryInfo.name} Online | SaathApp`
      : `${subCategoryInfo.name} | SaathApp Official`;
  } else if (categoryInfo) {
    title = categoryInfo.name;
    seoTitle = categoryId === 'spiritual-puja'
      ? `Spiritual & Puja Items Online | SaathApp`
      : `${categoryInfo.name} | SaathApp Official`;
  }
  React.useEffect(() => {
    document.title = seoTitle;

    // Analytics tracking
    if (categoryId === 'spiritual-puja') {
      if (festivalFilter) {
        trackEvent('festival_collection_click', { festival: festivalFilter });
      } else if (subCategoryId) {
        trackEvent('spiritual_subcategory_click', { subcategory: subCategoryId });
      } else {
        trackEvent('spiritual_category_view', { category: 'spiritual-puja' });
      }
    }
  }, [seoTitle, categoryId, subCategoryId, festivalFilter]);

  const [filters, setFilters] = useState({
    priceRange: '',
    availability: '',
    rating: '',
    type: ''
  });

  const [sort, setSort] = useState('popular');
  const [isLoading, setIsLoading] = useState(true);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Network simulation
  React.useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, [categoryId, filters, sort, isOffersPage, isAllCategories, searchQuery, festivalFilter]);

  // Combine products for global search, removing duplicates by id
  const allProducts = [...products];
  for (const mp of mockSaathAppProducts) {
    if (!allProducts.some(p => p.id === mp.id)) {
      allProducts.push(mp);
    }
  }

  // Filter products based on category ID, offers, search, or all
  let filteredProducts = products;

  if (isSearch && searchQuery) {
    const query = searchQuery.toLowerCase().trim();
    const queryTerms = query.split(' ').filter(Boolean);

    const getScore = (p) => {
      const name = (p.name || '').toLowerCase();
      const cat = (p.category || '').toLowerCase();
      const sub = (p.subCategory || '').toLowerCase().replace('-', ' ');
      const desc = (p.description || '').toLowerCase();
      const seller = (p.brand || '').toLowerCase();
      const groceryTier = (p.groceryTier || '').toLowerCase();
      const electronicsType = (p.electronicsType || '').toLowerCase();
      const spiritualType = (p.spiritualType || '').toLowerCase();

      if (name === query) return 100;
      if (name.startsWith(query)) return 50;
      if (name.includes(query)) return 20;

      const searchFields = [name, cat, sub, desc, seller, groceryTier, electronicsType, spiritualType];

      const matchesAll = queryTerms.every(t => searchFields.some(field => field.includes(t)));
      if (matchesAll) return 10;

      const matchesSome = queryTerms.some(t => [name, cat, sub, seller, groceryTier].some(field => field.includes(t)));
      if (matchesSome) return 1;

      return 0;
    };

    filteredProducts = allProducts
      .filter(p => getScore(p) > 0)
      .sort((a, b) => getScore(b) - getScore(a));
  } else if (isOffersPage) {
    filteredProducts = products.filter(p => p.promotion?.active);
  } else if (!isAllCategories && categoryId && categoryId !== 'all') {
    filteredProducts = products.filter(p => p.category === categoryId);
    if (subCategoryId) {
      filteredProducts = filteredProducts.filter(p => p.subCategory === subCategoryId);
    }
  }

  if (festivalFilter) {
    filteredProducts = filteredProducts.filter(p => p.festival === festivalFilter);
  }

  // Apply filters from ProductFilters sidebar
  if (filters.priceRange) {
    if (filters.priceRange === 'Under ₹199') filteredProducts = filteredProducts.filter(p => p.price < 199);
    else if (filters.priceRange === '₹199 - ₹499') filteredProducts = filteredProducts.filter(p => p.price >= 199 && p.price <= 499);
    else if (filters.priceRange === '₹500 - ₹999') filteredProducts = filteredProducts.filter(p => p.price >= 500 && p.price <= 999);
    else if (filters.priceRange === '₹1,000+') filteredProducts = filteredProducts.filter(p => p.price >= 1000);
  }
  if (filters.rating) {
    const minRating = parseInt(filters.rating.charAt(0));
    filteredProducts = filteredProducts.filter(p => p.rating >= minRating);
  }
  // Custom Spiritual filters
  if (filters.deity) {
    const d = filters.deity.toLowerCase();
    filteredProducts = filteredProducts.filter(p => p.description?.toLowerCase().includes(d) || p.name?.toLowerCase().includes(d));
  }
  if (filters.material) {
    const m = filters.material.toLowerCase();
    filteredProducts = filteredProducts.filter(p => p.description?.toLowerCase().includes(m) || p.name?.toLowerCase().includes(m));
  }
  if (filters.occasion) {
    const o = filters.occasion.toLowerCase();
    // Special handling for "Daily Puja" since description might just have "daily"
    const isDaily = o === 'daily puja';
    filteredProducts = filteredProducts.filter(p =>
      p.description?.toLowerCase().includes(isDaily ? 'daily' : o) ||
      p.name?.toLowerCase().includes(isDaily ? 'daily' : o)
    );
  }

  if (filters.groceryTier) {
    if (filters.groceryTier === 'Premium Grocery') {
      filteredProducts = filteredProducts.filter(p => p.groceryTier === 'Premium');
    } else if (filters.groceryTier === 'Normal Grocery') {
      filteredProducts = filteredProducts.filter(p => p.groceryTier === 'Normal');
    }
  }

  if (filters.electronicsType) {
    filteredProducts = filteredProducts.filter(p => p.electronicsType === filters.electronicsType);
  }

  if (filters.spiritualType) {
    filteredProducts = filteredProducts.filter(p => p.spiritualType === filters.spiritualType);
  }

  // Apply sorting
  if (sort === 'price-low') filteredProducts.sort((a, b) => a.price - b.price);
  else if (sort === 'price-high') filteredProducts.sort((a, b) => b.price - a.price);
  else if (sort === 'rating') filteredProducts.sort((a, b) => (b.rating || 0) - (a.rating || 0));

  // Handle sidebar category filter selection
  const handleSidebarCategoryChange = (catId) => {
    if (catId === 'all') {
      navigate('/products');
    } else if (catId === 'gift-set' || catId === 'gifts' || catId === 'gifts-items') {
      navigate('/products/gift-set');
    } else if (catId === 'services') {
      navigate('/products/services');
    } else {
      navigate(`/products/${catId}`);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors duration-300">
      <Header
        cartCount={cartCount}
        onCartClick={onCartClick}
        location={location}
        onLocationClick={onLocationClick}
        onSearch={onSearch}
        onLogin={onLogin}
        onSignup={onSignup}
        onLogout={onLogout}
        isAuthenticated={isAuthenticated}
        user={user}
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
      />

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-6">
          <button onClick={() => navigate('/')} className="hover:text-emerald-500 flex items-center gap-1">
            <Home size={12} /> Home
          </button>
          <ChevronRight size={12} />
          <button onClick={() => navigate('/products')} className="hover:text-emerald-500">Categories</button>
          {categoryId && (
            <>
              <ChevronRight size={12} />
              <button onClick={() => navigate(`/products/${categoryId}`)} className={`${subCategoryId ? 'hover:text-primary' : 'text-slate-800 dark:text-slate-300 font-bold'}`}>
                {categoryInfo ? categoryInfo.name : categoryId}
              </button>
            </>
          )}
          {subCategoryId && (
            <>
              <ChevronRight size={12} />
              <span className="text-slate-800 dark:text-slate-300 font-bold">{subCategoryInfo ? subCategoryInfo.name : subCategoryId}</span>
            </>
          )}
          {isOffersPage && (
            <>
              <ChevronRight size={12} />
              <span className="text-slate-800 dark:text-slate-300 font-bold">Offers</span>
            </>
          )}
        </div>

        <div className="mb-6">
          <h1 className="text-3xl font-black mb-1">{title}</h1>
          <p className="text-xs text-slate-500 font-semibold">
            {isAllCategories ? '16 Marketplace Verticals' : `${filteredProducts.length} Products`}
          </p>
        </div>

        {/* Grocery Homepage Merchandising */}
        {categoryId === 'grocery' && !subCategoryId && !isSearch && !isAllCategories && !isOffersPage && (
          <div className="mb-10">
            <h2 className="text-xl font-black mb-4">Shop Grocery</h2>
            <div className="grid grid-cols-2 lg:grid-cols-6 gap-4 mb-8">
              <button onClick={() => setFilters({ ...filters, groceryTier: 'Normal Grocery' })} className="flex flex-col items-center justify-start p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl hover:border-primary hover:shadow-lg transition-all group h-full">
                <div className="w-full aspect-[4/3] mb-3 rounded-xl overflow-hidden flex items-center justify-center bg-slate-50 dark:bg-slate-800">
                  <img src={normalGroceryImg} alt="Normal Grocery" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                </div>
                <span className="font-bold text-sm text-center text-slate-800 dark:text-slate-200">Normal Grocery</span>
                <span className="text-[10px] text-slate-500 mt-1 text-center">Daily essentials for your home</span>
              </button>
              <button onClick={() => setFilters({ ...filters, groceryTier: 'Premium Grocery' })} className="flex flex-col items-center justify-start p-4 bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-900/20 dark:to-yellow-900/20 border border-amber-200 dark:border-amber-800/50 rounded-2xl hover:shadow-lg transition-all group relative h-full">
                <div className="w-full aspect-[4/3] mb-3 rounded-xl overflow-hidden flex items-center justify-center bg-amber-100/50 dark:bg-amber-800/20">
                  <img src={premiumGroceryImg} alt="Premium Grocery" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                </div>
                <span className="font-bold text-sm text-center text-amber-900 dark:text-amber-100">Premium Grocery</span>
                <span className="text-[10px] text-amber-700/70 dark:text-amber-400/70 mt-1 text-center">Premium quality products</span>
              </button>
              <button onClick={() => navigate('/products/grocery/fruits-vegetables')} className="flex flex-col items-center justify-start p-4 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800/50 rounded-2xl hover:shadow-lg transition-all group h-full">
                <div className="w-full aspect-[4/3] mb-3 rounded-xl overflow-hidden flex items-center justify-center bg-emerald-100/50 dark:bg-emerald-800/20">
                  <img src={fruitsVegImg} alt="Fresh Fruits & Veg" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                </div>
                <span className="font-bold text-sm text-center text-emerald-900 dark:text-emerald-100">Fresh Fruits & Veg</span>
                <span className="text-[10px] text-emerald-700/70 dark:text-emerald-400/70 mt-1 text-center">Farm fresh & handpicked</span>
              </button>
              <button onClick={() => navigate('/products/grocery/meat-chicken')} className="flex flex-col items-center justify-start p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/50 rounded-2xl hover:shadow-lg transition-all group h-full">
                <div className="w-full aspect-[4/3] mb-3 rounded-xl overflow-hidden flex items-center justify-center bg-red-100/50 dark:bg-red-800/20">
                  <img src={meatChickenImg} alt="Meat / Chicken" className="w-full h-full object-cover scale-[1.2] group-hover:scale-[1.3] transition-transform duration-300" />
                </div>
                <span className="font-bold text-sm text-center text-red-900 dark:text-red-100">Meat / Chicken</span>
                <span className="text-[10px] text-red-700/70 dark:text-red-400/70 mt-1 text-center">Fresh & hygienic cuts</span>
              </button>
              <button onClick={() => navigate('/products/grocery/dairy-bakery')} className="flex flex-col items-center justify-start p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800/50 rounded-2xl hover:shadow-lg transition-all group h-full">
                <div className="w-full aspect-[4/3] mb-3 rounded-xl overflow-hidden flex items-center justify-center bg-blue-100/50 dark:bg-blue-800/20">
                  <img src={dairyBakeryImg} alt="Dairy & Bakery" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                </div>
                <span className="font-bold text-sm text-center text-blue-900 dark:text-blue-100">Dairy & Bakery</span>
                <span className="text-[10px] text-blue-700/70 dark:text-blue-400/70 mt-1 text-center">Milk, bread, butter and more</span>
              </button>
              <button onClick={() => navigate('/products/offers')} className="flex flex-col items-center justify-start p-4 bg-rose-50 dark:bg-rose-900/20 border border-rose-200 dark:border-rose-800/50 rounded-2xl hover:shadow-lg transition-all group h-full">
                <div className="w-full aspect-[4/3] mb-3 rounded-xl overflow-hidden flex items-center justify-center bg-rose-100/50 dark:bg-rose-800/20">
                  <img src={dealsImg} alt="Deals" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                </div>
                <span className="font-bold text-sm text-center text-rose-900 dark:text-rose-100">Deals</span>
                <span className="text-[10px] text-rose-700/70 dark:text-rose-400/70 mt-1 text-center">Best offers & discounts</span>
              </button>
            </div>

            {/* Grocery Quick Tier Filter */}
            <div className="flex gap-4 border-b border-slate-200 dark:border-slate-800 pb-px mb-6">
              <button
                onClick={() => setFilters({ ...filters, groceryTier: '' })}
                className={`pb-4 px-2 font-bold text-sm transition-colors border-b-2 ${!filters.groceryTier ? 'border-primary text-primary' : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'}`}
              >
                All
              </button>
              <button
                onClick={() => setFilters({ ...filters, groceryTier: 'Normal Grocery' })}
                className={`pb-4 px-2 font-bold text-sm transition-colors border-b-2 ${filters.groceryTier === 'Normal Grocery' ? 'border-primary text-primary' : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'}`}
              >
                Normal Grocery
              </button>
              <button
                onClick={() => setFilters({ ...filters, groceryTier: 'Premium Grocery' })}
                className={`pb-4 px-2 font-bold text-sm transition-colors border-b-2 ${filters.groceryTier === 'Premium Grocery' ? 'border-amber-500 text-amber-600 dark:text-amber-400' : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'}`}
              >
                Premium Grocery
              </button>
            </div>
          </div>
        )}

        {/* Fashion Horizontal Subcategory Cards Strip */}
        {categoryId === 'fashion' && !subCategoryId && !isSearch && !isAllCategories && !isOffersPage && (
          <SubcategoryScrollStrip
            items={FASHION_SUBCATEGORY_CARDS}
            activeSubcategoryId={filters.fashionSubcategory}
            onSelectSubcategory={(id) => setFilters(prev => ({ ...prev, fashionSubcategory: prev.fashionSubcategory === id ? '' : id }))}
          />
        )}

        {/* Construction Horizontal Subcategory Cards Strip */}
        {categoryId === 'construction' && !subCategoryId && !isSearch && !isAllCategories && !isOffersPage && (
          <SubcategoryScrollStrip
            items={CONSTRUCTION_SUBCATEGORY_CARDS}
            activeSubcategoryId={filters.constructionSubcategory}
            onSelectSubcategory={(id) => setFilters(prev => ({ ...prev, constructionSubcategory: prev.constructionSubcategory === id ? '' : id }))}
          />
        )}

        {/* Agriculture Horizontal Subcategory Cards Strip */}
        {categoryId === 'agriculture' && !subCategoryId && !isSearch && !isAllCategories && !isOffersPage && (
          <SubcategoryScrollStrip
            items={AGRICULTURE_SUBCATEGORY_CARDS}
            activeSubcategoryId={filters.agricultureSubcategory}
            onSelectSubcategory={(id) => setFilters(prev => ({ ...prev, agricultureSubcategory: prev.agricultureSubcategory === id ? '' : id }))}
          />
        )}

        {/* Household Items Horizontal Subcategory Cards Strip */}
        {(categoryId === 'household-items' || categoryId === 'home-kitchen' || categoryId === 'household') && !subCategoryId && !isSearch && !isAllCategories && !isOffersPage && (
          <SubcategoryScrollStrip
            items={HOUSEHOLD_SUBCATEGORY_CARDS}
            activeSubcategoryId={filters.householdSubcategory}
            onSelectSubcategory={(id) => setFilters(prev => ({ ...prev, householdSubcategory: prev.householdSubcategory === id ? '' : id }))}
          />
        )}

        {/* Footwear Horizontal Subcategory Cards Strip */}
        {(categoryId === 'footwear' || categoryId === 'shoes-slippers-sandals' || categoryId === 'shoes') && !subCategoryId && !isSearch && !isAllCategories && !isOffersPage && (
          <SubcategoryScrollStrip
            items={FOOTWEAR_SUBCATEGORY_CARDS}
            activeSubcategoryId={filters.footwearSubcategory}
            onSelectSubcategory={(id) => setFilters(prev => ({ ...prev, footwearSubcategory: prev.footwearSubcategory === id ? '' : id }))}
          />
        )}
        {/* Electronics Horizontal Subcategory Cards Strip */}
        {categoryId === 'electronics' && !subCategoryId && !isSearch && !isAllCategories && !isOffersPage && (
          <SubcategoryScrollStrip
            items={ELECTRONICS_SUBCATEGORY_CARDS}
            activeSubcategoryId={filters.electronicsSubcategory}
            onSelectSubcategory={(id) => setFilters(prev => ({ ...prev, electronicsSubcategory: prev.electronicsSubcategory === id ? '' : id }))}
          />
        )}

        {/* Medicine & Healthcare Horizontal Subcategory Cards Strip */}
        {(categoryId === 'medicine-healthcare' || categoryId === 'medicine' || categoryId === 'healthcare') && !subCategoryId && !isSearch && !isAllCategories && !isOffersPage && (
          <SubcategoryScrollStrip
            items={MEDICINE_SUBCATEGORY_CARDS}
            activeSubcategoryId={filters.medicineSubcategory}
            onSelectSubcategory={(id) => setFilters(prev => ({ ...prev, medicineSubcategory: prev.medicineSubcategory === id ? '' : id }))}
          />
        )}
        {/* Vehicles Horizontal Subcategory Cards Strip */}
        {categoryId === 'vehicles' && !subCategoryId && !isSearch && !isAllCategories && !isOffersPage && (
          <SubcategoryScrollStrip
            items={VEHICLES_SUBCATEGORY_CARDS}
            activeSubcategoryId={filters.vehiclesSubcategory}
            onSelectSubcategory={(id) => setFilters(prev => ({ ...prev, vehiclesSubcategory: prev.vehiclesSubcategory === id ? '' : id }))}
          />
        )}
        {/* Book & Stationery Horizontal Subcategory Cards Strip */}
        {(categoryId === 'book-stationery' || categoryId === 'books-stationery' || categoryId === 'stationery') && !subCategoryId && !isSearch && !isAllCategories && !isOffersPage && (
          <SubcategoryScrollStrip
            items={BOOKS_STATIONERY_SUBCATEGORY_CARDS}
            activeSubcategoryId={filters.stationerySubcategory}
            onSelectSubcategory={(id) => setFilters(prev => ({ ...prev, stationerySubcategory: prev.stationerySubcategory === id ? '' : id }))}
          />
        )}
        {/* Hardware Horizontal Subcategory Cards Strip */}
        {categoryId === 'hardware' && !subCategoryId && !isSearch && !isAllCategories && !isOffersPage && (
          <SubcategoryScrollStrip
            items={HARDWARE_SUBCATEGORY_CARDS}
            activeSubcategoryId={filters.hardwareSubcategory}
            onSelectSubcategory={(id) => setFilters(prev => ({ ...prev, hardwareSubcategory: prev.hardwareSubcategory === id ? '' : id }))}
          />
        )}
        {/* Mobiles Horizontal Subcategory Cards Strip */}
        {(categoryId === 'mobiles' || categoryId === 'mobile') && !subCategoryId && !isSearch && !isAllCategories && !isOffersPage && (
          <SubcategoryScrollStrip
            items={MOBILES_SUBCATEGORY_CARDS}
            activeSubcategoryId={filters.mobilesSubcategory}
            onSelectSubcategory={(id) => setFilters(prev => ({ ...prev, mobilesSubcategory: prev.mobilesSubcategory === id ? '' : id }))}
          />
        )}

        {categoryId && subcategories[categoryId] && categoryId !== 'grocery' && categoryId !== 'fashion' && categoryId !== 'construction' && categoryId !== 'agriculture' && categoryId !== 'household-items' && categoryId !== 'home-kitchen' && categoryId !== 'household' && categoryId !== 'footwear' && categoryId !== 'shoes-slippers-sandals' && categoryId !== 'shoes' && categoryId !== 'electronics' && categoryId !== 'medicine-healthcare' && categoryId !== 'medicine' && categoryId !== 'healthcare' && categoryId !== 'vehicles' && categoryId !== 'book-stationery' && categoryId !== 'books-stationery' && categoryId !== 'stationery' && categoryId !== 'hardware' && categoryId !== 'mobiles' && categoryId !== 'mobile' && !isSearch && !isAllCategories && !isOffersPage && (
          <div className="mb-8">
            <h2 className="text-lg font-bold mb-4">Quick Categories</h2>
            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-none snap-x">
              {subcategories[categoryId].map(sub => (
                <button
                  key={sub.id}
                  onClick={() => navigate(`/products/${categoryId}/${sub.id}`)}
                  className={`flex-none px-6 py-3 rounded-full text-sm font-bold border transition-all snap-start ${subCategoryId === sub.id
                      ? 'bg-primary text-white border-primary shadow-lg shadow-primary/30'
                      : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-primary hover:text-primary'
                    }`}
                >
                  {sub.name}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Festival Engine Integration */}
        {(categoryId === 'spiritual-puja' || festivalFilter) && (
          <div className="mb-8">
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
              <Sparkles className="text-amber-500" size={20} />
              Shop by Festival
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
              {festivals.map(fest => (
                <button
                  key={fest.id}
                  onClick={() => navigate(`/products/spiritual-puja?festival=${fest.id}`)}
                  className={`flex flex-col items-center justify-center p-4 rounded-2xl border transition-all ${festivalFilter === fest.id
                      ? 'bg-amber-50 border-amber-500 shadow-md ring-2 ring-amber-500/20'
                      : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-amber-300 hover:shadow-md'
                    }`}
                >
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 ${festivalFilter === fest.id ? 'bg-amber-100 text-amber-600' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'}`}>
                    <Sparkles size={20} />
                  </div>
                  <span className={`text-xs font-bold text-center ${festivalFilter === fest.id ? 'text-amber-700' : 'text-slate-700 dark:text-slate-300'}`}>
                    {fest.name}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Mobile Filter Toggle */}
        <div className="lg:hidden mb-4 flex items-center justify-between bg-white dark:bg-slate-900 p-3 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xs">
          <span className="text-xs font-bold text-slate-700 dark:text-slate-200">
            {isAllCategories ? 'All 16 Marketplace Categories' : `${filteredProducts.length} Products`}
          </span>
          <button
            onClick={() => setShowMobileFilters(!showMobileFilters)}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-extrabold cursor-pointer hover:bg-emerald-500/20 transition-colors"
          >
            <span>⚙️ Filters</span>
            <span className="text-[10px]">{showMobileFilters ? '▲ Hide' : '▼ Show'}</span>
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Filters Sidebar (Collapsible on mobile screens) */}
          <aside className={`w-full lg:w-64 shrink-0 ${showMobileFilters ? 'block mb-6' : 'hidden lg:block'}`}>
            <ProductFilters
              filters={filters}
              setFilters={setFilters}
              activeCategory={categoryId || (isAllCategories ? 'all' : '')}
              onCategoryChange={(catId) => {
                setShowMobileFilters(false);
                handleSidebarCategoryChange(catId);
              }}
            />
          </aside>

          {/* Main Content Area */}
          <div className="flex-1 w-full">
            {isAllCategories ? (
              /* ALL CATEGORIES 4x4 GRID (Matching PDF Screenshots Page 12 & Page 23-24) */
              <div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
                  {MASTER_CATEGORIES.map(cat => {
                    const IconComponent = CATEGORY_ICON_MAP[cat.id] || ShoppingBag;
                    const dynamicCount = getDynamicProductCount(products, cat.id);

                    return (
                      <div
                        key={cat.id}
                        onClick={() => navigate(cat.url)}
                        className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:border-emerald-500 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group aspect-square"
                      >
                        <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-2xs overflow-hidden">
                          {cat.image ? (
                            <img src={cat.image} alt={cat.name} className="w-full h-full object-cover rounded-2xl" />
                          ) : (
                            <IconComponent size={28} />
                          )}
                        </div>
                        <h3 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-slate-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                          {cat.name}
                        </h3>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 font-medium">
                          {dynamicCount} Products
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              /* CATEGORY SPECIFIC PRODUCT LISTING GRID */
              <>
                <div className="flex items-center justify-between mb-6 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-2xs">
                  <span className="text-xs sm:text-sm font-bold text-slate-600 dark:text-slate-400">
                    Showing <span className="text-emerald-600 font-extrabold">{filteredProducts.length}</span> results
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-slate-500">Sort by:</span>
                    <select
                      value={sort}
                      onChange={(e) => setSort(e.target.value)}
                      className="bg-slate-100 dark:bg-slate-800 border-none rounded-xl text-xs font-bold py-2 px-3 outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
                    >
                      <option value="popular">Popularity</option>
                      <option value="price_low">Price: Low to High</option>
                      <option value="price_high">Price: High to Low</option>
                      <option value="rating">Rating</option>
                    </select>
                  </div>
                </div>

                <ProductGrid
                  products={filteredProducts}
                  isLoading={isLoading}
                  onAddToCart={handleAddToCart}
                />
              </>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

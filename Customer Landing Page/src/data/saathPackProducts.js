import paperBag from '../../public/images/saathpack/saathapp_paper_bag.jpg';
import deliveryBag from '../../public/images/saathpack/saathapp_delivery_bag.jpg';
import standupPouch from '../../public/images/saathpack/saathapp_standup_pouch.jpg';
import corrugatedBox from '../../public/images/saathpack/saathapp_corrugated_box.jpg';
import cartonBox from '../../public/images/saathpack/saathapp_carton_box.jpg';
import foilRoll from '../../public/images/saathpack/aluminium_foil_roll.jpg';
import boppTape from '../../public/images/saathpack/saathapp_bopp_tape.jpg';
import bubbleWrap from '../../public/images/saathpack/bubble_wrap_roll.jpg';
import foodBox from '../../public/images/saathpack/saathapp_food_box.jpg';
import kraftTape from '../../public/images/saathpack/kraft_paper_tape.jpg';
import thermalLabels from '../../public/images/saathpack/thermal_shipping_labels.jpg';
import stretchFilm from '../../public/images/saathpack/saathapp_stretch_film.jpg';

export const saathPackProducts = [
  {
    id: 'sp-101',
    name: 'SaathApp Paper Bag (Medium)',
    category: 'Paper Bags',
    material: 'Kraft Paper',
    size: '32x22x28 cm',
    sizeBucket: 'Medium',
    packSize: 100,
    price: 499,
    image: paperBag,
    rating: 4.8,
    reviews: 124,
    delivery: '5-10 days',
    isBestSeller: true
  },
  {
    id: 'sp-102',
    name: 'SaathApp Delivery Bag',
    category: 'Delivery Bags',
    material: 'Plastic',
    size: '14x18 inch',
    sizeBucket: 'Medium',
    packSize: 100,
    price: 359,
    image: deliveryBag,
    rating: 4.5,
    reviews: 89,
    delivery: '5-10 days',
    isBestSeller: true
  },
  {
    id: 'sp-103',
    name: 'SaathApp Standup Pouch',
    category: 'Pouches',
    material: 'Kraft Paper',
    size: '6x9 inch',
    sizeBucket: 'Small',
    packSize: 100,
    price: 449,
    image: standupPouch,
    rating: 4.7,
    reviews: 56,
    delivery: '5-10 days',
    isNew: true
  },
  {
    id: 'sp-104',
    name: 'SaathApp Corrugated Box',
    category: 'Corrugated Boxes',
    material: 'Corrugated',
    size: '12x10x8 inch',
    sizeBucket: 'Large',
    packSize: 10,
    price: 299,
    image: corrugatedBox,
    rating: 4.9,
    reviews: 210,
    delivery: '5-10 days'
  },
  {
    id: 'sp-105',
    name: 'SaathApp Carton Box',
    category: 'Carton Boxes',
    material: 'Corrugated',
    size: '18x12x12 inch',
    sizeBucket: 'Extra Large',
    packSize: 10,
    price: 399,
    image: cartonBox,
    rating: 4.6,
    reviews: 145,
    delivery: '5-10 days'
  },
  {
    id: 'sp-106',
    name: 'Aluminium Foil Roll',
    category: 'Foil & Wraps',
    material: 'Aluminium',
    size: '18 inch x 72 Meter',
    sizeBucket: 'All Sizes',
    packSize: 1, // 1 Roll
    price: 249,
    image: foilRoll,
    rating: 4.8,
    reviews: 320,
    delivery: '5-10 days'
  },
  {
    id: 'sp-107',
    name: 'SaathApp BOPP Tape',
    category: 'Tapes & Labels',
    material: 'Plastic',
    size: '2 inch x 65 Meter',
    sizeBucket: 'All Sizes',
    packSize: 6, // Pack of 6
    price: 199,
    image: boppTape,
    rating: 4.7,
    reviews: 412,
    delivery: '5-10 days'
  },
  {
    id: 'sp-108',
    name: 'Bubble Wrap Roll',
    category: 'Other Supplies',
    material: 'Plastic',
    size: '24 inch x 25 Meter',
    sizeBucket: 'All Sizes',
    packSize: 1, // 1 Roll
    price: 349,
    image: bubbleWrap,
    rating: 4.9,
    reviews: 180,
    delivery: '5-10 days'
  },
  {
    id: 'sp-109',
    name: 'SaathApp Food Box',
    category: 'Corrugated Boxes',
    material: 'Kraft Paper',
    size: '7x7x3 inch',
    sizeBucket: 'Small',
    packSize: 50,
    price: 249,
    image: foodBox,
    rating: 4.8,
    reviews: 95,
    delivery: '5-10 days'
  },
  {
    id: 'sp-110',
    name: 'Kraft Paper Tape',
    category: 'Tapes & Labels',
    material: 'Kraft Paper',
    size: '2 inch x 50 Meter',
    sizeBucket: 'All Sizes',
    packSize: 6,
    price: 179,
    image: kraftTape,
    rating: 4.6,
    reviews: 215,
    delivery: '5-10 days'
  },
  {
    id: 'sp-111',
    name: 'Shipping Labels (Thermal)',
    category: 'Tapes & Labels',
    material: 'Others',
    size: '100x150 mm',
    sizeBucket: 'All Sizes',
    packSize: 500,
    price: 399,
    image: thermalLabels,
    rating: 4.9,
    reviews: 340,
    delivery: '5-10 days'
  },
  {
    id: 'sp-112',
    name: 'Stretch Film Roll',
    category: 'Other Supplies',
    material: 'Plastic',
    size: '18 inch x 300 Meter',
    sizeBucket: 'All Sizes',
    packSize: 1, // 1 Roll
    price: 699,
    image: stretchFilm,
    rating: 4.7,
    reviews: 120,
    delivery: '5-10 days'
  }
];

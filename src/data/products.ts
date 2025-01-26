export const products = [
    {
        id: '1',
        name: 'iPhone 15 Pro Max',
        price: 1199,
        image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569',
        category: 'Phones',
        brand: 'Apple',
        rating: 4.9,
        reviews: 245,
        isNew: true,
        description: 'The most powerful iPhone ever with A17 Pro chip',
    },
    {
        id: '2',
        name: 'MacBook Pro 16"',
        price: 2499,
        image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8',
        category: 'Laptops',
        brand: 'Apple',
        rating: 4.8,
        reviews: 189,
        isNew: true,
        description: 'Supercharged for pros with M2 Max',
    },
    {
        id: '3',
        name: 'Sony WH-1000XM5',
        price: 399,
        image: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb',
        category: 'Accessories',
        brand: 'Sony',
        rating: 4.7,
        reviews: 312,
        isNew: true,
        description: 'Industry-leading noise cancellation',
    },
    {
        id: '4',
        name: 'Samsung Galaxy S23 Ultra',
        price: 1199,
        image: 'https://images.unsplash.com/photo-1678911820864-e5c67e784c22',
        category: 'Phones',
        brand: 'Samsung',
        rating: 4.8,
        reviews: 276,
        isNew: true,
        description: '200MP camera system with S Pen',
    },
    {
        id: '5',
        name: 'iPad Pro 12.9"',
        price: 1099,
        image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0',
        category: 'Tablets',
        brand: 'Apple',
        rating: 4.9,
        reviews: 156,
        isNew: false,
        description: 'Liquid Retina XDR display with M2 chip',
    },
    {
        id: '6',
        name: 'Dell XPS 15',
        price: 1899,
        image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45',
        category: 'Laptops',
        brand: 'Dell',
        rating: 4.6,
        reviews: 198,
        isNew: false,
        description: 'InfinityEdge display with RTX 4060',
    },
    {
        id: '7',
        name: 'AirPods Pro 2',
        price: 249,
        image: 'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434',
        category: 'Accessories',
        brand: 'Apple',
        rating: 4.8,
        reviews: 423,
        isNew: true,
        description: 'Active Noise Cancellation with Adaptive Audio',
    },
    {
        id: '8',
        name: 'ROG Zephyrus G14',
        price: 1699,
        image: 'https://images.unsplash.com/photo-1595327656903-2f54e37ce09b',
        category: 'Laptops',
        brand: 'ASUS',
        rating: 4.7,
        reviews: 167,
        isNew: false,
        description: 'AMD Ryzen 9 with RTX 4070',
    },
    {
        id: '9',
        name: 'Google Pixel 8 Pro',
        price: 999,
        image: 'https://images.unsplash.com/photo-1696426505229-c77d2448c210',
        category: 'Phones',
        brand: 'Google',
        rating: 4.7,
        reviews: 143,
        isNew: true,
        description: 'Advanced AI photography with Tensor G3',
    },
    {
        id: '10',
        name: 'Samsung Galaxy Watch 6',
        price: 399,
        image: 'https://images.unsplash.com/photo-1697493621335-3c776114716b',
        category: 'Smartwatches',
        brand: 'Samsung',
        rating: 4.6,
        reviews: 89,
        isNew: true,
        description: 'Advanced health tracking with BioActive Sensor',
    },
    {
        id: '11',
        name: 'Sony PlayStation 5',
        price: 499,
        image: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db',
        category: 'Gaming',
        brand: 'Sony',
        rating: 4.9,
        reviews: 487,
        isNew: true,
        description: 'Next-gen gaming with ray tracing and SSD',
    },
    {
        id: '12',
        name: 'Microsoft Surface Laptop 5',
        price: 1299,
        image: 'https://images.unsplash.com/photo-1625766763788-95dcce9bf5ac',
        category: 'Laptops',
        brand: 'Microsoft',
        rating: 4.7,
        reviews: 156,
        isNew: true,
        description: 'Perfect for productivity and style',
    },
    {
        id: '13',
        name: 'Bose QuietComfort 45',
        price: 329,
        image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b',
        category: 'Accessories',
        brand: 'Bose',
        rating: 4.8,
        reviews: 342,
        isNew: false,
        description: 'Premium noise cancelling headphones',
    },
    {
        id: '14',
        name: 'Samsung Galaxy Tab S9 Ultra',
        price: 1199,
        image: 'https://images.unsplash.com/photo-1632634571687-15ca5b5f59d7',
        category: 'Tablets',
        brand: 'Samsung',
        rating: 4.7,
        reviews: 189,
        isNew: true,
        description: 'Large screen tablet with S Pen support',
    },
    {
        id: '15',
        name: 'DJI Mini 3 Pro',
        price: 759,
        image: 'https://images.unsplash.com/photo-1473968512647-3e447244af8f',
        category: 'Drones',
        brand: 'DJI',
        rating: 4.6,
        reviews: 123,
        isNew: true,
        description: 'Compact drone with 4K camera',
    },
];

export const categories = [
    {
        id: 'phones',
        name: 'Smartphones',
        image: 'https://images.unsplash.com/photo-1616348436168-de43ad0db179',
        productCount: 24,
    },
    {
        id: 'laptops',
        name: 'Laptops',
        image: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1',
        productCount: 18,
    },
    {
        id: 'accessories',
        name: 'Accessories',
        image: 'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb',
        productCount: 36,
    },
    {
        id: 'tablets',
        name: 'Tablets',
        image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0',
        productCount: 12,
    },
    {
        id: 'smartwatches',
        name: 'Smartwatches',
        image: 'https://images.unsplash.com/photo-1697493621335-3c776114716b',
        productCount: 15,
    },
];

export const brands = [
    {
        id: 'apple',
        name: 'Apple',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg',
    },
    {
        id: 'samsung',
        name: 'Samsung',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/2/24/Samsung_Logo.svg',
    },
    {
        id: 'google',
        name: 'Google',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg',
    },
    {
        id: 'sony',
        name: 'Sony',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/c/c4/Sony_logo.svg',
    },
    {
        id: 'dell',
        name: 'Dell',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/8/82/Dell_Logo.png',
    },
];

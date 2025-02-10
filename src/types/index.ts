interface Product {
    id: string;
    tags: string[];
    main_product_image: {
        url: string;
    };
    created_at: string;
    updated_at: string;
    status: string;
    name: string;
    keywords: string;
    description: string;
    slug: string;
    price: string;
    min_amount: number;
    thin: string;
    inventory_level: number;
    available: boolean;
    condition: string;
    is_spare_part: boolean;
    requires_installation: boolean;
    meta_title: string;
    meta_description: string;
    average_rating: string;
    total_reviews: number;
    discount_price: string;
    discount_percentage: number;
    category: string;
    sub_category: string;
    brand: string;
    seller: string;
    variants: {
        id: string;
        name: string;
    }[];
    rating: number;
}

interface ProductDetail {
    id: string;
    created_at: string;
    updated_at: string;
    status: string;
    name: string;
    keywords: string;
    description: string;
    slug: string;
    price: string;
    main_product_image: string;
    min_amount: number;
    thin: string;
    inventory_level: number;
    available: boolean;
    condition: string;
    is_spare_part: boolean;
    requires_installation: boolean;
    meta_title: string;
    meta_description: string;
    average_rating: string;
    total_reviews: number;
    discount_price: string;
    discount_percentage: number;
    category: string;
    sub_category: string;
    brand: string;
    seller: {
        username: string;
        id: string;
    };
    variants: Array<{
        product: string;
        name: string;
        sku: string;
        price: string;
        quantity: number;
        min_buy_amount: number;
        attribute_values: Array<{
            attribute: string;
            values: Array<string>;
        }>;
        images: Array<unknown>;
        id: string;
        created_at: string;
        updated_at: string;
    }>;
    rating: number;
    reviews: Array<{
        product: string;
        user: {
            username: string;
            id: string;
        };
        rating: number;
        comment: string;
        id: string;
        verified: boolean;
        created_at: string;
        updated_at: string;
    }>;
    key_features: Array<string>;
}

interface Cart {
    id: string;
    created_at: string;
    updated_at: string;
    user: string;
    items: Array<{
        id: string;
        created_at: string;
        updated_at: string;
        quantity: number;
        cart: string;
        product: string;
    }>;
    item_count: number;
}

export interface NavItem {
    id: string;
    label: string;
    icon: React.ComponentType<any>;
    badge?: number;
}

export interface DashboardCard {
    title: string;
    value: string | number;
    icon: React.ComponentType<any>;
    trend?: number;
    className?: string;
}

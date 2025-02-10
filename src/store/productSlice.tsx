import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosInstance from '../helper/axiosInstance';

const initialProductDetailState: ProductDetail = {
    id: '',
    created_at: '',
    updated_at: '',
    status: '',
    name: '',
    keywords: '',
    description: '',
    slug: '',
    price: '',
    main_product_image: '',
    min_amount: 0,
    thin: '',
    inventory_level: 0,
    available: false,
    condition: '',
    is_spare_part: false,
    requires_installation: false,
    meta_title: '',
    meta_description: '',
    average_rating: '',
    total_reviews: 0,
    discount_price: '',
    discount_percentage: 0,
    category: '',
    sub_category: '',
    brand: '',
    seller: {
        username: '',
        id: '',
    },
    variants: [],
    rating: 0,
    reviews: [],
    key_features: [],
};

// Define the initial state type
interface ProductState {
    allProducts: object[];
    productDetail: ProductDetail;
    featuredProducts: object[];
    popularProducts: object[];
    loading: boolean;
    error: string | null;
}

// Define the initial state
const initialState: ProductState = {
    allProducts: [],
    featuredProducts: [],
    popularProducts: [],
    productDetail: initialProductDetailState,
    loading: false,
    error: null,
};

// Fetch all products
export const fetchProducts = createAsyncThunk('products/fetchAll', async () => {
    const response = await axiosInstance.get('/products/');
    console.log('all products1', response.data);
    return response.data;
});

export const fetchAProduct = createAsyncThunk('products/fetchOne', async (product_id: string) => {
    console.log('function initiated');
    const response = await axiosInstance.get(`/products/${product_id}/`);
    // const { data: related } = await axiosInstance.get(`/products/${product_id}/related`);
    return response.data;
});

// Fetch featured products
export const fetchFeaturedProducts = createAsyncThunk('products/featured', async () => {
    const response = await axiosInstance.get('/products/featured');
    return response.data;
});

// Fetch popular products
export const fetchPopularProducts = createAsyncThunk('products/popular', async () => {
    const response = await axiosInstance.get('/products/popular');
    return response.data;
});

// Search for products
export const searchProducts = createAsyncThunk('products/search', async (query: string) => {
    const response = await axiosInstance.get(`/products/search/?q=${query}`);
    return response.data;
});

// Product slice
const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.allProducts = action.payload;
                state.loading = false;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'An error occurred';
            })
            .addCase(fetchAProduct.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchAProduct.fulfilled, (state, action) => {
                state.productDetail = action.payload;
                state.loading = true;
            })
            .addCase(fetchAProduct.rejected, (state, action) => {
                state.loading = true;
            })
            .addCase(fetchFeaturedProducts.fulfilled, (state, action) => {
                state.featuredProducts = action.payload;
            })
            .addCase(fetchPopularProducts.fulfilled, (state, action) => {
                state.popularProducts = action.payload;
            })
            .addCase(searchProducts.fulfilled, (state, action) => {
                state.allProducts = action.payload;
            });
    },
});

// Export the reducer to be used in the store
export default productSlice.reducer;

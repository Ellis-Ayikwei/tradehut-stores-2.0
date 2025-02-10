import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useSwr from 'swr';
import Sidebar from '../../components/Navigation/Sidebar';
import ProductList from '../../components/Products/ProductList';
import fetcher from '../../helper/fetcher';
import { AppDispatch } from '../../store';
import { fetchProducts } from '../../store/productSlice';

interface SubCategory {
    category: string;
    created_at: string;
    id: string;
    sub_category_name: string;
    updated_at: string;
}

interface Category {
    created_at: string;
    description: string | null;
    id: string;
    name: string;
    updated_at: string;
}

interface FilterState {
    search: string;
    priceRange: { min: string; max: string };
    subCategories: string[];
    sortBy: string;
    inStock: boolean;
}

export default function AllProducts() {
    const dispatch = useDispatch<AppDispatch>();

    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
    const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
    const { data: categories, error: categoriesError } = useSwr('/categories/', fetcher);
    const { data: subCategories, error: subCategoriesError } = useSwr('/sub-categories/', fetcher);
    const allProducts = useSelector((state: any) => state.products?.allProducts || []);

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    useEffect(() => {
        if (allProducts) {
            setProducts(allProducts);
            setFilteredProducts(allProducts);
        }
    }, [allProducts]);

    console.log('all products', allProducts);
    const subCategoryList = subCategories ? subCategories.map((subcategory: SubCategory) => subcategory.sub_category_name) : [];
    const categoryList = categories ? categories?.map((category: Category) => category.name) : [];

    const [products, setProducts] = useState<Product[]>(allProducts);
    const [filteredProducts, setFilteredProducts] = useState<Product[]>(allProducts);

    const handleFilterChange = (filters: FilterState) => {
        let result = [...products];

        // Apply search filter
        if (filters.search) {
            const searchLower = filters.search.toLowerCase();
            result = result.filter((product) => product?.name.toLowerCase().includes(searchLower));
        }

        // Apply price range filter
        if (filters.priceRange.min !== '') {
            result = result.filter((product) => Number(product.price) >= Number(filters.priceRange.min));
        }
        if (filters.priceRange.max !== '') {
            result = result.filter((product) => Number(product.price) <= Number(filters.priceRange.max));
        }

        // Apply category filter
        if (filters.subCategories.length > 0) {
            result = result.filter((product) => filters.subCategories.includes(product?.sub_category));
        }

        // Apply in-stock filter
        if (filters.inStock) {
            result = result.filter((product) => product.inventory_level > 0);
        }

        // Apply sorting
        switch (filters.sortBy) {
            case 'price_low':
                result.sort((a, b) => Number(a.price) - Number(b.price));
                break;
            case 'price_high':
                result.sort((a, b) => Number(b.price) - Number(a.price));
                break;
            case 'newest':
                result.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
                break;
            default: // 'recommended'
                // Add your recommendation logic here
                break;
        }

        setFilteredProducts(result);
    };

    return (
        <div className="lg:col-span-3">
            <div className="flex gap-8 pt-10">
                <aside className="hidden md:block w-2/5 sticky top-4 h-fit h-screen overflow-y-scroll py-16">
                    <Sidebar
                        subCategories={subCategoryList}
                        categories={categoryList}
                        brands={['Apple', 'Samsung', 'Dell', 'HP', 'Lenovo']}
                        onCategoryChange={setSelectedCategories}
                        onBrandChange={setSelectedBrands}
                        onPriceChange={setPriceRange}
                        onFilterChange={handleFilterChange}
                    />
                </aside>

                <main className="">
                    <ProductList products={products} selectedCategories={selectedCategories} selectedBrands={selectedBrands} priceRange={priceRange} />
                </main>
            </div>
        </div>
    );
}

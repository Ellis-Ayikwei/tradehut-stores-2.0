import { useState } from 'react';
import Sidebar from '../../components/Navigation/Sidebar';
import ProductList from '../../components/Products/ProductList';
import { products } from '../../data/products';

export default function AllProducts() {
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
    const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
    const [sampleProducts] = useState(products);

    return (
        <div className="lg:col-span-3">
            <div className="flex gap-8 pt-10">
                <aside className="hidden md:block w-64 sticky top-4 h-fit h-screen overflow-y-scroll py-16">
                    <Sidebar
                        categories={['Phones', 'Laptops', 'Accessories', 'Tablets', 'Smartwatches']}
                        brands={['Apple', 'Samsung', 'Dell', 'HP', 'Lenovo']}
                        onCategoryChange={setSelectedCategories}
                        onBrandChange={setSelectedBrands}
                        onPriceChange={setPriceRange}
                    />
                </aside>

                <main className="flex-2">
                    <ProductList products={sampleProducts} selectedCategories={selectedCategories} selectedBrands={selectedBrands} priceRange={priceRange} />
                </main>
            </div>
        </div>
    );
}

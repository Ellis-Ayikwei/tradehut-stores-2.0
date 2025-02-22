import { Edit2, Package, Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import AddProductModal from '../../components/Seller/AddProductModal';
import { Product } from '../../types';

const ProductTable = ({ products, onDelete }: { products: Product[]; onDelete: (id: string) => void }) => (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Product</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Price</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Stock</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {products.map((product) => (
                        <tr key={product.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                    <div className="h-10 w-10 rounded-lg bg-gray-100 dark:bg-gray-600 flex items-center justify-center">
                                        <Package className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                                    </div>
                                    <div className="ml-4">
                                        <div className="text-sm font-medium text-gray-900 dark:text-white">{product.name}</div>
                                        <div className="text-sm text-gray-500 dark:text-gray-400">{product.category}</div>
                                    </div>
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900 dark:text-white">${product.price.toFixed(2)}</div>
                                {product.discount > 0 && <div className="text-xs text-red-500">-{product.discount}% off</div>}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900 dark:text-white">{product.stock}</div>
                                {product.stock < 10 && <div className="text-xs text-amber-500">Low stock</div>}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <span
                                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                  ${product.status === 'active' ? 'bg-green-100 text-green-800 dark:bg-green-800/20 dark:text-green-400' : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800/20 dark:text-yellow-400'}`}
                                >
                                    {product.status}
                                </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center space-x-3">
                                    <Link to={`/products/${product.id}`} className="text-gray-500 hover:text-[#dc711a] transition-colors">
                                        <Edit2 className="w-4 h-4" />
                                    </Link>
                                    <button onClick={() => onDelete(product.id)} className="text-gray-500 hover:text-red-500 transition-colors">
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
);

const ProductPage = () => {
    const [products, setProducts] = useState<Product[]>([
        {
            id: '1',
            name: 'iPhone 13 Pro',
            price: 999,
            category: 'Phones',
            status: 'active',
            tags: [],
            main_product_image: '',
            created_at: new Date(),
            updated_at: new Date(),
            description: '',
            discount: 0,
            stock: 100,
            // Add other required properties with default values
        },
        // Add more products as needed
    ]);

    const handleDeleteProduct = (id: string) => {
        setProducts(products.filter((product) => product.id !== id));
    };

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold dark:text-white">Products</h2>
                <button onClick={handleOpenModal} className="bg-[#dc711a] hover:bg-[#dc711a]/90 text-white px-4 py-2 rounded-lg transition-colors flex items-center space-x-2">
                    <Plus className="w-5 h-5" />
                    <span>Add Product</span>
                </button>
            </div>
            <ProductTable products={products} onDelete={handleDeleteProduct} />
            <AddProductModal isOpen={isModalOpen} onClose={handleCloseModal} onSubmit={handleCloseModal} />
        </div>
    );
};

export default ProductPage;

import { useEffect, useState } from 'react';
import ProductPriceDisplay from '../../components/pricing/prodDetailPricer';
import ProductListPriceDisplay from '../../components/Products/productListPrice';
import { Card } from '../../components/ui/Card';
import { ProductDetail, ProductVariant } from '../../types';

interface ProductVariantProps {
    productDetail: ProductDetail;
    onConfigChange: (config: any) => void;
}

const ProductVariantSelector = ({ productDetail, onConfigChange }: ProductVariantProps) => {
    const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null);

    const handleVariantSelect = (variant: ProductVariant) => {
        setSelectedVariant(variant);
    };

    useEffect(() => {
        if (!selectedVariant) {
            onConfigChange?.({
                variant: null,
                attributes: {},
                isComplete: false,
            });
            return;
        }

        const attributes = selectedVariant.attribute_values.reduce((acc, av) => {
            acc[av.attribute.name] = av.value;
            return acc;
        }, {} as Record<string, string>);

        onConfigChange?.({
            variant: selectedVariant,
            attributes,
            isComplete: true,
        });
    }, [selectedVariant]);

    const getAttribute = (variant: ProductVariant, name: string) => variant.attribute_values.find((av) => av.attribute.name === name);

    return (
        <div className="space-y-4 w-full max-w-2xl">
            {/* Selected Variant Display */}
            {selectedVariant && (
                <Card className="p-4 bg-gray-50 border border-gray-200">
                    <h3 className="text-lg font-semibold mb-2">Selected Item</h3>
                    <div className="space-y-1">
                        <p className="text-sm">
                            <span className="font-medium">SKU:</span> {selectedVariant.sku}
                        </p>
                        <p className="text-lg  text-red-600">
                            <ProductPriceDisplay productDetail={{ ...productDetail, price: selectedVariant.price.toString() }} />
                        </p>
                        <div className="flex items-center gap-2">
                            <span className="text-sm text-green-600">{selectedVariant.quantity > 0 ? 'In Stock' : 'Out of Stock'}</span>
                        </div>
                        <div className="flex flex-wrap gap-2 mt-2">
                            {selectedVariant.attribute_values.map((av) => (
                                <div key={av.id} className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded">
                                    {av.attribute.name === 'Color' && av.color_code && <span className="w-4 h-4 rounded-full border border-gray-300" style={{ backgroundColor: av.color_code }} />}
                                    <span className="text-sm text-gray-700">{av.value}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </Card>
            )}

            {/* Variants Grid */}
            <div className="space-y-3">
                <h3 className="text-lg font-semibold">Available Options</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {productDetail?.variants.map((variant) => {
                        const colorAttr = getAttribute(variant, 'Color');
                        const sizeAttr = getAttribute(variant, 'Size');
                        const styleAttr = getAttribute(variant, 'Style');
                        const isOutOfStock = variant.quantity <= 0;

                        return (
                            <button
                                key={variant.id}
                                onClick={() => handleVariantSelect(variant)}
                                disabled={isOutOfStock}
                                className={`
                                    p-3 border rounded-lg text-left transition-all
                                    ${selectedVariant?.id === variant.id ? 'border-2 border-primary bg-primary-50 shadow-md' : 'border-gray-300 hover:border-primary-300'}
                                    ${isOutOfStock ? 'opacity-50 cursor-not-allowed' : ''}
                                `}
                            >
                                <div className="flex flex-col gap-2">
                                    <div className="flex items-center gap-2">
                                        {colorAttr?.color_code && <span className="w-6 h-6 rounded-full border border-gray-200 shadow-sm" style={{ backgroundColor: colorAttr.color_code }} />}
                                        <div className="flex gap-1.5">
                                            {sizeAttr && <span className="text-sm font-medium bg-gray-100 px-2 py-1 rounded">{sizeAttr.value}</span>}
                                            {styleAttr && <span className="text-sm bg-gray-100 px-2 py-1 rounded">{styleAttr.value}</span>}
                                        </div>
                                    </div>
                                    <div className="mt-1">
                                        <p className="text-lg font-semibold text-gray-900">
                                            <ProductListPriceDisplay price={variant.price} discountPercent={productDetail.discount_percentage} final_price={productDetail.final_price} />
                                        </p>
                                        <p className={`text-sm ${isOutOfStock ? 'text-red-500' : 'text-green-600'}`}>{isOutOfStock ? 'Currently unavailable' : 'In Stock'}</p>
                                    </div>
                                </div>
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default ProductVariantSelector;

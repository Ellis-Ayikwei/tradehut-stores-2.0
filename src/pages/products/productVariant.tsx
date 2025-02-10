import { useEffect, useState } from 'react';
import { Card } from '../../components/ui/Card';

interface ProductVariantProps {
    productDetail: ProductDetail;
    onConfigChange: (config: any) => void;
}

const ProductVariantSelector = ({ productDetail, onConfigChange }: ProductVariantProps) => {
    const [selectedVariant, setSelectedVariant] = useState(null);
    const [selectedAttributes, setSelectedAttributes] = useState({});

    const handleVariantSelect = (variant) => {
        setSelectedVariant(variant);
        setSelectedAttributes({});
    };

    const handleAttributeValueSelect = (attribute, value) => {
        setSelectedAttributes((prev) => ({
            ...prev,
            [attribute]: value,
        }));
    };

    useEffect(() => {
        onConfigChange?.({
            variant: selectedVariant,
            attributes: selectedAttributes,
            isComplete: selectedVariant && selectedVariant.attribute_values.every((av) => selectedAttributes[av.attribute]),
        });
    }, [selectedVariant, selectedAttributes, onConfigChange]);

    return (
        <div className="space-y-4 w-full max-w-2xl">
            {/* Selected Options Display */}
            {selectedVariant && (
                <Card className="p-3 bg-blue-50">
                    <h3 className="text-sm font-medium mb-1">Selected Configuration:</h3>
                    <div className="space-y-0.5">
                        <p className="text-sm text-gray-700">Variant: {selectedVariant.name}</p>
                        {Object.entries(selectedAttributes).map(([attr, value]) => (
                            <p key={attr} className="text-sm text-gray-700">
                                {attr}: {value}
                            </p>
                        ))}
                    </div>
                </Card>
            )}

            {/* Variants Selection */}
            <div className="space-y-2">
                <h3 className="text-sm font-medium">Select Variant</h3>
                <div className="flex flex-wrap gap-1.5">
                    {productDetail?.variants.map((variant) => (
                        <button
                            key={variant.id}
                            onClick={() => handleVariantSelect(variant)}
                            className={`
                  py-1 px-3 rounded-md border text-sm transition-all
                  ${selectedVariant?.id === variant.id ? 'border-primary-600 bg-primary-50 text-primary-700' : 'border-gray-200 hover:bg-primary-50 hover:border-primary-600'}
                `}
                        >
                            {variant.name}
                        </button>
                    ))}
                </div>
            </div>

            {/* Attribute Selection */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {selectedVariant &&
                    selectedVariant.attribute_values.map((av) => (
                        <div key={av.attribute} className="space-y-1.5">
                            <h4 className="text-sm font-medium">{av.attribute}</h4>
                            <div className="flex flex-wrap gap-1.5">
                                {av.values.map((value) => (
                                    <button
                                        key={value}
                                        onClick={() => handleAttributeValueSelect(av.attribute, value)}
                                        className={`
                      py-1 px-3 rounded-md border text-sm transition-all
                      ${selectedAttributes[av.attribute] === value ? 'border-primary-600 bg-primary-50 text-primary-700' : 'border-gray-200 hover:bg-primary-50 hover:border-primary-600'}
                    `}
                                    >
                                        {value}
                                    </button>
                                ))}
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default ProductVariantSelector;

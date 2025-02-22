import { useEffect, useState } from 'react';
import { Card } from '../../components/ui/Card';
import { AttributeValue, ProductDetail, ProductVariant } from '../../types';

interface ProductVariantProps {
    productDetail: ProductDetail;
    onConfigChange: (config: any) => void;
}

const ProductVariantSelector = ({ productDetail, onConfigChange }: ProductVariantProps) => {
    const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null);
    const [selectedAttributes, setSelectedAttributes] = useState<Record<string, string>>({});

    const handleVariantSelect = (variant: ProductVariant) => {
        setSelectedVariant(variant);
        setSelectedAttributes({});
    };

    const handleAttributeValueSelect = (attribute: string, value: string) => {
        setSelectedAttributes((prev) => ({
            ...prev,
            [attribute]: value,
        }));
    };

    useEffect(() => {
        onConfigChange?.({
            variant: selectedVariant,
            attributes: selectedAttributes,
            isComplete: selectedVariant?.attribute_values.every((av) => selectedAttributes[av.attribute.name]),
        });
    }, [selectedVariant, selectedAttributes, onConfigChange]);

    return (
        <div className="space-y-4 w-full max-w-2xl">
            {/* Selected Options Display */}
            {selectedVariant && (
                <Card className="p-3 bg-blue-50">
                    <h3 className="text-sm font-medium mb-1">Selected Configuration:</h3>
                    <div className="space-y-0.5">
                        <p className="text-sm text-gray-700">Variant: {selectedVariant.sku}</p>
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
                {selectedVariant?.attribute_values.map((av: AttributeValue) => (
                    <div key={av.attribute.name} className="space-y-1.5">
                        <h4 className="text-sm font-medium">{av.attribute.name}</h4>
                        <div className="flex flex-wrap gap-1.5">
                            {[av.value].map((value: string) => (
                                <button
                                    key={value}
                                    onClick={() => handleAttributeValueSelect(av.attribute.name, value)}
                                    className={`
                          py-1 px-3 rounded-md border text-sm transition-all
                          ${selectedAttributes?.[av.attribute.name] === value ? 'border-primary-600 bg-primary-50 text-primary-700' : 'border-gray-200 hover:bg-primary-50 hover:border-primary-600'}
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

// import { useEffect, useState } from 'react';
// import { Card } from '../../components/ui/Card';

// interface AttributeValue {
//   id: string;
//   attribute: {
//     name: string;
//     display_type: string;
//   };
//   value: string;
//   color_code?: string;
// }

// interface ProductVariant {
//   id: string;
//   sku: string;
//   price: number;
//   quantity: number;
//   attribute_values: AttributeValue[];
//   images: Array<{ url: string; is_main: boolean }>;
// }

// interface ProductDetail {
//   id: string;
//   name: string;
//   variation_theme: string;
//   variants: ProductVariant[];
// }

// interface ProductVariantProps {
//   productDetail: ProductDetail;
//   onConfigChange: (config: any) => void;
// }

// const ProductVariantSelector = ({ productDetail, onConfigChange }: ProductVariantProps) => {
//   const [selectedAttributes, setSelectedAttributes] = useState<Record<string, AttributeValue>>({});
//   const [availableOptions, setAvailableOptions] = useState<Record<string, AttributeValue[]>>({});

//   // Get unique attributes from variation theme
//   const attributes = Array.from(new Set(
//     productDetail.variants.flatMap(v =>
//       v.attribute_values.map(av => av.attribute.name)
//     ))
//   )

//   // Initialize available options
//   useEffect(() => {
//     const initialOptions = attributes.reduce((acc, attr) => {
//       acc[attr] = getUniqueAttributeValues(attr);
//       return acc;
//     }, {} as Record<string, AttributeValue[]>);

//     setAvailableOptions(initialOptions);
//   }, [productDetail]);

//   // Update available options when attributes change
//   useEffect(() => {
//     const newAvailableOptions = { ...availableOptions };

//     attributes.forEach(attr => {
//       newAvailableOptions[attr] = getAvailableValuesForAttribute(attr);
//     });

//     setAvailableOptions(newAvailableOptions);
//   }, [selectedAttributes]);

//   // Find matching variant based on selected attributes
//   const selectedVariant = productDetail.variants.find(variant =>
//     variant.attribute_values.every(av =>
//       selectedAttributes[av.attribute.name]?.id === av.id
//     )
//   );

//   // Get unique values for an attribute
//   const getUniqueAttributeValues = (attributeName: string) => {
//     return productDetail.variants
//       .flatMap(v => v.attribute_values)
//       .filter(av => av.attribute.name === attributeName)
//       .filter((av, index, self) =>
//         self.findIndex(a => a.id === av.id) === index
//       );
//   };

//   // Get available values considering current selections
//   const getAvailableValuesForAttribute = (attributeName: string): AttributeValue[] => {
//     const tempAttributes = { ...selectedAttributes };
//     delete tempAttributes[attributeName];

//     return productDetail.variants
//       .filter(variant =>
//         Object.entries(tempAttributes).every(([key, value]) =>
//           variant.attribute_values.some(av =>
//             av.attribute.name === key && av.id === value.id
//           )
//         )
//       )
//       .flatMap(v =>
//         v.attribute_values
//       )
//       .filter(av => av.attribute.name === attributeName)
//       .filter((av, index, self) =>
//         self.findIndex(a => a.id === av.id) === index
//       );
//   };

//   const handleAttributeSelect = (attribute: string, value: AttributeValue) => {
//     setSelectedAttributes(prev => {
//       const newAttributes = { ...prev };
//       if (prev[attribute]?.id === value.id) {
//         delete newAttributes[attribute];
//       } else {
//         newAttributes[attribute] = value;
//       }
//       return newAttributes;
//     });
//   };

//   useEffect(() => {
//     onConfigChange?.({
//       variant: selectedVariant,
//       attributes: selectedAttributes,
//       isComplete: selectedVariant !== undefined
//     });
//   }, [selectedVariant, selectedAttributes]);

//   return (
//     <div className="space-y-4 w-full max-w-2xl">
//       {/* Selected Configuration */}
//       {selectedVariant && (
//         <Card className="p-3 bg-blue-50">
//           <h3 className="text-sm font-medium mb-1">Selected Configuration:</h3>
//           <div className="space-y-0.5">
//             <p className="text-sm text-gray-700">SKU: {selectedVariant.sku}</p>
//             {Object.entries(selectedAttributes).map(([attrName, attrValue]) => (
//               <p key={attrName} className="text-sm text-gray-700">
//                 {attrName}: {attrValue.value}
//               </p>
//             ))}
//             <p className="text-sm text-gray-700">
//               Price: ${selectedVariant.price.toFixed(2)}
//             </p>
//             <p className="text-sm text-gray-700">
//               Stock: {selectedVariant.quantity} available
//             </p>
//           </div>
//         </Card>
//       )}

//       {/* Attribute Selectors */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
//         {attributes.map(attribute => (
//           <div key={attribute} className="space-y-1.5">
//             <h4 className="text-sm font-medium">{attribute}</h4>
//             <div className="flex flex-wrap gap-1.5">
//               {availableOptions[attribute]?.map(av => {
//                 const isSelected = selectedAttributes[attribute]?.id === av.id;
//                 const isAvailable = productDetail.variants.some(variant =>
//                   variant.attribute_values.some(attributeValue => attributeValue.id === av.id) && variant.quantity > 0
//                 );

//                 return (
//                   <button
//                     key={av.id}
//                     onClick={() => handleAttributeSelect(attribute, av)}
//                     className={`
//                       py-1 px-3 rounded-md border text-sm transition-all
//                       ${isSelected
//                         ? 'border-primary-600 bg-primary-50 text-primary-700'
//                         : 'border-gray-200 hover:border-primary-200'}
//                       ${!isAvailable ? 'opacity-50 cursor-not-allowed' : ''}
//                     `}
//                     disabled={!isAvailable}
//                     title={!isAvailable ? "Out of stock" : ""}
//                   >
//                     {av.attribute.display_type === 'swatch' ? (
//                       <div className="flex items-center gap-1.5">
//                         <div
//                           className="w-4 h-4 rounded-full border"
//                           style={{ backgroundColor: av.color_code }}
//                         />
//                         {av.value}
//                       </div>
//                     ) : (
//                       av.value
//                     )}
//                   </button>
//                 );
//               })}
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Inventory Warning */}
//       {selectedVariant?.quantity === 0 && (
//         <div className="text-sm text-red-600">
//           This combination is currently out of stock
//         </div>
//       )}
//     </div>
//   );
// };

// export default ProductVariantSelector;

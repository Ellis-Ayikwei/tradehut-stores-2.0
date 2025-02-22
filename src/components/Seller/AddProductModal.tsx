'use client';

import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';

interface ProductVariant {
  id: string;
  color?: string;
  size?: string;
  style?: string;
  sku: string;
  price: number;
  quantity: number;
  images: File[]; // New: variant images
}

interface ProductFormData {
  name: string;
  keywords: string;
  description: string;
  category: string;
  sub_category: string;
  brand: string;
  condition: string; // e.g. "New", "Used - Fair", etc.
  variation_theme: string; // e.g. "size-color-style"
  discount_percentage: number;
  inventory_level: number;
  meta_title: string;
  meta_description: string;
  available: boolean;
  is_spare_part: boolean;
  requires_installation: boolean;
  main_product_image: File | null;
  key_features: string[];
  variants: ProductVariant[];
}

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (product: ProductFormData) => void;
}

export default function AddProductModal({ isOpen, onClose, onSubmit }: AddProductModalProps) {
  const [formData, setFormData] = useState<ProductFormData>({
    name: '',
    keywords: '',
    description: '',
    category: '',
    sub_category: '',
    brand: '',
    condition: 'New',
    variation_theme: 'single',
    discount_percentage: 0,
    inventory_level: 0,
    meta_title: '',
    meta_description: '',
    available: true,
    is_spare_part: false,
    requires_installation: false,
    main_product_image: null,
    key_features: [],
    variants: [],
  });

  const [currentVariant, setCurrentVariant] = useState<ProductVariant>({
    id: '',
    color: '',
    size: '',
    style: '',
    sku: '',
    price: 0,
    quantity: 0,
    images: [], // Initialize as empty array
  });

  const addVariant = () => {
    setFormData((prev) => ({
      ...prev,
      variants: [...prev.variants, { ...currentVariant, id: Date.now().toString() }],
    }));
    setCurrentVariant({
      id: '',
      color: '',
      size: '',
      style: '',
      sku: '',
      price: 0,
      quantity: 0,
      images: [],
    });
  };

  const removeVariant = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      variants: prev.variants.filter((v) => v.id !== id),
    }));
  };

  const addKeyFeature = () => {
    setFormData((prev) => ({
      ...prev,
      key_features: [...prev.key_features, ''],
    }));
  };

  const updateKeyFeature = (index: number, value: string) => {
    const newFeatures = [...formData.key_features];
    newFeatures[index] = value;
    setFormData((prev) => ({ ...prev, key_features: newFeatures }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({
        ...prev,
        main_product_image: e.target.files[0],
      }));
    }
  };

  // New: Handler for variant file changes (allows multiple files)
  const handleVariantFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setCurrentVariant((prev) => ({
        ...prev,
        images: Array.from(e.target.files),
      }));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleVariantChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setCurrentVariant((prev) => ({
      ...prev,
      [name]: type === 'number' ? Number(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child 
          as={Fragment}
          enter="ease-out duration-300" 
          enterFrom="opacity-0" 
          enterTo="opacity-100" 
          leave="ease-in duration-200" 
          leaveFrom="opacity-100" 
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-30" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Dialog.Panel className="w-full max-w-3xl transform overflow-hidden rounded-2xl bg-white p-6 shadow-xl transition-all">
              <Dialog.Title className="text-2xl font-bold text-gray-900 mb-6 border-b pb-2">
                Add New Product
              </Dialog.Title>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Basic Information */}
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-gray-800">Basic Information</h4>
                  {/* (Basic fields similar to previous code) */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Product Name</label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Keywords</label>
                      <input
                        type="text"
                        name="keywords"
                        value={formData.keywords}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea
                      name="description"
                      required
                      value={formData.description}
                      onChange={handleChange}
                      rows={4}
                      className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Category</label>
                      <input
                        type="text"
                        name="category"
                        required
                        value={formData.category}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Sub Category</label>
                      <input
                        type="text"
                        name="sub_category"
                        required
                        value={formData.sub_category}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Brand</label>
                      <input
                        type="text"
                        name="brand"
                        required
                        value={formData.brand}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Condition</label>
                      <select
                        name="condition"
                        value={formData.condition}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
                      >
                        <option value="New">New</option>
                        <option value="Used - Like New">Used - Like New</option>
                        <option value="Used - Good">Used - Good</option>
                        <option value="Used - Fair">Used - Fair</option>
                        <option value="Refurbished">Refurbished</option>
                      </select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Variation Theme</label>
                      <select
                        name="variation_theme"
                        value={formData.variation_theme}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
                      >
                        <option value="single">Single Product</option>
                        <option value="size">Size</option>
                        <option value="color">Color</option>
                        <option value="size-color">Size &amp; Color</option>
                        <option value="size-color-style">Size, Color &amp; Style</option>
                        <option value="custom">Custom</option>
                      </select>
                    </div>
                    <div className="flex items-center space-x-2 mt-6">
                      <input
                        type="checkbox"
                        name="available"
                        checked={formData.available}
                        onChange={handleChange}
                        className="h-4 w-4"
                      />
                      <label className="text-sm font-medium text-gray-700">Available</label>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Discount (%)</label>
                      <input
                        type="number"
                        name="discount_percentage"
                        value={formData.discount_percentage}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Inventory Level</label>
                      <input
                        type="number"
                        name="inventory_level"
                        value={formData.inventory_level}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Meta Title</label>
                      <input
                        type="text"
                        name="meta_title"
                        value={formData.meta_title}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Meta Description</label>
                      <textarea
                        name="meta_description"
                        value={formData.meta_description}
                        onChange={handleChange}
                        rows={3}
                        className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
                      />
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        name="is_spare_part"
                        checked={formData.is_spare_part}
                        onChange={handleChange}
                        className="h-4 w-4"
                      />
                      <label className="ml-2 text-sm text-gray-700">Spare Part</label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        name="requires_installation"
                        checked={formData.requires_installation}
                        onChange={handleChange}
                        className="h-4 w-4"
                      />
                      <label className="ml-2 text-sm text-gray-700">Requires Installation</label>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Main Product Image</label>
                    <input type="file" onChange={handleFileChange} className="mt-1 block" />
                    {formData.main_product_image && (
                      <p className="mt-2 text-sm text-gray-600">{formData.main_product_image.name}</p>
                    )}
                  </div>
                </div>

                {/* Product Variants */}
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-gray-800">Product Variants</h4>
                  {formData.variants.length > 0 && (
                    <div className="space-y-4">
                      {formData.variants.map((variant) => (
                        <div key={variant.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border">
                          <div className="flex items-center space-x-4">
                            {variant.color && (
                              <div
                                className="w-6 h-6 rounded-full border border-gray-200"
                                style={{ backgroundColor: variant.color }}
                              />
                            )}
                            <div>
                              {variant.size && <p className="text-sm text-gray-700">Size: {variant.size}</p>}
                              {variant.style && <p className="text-sm text-gray-700">Style: {variant.style}</p>}
                              <p className="text-sm text-gray-700">Price: ${variant.price}</p>
                              <p className="text-sm text-gray-700">Stock: {variant.quantity}</p>
                              <p className="text-sm text-gray-700">SKU: {variant.sku}</p>
                              {variant.images.length > 0 && (
                                <div className="flex space-x-2 mt-2">
                                  {variant.images.map((file, idx) => (
                                    <div key={idx} className="w-8 h-8 border rounded">
                                      <p className="text-xs text-gray-500">{file.name.slice(0, 4)}</p>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeVariant(variant.id)}
                            className="text-red-500 hover:text-red-700 text-sm"
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                  <div className="grid grid-cols-3 gap-4">
                    <input
                      type="text"
                      name="color"
                      placeholder="Color (hex)"
                      value={currentVariant.color}
                      onChange={handleVariantChange}
                      className="rounded-md border border-gray-300 p-2"
                    />
                    <input
                      type="text"
                      name="size"
                      placeholder="Size"
                      value={currentVariant.size}
                      onChange={handleVariantChange}
                      className="rounded-md border border-gray-300 p-2"
                    />
                    <input
                      type="text"
                      name="style"
                      placeholder="Style"
                      value={currentVariant.style}
                      onChange={handleVariantChange}
                      className="rounded-md border border-gray-300 p-2"
                    />
                    <input
                      type="text"
                      name="sku"
                      placeholder="SKU"
                      value={currentVariant.sku}
                      onChange={handleVariantChange}
                      className="rounded-md border border-gray-300 p-2 col-span-2"
                    />
                    <input
                      type="number"
                      name="price"
                      placeholder="Price"
                      value={currentVariant.price}
                      onChange={handleVariantChange}
                      className="rounded-md border border-gray-300 p-2"
                    />
                    <input
                      type="number"
                      name="quantity"
                      placeholder="Stock"
                      value={currentVariant.quantity}
                      onChange={handleVariantChange}
                      className="rounded-md border border-gray-300 p-2"
                    />
                    {/* Variant Images Input */}
                    <input
                      type="file"
                      multiple
                      onChange={handleVariantFileChange}
                      className="rounded-md border border-gray-300 p-2 col-span-3"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={addVariant}
                    className="w-full py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
                  >
                    Add Variant
                  </button>
                </div>

                {/* Key Features */}
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-gray-800">Key Features</h4>
                  {formData.key_features.map((feature, idx) => (
                    <input
                      key={idx}
                      type="text"
                      placeholder="Enter feature"
                      value={feature}
                      onChange={(e) => updateKeyFeature(idx, e.target.value)}
                      className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
                    />
                  ))}
                  <button
                    type="button"
                    onClick={addKeyFeature}
                    className="w-full py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
                  >
                    Add Feature
                  </button>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end space-x-4 pt-4 border-t">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
                  >
                    Add Product
                  </button>
                </div>
              </form>
            </Dialog.Panel>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

import { faImage, faMicrophone, faPaperPlane, faSpinner, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AnimatePresence, motion } from 'framer-motion';
import React, { useRef, useState } from 'react';

interface OrderForMeModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const OrderForMeModal = ({ isOpen, onClose }: OrderForMeModalProps) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        description: '',
        budget: '',
        deadline: '',
        shippingAddress: '',
        additionalNotes: '',
    });
    const [images, setImages] = useState<string[]>([]);
    const [isRecording, setIsRecording] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files) {
            const newImages = Array.from(files).map((file) => URL.createObjectURL(file));
            setImages((prev) => [...prev, ...newImages]);
        }
    };

    const handleVoiceRecord = () => {
        setIsRecording(!isRecording);
        // Implement voice recording logic here
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        // Implement submission logic here
        await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulated delay
        setIsLoading(false);
        onClose();
    };

    const removeImage = (index: number) => {
        setImages((prev) => prev.filter((_, i) => i !== index));
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden shadow-xl"
                    >
                        <div className="p-6 flex justify-between items-center border-b">
                            <div>
                                <h2 className="text-2xl font-bold">Order for Me</h2>
                                <p className="text-sm text-gray-500">Tell us what you're looking for and we'll help you find it</p>
                            </div>
                            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                                <FontAwesomeIcon icon={faTimes} className="w-5 h-5" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6 space-y-6 overflow-y-auto max-h-[calc(90vh-140px)]">
                            {/* Contact Information */}
                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                                        placeholder="Your name"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                                        placeholder="Your contact number"
                                        required
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                                        placeholder="Your email"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Product Description */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">What are you looking for? *</label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                                    rows={4}
                                    placeholder="Describe what you're looking for in detail"
                                    required
                                />
                            </div>

                            {/* Additional Information */}
                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Budget Range *</label>
                                    <input
                                        type="text"
                                        name="budget"
                                        value={formData.budget}
                                        onChange={handleChange}
                                        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                                        placeholder="Your budget range"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Needed By</label>
                                    <input
                                        type="date"
                                        name="deadline"
                                        value={formData.deadline}
                                        onChange={handleChange}
                                        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                                    />
                                </div>
                            </div>

                            {/* Shipping Address */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Shipping Address *</label>
                                <textarea
                                    name="shippingAddress"
                                    value={formData.shippingAddress}
                                    onChange={handleChange}
                                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                                    rows={3}
                                    placeholder="Enter your shipping address"
                                    required
                                />
                            </div>

                            {/* Image Upload */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Reference Images</label>
                                <div className="grid grid-cols-4 gap-4 mb-4">
                                    {images.map((img, index) => (
                                        <div key={index} className="relative group">
                                            <img src={img} alt="Reference" className="w-full h-24 object-cover rounded-lg" />
                                            <button
                                                type="button"
                                                onClick={() => removeImage(index)}
                                                className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                            >
                                                <FontAwesomeIcon icon={faTimes} className="w-3 h-3" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                                <div className="flex gap-4">
                                    <button type="button" onClick={() => fileInputRef.current?.click()} className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50">
                                        <FontAwesomeIcon icon={faImage} />
                                        <span>Add Images</span>
                                    </button>
                                    <button
                                        type="button"
                                        onClick={handleVoiceRecord}
                                        className={`flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50 ${isRecording ? 'text-red-500' : ''}`}
                                    >
                                        <FontAwesomeIcon icon={faMicrophone} className={isRecording ? 'animate-pulse' : ''} />
                                        <span>{isRecording ? 'Recording...' : 'Voice Note'}</span>
                                    </button>
                                </div>
                                <input type="file" ref={fileInputRef} onChange={handleImageUpload} multiple accept="image/*" className="hidden" />
                            </div>

                            {/* Additional Notes */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Additional Notes</label>
                                <textarea
                                    name="additionalNotes"
                                    value={formData.additionalNotes}
                                    onChange={handleChange}
                                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                                    rows={3}
                                    placeholder="Any other details or special requirements?"
                                />
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full py-3 bg-black text-white rounded-lg font-semibold hover:bg-gray-900 transition-colors flex items-center justify-center gap-2"
                            >
                                {isLoading ? (
                                    <>
                                        <FontAwesomeIcon icon={faSpinner} className="animate-spin" />
                                        <span>Processing...</span>
                                    </>
                                ) : (
                                    <>
                                        <FontAwesomeIcon icon={faPaperPlane} />
                                        <span>Submit Request</span>
                                    </>
                                )}
                            </button>
                        </form>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default OrderForMeModal;

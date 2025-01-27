import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faChevronLeft, faChevronRight, faExpand, faCompress } from '@fortawesome/free-solid-svg-icons';

interface LookbookImage {
    src: string;
    title: string;
    description: string;
    collection: string;
}

const lookbookImages: LookbookImage[] = [
    {
        src: 'https://images.unsplash.com/photo-1523398002811-999ca8dec234',
        title: 'Urban Essentials',
        description: 'Minimalist streetwear pieces for the modern wardrobe',
        collection: 'FW 2025',
    },
    {
        src: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8',
        title: 'Street Culture',
        description: 'Bold statements meet comfortable silhouettes',
        collection: 'FW 2025',
    },
    {
        src: 'https://images.unsplash.com/photo-1544441893-675973e31985',
        title: 'Contemporary Classic',
        description: 'Timeless pieces reimagined for today',
        collection: 'FW 2025',
    },
    {
        src: 'https://images.unsplash.com/photo-1509631179647-0177331693ae',
        title: 'Urban Explorer',
        description: 'Versatile pieces for the city adventurer',
        collection: 'FW 2025',
    },
    {
        src: 'https://images.unsplash.com/photo-1516826957135-700dedea698c',
        title: 'Monochrome Edit',
        description: 'Essential black and white pieces for any wardrobe',
        collection: 'FW 2025',
    },
    {
        src: 'https://images.unsplash.com/photo-1495385794356-15371f348c31',
        title: 'Athleisure',
        description: 'Where comfort meets style in perfect harmony',
        collection: 'FW 2025',
    },
    {
        src: 'https://images.unsplash.com/photo-1507680434567-5739c80be1ac',
        title: 'Minimalist Collection',
        description: 'Clean lines and simple silhouettes for the modern minimalist',
        collection: 'FW 2025',
    },
    {
        src: 'https://images.unsplash.com/photo-1536766820879-059fec98ec0a',
        title: 'Denim Culture',
        description: 'Premium denim pieces for everyday style',
        collection: 'FW 2025',
    },
    {
        src: 'https://images.unsplash.com/photo-1611312449408-fcece27cdbb7',
        title: 'Luxury Essentials',
        description: 'Premium materials and exceptional craftsmanship',
        collection: 'FW 2025',
    },
];

interface LookbookModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const LookbookModal: React.FC<LookbookModalProps> = ({ isOpen, onClose }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [isZoomed, setIsZoomed] = useState(false);

    const nextImage = () => {
        setCurrentIndex((prev) => (prev + 1) % lookbookImages.length);
    };

    const previousImage = () => {
        setCurrentIndex((prev) => (prev - 1 + lookbookImages.length) % lookbookImages.length);
    };

    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
            setIsFullscreen(true);
        } else {
            document.exitFullscreen();
            setIsFullscreen(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center bg-black/95">
                    {/* Close Button */}
                    <button onClick={onClose} className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors z-50">
                        <FontAwesomeIcon icon={faTimes} className="w-6 h-6" />
                    </button>

                    {/* Fullscreen Button */}
                    <button onClick={toggleFullscreen} className="absolute top-4 left-4 text-white/50 hover:text-white transition-colors z-50">
                        <FontAwesomeIcon icon={isFullscreen ? faCompress : faExpand} className="w-6 h-6" />
                    </button>

                    {/* Navigation Buttons */}
                    <button onClick={previousImage} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors z-50">
                        <FontAwesomeIcon icon={faChevronLeft} className="w-8 h-8" />
                    </button>
                    <button onClick={nextImage} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors z-50">
                        <FontAwesomeIcon icon={faChevronRight} className="w-8 h-8" />
                    </button>

                    {/* Main Content */}
                    <div className="w-full max-w-7xl mx-auto px-4">
                        <div className="relative aspect-[3/4] md:aspect-[16/9] overflow-hidden rounded-lg">
                            <motion.div
                                className="absolute inset-0 flex items-center justify-center"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                            >
                                <div
                                    className={`relative w-full h-full cursor-pointer transition-transform duration-500 ${isZoomed ? 'scale-150' : 'scale-100'}`}
                                    onClick={() => setIsZoomed(!isZoomed)}
                                >
                                    <img src={lookbookImages[currentIndex].src} alt={lookbookImages[currentIndex].title} className="w-full h-full object-cover" />
                                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/50" />
                                </div>
                            </motion.div>

                            {/* Image Info */}
                            <motion.div className="absolute bottom-0 left-0 right-0 p-8 text-white" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                                <div className="max-w-3xl mx-auto text-center">
                                    <span className="text-sm font-medium tracking-wider text-white/70">{lookbookImages[currentIndex].collection}</span>
                                    <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-3">{lookbookImages[currentIndex].title}</h2>
                                    <p className="text-lg text-white/80">{lookbookImages[currentIndex].description}</p>
                                </div>
                            </motion.div>
                        </div>

                        {/* Thumbnails */}
                        <motion.div className="mt-4 flex justify-center gap-2" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                            {lookbookImages.map((image, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentIndex(index)}
                                    className={`w-16 h-16 rounded-lg overflow-hidden transition-all ${currentIndex === index ? 'ring-2 ring-white scale-110' : 'opacity-50 hover:opacity-100'}`}
                                >
                                    <img src={image.src} alt={image.title} className="w-full h-full object-cover" />
                                </button>
                            ))}
                        </motion.div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default LookbookModal;

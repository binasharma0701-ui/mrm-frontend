import React, { useState, useEffect } from 'react';
import { FiX, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { offerService } from '../../services/offer.service';
import { getImageUrl } from '../../app/config';

export default function OffersModal({ isOpen, onClose }) {
    const [offers, setOffers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (isOpen) {
            fetchOffers();
        } else {
            // Reset state when closed
            setCurrentIndex(0);
        }
    }, [isOpen]);

    const fetchOffers = async () => {
        try {
            setLoading(true);
            const res = await offerService.getAllOffers();
            if (res.success) {
                setOffers(res.data);
            }
        } catch (error) {
            console.error('Failed to load offers:', error);
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    const handleNext = (e) => {
        e.stopPropagation();
        setCurrentIndex((prev) => (prev + 1) % offers.length);
    };

    const handlePrev = (e) => {
        e.stopPropagation();
        setCurrentIndex((prev) => (prev - 1 + offers.length) % offers.length);
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm transition-opacity" onClick={onClose}>
            <div
                className="relative bg-white rounded-2xl shadow-2xl overflow-hidden max-w-4xl w-full max-h-[90vh] flex flex-col transform transition-all"
                onClick={e => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/10 hover:bg-black/20 text-gray-800 flex items-center justify-center transition-colors backdrop-blur-md"
                    title="Close Offers"
                >
                    <FiX className="w-5 h-5" />
                </button>

                <div className="flex-1 overflow-auto bg-gray-50 flex items-center justify-center p-4 min-h-[300px]">
                    {loading ? (
                        <div className="flex flex-col items-center text-primary">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
                            <p className="font-semibold animate-pulse">Loading Offers...</p>
                        </div>
                    ) : offers.length === 0 ? (
                        <div className="text-center p-8">
                            <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4 text-primary">
                                <span className="text-2xl font-bold font-serif">%</span>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">No Active Offers</h3>
                            <p className="text-gray-500">Check back later for exciting new promotions!</p>
                        </div>
                    ) : (
                        <div className="relative w-full h-full flex items-center justify-center">
                            <img
                                src={getImageUrl(offers[currentIndex].image)}
                                alt={`Offer ${currentIndex + 1}`}
                                className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-sm"
                            />

                            {offers.length > 1 && (
                                <>
                                    <button
                                        onClick={handlePrev}
                                        className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/80 hover:bg-white text-primary flex items-center justify-center shadow-lg backdrop-blur-md transition-all transform hover:scale-110"
                                    >
                                        <FiChevronLeft className="w-6 h-6" />
                                    </button>
                                    <button
                                        onClick={handleNext}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/80 hover:bg-white text-primary flex items-center justify-center shadow-lg backdrop-blur-md transition-all transform hover:scale-110"
                                    >
                                        <FiChevronRight className="w-6 h-6" />
                                    </button>

                                    <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                                        {offers.map((_, idx) => (
                                            <button
                                                key={idx}
                                                onClick={(e) => { e.stopPropagation(); setCurrentIndex(idx); }}
                                                className={`w-2.5 h-2.5 rounded-full transition-all ${currentIndex === idx ? 'bg-primary w-6' : 'bg-white/50 hover:bg-white/80'
                                                    }`}
                                                aria-label={`Go to slide ${idx + 1}`}
                                            />
                                        ))}
                                    </div>
                                </>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

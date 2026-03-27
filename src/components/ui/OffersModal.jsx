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
        <div className="fixed inset-0 z-[1100] flex items-center justify-center p-4 sm:p-6 bg-black/70 backdrop-blur-md transition-opacity" onClick={onClose} style={{ zIndex: 'var(--z-modal)' }}>
            <div
                className="relative rounded-3xl shadow-2xl overflow-hidden max-w-4xl w-full max-h-[90vh] flex flex-col transform transition-all"
                style={{ background: 'var(--color-bg-alt)', border: '1px solid var(--color-border)' }}
                onClick={e => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    className="absolute top-5 right-5 z-20 w-11 h-11 rounded-full bg-black/10 hover:bg-black/20 flex items-center justify-center transition-all backdrop-blur-xl group"
                    style={{ color: 'var(--color-text)' }}
                    title="Close Offers"
                >
                    <FiX className="w-6 h-6 group-hover:rotate-90 transition-transform" />
                </button>

                <div className="flex-1 flex items-center justify-center p-4 sm:p-12 relative" style={{ background: 'var(--color-bg)', minHeight: '450px' }}>
                    {loading ? (
                        <div className="flex flex-col items-center" style={{ color: 'var(--color-primary)' }}>
                            <div className="animate-spin rounded-full h-14 w-14 border-b-2 border-primary mb-6" style={{ borderColor: 'var(--color-primary)' }}></div>
                            <p className="font-bold tracking-[0.2em] animate-pulse uppercase text-xs">Awaiting Divine Offers...</p>
                        </div>
                    ) : offers.length === 0 ? (
                        <div className="text-center p-6 animate-slide-up">
                            <div className="text-7xl mb-6 animate-bounce">🏵️</div>
                            <h3 className="text-2xl font-black mb-2" style={{ color: 'var(--color-text)' }}>No Offers Right Now</h3>
                            <p className="text-sm opacity-60" style={{ color: 'var(--color-text)' }}>Check back soon! ✨</p>
                        </div>
                    ) : (
                        <div className="w-full h-full flex items-center justify-center">
                            <div className="relative animate-float">
                                <div className="absolute inset-0 bg-primary/20 blur-[60px] rounded-full animate-divine -z-10"></div>
                                <img
                                    src={getImageUrl(offers[currentIndex].image)}
                                    alt={`Offer ${currentIndex + 1}`}
                                    className="max-w-full max-h-[65vh] object-contain rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] border-8 border-white dark:border-gray-800 transition-all duration-700 hover:scale-[1.02]"
                                />
                                
                                {offers.length > 1 && (
                                    <div className="absolute -bottom-16 left-0 right-0 flex justify-center gap-4">
                                        {offers.map((_, idx) => (
                                            <button
                                                key={idx}
                                                onClick={(e) => { e.stopPropagation(); setCurrentIndex(idx); }}
                                                className={`h-1.5 rounded-full transition-all duration-700 ${currentIndex === idx ? 'w-12 bg-primary' : 'w-3 bg-gray-300 dark:bg-gray-700 hover:w-6'}`}
                                                style={{ background: currentIndex === idx ? 'var(--color-primary)' : '' }}
                                                aria-label={`Go to slide ${idx + 1}`}
                                            />
                                        ))}
                                    </div>
                                )}
                            </div>

                            {offers.length > 1 && (
                                <>
                                    <button
                                        onClick={handlePrev}
                                        className="absolute left-4 top-1/2 -translate-y-1/2 w-14 h-14 sm:w-20 sm:h-20 rounded-full flex items-center justify-center bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 shadow-2xl transition-all transform hover:scale-110 active:scale-90 group z-50"
                                        style={{ color: 'var(--color-primary)' }}
                                    >
                                        <FiChevronLeft className="w-8 h-8 sm:w-12 sm:h-12" />
                                    </button>
                                    <button
                                        onClick={handleNext}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 w-14 h-14 sm:w-20 sm:h-20 rounded-full flex items-center justify-center bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 shadow-2xl transition-all transform hover:scale-110 active:scale-90 group z-50"
                                        style={{ color: 'var(--color-primary)' }}
                                    >
                                        <FiChevronRight className="w-8 h-8 sm:w-12 sm:h-12" />
                                    </button>
                                </>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

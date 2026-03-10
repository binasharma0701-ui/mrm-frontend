import { useState, useEffect } from 'react';
import axios from 'axios';
import { FiX, FiUser, FiPhone, FiChevronRight } from 'react-icons/fi';
import './LeadPopup.css';

const LeadPopup = () => {
    const [show, setShow] = useState(false);
    const [formData, setFormData] = useState({ name: '', phone: '' });
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        // Show popup after 3 seconds if not already submitted
        const isSubmitted = localStorage.getItem('mrm_lead_submitted');
        if (!isSubmitted) {
            const timer = setTimeout(() => {
                setShow(true);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, []);

    const getDeviceType = () => {
        const ua = navigator.userAgent;
        if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
            return 'Tablet';
        }
        if (/Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
            return 'Mobile';
        }
        return 'Desktop';
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.name || !formData.phone) return;

        try {
            setLoading(true);
            const deviceType = getDeviceType();

            // We use the full API URL here since we're on the frontend
            // Assuming backend is at http://localhost:3001
            await axios.post('http://localhost:3001/api/visitors', {
                ...formData,
                deviceType,
                browser: navigator.userAgent.split(') ')[1] || 'Unknown',
                os: navigator.platform
            });

            localStorage.setItem('mrm_lead_submitted', 'true');
            setSubmitted(true);
            setTimeout(() => setShow(false), 2000);
        } catch (error) {
            console.error('Error saving lead:', error);
        } finally {
            setLoading(false);
        }
    };

    if (!show) return null;

    return (
        <div className="lead-popup-overlay">
            <div className="lead-popup-container">
                <button className="close-btn" onClick={() => setShow(false)}>
                    <FiX />
                </button>

                {!submitted ? (
                    <div className="lead-popup-content">
                        <div className="lead-header">
                            <span className="welcome-tag">Welcome to MRM Moorti Art</span>
                            <h2>Let us help you bring home the divine</h2>
                            <p>Please share your contact details and our team will get in touch with you shortly.</p>
                        </div>

                        <form onSubmit={handleSubmit} className="lead-form">
                            <div className="input-group">
                                <FiUser className="input-icon" />
                                <input
                                    type="text"
                                    placeholder="Your Full Name"
                                    required
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                />
                            </div>

                            <div className="input-group">
                                <FiPhone className="input-icon" />
                                <input
                                    type="tel"
                                    placeholder="Your Phone Number"
                                    required
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                />
                            </div>

                            <button type="submit" className="submit-btn" disabled={loading}>
                                {loading ? 'Submitting...' : (
                                    <>
                                        Connect with Us <FiChevronRight />
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                ) : (
                    <div className="success-content">
                        <div className="success-icon">✨</div>
                        <h3>Thank You!</h3>
                        <p>Our team will contact you soon.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default LeadPopup;

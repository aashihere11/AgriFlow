import React from 'react';
import { useNavigate } from 'react-router-dom';

const FirstTimeWelcomeModal = ({ showWelcomeModal, handleCloseModal}) => {
    if (!showWelcomeModal) return null;
    const navigate = useNavigate();

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in px-4">
            <div className="bg-white w-full max-w-md p-8 rounded-3xl shadow-2xl text-center relative transform transition-all scale-100">
                
                {/* Top Icon Badge */}
                <div className="mx-auto w-10 h-10 md:w-16 md:h-16 bg-green-100 rounded-2xl flex items-center justify-center text-3xl mb-4 shadow-inner">
                    🌾
                </div>

                {/* Welcome Heading */}
                <span className="text-lg md:text-2xl font-bold text-gray-800 mb-2">
                    Welcome Aboard! 🎉
                </span>
                <p className="text-sm text-gray-500 mb-6 leading-relaxed  m-0">
                    Just a few quick details needed to set up your farmer account so you can start listing products and receiving payouts.
                </p>

                {/* Feature Highlights / Steps Box */}
                <div className="bg-gray-50 p-4 rounded-2xl mb-6 space-y-3 text-left border border-gray-100">
                    <div className="flex items-center space-x-3">
                        <span className="w-8 h-8 md:w-10 md:h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold text-sm">1</span>
                        <div>
                            <p className="text-xs md:text-base font-bold text-gray-800 m-0">Farm Information</p>
                            <p className="text-[11px] md:text-base text-gray-500 m-0">Location, farm name & land area</p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-3">
                        <span className="w-8 h-8 md:w-10 md:h-10  rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-sm">2</span>
                        <div>
                            <p className="text-xs md:text-base font-bold text-gray-800 m-0">Bank Details for Payouts</p>
                            <p className="text-[11px] md:text-base text-gray-500 m-0">Secure 100% encrypted bank info</p>
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                    <button 
                        onClick={() => navigate("/profile")}
                        className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg shadow-green-600/30 transition-all duration-200"
                    >
                        Complete Profile Now 🚀
                    </button>
                    
                    <button 
                        onClick={() => handleCloseModal()}
                        className="w-full bg-transparent hover:bg-gray-50 text-gray-400 hover:text-gray-600 font-medium py-2 text-sm transition-all"
                    >
                        I'll do this later
                    </button>
                </div>

            </div>
        </div>
    );
};

export default FirstTimeWelcomeModal;
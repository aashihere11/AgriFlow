import React, { useState } from 'react';
function Modal({ title, isOpen, onClose, children }) {
    
    if (!isOpen) return null;
    return (
        <div className='fixed inset-0 bg-black/50 z-50'
            onClick={onClose}>
            <div className=' fixed top-1/2 left-1/2  -translate-x-1/2 -translate-y-1/2 z-50 bg-white rounded-xl p-5 shadow-xl'
                style={{ transform: "translate(-50%, -50%)", animation: "modalIn 0.5s ease forwards" }}
                onClick={(e) => e.stopPropagation()}>
                <p className="font-serif text-xs md:text-4xl text-[#1a5c2e] mb-4 text-nowrap">{title}</p>
                {children}

                <div className="flex gap-3">
                    <button
                        className="flex-1 py-2 text-xs text-gray-500 border border-gray-200 rounded-lg hover:bg-gray-50"
                        onClick={onClose}>
                        Cancel
                    </button>
                    <button
                        className="flex-1 py-2.5 text-xs font-medium text-white bg-[#2e8a48] rounded-lg hover:bg-[#1a5c2e] transition-colors ">
                        Save Details
                    </button>
                </div>

            </div>
        </div>
    );
}

export default Modal;
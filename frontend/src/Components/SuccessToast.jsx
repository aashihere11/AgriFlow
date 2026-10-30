import React, { useEffect } from 'react';

function SuccessToast({ message, isOpen }) {
    if (!isOpen) {
        return;
    }
    return (
        <div className="fixed inset-0 bg-black/50 z-50 ">
            <div className="flex items-center bg-green-100 fixed top-1/2 left-1/2  -translate-x-1/2 -translate-y-1/2 z-50  rounded-xl p-3 shadow-xl border border-green-300 text-green-800 px-5 py-3  font-medium text-sm md:text-base">
                <span className="tracking-wide">{message}</span>
            </div>
        </div>
    );
}

export default SuccessToast;
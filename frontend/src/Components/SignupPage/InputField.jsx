import React from 'react';

export default function InputField({ label, type = 'text', name, value, onChange, placeholder, required = true, icon }) {
    return (
        <div className="space-y-1">
            <label className="block text-xs md:text-base font-semibold text-gray-700">{label}</label>
            <div className="relative">
                {icon && (
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400 text-sm md:text-base pointer-events-none">
                        {icon}
                    </span>
                )}
                <input
                    type={type}
                    name={name}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    required={required}
                    className={`w-full !text-xs md:!text-base  ${icon ? 'pl-9' : 'pl-3.5'
                        } pr-3.5 py-2.5 bg-white border border-gray-300 rounded-xl focus:ring-2  focus:#40916c outline-none transition-all placeholder:text-gray-400`}
                />
            </div>
        </div>
    );
}
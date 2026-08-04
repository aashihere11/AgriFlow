import React from 'react';

function InputField({
    label,
    type,
    placeholder,
    value,
    name,
    onChange
}) {
    return (
        <div className="flex flex-col gap-2 mb-3">
            <label className="!text-xs md:!text-2xl  text-gray-500" >{label}</label>
            <input
                type={type}
                placeholder={placeholder}
                value={value}
                name={name}
                onChange={onChange}
                className="px-3 py-2 !text-xs md:!text-2xl  border-2 border-gray-200 rounded-lg 
                outline-none focus:!border-[#5cba78] transition-colors"
            />
        </div>



    );
}

export default InputField;
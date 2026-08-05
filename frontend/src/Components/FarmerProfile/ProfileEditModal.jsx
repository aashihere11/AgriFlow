import React from 'react';
import InputField from './InputField';


function ProfileEditModal({isOpen, onClose, username, onChange }) {

 if (!isOpen) return null;

    return (<>
        <div className='fixed inset-0 bg-black/50 z-50'
            onClick={onClose}>
            <div className=' fixed top-1/2 left-1/2  -translate-x-1/2 -translate-y-1/2 z-0 bg-white rounded-xl p-5 shadow-xl flex flex-col items-center justify-center '
                style={{ transform: "translate(-50%, -50%)", animation: "modalIn 0.5s ease forwards" }}
                onClick={(e) => e.stopPropagation()}>
                <p className="font-serif text-base md:text-4xl text-[#1a5c2e] mb-4 text-nowrap">Edit Profile</p>

                <div className='w-20  h-20 sm:w-30 sm:h-30 md:w-50 md:h-50 rounded-full flex items-center justify-center border-2
                border-black overflow-hidden flex-shrink-0 m-2'>
                    <img className=' object-cover' src="media/profile.png" alt="img" />
                </div>
                <label className='font-medium  text-xs md:text-base cursor-pointer' htmlFor="profilePhoto">Change Photo ✏️</label>
                <input type="file"
                    accept="image/*"
                    className="hidden"
                    id="profilePhoto"/>

                <InputField
                    type="text"
                    value={username}
                    label="Username"
                    onChange={onChange}
                />
                <div className="flex  gap-3 mt-3">
                    <button
                        className="flex-1 px-3 py-2 text-xs text-gray-500 border border-gray-200 rounded-lg hover:bg-gray-50"
                        onClick={onClose}>
                        Cancel
                    </button>
                    <button
                        className="flex-1 px-3 py-2 text-sm text-nowrap font-medium text-white bg-[#2e8a48] rounded-lg hover:bg-[#1a5c2e] transition-colors ">
                        Save Profile
                    </button>
                </div>

            </div>
        </div>
    </>);
}

export default ProfileEditModal;
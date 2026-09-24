import React, { useState } from 'react';
import RoleSelector from './RoleSelector';
import InputField from './InputField';
import SocialButtons from './SocialButtons';


export default function SignupForm() {
  const [role, setRole] = useState('consumer');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    farmLocation: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Submitted:', { role, ...formData });
    alert(`Welcome to AgriFlow! Signed up as ${role}.`);
  };

  return (
    
    <div className=" lg:w-1/2 flex flex-col justify-center p-4  ">
     
      <div className="mb-3 ">
        <p className="text-base md:text-4xl font-bold text-gray-900 m-0">Create an Account</p>
        <p className="text-xs md:text-sm text-gray-500 mt-1 m-0">
          Join AgriFlow today for fresh, organic farm produce.
        </p>
      </div>

      {/* Role Selection */}
      <RoleSelector role={role} setRole={setRole} />

      {/* Social Sign Up */}
      <SocialButtons />

      <div className="relative flex items-center justify-center mb-6">
        <div className="border-t border-gray-300 w-full"></div>
        <span className="bg-agriBg px-3 text-[11px] font-medium text-gray-400 tracking-wider uppercase absolute">
          or email
        </span>
      </div>

      {/* Main Signup Form */}
      <form onSubmit={handleSubmit} className="space-y-3">
        <InputField
          label="Full Name"
          name="fullName"
          placeholder="User Name"
          value={formData.fullName}
          onChange={handleChange}
          icon="👤"
        />
       <div className='flex items-center gap-2 '>
        <InputField
          label="Email Address"
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          icon="✉️"
        />

        <InputField
          label="Phone Number"
          type="tel"
          name="phone"
          placeholder="Phone No."
          value={formData.phone}
          onChange={handleChange}
          icon="📱"
        />
        </div>
        <div className='flex itmes-center gap-2'>

        {/* Dynamic Field for Farmers */}
        {role === 'farmer' && (
          <InputField
            label="Farm Location "
            name="farmLocation"
            placeholder="Location"
            value={formData.farmLocation}
            onChange={handleChange}
            icon="🚜"
          />
        )}

        <InputField
          label="Password"
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          icon="🔒"
        />
        </div>

        {/* Terms Checkbox */}
        <div className="flex items-center gap-2 pt-1">
          <input
            type="checkbox"
            id="terms"
            required
            className="mt-1 h-4 w-4 text-[#2d6a4f] focus:ring-forest-700 border-gray-300 rounded cursor-pointer"
          />
          <label htmlFor="terms" className="text-xs md:text-base text-gray-600 leading-tight">
            I agree to the{' '}
            <a href="#terms" className="text-[#2d6a4f] font-semibold hover:underline">
              Terms of Service
            </a>{' '}
            and{' '}
            <a href="#privacy" className="text-[#2d6a4f] font-semibold hover:underline">
              Privacy Policy
            </a>
            .
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-[#2d6a4f] hover:bg-[#1b4332] text-white font-semibold py-3 px-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 text-sm mt-2"
        >
          {role === 'farmer' ? 'Register as Farmer' : 'Create Consumer Account'}
        </button>
      </form>

      {/* Login Link */}
      <p className="text-center text-xs md:text-base text-[#52b788] mt-5">
        Already have an account?{' '}
        <a href="#login" className="font-semibold text-[#2d6a4f] hover:underline">
          Sign In
        </a>
      </p>
    </div>
  );
}
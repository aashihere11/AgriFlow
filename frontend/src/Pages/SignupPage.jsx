import React from 'react';
import BrandPanel from '../Components/SignupPage/BrandPanel';
import SignupForm from '../Components/SignupPage/SignupForm';
export default function SignupPage() {
  return (
    <main className="min-h-screen bg-[#f4f7f4] flex lg:items-center justify-center p-4 ">
      {/* Centered Main Container Card */}
      <div className="w-full bg-[#f4f7f4] bg-white rounded-xl shadow-xl  flex flex-col lg:flex-row ">
        {/* Left Side: Branding */}
        <BrandPanel />

        {/* Right Side: Form */}
        <SignupForm />
      </div>
    </main>
  );
}
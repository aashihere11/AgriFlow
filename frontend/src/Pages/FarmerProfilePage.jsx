import React, { useState, useEffect } from 'react';
import InformationCards from '../Components/FarmerProfile/InformationCards.jsx';
import Modal from '../Components/FarmerProfile/Modal.jsx';
import InfoForm from '../Components/FarmerProfile/InfoForm.jsx';
import BankInfoForm from '../Components/FarmerProfile/BankInfoForm.jsx';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

function FarmerProfilePage() {
  const { user, setUser } = useAuth();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [error, setError] = useState("");
  const capitalizedWord = user.username.charAt(0).toUpperCase();


  const modalOpen = (type) => {
    setModalType(type);
    setModalIsOpen(true);
  }

  const closeModal = () => {
    setModalIsOpen(false);
    setModalType(null);
  };

  const modalTitles = {
    personal: "Edit Personal Info",
    bank: "Edit Bank Details",
  };

  // FarmerProfile.jsx
  const [form, setForm] = useState({
    // personal
    username: user.username,
    phone: user.phone,
    email: user.email,
    location: user.location,

    // bank
    bankName: user.bankName || "",
    accountNumber: user.accountNumber || "",
    ifscCode: user.ifscCode || "",
    upiId: user.upiId || "",
  });

  useEffect(() => {
    if (user) {
      setForm({
        username: user.username || "",
        phone: user.phone || "",
        email: user.email || "",
        location: user.location || "",
        bankName: user.bankName || "",
        accountNumber: user.accountNumber || "",
        ifscCode: user.ifscCode || "",
        upiId: user.upiId || "",
      });
    }
  }, [user]);

  const isValid = modalType === "personal"
    ? (form.username?.trim() && form.phone?.trim() && form.email?.trim() && form.location?.trim())
    : modalType === "bank"
      ? (form.ifscCode?.trim() && form.accountNumber?.trim() && form.bankName?.trim() && form.upiId?.trim())
      : false;


  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSave = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.patch(
        "http://localhost:3000/update/personal-info",
        form,
        { withCredentials: true }
      );

      if (response.data.success) {
        setUser((prevUser) => ({
          ...prevUser,
          ...(response.data.updatedData || response.data.user)
        }));
        closeModal();
      }
    } catch (error) {
      setError(error.response?.data?.message || error.message || "Something went wrong!");
    }
  };

  if (!user) {
    return <div className="flex justify-center items-center h-screen">Loading profile...</div>;
  }

  return (<>
    <nav className="bg-gradient-to-r from-[#e0f2fe] via-[#f0fdf4] to-[#fef3c7] flex items-center justify-between px-3
      border-b border-gray-100 sticky top-0 z-10 h-30">

      <a href="" className="w-70">
        <img src="media/logo.png" alt="logo" />
      </a>

    </nav>
    <div className='min-h-screen  bg-[#f4f7f4] p-3'>


      <div className='flex items-center justify-center  gap-4 p-3 mb-4'>
        <div className='w-20  h-20 sm:w-30 sm:h-30 md:w-50 md:h-50 rounded-full flex items-center justify-center border-2
                border-black overflow-hidden flex-shrink-0 text-4xl md:text-7xl font-medium bg-[#808A54] text-white '>
          {capitalizedWord}
        </div>
        <div className='mt-3'>
          <p className="font-serif text-2xl sm:text-4xl md:text-8xl m-0 mb-1 text-nowrap">{user.username}</p>

          <div className='inline-flex px-2 py-1 items-center justify-center
                     text-white text-[8px] sm:text-base md:text-lg font-medium rounded-full bg-[#1a5c2e] text-nowrap '>
            Verified farmer✅
          </div>

        </div>

      </div>

      {/* STATS */}
      <div className="flex items-center justify-center gap-3 mb-4 ">
        {[
          { label: "Orders delivered", value: 38 },
          { label: "Rating", value: 4.8 },
          { label: "Products listed", value: 12 },
        ].map(stat => (
          <div key={stat.label} className="bg-white border border-gray-200 rounded-xl p-3 text-center w-20 h-20 md:w-40 md:h-30 ">
            <p className="text-xs sm:text-base md:text-2xl font-medium text-[#1a5c2e] m-0">{stat.value}</p>
            <p className="text-[7px] sm:text-base md:text-xl text-gray-400 mt-1 m-0">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* information cards */}
      <InformationCards modalOpen={modalOpen}
        user={user}
      />

      <Modal isOpen={modalIsOpen}
        error={error}
        onClose={closeModal}
        onSave={handleSave}
        isValid={isValid}
        title={modalTitles[modalType]}>
        {modalType === "personal" && <InfoForm data={form} onChange={handleChange} />}
        {modalType === "bank" && <BankInfoForm data={form} onChange={handleChange} />}
      </Modal>

    </div>
  </>);
}

export default FarmerProfilePage;
import React, { useState } from 'react';
import InformationCards from '../Components/FarmerProfile/InformationCards.jsx';
import { farmerProfile } from '../data/profile';
import Modal from '../Components/FarmerProfile/modal.jsx';
import InfoForm from '../Components/FarmerProfile/InfoForm.jsx';
import BankInfoForm from '../Components/FarmerProfile/BankInfoForm.jsx';
import FarmInfoForm from '../Components/FarmerProfile/FarmInfoForm.jsx';
import ProfileEditModal from '../Components/FarmerProfile/ProfileEditModal.jsx';
import TemporaryDrawer from '../Components/Drawer.jsx';


function FarmerProfilePage() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalType, setModalType] = useState(null);
  const { name, phone, email, location, memberSince, verified, avatar, farm, bank } = farmerProfile;
  const [open, setOpen] = useState(false);

  const modalOpen = (type) => {
    setModalType(type);
    setModalIsOpen(true);
  }

  const closeModal = () => {
    setModalIsOpen(false);
    setModalType(null);
  };

  const profileModalOpen = () => {
    setModalIsOpen(true);
  }

  const modalTitles = {
    personal: "Edit Personal Info",
    farm: "Edit Farm Details",
    bank: "Edit Bank Details",
  };

  // FarmerProfile.jsx
  const [form, setForm] = useState({
    // personal
    name: name,
    phone: phone,
    email: email,
    location: location,
    // farm
    farm: farm.name,
    size: farm.size,
    village: farm.village,
    // bank
    bankName: bank.bankName,
    accountNumber: bank.accountNumber,
    ifsc: bank.ifsc,
    upi: bank.upi,
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: [e.target.value] });
  };

  return (<>
    <div className='min-h-screen  bg-[#f4f7f4] p-5'>
      <TemporaryDrawer open={open} onClose={() => setOpen(false)} />
      <div className='flex items-center justify-center  gap-4 p-3 mb-4'>
        <div className='w-20  h-20 sm:w-30 sm:h-30 md:w-50 md:h-50 rounded-full flex items-center justify-center border-2
                border-black overflow-hidden flex-shrink-0'>
          <img className=' object-cover' src="media/profile.png" alt="img" /></div>
        <div className='mt-3'>
          <p className="font-serif text-xs sm:text-4xl md:text-6xl m-0 mb-1 text-nowrap">{farmerProfile.name}</p>
          <p className='text-xs sm:text-base md:text-lg opacity-80 m-0  '> Farmer · Member since Jan 2024</p>
          {verified &&
            <div className='inline-flex px-3 py-1 items-center justify-center
                     text-white text-[8px] sm:text-base md:text-lg font-medium rounded-full bg-[#1a5c2e] text-nowrap m-2'>
              Verified farmer✅
            </div>}
          <button className='px-2 py-1 block !text-[8px]   md:!text-base
                     font-medium  bg-[#1a5c2e] text-white m-2'
            style={{ borderRadius: "10px" }}
            onClick={profileModalOpen}>✏️ Edit Profile</button>
        </div>

      </div>

      {/* STATS */}
      <div className="grid grid-cols-3 gap-3 mb-4 ">
        {[
          { label: "Orders delivered", value: 38 },
          { label: "Rating", value: 4.8 },
          { label: "Products listed", value: 12 },
        ].map(stat => (
          <div key={stat.label} className="bg-white border border-gray-200 rounded-xl p-3 text-center ">
            <p className="text-xs sm:text-base md:text-2xl font-medium text-[#1a5c2e] m-0">{stat.value}</p>
            <p className="text-[7px] sm:text-base md:text-xl text-gray-400 mt-1 m-0">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* information cards */}
      <InformationCards modalOpen={modalOpen}
        farmerProfile={farmerProfile} />

      <Modal isOpen={modalIsOpen}
        onClose={closeModal}
        title={modalTitles[modalType]}>
        {modalType === "personal" && <InfoForm data={form} onChange={handleChange} />}
        {modalType === "bank" && <BankInfoForm data={form} onChange={handleChange} />}
        {modalType === "farm" && <FarmInfoForm data={form} onChange={handleChange} />}
      </Modal>


      <ProfileEditModal isOpen={modalIsOpen}
        onClose={closeModal}
        username={name}
        onChange={handleChange}>
      </ProfileEditModal >
    </div>
  </>);
}

export default FarmerProfilePage;
import React from 'react';
import ProfileCard from './ProfileCard';
function InformationCards({ modalOpen, farmerProfile }) {
    return (<>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-3'>
            <ProfileCard
                title="Personal Info"
                rows={[
                    { icon: "👤", label: "Full name", value: farmerProfile.name },
                    { icon: "📞", label: "Phone", value: farmerProfile.phone },
                    { icon: "✉️", label: "Email", value: farmerProfile.email },
                    { icon: "✉️", label: "Location", value: farmerProfile.location }
                ]}
                onEdit={() => modalOpen("personal")}
            />
            <ProfileCard
                title="Farm details"
                rows={[
                    { icon: "🌾", label: "Farm name", value: farmerProfile.farm.name },
                    { icon: "📐", label: "Farm size", value: farmerProfile.farm.size },
                    { icon: "🗺️", label: "Village", value: farmerProfile.farm.village },
                ]}
                onEdit={() => modalOpen("farm")} />
            <ProfileCard
                title="Bank Details"
                rows={[
                    { icon: "🏦", label: "Bank name", value: farmerProfile.bank.bankName },
                    { icon: "💳", label: "Account number", value: farmerProfile.bank.accountNumber },
                    { icon: "🔢", label: "IFSC code", value: farmerProfile.bank.ifsc },
                    { icon: "📱", label: "UPI ID", value: farmerProfile.bank.upi },
                ]}
                onEdit={() => modalOpen("bank")} />
        </div>

    </>);
}

export default InformationCards;
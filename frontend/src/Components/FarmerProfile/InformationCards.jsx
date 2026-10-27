import React from 'react';
import ProfileCard from './ProfileCard';
function InformationCards({ modalOpen, user }) {
    return (<>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
            <ProfileCard
                title="Personal Info"
                rows={[
                    { icon: "👤", label: "Full name", value: user.username },
                    { icon: "📞", label: "Phone", value: user.phone },
                    { icon: "✉️", label: "Email", value: user.email },
                    { icon: "✉️", label: "Location", value: user.location }
                ]}
                onEdit={() => modalOpen("personal")}
            />

            <ProfileCard
                title="Bank Details"
                rows={[
                    { icon: "🏦", label: "Bank name", value: user.bankName || ""},
                    { icon: "💳", label: "Account number", value: user.accountNumber || "" },
                    { icon: "🔢", label: "IFSC code", value: user.ifsc || "" },
                    { icon: "📱", label: "UPI ID", value: user.upi || "" },
                ]}
                onEdit={() => modalOpen("bank")} />
        </div>

    </>);
}

export default InformationCards;
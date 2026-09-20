import React from 'react';
function Tab({ tab, activeTab, setActiveTab, count }) {
    return (<>
        <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-1 py-1.5 !text-[8px] md:!text-base !rounded-xl font-medium border transition-all 
                  ${activeTab === tab
                    ? "bg-[#2e8a48] text-white border-[#2e8a48]"
                    : "bg-white text-gray-500 border-gray-200 hover:border-[#a8e0b5]"}`}>
            {tab} ({count})
        </button>

    </>);
}

export default Tab;
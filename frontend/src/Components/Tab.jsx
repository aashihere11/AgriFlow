import React from 'react';
function Tab({ tab, activeTab, setActiveTab, count }) {
    return (<>
        <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-1.5 text-xs font-medium border transition-all
                  ${activeTab === tab
                    ? "bg-[#2e8a48] text-white border-[#2e8a48]"
                    : "bg-white text-gray-500 border-gray-200 hover:border-[#a8e0b5]"}`}
            style={{ borderRadius: "50px" }}>
            {tab} ({count})
        </button>

    </>);
}

export default Tab;
import React,{useState} from 'react';
import FreshnessCard from './FreshnessCard';
import EarningsCard from './EarningsCard';
import ActionsCard from './ActionsCard';
function TabSwitcher() {
 const[activeTab, setActiveTab] = useState("earnings");

    return (<>

        <div className="flex gap-2 mb-4 md:hidden bg-gray-100 p-1 rounded-xl mt-3">
            <button
                onClick={() => setActiveTab("earnings")}
                className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all duration-200
                       ${activeTab === "earnings"
                        ? "bg-white text-green-700 shadow-sm"
                        : "text-gray-500 hover:text-gray-700"}`}>
                Earnings
            </button>
            <button
                onClick={() => setActiveTab("freshness")}
                className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all duration-200
                        ${activeTab === "freshness"
                        ? "bg-white text-green-700 shadow-sm"
                        : "text-gray-500 hover:text-gray-700"}`}>
                Freshness
            </button>
            <button
                onClick={() => setActiveTab("actions")}
                className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all duration-200
                       ${activeTab === "actions"
                        ? "bg-white text-green-700 shadow-sm"
                        : "text-gray-500 hover:text-gray-700"}`}>
                Actions
            </button>
        </div>
        <div className='md:hidden'>
            {activeTab === "earnings" && <EarningsCard />}
            {activeTab === "freshness" && <FreshnessCard />}
            {activeTab === "actions" && <ActionsCard />}
        </div>

        <div className='md:grid-cols-3 hidden sm:grid gap-4 mt-5 '>
            <EarningsCard />
            <FreshnessCard />
            <ActionsCard />
        </div>
    </>);
}

export default TabSwitcher;
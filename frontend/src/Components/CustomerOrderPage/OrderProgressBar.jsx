import React from 'react';
const STATUS_INDEX = {
    "Pending": 1,
    "Packed": 2,
    "Out-For-Delivery": 3,
    "Delivered": 4,
};

const Steps = ["Placed", "Packed", "On the way", "Delivered"];
function OrderProgressBar({ status }) {
    const currentStep = STATUS_INDEX[status];

    return (
        <div className="flex items-start mb-4 ">
            {Steps.map((step, index) => {
                const stepNumber = index + 1;
                const isDone = stepNumber < currentStep || status === "Delivered";
                const isActive = stepNumber === currentStep && status != "Delivered";

                return (
                    <div key={step} className="flex items-center flex-1 last:flex-none">

                        {/* STEP */}
                        <div className="flex flex-col items-center gap-1">
                            <div className={`w-4 h-4 md:w-8 md:h-8 rounded-full flex items-center justify-center text-[10px] font-medium flex-shrink-0
                ${isDone ? "bg-[#2e8a48] text-white"
                                    : isActive ? "bg-[#f0faf2] border-2 border-[#2e8a48] text-[#2e8a48] pulse-dot"
                                        : "bg-gray-100 border border-gray-200 text-gray-400"}`}>
                                {isDone ? "✓" : stepNumber}
                            </div>
                            <span className={`text-[7px] md:text-base text-center leading-tight whitespace-nowrap
                ${isDone || isActive ? "text-[#2e8a48] font-medium" : "text-gray-400"}`}>
                                {step}
                            </span>
                        </div>
                        {index < Steps.length - 1 && (
                            <div className={`flex-1 h-px mb-3 mx-0.5  ${stepNumber < currentStep ? "bg-[#a8e0b5]" : "bg-gray-200"}`}></div>
                        )}
                    </div>
                )


            })}
        </div>
    );
}

export default OrderProgressBar;


const getWeekStart = () => {
    const now = new Date();
    const day = now.getDay();
    const diff = now.getDate() - day + (day === 0 ? -6 : 1);
    return new Date(now.getFullYear(), now.getMonth(), diff);

}


export const getMonthStart = () => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1);
};

export const getFilteredFarmerItems = (orders, currentFarmerId) => {
    const ordersArray = Array.isArray(orders) ? orders : [];
    const filteredItems = [];
    ordersArray.forEach(order => {
        order.orderItems?.forEach(item => {

            const isMyItem = currentFarmerId ? item.farmer === currentFarmerId : true;
            const isDelivered = (item.status || "") === "Delivered";

            if (isMyItem && isDelivered) {
                filteredItems.push({
                    ...item,
                    orderId: order._id,
                    razorpayOrderId: order.paymentInfo?.razorpay_order_id,
                    consumerName: order.shippingAddress?.fullName,
                    date: order.createdAt
                });
            }
        });
    });

    return filteredItems;
};




export const getTotalEarnings = (orders, currentFarmerId) => {
    const deliveredItems = getFilteredFarmerItems(orders, currentFarmerId);
    return deliveredItems.reduce((sum, item) => sum + ((item.price || 0) * (item.quantity || item.qty || 1)), 0);
};

export const getThisWeekEarnings = (orders, currentFarmerId) => {
    const weekStart = getWeekStart();
    const deliveredItems = getFilteredFarmerItems(orders, currentFarmerId);

    return deliveredItems.filter(item => new Date(item.date) >= weekStart)
        .reduce((sum, item) => sum + ((item.price || 0) * (item.quantity || item.qty || 1)), 0);

}

export const getThisMonthEarnings = (orders, currentFarmerId) => {
    const monthStart = getMonthStart();
    const deliveredItems = getFilteredFarmerItems(orders, currentFarmerId);

    return deliveredItems
        .filter(item => new Date(item.date) >= monthStart)
        .reduce((sum, item) => sum + ((item.price || 0) * (item.quantity || item.qty || 1)), 0);
};

export const getProductEarning = (orders, currentFarmerId) => {
    const map = {};
    const deliveredItems = getFilteredFarmerItems(orders, currentFarmerId);

    deliveredItems.forEach(item => {
        const itemName = item.name;
        if (!map[itemName]) {
            map[itemName] = {
                name: itemName,
                image: item.image,
                qtySold: 0,
                unit: item.unit || "pcs",
                amount: 0
            };
        }

        const qty = item.quantity || item.qty || 1;
        map[itemName].qtySold += qty;
        map[itemName].amount += qty * (item.price || 0);
    });

    return Object.values(map).sort((a, b) => b.amount - a.amount);
}

export const getRecentTransactions = (orders, currentFarmerId) => {
    const deliveredItems = getFilteredFarmerItems(orders, currentFarmerId);

    return deliveredItems
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .map(item => ({
            id: item._id || Math.random(),
            orderId: item.razorpayOrderId,
            consumer: item.consumerName,
            total: (item.price || 0) * (item.quantity || item.qty || 1),
            date: item.date
        }));
};


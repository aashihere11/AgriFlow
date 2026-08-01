

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


export const getDeliveredOrders = (orders) => {
   return orders.filter(o => o.status === "Delivered")
};


export const getTotalEarnings = (orders) => {
   return getDeliveredOrders(orders).reduce((sum, o) => sum + o.total, 0);
}

export const getThisWeekEarnings = (orders) => {
   return getDeliveredOrders(orders).filter(o => new Date(o.date) >= getWeekStart()).reduce((sum, o) => sum + o.total, 0);
}

export const getThisMonthEarnings = (orders) => {
return getDeliveredOrders(orders).filter(o => new Date(o.date) >= getMonthStart())
        .reduce((sum, o) => sum + o.total, 0);
}

export const getRecentTransactions = (orders) =>{
    return getDeliveredOrders(orders)
    .sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 4);
}
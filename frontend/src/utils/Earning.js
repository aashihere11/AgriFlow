

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

export const getProductEarning = (orders) => {
    const map = {};
    getDeliveredOrders(orders).forEach(order => {

        order.items.forEach(item => {
            if (!map[item.name]) {
                map[item.name] =
                {
                    name: item.name,
                    emoji: item.emoji,
                    bg: item.bg,
                    qtySold: 0,
                    unit: item.unit,
                    amount: 0
                };
            }

            map[item.name].qtySold += item.qty;
            map[item.name].amount += item.qty * item.price
        })

    });
    return Object.values(map).sort((a, b) => b.amount - a.amount);
}

export const getRecentTransactions = (orders) => {
    return getDeliveredOrders(orders)
        .sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 4);
}
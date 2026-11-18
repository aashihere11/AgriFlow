export const getGreeting = () => {
    const hour = new Date().getHours(); 

    if (hour >= 5 && hour < 12) {
        return "Good Morning";
    } else if (hour >= 12 && hour < 17) {
        return "Good Afternoon";
    } else if (hour >= 17 && hour < 21) {
        return "Good Evening";
    } else {
        return "Good Night"; 
    }
};

const getStartOfCurrentWeek = () => {
    const today = new Date();

    const day = today.getDay();

    const diffToMonday = day === 0 ? -6 : 1 - day;

    const monday = new Date(today);

    monday.setDate(today.getDate() + diffToMonday);

    monday.setHours(0, 0, 0, 0);

    return monday;

}

export const thisWeekOrders = (allOrderItems) => {
    if (!allOrderItems) return [];

    const startOfWeek = getStartOfCurrentWeek();

    return allOrderItems.filter((order) => {
        const orderDate = new Date(order.createdAt);
        return orderDate >= startOfWeek;
    })
}

export const dailyEarnings = (WeekOrders) => {
    const earningsMap = {}
    const today = new Date();
    const monday = getStartOfCurrentWeek();
    const currentDayNumber = today.getDay() === 0 ? 7 : today.getDay();
    for (let i = 0; i < currentDayNumber; i++) {
        const d = new Date();
        d.setDate(monday.getDate() + i);

        const dateKey = d.toLocaleDateString('en-IN', {
            weekday: "long",
            day: 'numeric',
            month: "short"
        });
        earningsMap[dateKey] = 0;

    }
    if (!WeekOrders || !Array.isArray(WeekOrders)) return earningsMap;

    return WeekOrders.reduce((acc, order) => {
        const dateKey = new Date(order.createdAt).toLocaleDateString('en-IN', {
            weekday: "long",
            day: 'numeric',
            month: "short"
        })

        if (acc[dateKey] === undefined) {
            acc[dateKey] = 0;
        }

        if (order.status === 'Delivered') {
            acc[dateKey] += (order.price || 0) * (order.quantity || order.qty || 1);
        }

        return acc;
    }, earningsMap)
};

export const getWeeklyItemEarnings = (weekOrders) =>
    (Array.isArray(weekOrders) ? weekOrders : [])
        .filter((item) => item.status === 'Delivered')
        .reduce(
            (sum, item) => sum + ((item.price || 0) * (item.quantity || 1)),
            0
        );

export const todayEarning = (weekOrders) => {
    const today = new Date();
    const date = today.getDate();

    return (Array.isArray(weekOrders) ? weekOrders : []).filter((order) =>
        new Date(order.createdAt) === date).reduce((sum, item) => sum + ((item.price || 0) * (item.quantity || 1)), 0);
}


export const getWeeklyGrowth = (allOrderItems = []) =>{
    const now = new Date();
    const day = now.getDay();
    const diffToMonday = day === 0 ? -6 : 1 - day;

   const thisWeekStart= new Date(now);
    thisWeekStart.setDate(now.getDate() +  diffToMonday);
    thisWeekStart.setHours(0, 0, 0, 0);

    const lastWeekStart = new Date(thisWeekStart);
    lastWeekStart.setDate(thisWeekStart.getDate() - 7);

    const lastWeekSameTime = new Date(now);
    lastWeekSameTime.setDate(now.getDate() - 7);

    let thisWeekTotal = 0;
    let lastWeekTotal = 0;

    allOrderItems.forEach((order) =>{
        const orderDate = new Date(order.createdAt);
        const amount = (order.price || 0) * (order.quantity || 1);

        if(orderDate >= thisWeekStart && orderDate <= now){
            thisWeekTotal += amount;
        }else if(orderDate >= lastWeekStart && orderDate <= lastWeekSameTime){
            lastWeekTotal += amount;
        }
    })
   
    let percentage = 0;
    if (lastWeekTotal === 0) {
        percentage = thisWeekTotal > 0 ? 100 : 0;
    } else {
        percentage = ((thisWeekTotal - lastWeekTotal) / lastWeekTotal) * 100;
    }

    return {
        percentage: Math.abs(percentage).toFixed(1),
        isPositive: percentage >= 0,
        thisWeekTotal
    };
}

export const getTodayOrderStats = (allOrderItems = []) => {
    if (!allOrderItems || !Array.isArray(allOrderItems)) {
        return { todayList: [], todayCount: 0, yesterdayCount: 0, diff: 0, percentage: 0, isPositive: true };
    }

    // 1. Aaj subah 12:00 AM
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    // 2. Kal subah 12:00 AM
    const startOfYesterday = new Date(startOfToday);
    startOfYesterday.setDate(startOfToday.getDate() - 1);

    const todayList = [];
    let yesterdayCount = 0;

    allOrderItems.forEach((order) => {
        const orderDate = new Date(order.createdAt);

        if (orderDate >= startOfToday) {
            todayList.push(order); 
        } else if (orderDate >= startOfYesterday && orderDate < startOfToday) {
            yesterdayCount++; 
        }
    });

    const todayCount = todayList.length;
    const diff = todayCount - yesterdayCount; 

   
    let percentage = 0;
    if (yesterdayCount === 0) {
        percentage = todayCount > 0 ? 100 : 0;
    } else {
        percentage = (diff / yesterdayCount) * 100;
    }

    return {                             
        todayCount,                                                    
        percentage: Math.abs(percentage).toFixed(1),
        isPositive: diff >= 0           
    };
};
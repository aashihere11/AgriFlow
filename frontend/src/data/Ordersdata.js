export const orders = [
  {
    id: 1,
    orderId: "#FD2026060601",
    time: "Today, 9:32 AM",
    status: "Pending",
    items: [
      { emoji: "🍅", name: "Farm Tomatoes", qty: "2kg" },
      { emoji: "🥕", name: "Organic Carrots", qty: "1kg" },
    ],
    total: 240,
    consumer: {
      name: "Priya Sharma",
      phone: "9876543210",
      address: "42, Green Park Colony",
      city: "Nashik",
      pincode: "422001",
      state: "Maharashtra",
      slot: "morning",
    },
  },
  {
    id: 2,
    orderId: "#FD2026060602",
    time: "Today, 8:15 AM",
    status: "Packed",
    items: [
      { emoji: "🥬", name: "Fresh Spinach", qty: "2 bunch" },
      { emoji: "🍯", name: "Raw Honey", qty: "1 jar" },
    ],
    total: 300,
    consumer: {
      name: "Rahul Verma",
      phone: "9123456780",
      address: "15, Shivaji Nagar",
      city: "Pune",
      pincode: "411005",
      state: "Maharashtra",
      slot: "evening",
    },
  },
  {
    id: 3,
    orderId: "#FD2026060603",
    time: "Yesterday, 7:45 AM",
    status: "Out-For-Delivery",
    items: [
      { emoji: "🌽", name: "Sweet Corn", qty: "4 pc" },
    ],
    total: 120,
    consumer: {
      name: "Neha Gupta",
      phone: "9988776655",
      address: "8, Linking Road",
      city: "Mumbai",
      pincode: "400050",
      state: "Maharashtra",
      slot: "morning",
    },
  },
  {
    id: 4,
    orderId: "#FD2026060604",
    time: "Yesterday, 6:00 AM",
    status: "Delivered",
    items: [
      { emoji: "🍅", name: "Farm Tomatoes", qty: "3kg" },
    ],
    total: 240,
    consumer: {
      name: "Amit Joshi",
      phone: "9765432100",
      address: "22, MG Road",
      city: "Nagpur",
      pincode: "440001",
      state: "Maharashtra",
      slot: "morning",
    },
  },
];

export const nextStatus = {
  Pending:            { label: "📦 Mark as Packed",      next: "Packed" },
  Packed:             { label: "🚚 Out for Delivery",    next: "Out for Delivery" },
  "Out-For-Delivery": { label: "✅ Mark as Delivered",   next: "Delivered" },
  Delivered:          null,
};


export const orders = [
  {
    id: 1,
    orderId: "#FD2026060601",
    date: "2026-07-29T08:15:00",
    status: "Delivered",
    items: [
      { emoji: "🍅", name: "Farm Tomatoes", qty: 2, unit: "kg", price: 80 },
      { emoji: "🥕", name: "Organic Carrots", qty: 1, unit: "kg", price: 60 },
    ],
    total: 220, // 2×80 + 1×60 = 220
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
    date: "2026-07-28T09:32:00",
    status: "Delivered",
    items: [
      { emoji: "🥬", name: "Fresh Spinach", qty: 2, unit: "bunch",  price: 40 },
      { emoji: "🍯", name: "Raw Forest Honey", qty: 1, unit: "jar",  price: 220 },
    ],
    total: 300, // 2×40 + 1×220 = 300
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
    date: "2026-07-27T07:45:00",
    status: "Out-For-Delivery", // ← Delivered nahi — count nahi hoga
    items: [
      { emoji: "🌽", name: "Sweet Corn", qty: 4, unit: "pc", price: 30 },
    ],
    total: 120, // 4×30 = 120
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
    date: "2026-08-01T10:00:00",
    status: "Delivered",
    items: [
      { emoji: "🍅", name: "Farm Tomatoes", qty: 3, unit: "kg", price: 80 },
    ],
    total: 240, // 3×80 = 240
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
  Pending: { label: "📦 Mark as Packed", next: "Packed" },
  Packed: { label: "🚚 Out for Delivery", next: "Out for Delivery" },
  "Out-For-Delivery": { label: "✅ Mark as Delivered", next: "Delivered" },
  Delivered: null,
};


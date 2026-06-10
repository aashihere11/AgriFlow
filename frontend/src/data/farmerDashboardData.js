// src/data/farmerDashboardData.js

export const stats = [
  { icon: "🛒", label: "New orders", val: "12", sub: "4 more than yesterday", trend: "up" },
  { icon: "💰", label: "Today's earnings", val: "₹2,400", sub: "+18% this week", trend: "up" },
  { icon: "🧺", label: "Products listed", val: "8", sub: "2 low on stock", trend: "warning" },
  { icon: "⭐", label: "Avg. rating", val: "4.8", sub: "from 124 reviews", trend: "neutral" },
];

export const products = [
  { id: 1, emoji: "🍅", name: "Farm Tomatoes", price: 80, unit: "kg", stock: 15 },
  { id: 2, emoji: "🥕", name: "Organic Carrots", price: 60, unit: "kg", stock: 8 },
  { id: 3, emoji: "🥬", name: "Fresh Spinach", price: 40, unit: "bunch", stock: 3 },
  { id: 4, emoji: "🌽", name: "Sweet Corn", price: 30, unit: "pc", stock: 0 },
];

export const orders = [
  { id: 1, emoji: "🍅", bg: "#fff0ee", name: "Farm Tomatoes", qty: "2kg", buyer: "Priya S.", time: "10 min ago", price: "₹160", status: "pending" },
  { id: 2, emoji: "🥕", bg: "#fff5e6", name: "Organic Carrots", qty: "3kg", buyer: "Amit K.", time: "45 min ago", price: "₹180", status: "packed" },
  { id: 3, emoji: "🥬", bg: "#edf7f0", name: "Fresh Spinach", qty: "2 bunch", buyer: "Sunita M.", time: "2 hrs ago", price: "₹80", status: "delivered" },
  { id: 4, emoji: "🌽", bg: "#fdf6e3", name: "Sweet Corn", qty: "4 pcs", buyer: "Rahul D.", time: "3 hrs ago", price: "₹120", status: "delivered" },
]

export const weekEarnings = [
  { day: "Monday", val: "₹1,840" },
  { day: "Tuesday", val: "₹2,100" },
  { day: "Wednesday", val: "₹1,650" },
  { day: "Thursday", val: "₹2,320" },
  { day: "Friday", val: "₹1,980" },
  { day: "Saturday (today)", val: "₹2,400" },
];

export const freshness = [
  { name: "Farm Tomatoes", updatedAt: "2026-06-09T04:00:00"},
  { name: "Organic Carrots", updatedAt: "2026-06-09T04:00:00" },
  { name: "Fresh Spinach", updatedAt: "2026-06-05T04:00:00" },
  { name: "Sweet Corn", updatedAt: "2026-06-08T04:00:00" },
];

export const quickActions = [
  { icon: "➕", label: "Add new product" },
  { icon: "🔄", label: "Update stock" },
  { icon: "🚚", label: "Mark order dispatched" },
  { icon: "📷", label: "Upload fresh photo" },
  { icon: "📊", label: "View full earnings" },
];
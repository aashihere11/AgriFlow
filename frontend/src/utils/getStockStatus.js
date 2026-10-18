// Function jo status text, style classes, aur availability check karta hai
export const getStockStatus = (stockCount, unit) => {
  if (!stockCount || stockCount <= 0) {
    return {
      label: "Out of Stock",
      isAvailable: false,
      badgeClass: "bg-red-100 text-red-700 border-red-200",
      textClass: "text-red-600 font-medium"
    };
  }

  if (stockCount <= 10) {
    return {
      label: `Only ${stockCount} ${unit} left!`,
      isAvailable: true,
      badgeClass: "bg-amber-100 text-amber-800 border-amber-200",
      textClass: "text-amber-600 font-medium"
    };
  }

  return {
    label: "In Stock",
    isAvailable: true,
    badgeClass: "bg-emerald-100 text-emerald-700 border-emerald-200",
    textClass: "text-emerald-600 font-medium"
  };
};

export const getFreshnessBadge = (category, harvestDate) => {
  // 1. Agar Category Grains, Pulses ya Dry Spices hai
  const nonPerishableCategories = ['grains', 'pulses', 'spices'];
  const normalizedCategory = category?.toLowerCase() || '';
  
  if (nonPerishableCategories.some((item) => normalizedCategory.includes(item))) {
    return {
      label: "🌾 Naturally Dried & Stored",
      badgeClass: "bg-amber-100 text-amber-800 border-amber-300",
      showFreshnessDays: false
    };
  }

  // 2. Perishables (Vegetables, Fruits, Leafy Greens) ke liye calculation
  if (!harvestDate) {
    return {
      label: "🌿 Farm Fresh",
      badgeClass: "bg-emerald-100 text-emerald-800 border-emerald-300",
      showFreshnessDays: true
    };
  }

  const harvest = new Date(harvestDate);
  if (Number.isNaN(harvest.getTime())) {
    return {
      label: "Farm Fresh",
      badgeClass: "bg-emerald-100 text-emerald-800 border-emerald-300",
      showFreshnessDays: true
    };
  }

  const today = new Date();
  
  // Kitne din hue harvest hue
  const diffTime = Math.max(0, today - harvest);
  const daysAgo = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  if (daysAgo === 0) {
    return {
      label: "✨ Harvested Today",
      badgeClass: "bg-emerald-500 text-white font-bold",
      showFreshnessDays: true
    };
  } 
  
  if (daysAgo === 1) {
    return {
      label: "🚜 Harvested Yesterday",
      badgeClass: "bg-emerald-100 text-emerald-800 border-emerald-300",
      showFreshnessDays: true
    };
  } 
  
  if (daysAgo <= 3) {
    return {
      label: `🌿 Harvested ${daysAgo} Days Ago`,
      badgeClass: "bg-green-100 text-green-800 border-green-300",
      showFreshnessDays: true
    };
  } 

  // Agar 3 din se zyada ho chuke hain
  return {
    label: "⏱️ Best Consumed Soon",
    badgeClass: "bg-amber-100 text-amber-800 border-amber-300",
    showFreshnessDays: true
  };
};

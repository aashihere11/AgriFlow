export const getCategoryFreshnessStats = (farmerProducts = []) => {
    if (!farmerProducts || !Array.isArray(farmerProducts) ||farmerProducts.length === 0) {
        return [];
    }

  const categoryRules = {
        dairy:      { freshDays: 1,  maxDays: 2 },  
        vegetables: { freshDays: 1,  maxDays: 3 },   
        fruits:     { freshDays: 2,  maxDays: 4 },   
        spices:     { freshDays: 30, maxDays: 60 },  
        "grains & pulses":     { freshDays: 180, maxDays: 365 },  
        default:    { freshDays: 3,  maxDays: 7 }
    };

    const today = new Date();

    const productsWithStatus = farmerProducts.map((product) => {
        const stockDate = new Date(product.updatedAt || product.createdAt);


        const ageInDays = (today - stockDate) / (1000 * 60 * 60 * 24);

        
        const catKey = (product.category || "").toLowerCase().trim();
        const rule = categoryRules[catKey] ?? categoryRules.default;

       let status = "Fresh";

        if (ageInDays <= rule.freshDays) {
            status = "Fresh";
        } else if (ageInDays <= rule.maxDays) {
            status = "Best";
        } else {
            status = "Expired";
        }

        return { ...product, freshnessStatus: status };
    });
    console.log(productsWithStatus);
    return productsWithStatus;
  
}


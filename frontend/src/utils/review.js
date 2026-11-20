export const getRatingBreakdown = (reviews = []) => {
  const total = reviews.length;

  const counts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };

  for (const review of reviews) {
    const star = Math.round(Number(review.rating));
    if (star >= 1 && star <= 5) {
      counts[star] += 1;
    }
  }

  const colorMap = {
    5: "#5cba78",
    4: "#a8e0b5",
    3: "#d4f0da",
    2: total > 0 && counts[2] > 0 ? "#f59e0b" : "#e5e7eb",
    1: total > 0 && counts[1] > 0 ? "#ef4444" : "#e5e7eb",
  };

  return [5, 4, 3, 2, 1].map((star) => {
    const count = counts[star];
    const pct = total > 0 ? Math.round((count / total) * 100) : 0;

    return {
      star,
      count,
      pct,
      color: colorMap[star],
    };
  });
};
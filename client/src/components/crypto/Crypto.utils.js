// organizes trend data in array
export const organizeTrendData = (data) => {
  const trends = ["1d", "7d", "30d", "365d", "ytd"];
  const organized = [];

  for (let i = 0; i < trends.length; i++) {
    organized.push([trends[i], data[i]]);
  }

  return organized;
};

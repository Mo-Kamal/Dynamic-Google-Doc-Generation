// Description: This utility function returns the current date formatted as "Month Day, Year".
export const getCurrentDate = () => {
  const currentDate = new Date();
  const month = currentDate.toLocaleString("default", { month: "long" });
  const day = currentDate.getDate();
  const year = currentDate.getFullYear();
  const formattedDate = `${month} ${day}, ${year}`;
  return { formattedDate, month, day };
};

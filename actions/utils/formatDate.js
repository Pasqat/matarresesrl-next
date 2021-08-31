export const formatDate = (date) => {
  const newDate = new Date(date);

  return newDate.toLocaleDateString("it-it", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export const getMonth = (date) => {
  const newDate = new Date(date);

  return newDate.toLocaleDateString("it", { month: "long" });
};


export const getDay = (date) => {
  const newDate = new Date(date);

  return newDate.toLocaleDateString("it", { day: "numeric" });
};

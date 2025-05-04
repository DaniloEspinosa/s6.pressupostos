export const formatDate = (date: Date) => {
  if (!date) return "";

  const d = new Date(date);
  return d.toLocaleDateString("ca-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
};

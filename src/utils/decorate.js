export function dateDecorator(date) {
  if (date)
    return new Date(date).toLocaleDateString("default", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  return "";
}

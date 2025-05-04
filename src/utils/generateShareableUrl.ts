import { BudgetI } from "../types/BudgetI";

export const generateShareableUrl = (budgets: BudgetI) => {
  let pages = 0;
  let langs = 0;

  const webService = budgets.services.find((service) =>
    service.startsWith("Web")
  );

  if (webService) {
    const match = webService.match(/(\d+) pàgine\/s, (\d+) llenguatge\/s/);
    if (match) {
      pages = parseInt(match[1], 10);
      langs = parseInt(match[2], 10);
    }
  }

  const servicesMap: Record<string, boolean> = {};
  const baseServices = ["Seo", "Ads", "Web"];

  baseServices.forEach((service) => {
    servicesMap[service] = budgets.services.some((s) => s.startsWith(service));
  });

  const queryParams = new URLSearchParams();

  Object.entries(servicesMap).forEach(([service, selected]) => {
    if (selected) queryParams.append(service, "true");
  });

  if (servicesMap["Web"]) {
    if (pages > 0) queryParams.append("pages", pages.toString());
    if (langs > 0) queryParams.append("langs", langs.toString());
  }

  if (budgets.isAnnual) {
    queryParams.append("annual", "true");
  }

  queryParams.append("name", budgets.name);
  queryParams.append("email", budgets.email);
  queryParams.append("tel", budgets.tel);

  const baseUrl = window.location.origin + "/presupostos";
  return `${baseUrl}?${queryParams.toString()}`;
};

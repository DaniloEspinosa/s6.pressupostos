export interface BudgetI {
  id: string;
  name: string;
  email: string;
  services: string[];
  tel: string;
  total: number;
  createdAt: Date;
  isAnnual: boolean;
}

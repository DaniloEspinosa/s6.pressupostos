export interface Pressuposto {
  name: string;
  email: string;
  services: string[];
  tel: string;
  total: number;
  createdAt: Date;
  isAnnual: boolean; // Indica si es un presupuesto anual con descuento
}

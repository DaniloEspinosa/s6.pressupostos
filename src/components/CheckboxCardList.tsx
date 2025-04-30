import { SetStateAction, useEffect, useState } from "react";
import CheckboxCard from "./CheckboxCard";
import data from "../data/data.json";
import styled from "styled-components";

const AnnualDiscountContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin: 20px 0;
  gap: 10px;
  padding: 15px;
  border-radius: 10px;
  border: 1px dashed #dee2e6;
  background-color: #f8f9fa;
`;

const AnnualCheckbox = styled.label`
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  font-weight: 500;

  input {
    cursor: pointer;
    width: 18px;
    height: 18px;
  }
`;

const DiscountBadge = styled.span`
  background-color: #28a745;
  color: white;
  font-size: 0.9rem;
  font-weight: bold;
  padding: 5px 10px;
  border-radius: 20px;
  margin-left: 10px;
`;

interface Props {
  setTotal: (total: number) => void;
  setServices: React.Dispatch<SetStateAction<string[]>>;
  setCounterAditional: React.Dispatch<
    React.SetStateAction<{
      pagines: number;
      llenguatges: number;
    }>
  >;
  setIsAnnual: React.Dispatch<React.SetStateAction<boolean>>;
  isAnnual: boolean;
  initialSelectedServices?: number[];
  initialPagesLanguages?: {
    pagines: number;
    llenguatges: number;
  };
}

const CheckboxCardList = ({
  setTotal,
  setServices,
  setCounterAditional,
  setIsAnnual,
  isAnnual,
  initialSelectedServices = [],
  initialPagesLanguages
}: Props) => {
  const [selectedServices, setSelectedServices] = useState<number[]>([]);
  const [aditional, setAditional] = useState<number>(0);

  // Inicializar servicios seleccionados desde los parámetros de URL
  useEffect(() => {
    if (initialSelectedServices && initialSelectedServices.length > 0) {
      setSelectedServices(initialSelectedServices);
    }
  }, [initialSelectedServices]);

  const toggleService = (id: number) => {
    setSelectedServices((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );

    // Actualizar la URL para reflejar los cambios
    updateURLWithCurrentSelections(id, !selectedServices.includes(id));
  };

  // Función para actualizar la URL con las selecciones actuales
  const updateURLWithCurrentSelections = (
    toggledId: number,
    isAdding: boolean
  ) => {
    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.search);

    // Calcular servicios que estarán seleccionados después del toggle
    const updatedServices = isAdding
      ? [...selectedServices, toggledId]
      : selectedServices.filter((id) => id !== toggledId);

    // Actualizar parámetros de servicios
    data.forEach((item) => {
      const isSelected = updatedServices.includes(item.id);
      if (isSelected) {
        params.set(item.name, "true");
      } else {
        params.delete(item.name);
      }
    });

    // Si Web está seleccionado, añadir páginas y lenguajes
    if (updatedServices.includes(3)) {
      // 3 es el ID de Web
      params.set("pages", initialPagesLanguages?.pagines.toString() || "0");
      params.set("langs", initialPagesLanguages?.llenguatges.toString() || "0");
    } else {
      params.delete("pages");
      params.delete("langs");
    }

    // Actualizar parámetro anual
    if (isAnnual) {
      params.set("annual", "true");
    } else {
      params.delete("annual");
    }

    // Actualizar la URL sin recargar la página
    const newUrl = `${url.pathname}?${params.toString()}`;
    window.history.replaceState({}, "", newUrl);
  };

  useEffect(() => {
    const subtotal =
      data
        .filter((item) => selectedServices.includes(item.id))
        .reduce((sum, item) => sum + item.price, 0) + aditional;

    // Si es anual, aplicamos el descuento del 20%
    const total = isAnnual ? subtotal * 0.8 : subtotal;

    setTotal(total);

    const services = data
      .filter((item) => selectedServices.includes(item.id))
      .map((item) => item.name);
    setServices(services);
  }, [selectedServices, setTotal, aditional, setServices, isAnnual]);

  const handleAnnualToggle = () => {
    const newValue = !isAnnual;
    setIsAnnual(newValue);

    // Actualizar URL con el cambio anual
    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.search);

    if (newValue) {
      params.set("annual", "true");
    } else {
      params.delete("annual");
    }

    const newUrl = `${url.pathname}?${params.toString()}`;
    window.history.replaceState({}, "", newUrl);
  };

  return (
    <div>
      {data.map((item) => (
        <CheckboxCard
          key={item.id}
          name={item.name}
          description={item.description}
          price={item.price}
          checked={selectedServices.includes(item.id)}
          onToggle={() => toggleService(item.id)}
          setAditional={setAditional}
          setCounterAditional={setCounterAditional}
          initialPagesLanguages={initialPagesLanguages}
        />
      ))}

      <AnnualDiscountContainer>
        <AnnualCheckbox>
          <input
            type="checkbox"
            checked={isAnnual}
            onChange={handleAnnualToggle}
            id="annual-discount"
          />
          <span>Pressupost anual</span>
          {isAnnual && <DiscountBadge>Descompte 20%</DiscountBadge>}
        </AnnualCheckbox>
      </AnnualDiscountContainer>
    </div>
  );
};

export default CheckboxCardList;

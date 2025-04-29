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
}

const CheckboxCardList = ({
  setTotal,
  setServices,
  setCounterAditional,
  setIsAnnual,
  isAnnual
}: Props) => {
  const [selectedServices, setSelectedServices] = useState<number[]>([]);
  const [aditional, setAditional] = useState<number>(0);

  const toggleService = (id: number) => {
    setSelectedServices((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
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
    setIsAnnual(!isAnnual);
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

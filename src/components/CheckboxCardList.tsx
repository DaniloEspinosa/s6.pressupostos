import { useState } from "react";
import CheckboxCard from "./CheckboxCard";

const data = [
  {
    id: 1,
    name: "Seo",
    description: "Programació d'una web responsive completa",
    price: 300
  },
  {
    id: 2,
    name: "Ads",
    description: "Programació d'una web responsive completa",
    price: 600
  },
  {
    id: 3,
    name: "Web",
    description: "Programació d'una web responsive completa",
    price: 200
  }
];

interface Props {
  onTotalChange: (total: number) => void;
}

const CheckboxCardList = ({ onTotalChange }: Props) => {
  const [selectedServices, setSelectedServices] = useState<number[]>([]);

  const toggleService = (id: number) => {
    setSelectedServices((prev) => {
      const newSelected = prev.includes(id)
        ? prev.filter((item) => {
            return item !== id;
          })
        : [...prev, id];
      const total = data
        .filter((item) => newSelected.includes(item.id))
        .reduce((sum, item) => sum + item.price, 0);
      onTotalChange(total);
      return newSelected;
    });
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
        />
      ))}
    </div>
  );
};

export default CheckboxCardList;

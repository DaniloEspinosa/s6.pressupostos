import { useEffect, useState } from "react";
import CheckboxCard from "./CheckboxCard";
import data from "../data/data.json";

interface Props {
  setTotal: (total: number) => void;
}

const CheckboxCardList = ({ setTotal }: Props) => {
  const [selectedServices, setSelectedServices] = useState<number[]>([]);
  const [aditional, setAditional] = useState<number>(0);

  const toggleService = (id: number) => {
    setSelectedServices((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  useEffect(() => {
    const total = data
      .filter((item) => selectedServices.includes(item.id))
      .reduce((sum, item) => sum + item.price, 0);
    setTotal(total + aditional);
  }, [selectedServices, setTotal, aditional]);

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
        />
      ))}
    </div>
  );
};

export default CheckboxCardList;

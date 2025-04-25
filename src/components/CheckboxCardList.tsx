import { SetStateAction, useEffect, useState } from "react";
import CheckboxCard from "./CheckboxCard";
import data from "../data/data.json";

interface Props {
  setTotal: (total: number) => void;
  setServices: React.Dispatch<SetStateAction<string[]>>;
  setCounterAditional: React.Dispatch<
    React.SetStateAction<{
      pagines: number;
      llenguatges: number;
    }>
  >;
}

const CheckboxCardList = ({
  setTotal,
  setServices,
  setCounterAditional
}: Props) => {
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
    const services = data
      .filter((item) => selectedServices.includes(item.id))
      .map((item) => item.name);
    setServices(services);
  }, [selectedServices, setTotal, aditional, setServices]);

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
    </div>
  );
};

export default CheckboxCardList;

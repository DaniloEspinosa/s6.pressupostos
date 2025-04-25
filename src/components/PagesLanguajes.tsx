import { useEffect, useState } from "react";
import QuantitySelector from "./QuantitySelector";

type Props = {
  setAditional: React.Dispatch<React.SetStateAction<number>>;
  setCounterAditional: React.Dispatch<
    React.SetStateAction<{
      pagines: number;
      llenguatges: number;
    }>
  >;
};

const PagesLanguajes = ({ setAditional, setCounterAditional }: Props) => {
  const [pagines, setPagines] = useState<number>(0);
  const [llenguatges, setLlenguatges] = useState<number>(0);

  const priceAditionalUnit = 30;

  useEffect(() => {
    setAditional((pagines + llenguatges) * priceAditionalUnit);
    setCounterAditional({ pagines: pagines, llenguatges: llenguatges });
  }, [pagines, llenguatges, setAditional, setCounterAditional]);

  return (
    <div className="flex flex-col gap-2">
      <QuantitySelector
        name="Nombre de pàgines"
        description="Afegeix les pàgines que necessitis per a dur a terme el teu projecte. El cost de cada pàgina es de 30€"
        quantity={pagines}
        setQuantity={setPagines}
      />
      <QuantitySelector
        name="Nombre de llenguatges"
        description="Afegeix les llenguatges que tindra el teu projecte. El cost de cada llenguatge es de 30€"
        quantity={llenguatges}
        setQuantity={setLlenguatges}
      />
    </div>
  );
};

export default PagesLanguajes;

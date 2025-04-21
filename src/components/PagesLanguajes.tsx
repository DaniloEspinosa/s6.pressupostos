import { useEffect, useState } from "react";
import QuantitySelector from "./QuantitySelector";

type Props = {
  setAditional: React.Dispatch<React.SetStateAction<number>>;
};

const PagesLanguajes = ({ setAditional }: Props) => {
  const [pagines, setPagines] = useState<number>(0);
  const [llenguatges, setLlenguatges] = useState<number>(0);

  const priceAditionalUnit = 30;

  useEffect(() => {
    setAditional((pagines + llenguatges) * priceAditionalUnit);
  }, [pagines, llenguatges, setAditional]);

  return (
    <div className="flex flex-col gap-2">
      <QuantitySelector
        name="Nombre de pàgines"
        quantity={pagines}
        setQuantity={setPagines}
      />
      <QuantitySelector
        name="Nombre de llenguatges"
        quantity={llenguatges}
        setQuantity={setLlenguatges}
      />
    </div>
  );
};

export default PagesLanguajes;

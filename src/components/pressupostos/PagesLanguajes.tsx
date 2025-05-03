import { useEffect, useState } from "react";
import QuantitySelector from "../common/QuantitySelector";

type Props = {
  setAditional: React.Dispatch<React.SetStateAction<number>>;
  setCounterAditional: React.Dispatch<
    React.SetStateAction<{
      pagines: number;
      llenguatges: number;
    }>
  >;
  initialValues?: {
    pagines: number;
    llenguatges: number;
  };
};

const PagesLanguajes = ({
  setAditional,
  setCounterAditional,
  initialValues
}: Props) => {
  const [pagines, setPagines] = useState<number>(initialValues?.pagines || 0);
  const [llenguatges, setLlenguatges] = useState<number>(
    initialValues?.llenguatges || 0
  );

  const priceAditionalUnit = 30;

  useEffect(() => {
    setAditional((pagines + llenguatges) * priceAditionalUnit);
    setCounterAditional({ pagines: pagines, llenguatges: llenguatges });

    // Actualizar la URL cuando cambian las páginas o lenguajes
    updateURLWithPagesAndLanguages(pagines, llenguatges);
  }, [pagines, llenguatges, setAditional, setCounterAditional]);

  // Función para actualizar la URL con páginas y lenguajes
  const updateURLWithPagesAndLanguages = (pages: number, langs: number) => {
    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.search);

    params.set("pages", pages.toString());
    params.set("langs", langs.toString());

    const newUrl = `${url.pathname}?${params.toString()}`;
    window.history.replaceState({}, "", newUrl);
  };

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

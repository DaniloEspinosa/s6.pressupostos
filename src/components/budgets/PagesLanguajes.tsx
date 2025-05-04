import { useEffect, useState } from "react";
import QuantitySelector from "../common/QuantitySelector";

type Props = {
  setAditional: React.Dispatch<React.SetStateAction<number>>;
  setCounterAditional: React.Dispatch<
    React.SetStateAction<{
      pages: number;
      languages: number;
    }>
  >;
  initialValues?: {
    pages: number;
    languages: number;
  };
};

const PagesLanguajes = ({
  setAditional,
  setCounterAditional,
  initialValues
}: Props) => {
  const [pages, setPagines] = useState<number>(initialValues?.pages || 0);
  const [languages, setLanguages] = useState<number>(
    initialValues?.languages || 0
  );

  const priceAditionalUnit = 30;

  useEffect(() => {
    setAditional((pages + languages) * priceAditionalUnit);
    setCounterAditional({ pages: pages, languages: languages });

    // Actualizar la URL cuando cambian las páginas o lenguajes
    updateURLWithPagesAndLanguages(pages, languages);
  }, [pages, languages, setAditional, setCounterAditional]);

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
        quantity={pages}
        setQuantity={setPagines}
      />
      <QuantitySelector
        name="Nombre de llenguatges"
        description="Afegeix les llenguatges que tindra el teu projecte. El cost de cada llenguatge es de 30€"
        quantity={languages}
        setQuantity={setLanguages}
      />
    </div>
  );
};

export default PagesLanguajes;

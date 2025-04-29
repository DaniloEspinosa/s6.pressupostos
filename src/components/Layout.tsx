import { useState } from "react";
import CheckboxCardList from "./CheckboxCardList";
import TotalPrice from "./TotalPrice";
import styled from "styled-components";
import FormDemanar from "./FormDemanar";
import PressupostosList from "./PressupostosList";
import { Pressuposto } from "../types/Pressuposto";
import { DataForm } from "../types/DataForm";

const Container = styled.div`
  width: 60%;
  margin: 0 auto;
`;

const Layout = () => {
  const [total, setTotal] = useState(0);
  const [services, setServices] = useState<string[]>([]);
  const [pressupostos, setPressupostos] = useState<Pressuposto[]>([]);
  const [isAnnual, setIsAnnual] = useState<boolean>(false);
  const [counterAditional, setCounteraditional] = useState<{
    pagines: number;
    llenguatges: number;
  }>({ pagines: 0, llenguatges: 0 });

  const generatePressuposto = (dataPressuposto: DataForm) => {
    const servicesList = services.map((item) =>
      item === "Web"
        ? `${item} (${counterAditional.pagines} pàgine/s, ${counterAditional.llenguatges} llenguatge/s)`
        : item
    );

    // Si es anual, añadimos un indicador en el listado de servicios
    const finalServicesList = isAnnual
      ? [...servicesList, "Pressupost anual (20% de descompte)"]
      : servicesList;

    const pressuposto: Pressuposto = {
      name: dataPressuposto.name,
      email: dataPressuposto.email,
      services: finalServicesList,
      tel: dataPressuposto.tel,
      total: total,
      createdAt: new Date(),
      isAnnual: isAnnual // Guardamos si es anual o no
    };

    setPressupostos((prev) => [...prev, pressuposto]);
  };

  return (
    <Container>
      <CheckboxCardList
        setTotal={setTotal}
        setServices={setServices}
        setCounterAditional={setCounteraditional}
        setIsAnnual={setIsAnnual}
        isAnnual={isAnnual}
      />
      <TotalPrice total={total} isAnnual={isAnnual} />
      <FormDemanar generatePressuposto={generatePressuposto} />
      <PressupostosList pressupostos={pressupostos} />
    </Container>
  );
};

export default Layout;

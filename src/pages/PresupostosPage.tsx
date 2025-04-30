import Header from "../components/Header";
import { useState, useEffect } from "react";
import styled from "styled-components";
import { Pressuposto } from "../types/Pressuposto";
import { DataForm } from "../types/DataForm";
import CheckboxCardList from "../components/CheckboxCardList";
import TotalPrice from "../components/TotalPrice";
import FormDemanar from "../components/FormDemanar";
import PressupostosList from "../components/PressupostosList";
import { useLocation } from "react-router-dom";

const Container = styled.div`
  width: 60%;
  margin: 0 auto;
`;

interface URLParams {
  Seo: boolean;
  Ads: boolean;
  Web: boolean;
  pages?: number;
  langs?: number;
  annual: boolean;
  name?: string;
  email?: string;
  tel?: string;
}

const PresupostosPage = () => {
  const [total, setTotal] = useState(0);
  const [services, setServices] = useState<string[]>([]);
  const [pressupostos, setPressupostos] = useState<Pressuposto[]>([]);
  const [isAnnual, setIsAnnual] = useState<boolean>(false);
  const [counterAditional, setCounteraditional] = useState<{
    pagines: number;
    llenguatges: number;
  }>({ pagines: 0, llenguatges: 0 });
  const [initialSelectedServices, setInitialSelectedServices] = useState<
    number[]
  >([]);
  const [initialUserData, setInitialUserData] = useState<DataForm | null>(null);

  // Obtener la ubicación actual para acceder a los parámetros de consulta
  const location = useLocation();

  // Procesar los parámetros de URL al cargar la página
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const params: Partial<URLParams> = {
      Seo: false,
      Ads: false,
      Web: false,
      annual: false
    };

    // Extraer servicios de los parámetros
    const booleanServices: Array<keyof Pick<URLParams, "Seo" | "Ads" | "Web">> =
      ["Seo", "Ads", "Web"];

    booleanServices.forEach((service) => {
      if (queryParams.get(service) === "true") {
        params[service] = true;
      }
    });

    // Extraer páginas y lenguajes
    const pages = queryParams.get("pages");
    if (pages) params.pages = parseInt(pages, 10);

    const langs = queryParams.get("langs");
    if (langs) params.langs = parseInt(langs, 10);

    // Extraer si es anual
    if (queryParams.get("annual") === "true") {
      params.annual = true;
      setIsAnnual(true);
    }

    // Extraer datos del usuario
    const name = queryParams.get("name");
    const email = queryParams.get("email");
    const tel = queryParams.get("tel");

    if (name || email || tel) {
      setInitialUserData({
        name: name || "",
        email: email || "",
        tel: tel || ""
      });
    }

    // Configurar selecciones iniciales basadas en parámetros de URL
    const initialServices: number[] = [];
    if (params.Seo) initialServices.push(1);
    if (params.Ads) initialServices.push(2);
    if (params.Web) initialServices.push(3);

    // Configurar páginas y lenguajes si están especificados
    if (params.pages !== undefined || params.langs !== undefined) {
      setCounteraditional({
        pagines: params.pages || 0,
        llenguatges: params.langs || 0
      });
    }

    setInitialSelectedServices(initialServices);
  }, [location.search]);

  const generatePressuposto = (dataPressuposto: DataForm) => {
    const servicesList = services.map((item) =>
      item === "Web"
        ? `${item} (${counterAditional.pagines} pàgine/s, ${counterAditional.llenguatges} llenguatge/s)`
        : item
    );

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
      isAnnual: isAnnual
    };

    setPressupostos((prev) => [...prev, pressuposto]);
  };

  // Actualizar la URL cuando cambian las selecciones
  useEffect(() => {
    // Esta función se utilizará en futuras implementaciones
    // para actualizar dinámicamente la URL a medida que el usuario hace selecciones
  }, [services, counterAditional, isAnnual]);

  return (
    <div>
      <Header />
      <Container>
        <CheckboxCardList
          setTotal={setTotal}
          setServices={setServices}
          setCounterAditional={setCounteraditional}
          setIsAnnual={setIsAnnual}
          isAnnual={isAnnual}
          initialSelectedServices={initialSelectedServices}
          initialPagesLanguages={counterAditional}
        />
        <TotalPrice total={total} isAnnual={isAnnual} />
        <FormDemanar
          generatePressuposto={generatePressuposto}
          initialData={initialUserData}
        />
        <PressupostosList pressupostos={pressupostos} />
      </Container>
    </div>
  );
};

export default PresupostosPage;

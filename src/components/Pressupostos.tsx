import styled from "styled-components";
import { Pressuposto } from "../types/Pressuposto";
import PriceComponent from "./PriceComponent";
import { useState } from "react";

const CardContainer = styled.div`
  padding: 2rem 1rem;
  border-radius: 15px;
  display: flex;
  justify-content: space-between;
  gap: 10px;
  margin-bottom: 30px;
  box-shadow: 10px 10px 31px -6px rgba(0, 0, 0, 0.35);
`;

const InfoCard = styled.div`
  h3 {
    font-size: 1.5rem;
    font-weight: bolder;
  }
`;

const DateInfo = styled.span`
  font-size: 0.8rem;
  color: #666;
  display: block;
  margin-top: 4px;
`;

const ShareButton = styled.button`
  background-color: #4285f4;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 5px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 10px;
  transition: background-color 0.2s;

  &:hover {
    background-color: #3367d6;
  }

  svg {
    width: 16px;
    height: 16px;
  }
`;

const Tooltip = styled.div`
  position: relative;
  display: inline-block;
`;

const TooltipText = styled.span`
  visibility: hidden;
  width: 140px;
  background-color: #555;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 5px;
  position: absolute;
  z-index: 1;
  bottom: 150%;
  left: 50%;
  margin-left: -75px;
  opacity: 0;
  transition: opacity 0.3s;
  font-size: 12px;
  font-weight: normal;

  &.show {
    visibility: visible;
    opacity: 1;
  }

  &::after {
    content: "";
    position: absolute;
    top: 100%;
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: #555 transparent transparent transparent;
  }
`;

interface Props {
  pressupostos: Pressuposto;
}

const Pressupostos = ({ pressupostos }: Props) => {
  const [showTooltip, setShowTooltip] = useState(false);

  // Formatear la fecha para mostrarla en un formato legible
  const formatDate = (date: Date) => {
    if (!date) return "";

    const d = new Date(date);
    return d.toLocaleDateString("ca-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  // Generar la URL para compartir
  const generateShareableUrl = () => {
    // Extraer información sobre páginas y lenguajes si está disponible
    let pages = 0;
    let langs = 0;

    const webService = pressupostos.services.find((service) =>
      service.startsWith("Web")
    );

    if (webService) {
      const match = webService.match(/(\d+) pàgine\/s, (\d+) llenguatge\/s/);
      if (match) {
        pages = parseInt(match[1], 10);
        langs = parseInt(match[2], 10);
      }
    }

    // Crear objeto con los servicios seleccionados
    const servicesMap: Record<string, boolean> = {};
    const baseServices = ["Seo", "Ads", "Web"];

    baseServices.forEach((service) => {
      servicesMap[service] = pressupostos.services.some((s) =>
        s.startsWith(service)
      );
    });

    // Construir parámetros de consulta
    const queryParams = new URLSearchParams();

    // Añadir servicios
    Object.entries(servicesMap).forEach(([service, selected]) => {
      if (selected) queryParams.append(service, "true");
    });

    // Añadir páginas y lenguajes si Web está seleccionado
    if (servicesMap["Web"]) {
      if (pages > 0) queryParams.append("pages", pages.toString());
      if (langs > 0) queryParams.append("langs", langs.toString());
    }

    // Añadir si es anual o no
    if (pressupostos.isAnnual) {
      queryParams.append("annual", "true");
    }

    // Añadir información del usuario
    queryParams.append("name", pressupostos.name);
    queryParams.append("email", pressupostos.email);
    queryParams.append("tel", pressupostos.tel);

    // Construir URL completa
    const baseUrl = window.location.origin + "/presupostos";
    return `${baseUrl}?${queryParams.toString()}`;
  };

  // Copiar URL al portapapeles
  const copyToClipboard = () => {
    const url = generateShareableUrl();
    navigator.clipboard.writeText(url).then(() => {
      setShowTooltip(true);
      setTimeout(() => setShowTooltip(false), 2000);
    });
  };

  return (
    <CardContainer>
      <InfoCard>
        <h3>{pressupostos.name}</h3>
        <p>{pressupostos.email}</p>
        <p>{pressupostos.tel}</p>
        {pressupostos.createdAt && (
          <DateInfo>Data: {formatDate(pressupostos.createdAt)}</DateInfo>
        )}
        <Tooltip>
          <ShareButton onClick={copyToClipboard}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z" />
            </svg>
            Compartir
          </ShareButton>
          <TooltipText className={showTooltip ? "show" : ""}>
            URL copiada al portapapeles!
          </TooltipText>
        </Tooltip>
      </InfoCard>
      <div>
        <p>Serveis contractats:</p>
        <ul>
          {pressupostos.services.map((item, i) => (
            <li key={i}>• {item}</li>
          ))}
        </ul>
      </div>
      <div>
        <p>Total:</p>
        <PriceComponent price={pressupostos.total} symbol="€" />
      </div>
    </CardContainer>
  );
};

export default Pressupostos;

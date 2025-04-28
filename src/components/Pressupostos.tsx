import styled from "styled-components";
import { Pressuposto } from "../types/Pressuposto";
import PriceComponent from "./PriceComponent";

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

interface Props {
  pressupostos: Pressuposto;
}

const Pressupostos = ({ pressupostos }: Props) => {
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

  return (
    <CardContainer>
      <InfoCard>
        <h3>{pressupostos.name}</h3>
        <p>{pressupostos.email}</p>
        <p>{pressupostos.tel}</p>
        {pressupostos.createdAt && (
          <DateInfo>Data: {formatDate(pressupostos.createdAt)}</DateInfo>
        )}
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

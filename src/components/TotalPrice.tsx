import styled from "styled-components";
import PriceComponent from "./PriceComponent";

const TotalContainer = styled.div`
  display: flex;
  gap: 40px;
  justify-content: end;
  align-items: end;
  margin-top: 1rem;
  padding: 1rem;
  text-align: center;
  font-size: 1.2rem;
  font-weight: bold;
  .preu {
    width: 40%;
  }
`;

const TotalPrice = ({ total }: { total: number }) => {
  return (
    <TotalContainer>
      <span className="preu">Preu pressuposat:</span>
      <span className="price">
        <PriceComponent price={total} symbol="€" />
      </span>
    </TotalContainer>
  );
};

export default TotalPrice;

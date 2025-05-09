import styled from "styled-components";
import PriceComponent from "../common/PriceComponent";

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

const DiscountInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-top: 5px;
  font-size: 1rem;
  color: #28a745;
`;

interface TotalPriceProps {
  total: number;
  isAnnual?: boolean;
}

const TotalPrice = ({ total, isAnnual = false }: TotalPriceProps) => {
  const originalPrice = isAnnual ? total / 0.8 : total; //Precio total, con o sin descuento segun corresponda
  const discountAmount = isAnnual ? originalPrice - total : 0; //Descuento aplicado

  return (
    <div>
      <TotalContainer>
        <span className="preu">Preu pressuposat:</span>
        <div className="price">
          {isAnnual && (
            <div
              style={{
                textDecoration: "line-through",
                color: "#6c757d",
                fontSize: "1rem",
                textAlign: "right"
              }}
            >
              <PriceComponent
                price={Math.round(originalPrice * 100) / 100}
                symbol="€"
              />
            </div>
          )}
          {isAnnual && (
            <DiscountInfo>
              <span>Pressupost anual</span>
              <span>
                Estalvi: {Math.round(discountAmount * 100) / 100}€ (20%)
              </span>
            </DiscountInfo>
          )}
          <PriceComponent price={Math.round(total * 100) / 100} symbol="€" />
        </div>
      </TotalContainer>
    </div>
  );
};

export default TotalPrice;

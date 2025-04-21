import styled from "styled-components";
import PriceComponent from "./PriceComponent";
import PagesLanguajes from "./PagesLanguajes";
import { useEffect } from "react";

const CardContainer = styled.div`
  padding: 2rem 1rem;
  border-radius: 15px;
  display: flex;
  gap: 10px;
  flex-direction: column;
  margin-bottom: 30px;
  box-shadow: 10px 10px 31px -6px rgba(0, 0, 0, 0.35);
`;

const Card = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

const CardInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 40%;
  span:first-child {
    font-weight: bolder;
    font-size: 1.2rem;
  }
  span:nth-child(2) {
    font-size: 0.8rem;
  }
`;

const CheckComponent = styled.label`
  display: flex;
  gap: 10px;
  span {
    font-size: 0.8rem;
    font-weight: bold;
  }
`;

interface CheckboxCardProps {
  name: string;
  description: string;
  price: number;
  checked: boolean;
  onToggle: () => void;
  setAditional: React.Dispatch<React.SetStateAction<number>>;
}

const CheckboxCard = ({
  name,
  description,
  price,
  checked,
  onToggle,
  setAditional
}: CheckboxCardProps) => {
  useEffect(() => {
    if (!checked) setAditional(0);
  }, [checked, setAditional]);

  return (
    <CardContainer>
      <Card>
        <CardInfo>
          <span>{name}</span>
          <span>{description}</span>
        </CardInfo>
        <PriceComponent price={price} symbol="€" />

        <CheckComponent>
          <input type="checkbox" checked={checked} onChange={onToggle} />
          <span>Afegir</span>
        </CheckComponent>
      </Card>
      {checked && name === "Web" && (
        <PagesLanguajes setAditional={setAditional} />
      )}
    </CardContainer>
  );
};

export default CheckboxCard;

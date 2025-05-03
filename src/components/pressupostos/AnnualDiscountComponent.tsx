import styled from "styled-components";
import PopUpModalComponent from "../common/PopUpModalComponent";

const AnnualDiscountContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin: 20px 0;
  gap: 10px;
  padding: 15px;
  height: 3rem;
  border-radius: 10px;
  border: 1px dashed #dee2e6;
  background-color: #f8f9fa;
`;

const AnnualCheckbox = styled.label`
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  font-weight: 500;

  input {
    cursor: pointer;
    width: 18px;
    height: 18px;
  }

  input:checked {
    accent-color: #28a745;
  }
`;

const DiscountBadge = styled.span`
  background-color: #28a745;
  color: white;
  font-size: 0.9rem;
  font-weight: bold;
  padding: 5px 10px;
  border-radius: 10px;
  margin-left: 10px;
`;

interface Props {
  handleAnnualToggle: () => void;
  isAnnual: boolean;
}

const AnnualDiscountComponent = ({ isAnnual, handleAnnualToggle }: Props) => {
  return (
    <div>
      <AnnualDiscountContainer>
        {isAnnual && <DiscountBadge>Descompte 20%</DiscountBadge>}
        <AnnualCheckbox>
          <input
            type="checkbox"
            checked={isAnnual}
            onChange={handleAnnualToggle}
            id="annual-discount"
          />
          <span>Pressupost anual</span>
        </AnnualCheckbox>
        <PopUpModalComponent
          description="If you would like a 20% discount, you will need to select the annual payment option."
          title="Annual discount"
        />
      </AnnualDiscountContainer>
    </div>
  );
};

export default AnnualDiscountComponent;

import styled from "styled-components";
import { BudgetI } from "../../types/BudgetI";
import PriceComponent from "../common/PriceComponent";
import { useState } from "react";
import { FaShareAlt } from "react-icons/fa";
import { formatDate } from "../../utils/formatDate";
import { generateShareableUrl } from "../../utils/generateShareableUrl";
import { FaTrashAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
  background-color: #28a745;
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
    background-color: #208841;
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

const DeleteButton = styled.button`
  background-color: #dc3545;
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
    background-color: #b02a37;
  }
`;

interface Props {
  budgets: BudgetI;
  onDelete: (id: string) => void;
}

const Budget = ({ budgets, onDelete }: Props) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const copyToClipboard = () => {
    const url = generateShareableUrl(budgets);
    navigator.clipboard.writeText(url).then(() => {
      setShowTooltip(true);
      setTimeout(() => setShowTooltip(false), 2000);
    });
  };

  const deleteBudget = () => {
    onDelete(budgets.id);
    toast.success("Presupuesto eliminado correctamente"); // Mostrar toast
  };

  return (
    <CardContainer>
      <InfoCard>
        <h3>{budgets.name}</h3>
        <p>{budgets.email}</p>
        <p>{budgets.tel}</p>
        {budgets.createdAt && (
          <DateInfo>Data: {formatDate(budgets.createdAt)}</DateInfo>
        )}
        <Tooltip>
          <ShareButton onClick={copyToClipboard}>
            <FaShareAlt />
          </ShareButton>
          <TooltipText className={showTooltip ? "show" : ""}>
            URL copiada al portapapeles!
          </TooltipText>
        </Tooltip>
        <DeleteButton onClick={deleteBudget}>
          <FaTrashAlt />
        </DeleteButton>
      </InfoCard>
      <div>
        <p>Serveis contractats:</p>
        <ul>
          {budgets.services.map((item, i) => (
            <li key={i}>• {item}</li>
          ))}
        </ul>
      </div>
      <div>
        <p>Total:</p>
        <PriceComponent price={budgets.total} symbol="€" />
      </div>
    </CardContainer>
  );
};

export default Budget;

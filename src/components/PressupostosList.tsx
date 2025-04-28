import { useState } from "react";
import { Pressuposto } from "../types/Pressuposto";
import Pressupostos from "./Pressupostos";
import styled from "styled-components";

const SortingButtons = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  justify-content: flex-end;
`;

const SortButton = styled.button`
  padding: 8px 16px;
  background-color: #f8f9fa;
  border: 1px solid #dee2e6;
  border-radius: 5px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s;

  &:hover {
    background-color: #e9ecef;
  }

  &:active {
    background-color: #dee2e6;
  }
`;

type Props = {
  pressupostos: Pressuposto[];
};

type SortType = "none" | "alphabetical" | "date";

const PressupostosList = ({ pressupostos }: Props) => {
  const [sortType, setSortType] = useState<SortType>("none");

  // Función para ordenar presupuestos según el criterio seleccionado
  const getSortedPressupostos = () => {
    if (sortType === "none") {
      return [...pressupostos];
    } else if (sortType === "alphabetical") {
      return [...pressupostos].sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortType === "date") {
      return [...pressupostos].sort((a, b) => {
        // Si no existe la fecha, asumimos que los más recientes están al final del array
        if (!a.createdAt && !b.createdAt) return 0;
        if (!a.createdAt) return 1;
        if (!b.createdAt) return -1;
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      });
    }
    return [...pressupostos];
  };

  return (
    <div>
      {pressupostos.length > 0 && (
        <SortingButtons>
          <SortButton
            onClick={() => setSortType("alphabetical")}
            style={{
              backgroundColor: sortType === "alphabetical" ? "#dee2e6" : ""
            }}
          >
            Ordenar alfabèticament
          </SortButton>
          <SortButton
            onClick={() => setSortType("date")}
            style={{ backgroundColor: sortType === "date" ? "#dee2e6" : "" }}
          >
            Ordenar per data
          </SortButton>
          <SortButton
            onClick={() => setSortType("none")}
            style={{ backgroundColor: sortType === "none" ? "#dee2e6" : "" }}
          >
            Reinicialitzar ordre
          </SortButton>
        </SortingButtons>
      )}

      {pressupostos.length > 0 ? (
        getSortedPressupostos().map((item, i) => (
          <Pressupostos key={i} pressupostos={item} />
        ))
      ) : (
        <div className="text-center p-4">Encara no hi ha pressupostos</div>
      )}
    </div>
  );
};

export default PressupostosList;

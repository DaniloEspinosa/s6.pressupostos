import { useState } from "react";
import { BudgetI } from "../../types/BudgetI";
import Budget from "./Budget";
import styled from "styled-components";

const SortingButtons = styled.div`
  display: flex;
  gap: 10px;
  width: 100%;
  margin-top: 30px;
  margin-bottom: 10px;
  justify-content: space-between;
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

const SearchInput = styled.input`
  padding: 10px;
  border: 1px solid #dee2e6;
  border-radius: 5px;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: #adb5bd;
    box-shadow: 0 0 0 2px rgba(173, 181, 189, 0.25);
  }
`;

const ListControls = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 20px;
`;

const NoResults = styled.div`
  text-align: center;
  padding: 20px;
  color: #6c757d;
  font-style: italic;
  background-color: #f8f9fa;
  border-radius: 5px;
  border: 1px solid #dee2e6;
`;

type Props = {
  pressupostos: BudgetI[];
  handleDeleteBudget: (id: string) => void;
};

type SortType = "none" | "alphabetical" | "date";

const BudgetsList = ({ pressupostos, handleDeleteBudget }: Props) => {
  const [sortType, setSortType] = useState<SortType>("none");
  const [searchTerm, setSearchTerm] = useState<string>("");

  // Función para ordenar y filtrar presupuestos
  const getFilteredAndSortedPressupostos = () => {
    let filteredPressupostos = [...pressupostos];

    // Aplicar filtro de búsqueda si hay un término
    if (searchTerm.trim() !== "") {
      filteredPressupostos = filteredPressupostos.filter((p) =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Aplicar ordenación
    if (sortType === "alphabetical") {
      filteredPressupostos.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortType === "date") {
      filteredPressupostos.sort((a, b) => {
        if (!a.createdAt && !b.createdAt) return 0;
        if (!a.createdAt) return 1;
        if (!b.createdAt) return -1;
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      });
    }

    return filteredPressupostos;
  };

  const filteredPressupostos = getFilteredAndSortedPressupostos();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div>
      {pressupostos.length > 0 && (
        <ListControls>
          <SortingButtons>
            <SearchInput
              id="search-pressupostos"
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="Escriu el nom a cercar...🔍"
            />
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
        </ListControls>
      )}

      {pressupostos.length > 0 ? (
        filteredPressupostos.length > 0 ? (
          filteredPressupostos.map((item, i) => (
            <Budget key={i} budgets={item} onDelete={handleDeleteBudget} />
          ))
        ) : (
          <NoResults>
            No s'han trobat pressupostos amb el nom "{searchTerm}"
          </NoResults>
        )
      ) : (
        <div className="text-center p-4">Encara no hi ha pressupostos</div>
      )}
    </div>
  );
};

export default BudgetsList;

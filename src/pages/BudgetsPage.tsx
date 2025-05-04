import Header from "../components/common/Header";
import { useState, useEffect } from "react";
import styled from "styled-components";
import { BudgetI } from "../types/BudgetI";
import { DataFormI } from "../types/DataFormI";
import CheckboxCardList from "../components/budgets/ServiceCardList";
import TotalPrice from "../components/budgets/TotalPrice";
import RequestForm from "../components/budgets/RequestForm";
import BudgetsList from "../components/budgets/BudgetsList";
import { useLocation } from "react-router-dom";
import { URLParamsI } from "../types/URLParamsI";
import { v4 as uuidv4 } from "uuid";

const Container = styled.div`
  width: 60%;
  margin: 0 auto;
`;

const PresupostosPage = () => {
  const [total, setTotal] = useState(0);
  const [services, setServices] = useState<string[]>([]);
  const [budgets, setBudgets] = useState<BudgetI[]>(() => {
    const storedBudgets = localStorage.getItem("budgets");
    return storedBudgets ? JSON.parse(storedBudgets) : [];
  });
  const [isAnnual, setIsAnnual] = useState<boolean>(false);
  const [counterAditional, setCounteraditional] = useState<{
    pages: number;
    languages: number;
  }>({ pages: 0, languages: 0 });
  const [initialSelectedServices, setInitialSelectedServices] = useState<
    number[]
  >([]);
  const [initialUserData, setInitialUserData] = useState<DataFormI | null>(
    null
  );

  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const params: Partial<URLParamsI> = {
      Seo: false,
      Ads: false,
      Web: false,
      annual: false
    };

    const booleanServices: Array<
      keyof Pick<URLParamsI, "Seo" | "Ads" | "Web">
    > = ["Seo", "Ads", "Web"];

    booleanServices.forEach((service) => {
      if (queryParams.get(service) === "true") {
        params[service] = true;
      }
    });

    const pages = queryParams.get("pages");
    if (pages) params.pages = parseInt(pages, 10);

    const langs = queryParams.get("langs");
    if (langs) params.langs = parseInt(langs, 10);

    if (queryParams.get("annual") === "true") {
      params.annual = true;
      setIsAnnual(true);
    }

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

    const initialServices: number[] = [];
    if (params.Seo) initialServices.push(1);
    if (params.Ads) initialServices.push(2);
    if (params.Web) initialServices.push(3);

    if (params.pages !== undefined || params.langs !== undefined) {
      setCounteraditional({
        pages: params.pages || 0,
        languages: params.langs || 0
      });
    }

    setInitialSelectedServices(initialServices);
  }, [location.search]);

  useEffect(() => {
    localStorage.setItem("budgets", JSON.stringify(budgets));
  }, [budgets]);

  const generateBudget = (budgetData: DataFormI) => {
    const servicesList = services.map((item) =>
      item === "Web"
        ? `${item} (${counterAditional.pages} pàgine/s, ${counterAditional.languages} llenguatge/s)`
        : item
    );

    const finalServicesList = isAnnual
      ? [...servicesList, "Pressupost anual (20% de descompte)"]
      : servicesList;

    const budget: BudgetI = {
      id: uuidv4(),
      name: budgetData.name,
      email: budgetData.email,
      services: finalServicesList,
      tel: budgetData.tel,
      total: total,
      createdAt: new Date(),
      isAnnual: isAnnual
    };

    setBudgets((prev) => [...prev, budget]);
  };

  const handleDeleteBudget = (id: string) => {
    const updatedBudgets = budgets.filter((budget) => budget.id !== id);
    setBudgets(updatedBudgets); // Actualiza el estado
  };

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
        <RequestForm
          generatePressuposto={generateBudget}
          initialData={initialUserData}
        />
        <BudgetsList
          pressupostos={budgets}
          handleDeleteBudget={handleDeleteBudget}
        />
      </Container>
    </div>
  );
};

export default PresupostosPage;

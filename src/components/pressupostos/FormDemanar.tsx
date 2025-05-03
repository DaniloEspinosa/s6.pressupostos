// components/BudgetForm.tsx
import { useState, useEffect } from "react";
import styled from "styled-components";
import { DataForm } from "../../types/DataForm";

const FormWrapper = styled.form`
  padding: 2rem 1rem;
  border-radius: 15px;
  display: flex;
  gap: 10px;
  flex-direction: column;
  margin-bottom: 30px;
  box-shadow: 10px 10px 31px -6px rgba(0, 0, 0, 0.35);
`;

const Title = styled.h2`
  margin-bottom: 10px;
  font-size: 1.25rem;
  font-weight: bold;
`;

const InputsContainer = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
`;

const Input = styled.input`
  flex: 1 1 30%;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 1rem;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #28a745;
  color: #fff;
  border: none;
  border-radius: 5px;
  font-weight: bold;
  cursor: pointer;
  flex: 1 1 auto;
  white-space: nowrap;

  &:hover {
    background-color: #218838;
  }
`;

type Props = {
  generatePressuposto: (dataPressuposto: DataForm) => void;
  initialData?: DataForm | null;
};

const FormDemanar = ({ generatePressuposto, initialData }: Props) => {
  const [formData, setFormData] = useState<DataForm>({
    name: "",
    tel: "",
    email: ""
  });

  // Actualizar el formulario cuando se reciben datos iniciales
  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || "",
        tel: initialData.tel || "",
        email: initialData.email || ""
      });
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    generatePressuposto(formData);
  };

  return (
    <FormWrapper onSubmit={handleSubmit}>
      <Title>Demanar pressupost</Title>
      <InputsContainer>
        <Input
          type="text"
          name="name"
          placeholder="Nom"
          value={formData.name}
          onChange={handleChange}
        />
        <Input
          type="tel"
          name="tel"
          placeholder="Telèfon"
          value={formData.tel}
          onChange={handleChange}
        />
        <Input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        <Button type="submit">Sol·licitar pressupost →</Button>
      </InputsContainer>
    </FormWrapper>
  );
};

export default FormDemanar;

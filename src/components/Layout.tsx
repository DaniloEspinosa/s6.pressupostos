import { useState } from "react";
import CheckboxCardList from "./CheckboxCardList";
import TotalPrice from "./TotalPrice";
import styled from "styled-components";

const Container = styled.div`
  width: 60%;
  margin: 0 auto;
`;

const Layout = () => {
  const [total, setTotal] = useState(0);

  return (
    <Container>
      <CheckboxCardList setTotal={setTotal} />
      <TotalPrice total={total} />
    </Container>
  );
};

export default Layout;

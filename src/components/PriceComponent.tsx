import styled from "styled-components";

const PriceComponentStyle = styled.div`
  width: 70px;
`;

const PriceStyle = styled.span`
  font-size: 1.5rem;
  font-weight: bold;
`;

const SymbolStyle = styled.span`
  font-size: 1rem;
`;

interface Props {
  price: number;
  symbol: string;
}

const PriceComponent = ({ price, symbol }: Props) => {
  return (
    <>
      <PriceComponentStyle>
        <PriceStyle className="price">{price}</PriceStyle>
        {"  "}
        <SymbolStyle className="symbol">{symbol}</SymbolStyle>
      </PriceComponentStyle>
    </>
  );
};

export default PriceComponent;

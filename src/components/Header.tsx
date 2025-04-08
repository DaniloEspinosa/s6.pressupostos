import styled from "styled-components";

const HeaderContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 50px;
  margin-bottom: 50px;
`;

const HeaderContent = styled.header`
  display: flex;
  padding: 1rem;
  background-image: url("/pexels-steve-1789968.avif");
  height: 200px;
  width: 80%;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  span {
    font-size: 3rem;
    font-weight: bolder;
    text-shadow: 1px 3px 7px rgba(0, 0, 0, 0.9);
    color: white;
  }
`;

const Header = () => {
  return (
    <HeaderContainer>
      <HeaderContent>
        <span>Aconsegueix la millor qualitat</span>
      </HeaderContent>
    </HeaderContainer>
  );
};

export default Header;

import { Link } from "react-router-dom";
import styled from "styled-components";

const HeaderContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 50px;
  margin-bottom: 50px;
`;

const HeaderContent = styled.header`
  display: flex;
  flex-direction: column;
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
        <div className="flex gap-4 w-[300px] justify-around ">
          <Link
            className="bg-amber-100 text-zinc-700 w-[110px] text-center rounded-xl
             hover:bg-amber-300 hover:scale-120 hover:text-black transition duration-300 ease-in-out"
            to="/"
          >
            Home
          </Link>
          <Link
            className="bg-amber-100 text-zinc-700 w-[110px] text-center rounded-xl
             hover:bg-amber-300 hover:scale-120 hover:text-black transition duration-300 ease-in-out"
            to="/presupostos"
          >
            Pressupostos
          </Link>
        </div>
      </HeaderContent>
    </HeaderContainer>
  );
};

export default Header;

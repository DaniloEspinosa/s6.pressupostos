import { Link } from "react-router-dom";
import Header from "../components/Header";

const HomePage = () => {
  return (
    <div>
      <Header />
      <div className="flex w-3/4 mx-auto flex-col gap-5 gap-x-4 rounded-xl bg-white p-6 shadow-lg outline outline-black/5">
        <h1 className="text-3xl mb-8 text-center font-bold shadow-sm">
          Benvingut a la calculadora de pressupostos freelance
        </h1>
        <p className="text-2xl text-center">
          La millor calculadora per realitzar els teus pressupostos com a
          programador freelance
        </p>
        <p className="text-2xl text-center">
          Per fer els teus pressupostos fes clic al següent botó!
        </p>
        <Link
          to="/presupostos"
          className="bg-amber-100 text-zinc-700 w-3/4 mx-auto text-center rounded-xl
          border-[1px] border-zinc-400 py-3 text-xl
             hover:bg-amber-300 hover:scale-120 hover:text-black transition duration-300 ease-in-out"
        >
          Fes els teus pressupostos!
        </Link>
      </div>
    </div>
  );
};

export default HomePage;

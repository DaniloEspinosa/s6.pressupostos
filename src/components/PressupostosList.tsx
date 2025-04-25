import { Pressuposto } from "../types/Pressuposto";
import Pressupostos from "./Pressupostos";

type Props = {
  pressupostos: Pressuposto[];
};

const PressupostosList = ({ pressupostos }: Props) => {
  return (
    <>
      {pressupostos.length > 0
        ? pressupostos.map((item, i) => (
            <Pressupostos key={i} pressupostos={item} />
          ))
        : "Aun no hay presupuestos"}
    </>
  );
};

export default PressupostosList;

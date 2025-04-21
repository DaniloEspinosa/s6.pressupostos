import QuantitySelector from "./QuantitySelector";

const PagesLanguajes = () => {
  return (
    <div className="flex flex-col gap-2">
      <QuantitySelector name="Nombre de pàgines" quantity={0} />
      <QuantitySelector name="Nombre de llenguatges" quantity={0} />
    </div>
  );
};

export default PagesLanguajes;

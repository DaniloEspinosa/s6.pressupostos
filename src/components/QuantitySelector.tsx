type Props = {
  name: string;
  quantity: number;
  setQuantity: React.Dispatch<React.SetStateAction<number>>;
};

const QuantitySelector = ({ name, quantity, setQuantity }: Props) => {
  const addQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const substractQuantity = () => {
    setQuantity((prev) => Math.max(prev - 1, 0));
  };

  return (
    <div className="flex justify-end gap-5 items-center h-8">
      <p className="text-xs">{name}</p>
      <div className="w-1/5 flex justify-between h-full items-center gap-2">
        <button
          onClick={substractQuantity}
          className="flex w-[15px] h-[15px] rounded-full border-[1px] justify-center items-center"
        >
          -
        </button>
        <div
          id=""
          className="w-1/2 h-full bg-gray-100 rounded-sm text-center text-sm border-1 border-gray-300 flex justify-center items-center"
        >
          {quantity}
        </div>
        <button
          onClick={addQuantity}
          className="flex w-[15px] h-[15px] rounded-full border-[1px] justify-center items-center"
        >
          +
        </button>
      </div>
    </div>
  );
};

export default QuantitySelector;

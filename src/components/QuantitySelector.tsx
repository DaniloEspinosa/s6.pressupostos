type Props = {
  name: string;
  quantity: number;
};

const QuantitySelector = ({ name, quantity }: Props) => {
  return (
    <div className="flex justify-end gap-5 items-center h-8">
      <p className="text-xs">{name}</p>
      <div className="w-1/5 flex justify-between h-full items-center gap-2">
        <div className="flex w-[15px] h-[15px] rounded-full border-1 justify-center items-center">
          -
        </div>
        <div
          id=""
          className="w-1/2 h-full bg-gray-100 rounded-sm text-center text-sm border-1 border-gray-300 flex justify-center items-center"
        >
          {quantity}
        </div>
        <button className="flex w-[15px] h-[15px] rounded-full border-1 justify-center items-center">
          +
        </button>
      </div>
    </div>
  );
};

export default QuantitySelector;

import { useState } from "react";
import { IoMdInformationCircleOutline } from "react-icons/io";

interface Props {
  title: string;
  description: string;
}

const PopUpModal = ({
  title = "Aqui el título",
  description = "Aqui la descripción"
}: Props) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  return (
    <>
      <button
        className="text-2xl hover:scale-120 p-1 rounded-full hover:bg-zinc-200  transition duration-100"
        onClick={() => setShowModal((prev) => !prev)}
      >
        <IoMdInformationCircleOutline />
      </button>
      {showModal && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center">
          <div className="bg-white p-5 rounded-[10px] flex flex-col justify-center items-center gap-5 w-[600px]">
            <h3 className="text-2xl font-bold">{title}</h3>
            <p className="text-center">{description}</p>
            <button
              className="p-3 rounded-full hover:font-bold hover:bg-amber-500 hover:scale-110 transition duration-100"
              onClick={() => setShowModal((prev) => !prev)}
            >
              X
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default PopUpModal;

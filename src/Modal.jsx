import React from "react";
import { createPortal } from "react-dom";
import { RxCross2 } from "react-icons/rx";

const Modal = ({ onClose, isopen, children }) => {
  if (isopen) {
    document.body.classList.add("overflow-hidden");
  } else {
    document.body.classList.remove("overflow-hidden");
  }
  return createPortal(
    <>
      {isopen && (
        <div className="">
          <div className="m-auto w-[90vw] z-50 text-xl absolute top-[30%] left-[5%] rounded-xl bg-white flex p-2 min-h-[260px] ">
            {children}
            <RxCross2
              onClick={onClose}
              className="hover:text-4xl text-black text-3xl right-2 absolute cursor-pointer"
            />
          </div>
          <div  className=" w-screen h-full backdrop-blur  top-0 absolute z-40 " >

          </div>
        </div>
      )}
    </>
  ,document.getElementById("modal-root"));
};

export default Modal;

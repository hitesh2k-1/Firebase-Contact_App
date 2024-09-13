import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import React from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { RiEditCircleFill } from "react-icons/ri";
import { db } from "./config/firebase";
import AddAndUpdate from "./AddAndUpdate";
import UseDisclose from "./hooks/UseDisclose";
import { toast } from "react-toastify";

const Contactcard = ({ contact }) => {

  const {isOpen,onClose,onOpen} = UseDisclose();

  const deleteContact = async (id) => {
    try {
      await deleteDoc(doc(db, "contacts", id));
      toast.success("Contact Deleted Successfully!")
    } catch (error) {
      console.log(error);
    }
  };

  return(
   <>
    <div
      key={contact.id}
      className="flex justify-between items-center border  bg-yellow p-2 rounded-xl "
    >
      <div className="flex gap-3 items-center cursor-pointer ">
        <FaRegUserCircle className="text-dark-yellow text-5xl" />
        <div className="">
          <h1 className="font-bold sm:max-w-[70vw] text-lg max-w-[40vw]">{contact.name}</h1>
          <p className="max-w-[45vw] sm:max-w-[70vw] overflow-hidden" >{contact.email}</p>
        </div>
      </div>

      <div className="flex gap-3 cursor-pointer ">
        <RiEditCircleFill
          onClick={onOpen}
          className=" text-4xl"
        />
        <MdDelete
          onClick={() => deleteContact(contact.id)}
          className="text-black text-4xl"
        />
      </div>
    </div>
    <AddAndUpdate contact={contact} isUpdate isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default Contactcard;

import Navbar from "./components/Navbar";
import { IoSearchSharp } from "react-icons/io5";
import { FiPlusCircle } from "react-icons/fi";
import Contactcard from "./Contactcard";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "./config/firebase";
import AddAndUpdate from "./AddAndUpdate";
import UseDisclose from "./hooks/UseDisclose";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NotFoundContact from "./components/NotFoundContact";

function App() {
  const [contacts, setcontacts] = useState([]);

  const {isOpen,onClose,onOpen} = UseDisclose();

  useEffect(() => {
    const getcontacts = async () => {
      try {
        const contactsRef = collection(db, "contacts");

        onSnapshot(contactsRef,(snapshot)=>{
          const contactLists = snapshot.docs.map((doc) => {
            return {
              id: doc.id,
              ...doc.data(),
            };
          });
          setcontacts(contactLists);
          return contactLists;
        })     

      
      } catch (error) {
        console.log(error);
      }
    };
    getcontacts();
  }, []);

  const filterContacts=(e)=>{
    const value = e.target.value

    const contactsRef = collection(db, "contacts");

    onSnapshot(contactsRef,(snapshot)=>{
      const contactLists = snapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });
      const filteredContacts= contactLists.filter(contact=>
        contact.name.toLowerCase().includes(value.toLowerCase())
       )
       setcontacts(filteredContacts);

      return filteredContacts;
    })     

  }

  return (
    <>
      <div className="m-4">
        <Navbar />
        <div className="p-2 my-4 justify-between relative flex gap-3 items-center">
          <input onChange={filterContacts}
            className=" w-[70vw] sm:w-[93vw] p-2 bg-transparent text-white text-xl px-12 border border-white rounded-xl"
            type="text"
          />
          <IoSearchSharp className="text-white absolute text-5xl px-2 cursor-pointer" />

          <FiPlusCircle
            onClick={onOpen}
            className="text-white font-bold text-5xl cursor-pointer"
          />
        </div>
        <div className="flex flex-col gap-3">
          {contacts.length<=0? <NotFoundContact/>: contacts.map((contact) => (
            <Contactcard key={contact.id} contact={contact} />
          ))}
        </div>
      </div>
      <AddAndUpdate isOpen={isOpen} onClose={onClose} />
      <ToastContainer
      />
    </>
  );
}

export default App;

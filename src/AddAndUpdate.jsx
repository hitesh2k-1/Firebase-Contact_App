import React from "react";
import Modal from "./Modal";
import { db } from "./config/firebase";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { Form, Field, Formik, ErrorMessage } from "formik";
import { toast } from "react-toastify";
import * as Yup from "yup"

const contactSchemaValidation = Yup.object().shape({
  name:Yup.string().required("Name is required"),
  email:Yup.string().email("Invalid Email").required("Email is required")
})

const AddAndUpdate = ({ isOpen, onClose , isUpdate , contact }) => {

    const addContact= async (contact)=>{
try {
    const contactRef = collection(db,"contacts")
    await addDoc(contactRef,contact)
    onClose()
    toast.success("Contact Added Successfully!")

} catch (error) {
    console.log(error)
}
}
 
const updateContact= async (contact,id)=>{
try {
    const contactRef = doc(db,"contacts",id)
    await updateDoc(contactRef,contact)
    onClose()
    toast.success("Contact Updated Successfully!")


} catch (error) {
    console.log(error)
}
}


return(
  <div>
    <Modal isopen={isOpen} onClose={onClose}>
      <Formik
      validationSchema={contactSchemaValidation}
        initialValues={isUpdate?{
            name: contact.name,
          email: contact.email,
        }:{
          name: "",
          email: "",
        }}
        onSubmit={(values) => {
          console.log(values);
          isUpdate? updateContact(values,contact.id):addContact(values)

        }}
      >
        <Form className="" >
          <div className=" flex flex-col w-[90vw] m-auto sm:w-[60vw]">
            <label className="text-2xl font-bold" htmlFor="name">
              Name
            </label>
            <Field
              name="name"
              className="h-10 w-[86vw] px-2 border rounded-2xl "
            />
            <div className="text-red-500 text-sm px-2 " >
              <ErrorMessage name="name"/>
            </div>
            <label className="text-2xl mt-3 font-bold" htmlFor="name">
              Email
            </label>
            <Field
              name="email"
              className="h-10 border rounded-2xl px-2 w-[86vw] "
            />
            <div className="text-red-500 text-sm px-2 " >
              <ErrorMessage name="email"/>
            </div>
            <button  className="border my-4 right-4 bottom-0 absolute text-lg px-4 py-1 rounded-2xl bg-dark-yellow font-bold">
              {isUpdate?"Save":"Add"} Contact
            </button>
          </div>
        </Form>
      </Formik>
    </Modal>
  </div>

);
}

export default AddAndUpdate;

import React,{useState} from 'react';
import Modal from './Modal';
import {Field, Form, Formik} from "formik";
import { createContact,modifyContact } from '../Firebase/firebase';



function AddUpdate({isOpen,onClose,isUpdate,contactToUpdate}) {

    const [error,setError] = useState(null)
    const [errorFlag,setErrorFlag] = useState(false);
    const formError = "! Name or Email can not be blank";

    function hideFormError() {  setErrorFlag(false); }

    const  addContact = async (contact) => {
        //console.log("add contact called");
        if(contact) {
            const res = await createContact(contact);
            if(res == null) setError(res)
        }
        error && alert(error)
        return;
    }

    const updateContact = async (contact,id) => {
        //console.log("Update contact called");
        if(contact) {
            const res = await modifyContact(contact,id);
            if(res == null) setError(res)
        }
        error && alert(error)
        return;
    }

  return (
    <>
        <div>
            <Modal onClose={onClose} isOpen={isOpen} hideFormError={hideFormError}>
                <Formik
                    initialValues={ isUpdate ? 
                        {
                            name:contactToUpdate.name,
                            email:contactToUpdate.email
                        }:
                        {
                            name:"",
                            email:""
                        }
                    }

                    onSubmit={(values) => {
                    //console.log(errorFlag);
                        
                        if(values.name != '' && values.email != '') {
                            console.log('done');
                            isUpdate ? updateContact(values,contactToUpdate.id) : addContact(values);
                            hideFormError();
                            onClose();
                        } else {
                            console.log('Name and email is required');
                            setErrorFlag(true);
                        }
                    }}
                >
                    <Form>
                        <div className=' flex flex-col gap-1 text-sm text-gray-300  '>
                            {errorFlag && <div className='text-red-600 text-xs  self-center p-1'>{formError}</div>}
                            <label htmlFor='name'>Name</label>
                            <Field name="name" className=" py-1 px-2 rounded-sm text-black " />
                            <label htmlFor='email'>Email</label>                            
                            <Field name="email" className=" py-1 px-2 rounded-sm text-black" />
                        
                            <button  className='text-white bg-teal-600 hover:bg-blue-600 mt-2 py-1 px-4 text-sm font-semibold rounded-lg self-center '>
                                {isUpdate? "UPDATE" : "ADD"}
                            </button>
                        </div>
                    </Form>
                </Formik>
                
            </Modal>
        </div>
    </>
  )
}

export default AddUpdate

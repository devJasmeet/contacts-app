import { deleteDoc, doc } from 'firebase/firestore';
import React from 'react';
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { db } from '../Firebase/firebase';
import openClose from '../Hooks/openClose';
import AddUpdate from './AddUpdate';


function Card({contact}) {

  const {isOpen,onClose,onOpen} = openClose();

  async function delContact(id) {
    try {
      await deleteDoc(doc(db,"contact-details",id))
    } catch (error) {
      console.log(error);
    }
  }


  return (
    <>
      <div className='w-full bg-body'>
        <div key={contact.id} className='flex flex-wrap px-1 border-b border-white/10 gap-2 items-center max-w-full' >
          <div className='  min-w-[30px] min-h-[30px] flex text-sm justify-center items-center rounded-full border border-slate-300/50'>
            {contact.name[0].toUpperCase()}
          </div>
          <div className='py-1 flex flex-col contact-details '>       
            <p className=' text-sm font-semibold' >{contact.name}</p>
            <p className=' text-xs font-light' >{contact.email}</p>
          </div> 
          <div className=' items-center flex py-1 gap-2 ml-auto '>
            <MdEdit onClick={onOpen} className='hover:text-blue-500 cursor-pointer' />
            <MdDelete onClick={() =>delContact(contact.id)} className=' text-red-500 cursor-pointer' />
          </div>
        </div>
      </div>
      <AddUpdate onClose={onClose} isOpen={isOpen} isUpdate contactToUpdate={contact}/>
    </>
  )
}

export default Card

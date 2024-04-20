import React from 'react';
import {FiSearch} from "react-icons/fi";
import { IoMdAdd } from "react-icons/io";

function Searchbar({onOpen,filteredContacts}) {
  
  return (
    <div>
      <div className='flex gap-4 items-center '>
            <div className='relative flex flex-grow items-center font-light text-black'>
                <FiSearch className='absolute ml-2'/>
                <input 
                  onChange={filteredContacts}
                  type='text'
                  className='border border-black bg-slate-300 h-8 flex-grow rounded-md pl-7'
                />
            </div>
            <div>
                <IoMdAdd 
                  onClick={onOpen}
                  className='text-2xl cursor-pointer text-teal-500 '/>
            </div>
      </div>
    </div>
  )
}

export default Searchbar

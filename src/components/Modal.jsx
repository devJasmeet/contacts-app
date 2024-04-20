import React from 'react';
import { IoIosClose } from "react-icons/io";

function Modal({onClose,isOpen,hideFormError,children}) {

    function handleClick() {
        hideFormError();
        onClose();
    }
    
  return (
    
    <>
        {isOpen && (
            <>
                <div className=' z-50 fixed bg-black top-1/2 left-1/2 -translate-x-1/2 -translate-y-2/3 px-2 py-4 w-full max-w-sm border-2 border-white/50 flex flex-col justify-between rounded-md '>
                    <IoIosClose onClick={handleClick} className='self-end cursor-pointer text-xl' />
                    {children}
                </div>
                <div 
                    onClick={handleClick}
                    className=" z-40 fixed top-0 bg-black/75 left-0 h-full w-full backdrop-blur-[1px] " 
                />
                
            </>
        )}
    </>
  );
}

export default Modal

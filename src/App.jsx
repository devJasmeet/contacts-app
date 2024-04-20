import React,{ useState,useEffect } from 'react'
import Headingbar from './components/Headingbar';
import { db } from './Firebase/firebase';
import { collection, onSnapshot } from 'firebase/firestore';
import Searchbar from './components/Searchbar';
import Card from './components/Card';
import AddUpdate from './components/AddUpdate';
import openClose from './Hooks/openClose';


function App() {
    const [contacts,setContacts] = useState([]);
    const {isOpen,onClose,onOpen} = openClose();


    useEffect(() => {
        const getContacts = async() => {
            try {
                const contactRef =  collection(db,"contact-details");
                onSnapshot(contactRef,(snapshot) => {
                    const contactList = snapshot.docs.map((doc) => {
                        return {
                            id : doc.id,
                            ...doc.data()
                        }
                    });
                    console.log("contacts list :: ",contactList);
                    sortContacts(contactList)
                    setContacts(contactList)
                    
                });
                
            } catch (error) {
                console.log("error");
            }
        };

        getContacts();
    },[]);

    function filteredContacts(e) {
        const value = e.target.value;
        const contactRef = collection(db,"contact-details");

        onSnapshot(contactRef,(snapshot) => {
        const contactList = snapshot.docs.map((doc) => {
            return {
                id : doc.id,
                ...doc.data()
            }
        });
        const filteredContact = contactList.filter((contact) => 
            contact.name.toLowerCase().includes(value.toLowerCase()) ||
            contact.email.toLowerCase().includes(value.toLowerCase())
        );
        setContacts(filteredContact);
        });
    }

    function sortContacts(list) {
        list.sort((a, b) => {
            const nameA = a.name.toUpperCase(); // Convert names to uppercase for case-insensitive sorting
            const nameB = b.name.toUpperCase();
            if (nameA < nameB) {
              return -1;
            }
            if (nameA > nameB) {
              return 1;
            }
            return 0; 
        });
    }



  return (
    <>
        <div className='mx-auto w-full max-w-md  px-2 bg-body '>
            <Headingbar />
            <div className="sticky top-0 border-b-4 border-white/30 py-3 bg-body opacity-100" >
                <Searchbar onOpen={onOpen} filteredContacts={filteredContacts} />
            </div>
            
            <div className=' text-gray-300 '> {
                contacts ? 
                contacts?.map((contact) => (
                    <Card key={contact.id} contact={contact} />
                )) :
                <h3 className='text-center font-semibold text-xl mt-8' >No contacts</h3>
                }
            </div>
            
        </div>
        <AddUpdate onClose={onClose} isOpen={isOpen}/>
        
    </>
  )
}

export default App;
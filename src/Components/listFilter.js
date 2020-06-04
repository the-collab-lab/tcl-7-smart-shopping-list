import React from 'react';
import { useState, useEffect } from 'react';

const itemName = [
    "Siri",
    "Alexa",
    "Google",
    "Facebook",
    "Twitter",
    "Linkedin",
    "Sinkedin"
  ];
  


function FilterList() {
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const handleChange = event => {
       setSearchTerm(event.target.value);
     };
    useEffect(() => {
       const results = itemName.filter(itemName =>
         itemName.toLowerCase().includes(searchTerm)
       );
       setSearchResults(results);
     }, [searchTerm]);
   
     return (
       <div >
         <input
           type="text"
           placeholder="Search"
           value={searchTerm}
           onChange={handleChange}
         />
         <ul>
            {searchResults.map(item => (
             <li>{item}</li>
           ))}
         </ul>
       </div>
     );
   }

   export default FilterList;
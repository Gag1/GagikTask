import ListCreator from './components/ListCreator';
import Content from './components/Content';
import { useEffect, useState } from 'react';


// getting items from localStorage 
const getLocalItems = () =>{
  const data = window.localStorage.getItem('lists');
  if(data) {
  return  JSON.parse(data);
  }else{
    return [];
  }
}

function App() {

  const [lists,setList] = useState(getLocalItems())
  
   useEffect(() => {
     window.localStorage.setItem('lists', JSON.stringify(lists));
     // setting items to localStorage depending on the value "lists"
   }, [lists]);


  
  return (
   <>
      <ListCreator change={(value) => {
        
         setList([
          ...lists,
          {
            list:value,
            completed:false,
            id:Math.random()
          }
         ])
      }} list={lists}  hide={(hiddenLists) =>{
        setList([
          ...hiddenLists
        ])
      }}/>

      <Content list={lists} remove={(e) => {
           let filteredLists = lists.filter((item) => item.id !== e);
           setList(filteredLists);
      }}/>
      
   </>
  );
}

export default App;

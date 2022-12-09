
import { createRef } from 'react';
import { useState } from 'react';
import './style.css';

let ref = createRef();

// checkPointerEvent is called from <Content /> , and we pass parameter true or false  
// this is for changing the background color if a user clicks on the list's delete button

export const checkPointerEvent = (value) =>{
    if(ref.current && value){
        document.body.style.background = "rgba(0, 0, 0, 0.25)";
        ref.current.style.pointerEvents = "none";
    }
    if(!value){
        document.body.style.background = "#E5E5E5";
        ref.current.style.pointerEvents = "auto";
    }
}


function ListCreator({change,list,hide}){
     const [value,setValue] = useState('');
     const [size,setSize] = useState(false);
     
     
     // if the list's length is >0 then I'm going to show "hide completed" button
     let [_hideCompleted,setHideCompletedValue] = useState(false);
     if(list.length > 0)_hideCompleted = true; 
     // for not having infinite loop I'm going to set the value like this  "_hideCompleted = true" 
     // this is not the best solution )
     
     
     return (

        <div ref={ref} className="container">
             <div className="outer-row">
                <div style={ _hideCompleted ? {display:'block'} : {display:'none'}} className="hide-completed">
                    <input onChange={(e) =>{
                        if(e.target.checked){
                          return list.map((item) =>{
                             if(item.completed === true){
                                item.hidden = true;
                                hide(list);
                             }
                        })
                        }if(!e.target.checked){
                         return list.map((item) =>{
                            item.hidden = false;
                            hide(list);
                         })
                        }

                    }} type="checkbox"/>
                    <p>Hide completed</p>
                </div>
                 <div className="row">
                    <div className="column">
                        <p>Task</p>
                        <input value={value} onChange={(e) =>{
                             setValue(e.target.value);
                             value.length > 54 ? setSize(true) : setSize(false);
                        }} placeholder='Write here' type="text" />
                        <div onClick={() =>{
                            // check validation of the input 
                           if(value.length < 54 && value.length > 0) {
                            change(value);
                            setHideCompletedValue(true);
                            setValue("");
                           };
                        }} className="btn">add</div>
                        <p>{size ? "Task content can contain max 54 characters." : ""}</p>
                    </div>
                 </div>

                </div>
        </div>
    )

}

export default ListCreator;



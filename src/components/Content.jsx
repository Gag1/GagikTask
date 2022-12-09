import React from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import { checkPointerEvent } from "./ListCreator";

const Content = ({list,remove}) =>{

  const [value,setValue] = useState(null);
  const [checked,changeChecked] = useState(null);
 

  // if appear is false then we can see the content of home page 
  let _appear = null;
  if(list.length > 0){
    _appear = true;
  }

  const removeBtnRef = useRef();
  const deleteMessageRef = useRef();

  // this code for clicking outside of popup message 
  useEffect(() =>{
    let handler = (e) =>{
        // deleteMessageRef.current.contains(e.target)
        // I'm going to check if the target is not popup message and list's remove button
        if(removeBtnRef.current && !deleteMessageRef.current.contains(e.target) && !removeBtnRef.current.contains(e.target)){
         setValue(false);  // if the value is false,  popup message will not be displayed
         checkPointerEvent(false); // if the value is false , outside of popup message will not be frozen  
       }
    }

    document.addEventListener('mousedown',handler);
  

  })


    return (
        <div className="container-content">
            <div style={value ? {display:'block'} : {display:'none'}} 
              ref={deleteMessageRef} className="delete-message">
                <p>Are you sure you want to delete?</p>
                <div className="btns">
                <button onClick={(e) =>{
                  // if "YES" then hide popup message and remove the list
                    setValue(false);
                    checkPointerEvent(false);
                  return list.map((item ) => {
                        remove(item.id);
                    })
                }}>Yes</button>
                <button onClick={(e) => {
                  // if "NO" then hide popup message 
                  setValue(false);
                  checkPointerEvent(false);            
            }}>No</button>
                </div>
            </div>
            <div className="rw">
                 <div style={_appear ? {display:'none'} : {display:'block'}} 
                 className="column-content">
                  <p>Your life is a blank page. You write on it.</p>
                  <h2>So start by adding your tasks here.</h2>
                 </div>    
                <div className="column-content1">
                 {
                  list.map((item,i,arr) =>{
                    return( <div style={value ? {pointerEvents:'none'} : {display:'block'}} key={item.id}>
                       <div style={item.hidden ? {display:'none'} : {display:'block'}}>
                        <input onChange={(e) =>{
                            item.completed = e.target.checked;
                            changeChecked(e.target.checked);
                        }} type="checkbox"  />
                        <p style={item.completed ? {color:"#ACACAC"} : {color:"#666666"}}>{item.list}</p>
                        <button ref={removeBtnRef} onClick={(e) =>{
                            setValue(true);
                            checkPointerEvent(true);                 
                        }}>X</button>
                        <div className="border"></div>
                        <br />
                        </div>
                    </div>
                   )
                 })
                 }
            </div> 

            </div>
        </div>
    )
}

export default Content; 
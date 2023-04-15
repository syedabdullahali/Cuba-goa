import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { FaPlus, FaMinus } from "react-icons/fa";

import { IoManSharp } from "react-icons/io5";
import { FaChild } from "react-icons/fa";

import "./BookingCard.css";
import { CButton } from "@coreui/react";

export default function BookingCard(props) {
  const [showCounter, setShowCounter] = useState(false);
  const [showCounter2, setShowCounter2] = useState(false);
  
  const {toRoomCapacity} = props 


  const toggleCounter = () => {
    setShowCounter(true);
    props.onClick(props.room);
  };

  const toggleCounter2 = () => {

    props.onClick2(props.room);
    setShowCounter2(true);
  };

  useEffect(() => {
    if (props.counter == 0) {
      setShowCounter(false);
    }
    if (props.counter2 == 0) {
      setShowCounter2(false);
    }
  });



  const onIncrement = () => {
    const room = {...props.room}
    delete room.perRoomPerWithBreakFast 

    props.increment(room);
  };

  const onDecrement = () => {
    const room = {...props.room}
    delete room.perRoomPerWithBreakFast 
    props.decrement(room);
  };


  const onIncrement2 = () => {
    const room2 = {...props.room}
    delete room2.perRoom
    props.increment2(room2);
  };

  const onDecrement2 = () => {
    const room2 = {...props.room}
    delete room2.perRoom
    props.decrement2(room2);
  };



  const onChange = (e) => {
    props.onChange(props.room, e.target.checked);
  };

  const onChange2 = (e) => {
    props.onChange2(props.room, e.target.checked);
  };


  

  return (
    <>
    <Card className="mb-2">
      <div className="resort-name">
        <h2>
          {props.room.title2}{" "}
        </h2>
      </div>
      <div className="room-details">
        <div className="left-content">
          <div className="capacity">
            <div
              style={{ display: "flex", alignItems: "center", gap: ".4rem" }}
            >
              <span>Room Capacity </span>
              <span className="adult">
                <IoManSharp />
              </span>
              {+props.room.adults}
              <span className="child">
                <FaChild />
              </span>
              {+props.room.chlidren?+props.room.chlidren:0}
            </div>
          </div>
          <div>
            <h6>Room rate exclusive of taxes</h6>
          </div>
        </div>
        <div className="right-content">
          <h6 className="price">
            <span>Rs</span> {props.room.perRoom}
          </h6>
          <h6>  Per Room Per Night</h6>
          <h6>  {+props.room.adults} Adults,  {+props.room.chlidren?+props.room.chlidren:0}  Child, {props.room.room} Room</h6>
          <div className="compare">
            <input id="compare-box" type="checkbox" onChange={onChange} />
            <label>Add to compare</label>
          </div>
        </div>
      </div>
      <div className="room-info">
        <div className="details">
          <h6>Room Info . Enquire</h6>
        </div>
        {showCounter &&props.room.room ? (
          <>
              {props.room.room-(props.counter+props.counter2)?  
           <span style={{fontSize:'14px'}} className="no-error-1" >{props.room.room-(props.counter+props.counter2)} Room  Left </span>:
           <span  style={{fontSize:'14px'}} className="text-danger error-1">No room Left</span>}

          <div className="horizontal-counter">
            
            <button className="counter-button" onClick={()=>{
               if((props.counter)){
                onDecrement() 
                toRoomCapacity({index:props.counter+"B",roomId:props.room._id},'remove')
             }
            }
              
              }>
             -
            </button>
            <div className="count-display">{props.counter}</div>
            <button className="counter-button" onClick={()=>{
            
             if(props.room.room - (props.counter+props.counter2)){
              onIncrement() 
           }
              }
              }>
             +
            </button>
          </div>
          </>) : (
          <div className="action-2">
           {props.room.room-(props.counter+props.counter2)?  
           <span className="no-error-1" >Hurry {props.room.room-(props.counter+props.counter2)} Room  Left </span>:
           <span  className="text-danger error-1">No room Left</span>}
            <CButton onClick={()=>{ 
             if(props.room.room-(props.counter+props.counter2)){
              toggleCounter()
           }else if(!(props.room.room-(props.counter+props.counter2))){
             alert('Rooms are not available')
           }
            }
            } size="sm" className="ms-3">Add Room</CButton>
          </div>
        )}
      </div>
      {showCounter && (
        new Array(+props.counter).fill(1).map((el,i)=>
        <OptionInput room={props.room} i={i} cr={"B"}  toRoomCapacity={toRoomCapacity} />

      ))}
    </Card>

    <Card>
    <div className="resort-name">
      <h2>
        {props.room.title2}{"(Room & Breakfast)"}
      </h2>
    </div>
    <div className="room-details">
      <div className="left-content">
        <div className="capacity">
          <div
            style={{ display: "flex", alignItems: "center", gap: ".4rem" }}
          >
            <span>Room Capacity </span>
            <span className="adult">
              <IoManSharp />
            </span>
            {+props.room.adults}
            <span className="child">
              <FaChild />
            </span>
            {+props.room.chlidren?+props.room.chlidren:0}
          </div>
        </div>
        <div>
          <h6>Room rate exclusive of taxes</h6>
        </div>
      </div>
      <div className="right-content">
        <h6 className="price">
          <span>Rs</span>  {props.room.perRoomPerWithBreakFast}
        </h6>
        <h6>  Per Room Per Night</h6>
        <h6>  {+props.room.adults} Adults,  {+props.room.chlidren?+props.room.chlidren:0}  Child, {props.room.room} Room</h6>
        <div className="compare">
          <input id="compare-box" type="checkbox" onChange={onChange2} />
          <label>Add to compare</label>
        </div>
      </div>
    </div>
    <div className="room-info">
      <div className="details">
        <h6>Room Info . Enquire</h6>
      </div>
      {showCounter2 &&props.room.room ? (
        <>
            {props.room.room-(props.counter+props.counter2)?  
           <span style={{fontSize:'14px'}} className="no-error-1" >{props.room.room-(props.counter+props.counter2)} Room  Left </span>:
           <span  style={{fontSize:'14px'}} className="text-danger error-1">No room Left</span>}

        <div className="horizontal-counter">
          
          <button className="counter-button" onClick={()=>{
             if(props.counter2){
              onDecrement2() 
              toRoomCapacity({index:props.counter2+"A",roomId:props.room._id},'remove')
           }
          }
            
            }>
           -
          </button>
          <div className="count-display">{props.counter2}</div>
          <button className="counter-button" onClick={()=>{
          
           if(props.room.room-(props.counter+props.counter2)){
            onIncrement2() 
         }
            }
            }>
           +
          </button>
        </div>
        </>) : (
        <div className="action-2">
             {props.room.room-(props.counter+props.counter2)?  
           <span className="no-error-1" >Hurry {props.room.room-(props.counter+props.counter2)} Room  Left </span>:
           <span  className="text-danger error-1">No room Left</span>}
          <CButton onClick={()=>{ 
           if(props.room.room-(props.counter+props.counter2)){
            toggleCounter2()
         }else if(!(props.room.room-(props.counter+props.counter2))){
           alert('Rooms are not available')
         }
          }
          } size="sm" className="ms-3">Add Room</CButton>
        </div>
      )}
    </div>
    {showCounter2 && (
      new Array(+props.counter2).fill(1).map((_,i)=>
     
      <OptionInput room={props.room} i={i} cr={"A"}  toRoomCapacity={toRoomCapacity} />
    ))}
  </Card>
  </>
  );
}

 function  OptionInput(props){

  const [capacity,setCapacity] = useState({index:(props?.i+1)+props?.cr,adult:1,child:0,childAge:0,roomId:props.room._id})

  useEffect(()=>{
    setCapacity((prev)=>{return {...prev,index:(props?.i+1)+props?.cr,roomId:props.room._id}})
  },[props?.i])

  const {adult,child,childAge} = capacity

console.log(capacity)

  useEffect(()=>{
    props.toRoomCapacity(capacity)
  },[adult,child,childAge])




  return  <div className="room-pax">
  <h6>Room {props.i +1} </h6>
  <div className="pax-adult pax">
    <div className="pax-type">
      <span>No of Adult</span>
      <span className="pax-age">(12+ years)</span>
    </div>
    <select value={capacity.adult} onChange={(e)=>setCapacity((prev)=>({...prev,adult:e.target.value}))} >
      {+props.room.adults?

    new Array(+props.room.adults).fill(1).map((el,i)=>
    <option value={el+i}>{el+i}</option>
    ):
    <option value="0">0</option>
    }
    </select>
  </div>
  <div className="pax">
   <div className="pax-type">
      <span>No of Child </span>
    </div >


    <select value={capacity.child} onChange={(e)=>setCapacity((prev)=>({...prev,child:e.target.value}))} >
      {+props.room.chlidren?
<>
    <option value="0">0</option>  
    {new Array(+props.room.chlidren).fill(1).map((el,i)=><option value={el+i}>{el+i}</option>)}
</>:
    <option value="0">0</option>
    }
    </select> 

  </div>

  <div className="pax-child pax">
    <div className="pax-type">
      <span>Child Age</span>
      <span className="pax-age">(0-12yrs)</span>
    </div>
    <select  value={capacity.childAge} onChange={(e)=>setCapacity((prev)=>({...prev,childAge:e.target.value}))}>
       <option value="0">0</option>  
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
      <option value="4">4</option>
      <option value="5">5</option>
      <option value="6">6</option>
      <option value="7">7</option>
      <option value="8">8</option>
      <option value="9">9</option>
      <option value="10">10</option>
      <option value="11">11</option>
      <option value="12">12</option>
    </select>
  </div>
  
</div>

}

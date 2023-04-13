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
    <Card>
      <div className="resort-name">
        <h2>
          {props.bookingData.title}{" "}
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
              <span className="text-success" style={{fontSize:'14px'}}>
               {props.room.room-props.counter?`${props.room.room-props.counter} Room Left`:"No room left"} </span>

          <div className="horizontal-counter">
            
            <button className="counter-button" onClick={()=>{
               if(props.counter){
                onDecrement() 
             }
            }
              
              }>
             -
            </button>
            <div className="count-display">{props.counter}</div>
            <button className="counter-button" onClick={()=>{
            
             if(props.room.room - props.counter){
              onIncrement() 
           }
              }
              }>
             +
            </button>
          </div>
          </>) : (
          <div className="action">
            <span>Hurry {props.room.room} Room  Left </span>
            <CButton onClick={()=>{ 
             if(props.room.room-props.counter){
              toggleCounter()
           }else if(!(props.room.room-props.counter)){
             alert('Rooms are not available')
           }
            }
            } size="sm" className="ms-3">Add Room</CButton>
          </div>
        )}
      </div>
      {showCounter && (
        new Array(+props.counter).fill(1).map((el,i)=>
        <div className="room-pax">
          <h6>Room {+el + i} </h6>
          <div className="pax-adult pax">
            <div className="pax-type">
              <span>No of Adult</span>
              <span className="pax-age">(12+ years)</span>
            </div>
            <select>
              {+props.room.adults?
            new Array(+props.room.adults).fill(1).map((el,i)=><option value="2">{el+i}</option>):
            <option value="2">0</option>
            }
            </select>
          </div>
          <div className="pax">
           <div className="pax-type">
              <span>No of Child </span>
              <span className="pax-age">(0-12yrs)</span>
            </div>
            <select>
            {+props.room.chlidren?+props.room.chlidren:0?
            new Array(+props.room.chlidren?+props.room.chlidren:0).fill(1).map((el,i)=><option value="2">{el+i}</option>):
            <option value="2">0</option>
            }
            </select>
          </div>

          <div className="pax-child pax">
            <div className="pax-type">
              <span>Child Age</span>
              <span className="pax-age">(0-12yrs)</span>
            </div>
            <select>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="1">3</option>
              <option value="2">4</option>
              <option value="1">5</option>
              <option value="2">6</option>
              <option value="2">7</option>
              <option value="1">8</option>
              <option value="2">9</option>
              <option value="2">10</option>
              <option value="1">11</option>
              <option value="2">12</option>
            </select>
          </div>
          
        </div>
      ))}
    </Card>

    <Card>
    <div className="resort-name">
      <h2>
        {props.bookingData.title}{" "}
        {props.breakfastRoom && "(Room & Breakfast)"}
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
            <span className="text-success" style={{fontSize:'14px'}}>
             {props.room.room-props.counter2?`${props.room.room-props.counter2} Room Left`:"No room left"} </span>

        <div className="horizontal-counter">
          
          <button className="counter-button" onClick={()=>{
             if(props.counter2){
              onDecrement2() 
           }
          }
            
            }>
           -
          </button>
          <div className="count-display">{props.counter2}</div>
          <button className="counter-button" onClick={()=>{
          
           if(props.room.room-props.counter2){
            onIncrement2() 
         }
            }
            }>
           +
          </button>
        </div>
        </>) : (
        <div className="action">
          <span>Hurry {props.room.room} Room  Left </span>
          <CButton onClick={()=>{ 
           if(props.room.room-props.counter2){
            toggleCounter2()
         }else if(!(props.room.room-props.counter2)){
           alert('Rooms are not available')
         }
          }
          } size="sm" className="ms-3">Add Room</CButton>
        </div>
      )}
    </div>
    {showCounter2 && (
      new Array(+props.counter2).fill(1).map((el,i)=>
      <div className="room-pax">
        <h6>Room {+el + i} </h6>
        <div className="pax-adult pax">
          <div className="pax-type">
            <span>No of Adult</span>
            <span className="pax-age">(12+ years)</span>
          </div>
          <select>
            {+props.room.adults?
          new Array(+props.room.adults).fill(1).map((el,i)=><option value="2">{el+i}</option>):
          <option value="2">0</option>
          }
          </select>
        </div>
        <div className="pax">
         <div className="pax-type">
            <span>No of Child </span>
            <span className="pax-age">(0-12yrs)</span>
          </div>
          <select>
          {+props.room.chlidren?+props.room.chlidren:0?
          new Array(+props.room.chlidren?+props.room.chlidren:0).fill(1).map((el,i)=><option value="2">{el+i}</option>):
          <option value="2">0</option>
          }
          </select>
        </div>

        <div className="pax-child pax">
          <div className="pax-type">
            <span>Child Age</span>
            <span className="pax-age">(0-12yrs)</span>
          </div>
          <select>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="1">3</option>
            <option value="2">4</option>
            <option value="1">5</option>
            <option value="2">6</option>
            <option value="2">7</option>
            <option value="1">8</option>
            <option value="2">9</option>
            <option value="2">10</option>
            <option value="1">11</option>
            <option value="2">12</option>
          </select>
        </div>
        
      </div>
    ))}
  </Card>
  </>
  );
}
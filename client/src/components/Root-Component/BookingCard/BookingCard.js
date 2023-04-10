import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { FaPlus, FaMinus } from "react-icons/fa";

import { IoManSharp } from "react-icons/io5";
import { FaChild } from "react-icons/fa";

import "./BookingCard.css";

export default function BookingCard(props) {
  const [showCounter, setShowCounter] = useState(false);
  const toggleCounter = () => {
    setShowCounter(true);
    props.onClick(props.room);
  };

  console.log(props.room);

  useEffect(() => {
    if (props.counter == 0) {
      setShowCounter(false);
    }
  });

  return (
    <Card>
      <div className="resort-name">
        <h2>{props.bookingData.title}</h2>
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
              {props.room.roomcapacity.max}
              <span className="child">
                <FaChild />
              </span>
              {props.room.roomcapacity.min}
            </div>
          </div>
          <div>
            <h6>Room rate exclusive of taxes</h6>
          </div>
        </div>
        <div className="right-content">
          <h6 className="price">
            <span>Rs</span> 2,500
          </h6>
          <h6>Per Room Per Night</h6>
          <h6>2 Adults, 1 Child, 1 Room</h6>
          <div className="compare">
            <input id="compare-box" type="checkbox" />
            <label>Add to compare</label>
          </div>
        </div>
      </div>
      <div className="room-info">
        <div className="details">
          <h6>Room Info . Enquire</h6>
        </div>
        {showCounter ? (
          <div className="horizontal-counter">
            <button className="counter-button" onClick={props.decrement}>
              <FaMinus />
            </button>
            <div className="count-display">{props.counter}</div>
            <button className="counter-button" onClick={props.increment}>
              <FaPlus />
            </button>
          </div>
        ) : (
          <div className="action">
            <span>4 rooms left</span>
            <button onClick={toggleCounter}>Add Room</button>
          </div>
        )}
      </div>
      <div className="room-pax">
        <h6>Room 1</h6>
        <div className="pax-adult pax">
          <div className="pax-type">
            <span>Adult</span>
            <span className="pax-age">(12+ years)</span>
          </div>
          <select>
            <option value="1">1</option>
            <option value="2">2</option>
          </select>
        </div>
        <div className="pax-child pax">
          <div className="pax-type">
            <span>Child</span>
            <span className="pax-age">(0-12yrs)</span>
          </div>
          <select>
            <option value="1">1</option>
            <option value="2">2</option>
          </select>
        </div>
        <div className="pax">
          <div className="pax-type">
            <span>Child 1</span>
          </div>
          <select>
            <option value="1">1</option>
            <option value="2">2</option>
          </select>
        </div>
      </div>
    </Card>
  );
}
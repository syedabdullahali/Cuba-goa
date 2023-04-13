import { FaRegWindowClose } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import React from "react";

import "./SummaryCard.css";
import { Card } from "react-bootstrap";
import { CCard,CButton } from "@coreui/react";

export default function SummaryCard(props) {
  const navigate = useNavigate();
  console.log(props.summaryData);

  function getNoOfNight (date1,date2){
    const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    const firstDate = new Date(date1);
    const secondDate = new Date(date2);
   const diffDays = Math.round(Math.abs((firstDate - secondDate) / oneDay));
   return diffDays
  }


  const getCurrentDateInput = (dateObj) => {
    const month = ("0" + (dateObj.getMonth() + 1)).slice(-2);
    const day = ("0" + dateObj.getDate()).slice(-2);
    const year = dateObj.getFullYear();  
    const shortDate = `${day}/${month}/${year}`;
    return shortDate;
  };

  return (
    <Card className="summary-car" style={{ width: "100%" }}>
      <div className="summary-dates summary-flex">
        <div>Dates</div>
        <h6>{getCurrentDateInput(props.checkInDate)} - {getCurrentDateInput(props.checkOutDate)}</h6>
      </div>
      <div className="summary-flex summary-night">
        <div>Night</div>
        <h6>{getNoOfNight(props.checkInDate,props.checkOutDate)}</h6>
      </div>
      {props.summaryData.map((data) => (
        <div>
          <div className="summary-flex summary-title">
            <h6>{data.title2}</h6>
            <span>
              <FaRegWindowClose
                className="summary-delete"
                onClick={() => {
                  props.handleRemove(data, data.perRoom);
                }}
              />
            </span>
          </div>
          <div className="summary-pax summary-flex">
            <h6>{data.adults} Adults, 1 Child, 1 Room</h6>
          </div>
          <div className="summary-flex summary-after summary-price">
            <div></div>
            <div>
              {data.item + "X" + "  "}Rs
              {data.perRoom ? data.perRoom : data.perRoomPerWithBreakFast}
            </div>
          </div>
        </div>
      ))}
      <div className="my-2 p-4 text-black w-100">
        <h6>
          Total Rs{" "}
          {props.summaryData.reduce((crr, el, i) => {
            if (el.perRoomPerWithBreakFast) {
              crr += el.perRoomPerWithBreakFast * el.item;
            }
            if (el.perRoom) {
              crr += +el.perRoom * el.item;
            }
            return crr;
          }, 0)}
        </h6>
        <CButton  variant="outline"
        className="w-100"
          onClick={() => {
            navigate("/booking-form");
          }}
        >
          Book Now
        </CButton>
      </div>
    </Card>
  );
}
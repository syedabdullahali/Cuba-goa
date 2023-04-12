import { FaRegWindowClose } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import React from "react";

import "./SummaryCard.css";
import { Card } from "react-bootstrap";
import { CCard,CButton } from "@coreui/react";

export default function SummaryCard(props) {
  const navigate = useNavigate();
  console.log(props.summaryData);

  return (
    <Card className="summary-car" style={{ width: "100%" }}>
      <div className="summary-dates summary-flex">
        <div>Dates</div>
        <h6>2023-04-12 - 2023-04-13</h6>
      </div>
      <div className="summary-flex summary-night">
        <div>Night</div>
        <h6>1</h6>
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
      <div className="my-2 p-4 text-white w-100">
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
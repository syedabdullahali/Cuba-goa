import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Card, Col, Image } from "react-bootstrap";
// import axios from "axios"
import "./spaCard.css";

const SpaCard = ({ card }) => {
  console.log(card);
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(false);

  return (
    <Col lg={3} md={5} sm={6} style={{ marginTop: "1rem"  }} >
      <div 
        className="image-box"
        style={{ backgroundImage: `url(${card.imgUrl})`,border:'2px solid ',borderRadius:'10px' }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={()=>{navigate("/spa-details/"+card._id)}}
      >
        {hovered && (
          <div className="image-name">
            <span>{card.name}</span>
          </div>
        )}
      </div>
    </Col>
  );
};

export default SpaCard;

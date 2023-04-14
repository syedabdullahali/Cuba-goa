import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Header from "../../Header/Header";
import Footer from "../Footer/Footer";

import "./detailed.css";

export default function DetailedSpa() {
  const [details, setDetails] = useState({});
  const navigate = useNavigate();
  const { id } = useParams();

  const fetchDetails = async (id) => {
    try {
      const { data } = await axios.get(
        "https://cuba-goa-z4hl.onrender.com/spaDetails/" + id
      );
      console.log(data);
      if (data.success) {
        setDetails(data.data);
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  console.log(details);
  useEffect(() => {
    // Fetch data for spa details
    fetchDetails(id);
  }, [id]);

  const handleBooking = () => {
    // Redirect user to booking page
    navigate("/booking");
  };

  return (
    <div className="detailed-spa-container">
      <Header />

      <section className="spa-details-section">
        <div className="spa-details-img">
          <img src={details.imgUrl} alt="Spa" />
        </div>

        <div className="spa-details-content">
          <h2>{details.name}</h2>
          <h4>AYURVEDIC SPA TREATMENT AT CUBA GOA</h4>
          <p>
            Welcome to a World of Rejuvenation. At Kalpaka Spa– Find Yourself In
            The Hands Of Our Expert Masseurs – All The Way From Kerala.
          </p>
          <ul>
            <li>{details.details}</li>
            <li>
              {details.benefits}
            </li>
          </ul>
          <button onClick={handleBooking}>Book Now</button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
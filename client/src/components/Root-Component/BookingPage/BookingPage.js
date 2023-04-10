import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import "./BookingPage.css";
import { IoManSharp } from "react-icons/io5";
import { FaChild } from "react-icons/fa";
import { CCard, CRow, CCol, CImage } from "@coreui/react";
import axios from "axios";
import BookingCard from "../BookingCard/BookingCard";
const BookingPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [bookingData, setBookingData] = useState("");
  const [summaryData, setSummaryData] = useState([]);
  const [cart, setCart] = useState([]);

  function onClickNormal(el) {
    setSummaryData((val) => {
      const obj = { ...el, item: 1 };
      delete obj.perRoomPerWithBreakFast;
      val.push(obj);
      setNormalRoom(true);
      return [...val];
    });
  }

  const addCart = async (id) => {
    try {
      const { data } = await axios.post("http://localhost:4001/add-cart" + id);
      console.log(data);
      if (data.status) {
        setCart(data.data);
      } else {
        console.log(data.message);
      }
    } catch (er) {
      console.log(er);
    }
  };

  const getHotelData = async () => {
    const response = await fetch(
      `https://allapiresort-w3ql.vercel.app/hotelbook/${id}`,
      { method: "GET" }
    );
    const data = await response.json();
    setBookingData(data);
  };

  const [normalRoom, setNormalRoom] = useState(false);

  const [breakfastRoom, setBreakfastRoom] = useState(false);
  const [del, setDel] = useState(false);

  useEffect(() => {
    getHotelData();
    addCart(id);
    console.log(id);
  }, []);

  console.log("hello ====================", summaryData);

  const incrementNormalItem = () => {
    setSummaryData((prevData) => {
      return prevData.map((data) => {
        if (data.perRoom) {
          return { ...data, item: data.item + 1 };
        }
        return data;
      });
    });
  };

  const decrementNormalItem = () => {
    const shouldDelete = summaryData.some(
      (data) => data.item === 1 && data.perRoom
    );

    if (shouldDelete && summaryData.length == 1) {
      console.log("delete");
      setSummaryData([]);
      setNormalRoom(false);
      return;
    }

    if (shouldDelete && summaryData.length > 1) {
      console.log("delete it");
      setSummaryData((prevData) => {
        const newData = prevData.filter((data) => !data.perRoom);
        return newData;
      });
      setNormalRoom(false);
      return;
    }
    setSummaryData((prevData) => {
      const newData = prevData.map((data) => {
        if (data.perRoom && data.item !== 0) {
          return { ...data, item: data.item - 1 };
        }
        return data;
      });
      return newData;
    });
  };

  const incrementBreakfastItem = () => {
    setSummaryData((prevData) => {
      return prevData.map((data) => {
        if (data.perRoomPerWithBreakFast) {
          return { ...data, item: data.item + 1 };
        }
        return data;
      });
    });
  };

  const decrementBreakfastItem = () => {
    const shouldDelete = summaryData.some(
      (data) => data.item === 1 && data.perRoomPerWithBreakFast
    );

    if (shouldDelete && summaryData.length == 1) {
      console.log("delete");
      setSummaryData([]);
      setBreakfastRoom(false);
      return;
    }

    if (shouldDelete && summaryData.length > 1) {
      console.log("delete it");
      setSummaryData((prevData) => {
        const newData = prevData.filter(
          (data) => !data.perRoomPerWithBreakFast
        );
        return newData;
      });
      setBreakfastRoom(false);

      return;
    }
    setSummaryData((prevData) => {
      const newData = prevData.map((data) => {
        if (data.perRoomPerWithBreakFast && data.item !== 0) {
          return { ...data, item: data.item - 1 };
        }
        return data;
      });
      const shouldDelete = newData.some(
        (data) => data.item === 0 && data.perRoomPerWithBreakFast
      );
      if (shouldDelete) {
        setDel(true);
        setBreakfastRoom(false);
      }
      return newData;
    });

    if (del) {
      setDel(false);
      setSummaryData((prevData) => {
        const newData = prevData.filter(
          (data) => !data.perRoomPerWithBreakFast
        );
        return newData;
      });
    }
  };

  const getCount = (index) => {
    if (index == 0) {
      return summaryData.find((data) => {
        return data.perRoom ? true : false;
      });
    } else {
      return summaryData.find((data) => {
        return data.perRoomPerWithBreakFast ? true : false;
      });
    }
  };

  console.log(bookingData);

  return (
    <main className="BokingPage">
      {bookingData && (
        <div className="middale-parent">
          <div className="booking-banner">
            <h2>Enjoy Your Dream Vacation</h2>
          </div>
          <div>
            <h2 className="booking-b">{bookingData?.title}</h2>
          </div>

          <div className="booking-card-withS">
            <div className="booking-card">
              {bookingData?.availableroom?.map((el) => (
                <div className="booking-room-card">
                  <div className="img-parent">
                    <CImage
                      rounded
                      thumbnail
                      width={2000}
                      height={2000}
                      src={bookingData.imgurl}
                      alt=""
                    />
                    <div className="type-of-room">
                      <h6>({el.title2})</h6>
                    </div>
                  </div>

                  <div className="card-content">
                    <div>
                      <h5>{el.title2} </h5>
                    </div>

                    <div className="perRoom-book">
                      <BookingCard
                        counter={getCount(0) ? getCount(0).item : 0}
                        increment={incrementNormalItem}
                        decrement={decrementNormalItem}
                        onClick={onClickNormal}
                        room={el}
                        bookingData={bookingData}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="card-suummary">
              <div className="booking">Booking Summary</div>

              <div className="summary px-4 py-2 ">
                {/* <div className='date'> Dates 2023-03-30 - 2023-04-04</div> 
                 <div className='night'>Nights 2</div>  */}

                {summaryData.map((el) => (
                  <CCard className="my-2">
                    <CRow>
                      <p>Check In 12/3/2024</p>
                      <p>Check Out 13/3/2024</p>
                      <CCol className="p-2">
                        <p>{el.title2}</p>
                        <h6>
                          {el?.perRoomPerWithBreakFast
                            ? "(Room With Break Fast)"
                            : "(Only Room)"}
                        </h6>
                        <div>
                          <p>Adults{el.adults}</p>
                          {/* <p>Child {el.chlidren}</p>
                          <p>Room {el.room}</p> */}
                        </div>
                      </CCol>
                    </CRow>
                    <CRow>
                      <CCol>
                        <h5>
                          {el.perRoom ? getCount(0).item : getCount(1).item} X
                          Rs {el?.perRoomPerWithBreakFast || el?.perRoom}
                        </h5>
                      </CCol>
                    </CRow>
                  </CCard>
                ))}
                {summaryData[0] && (
                  <CCard className="my-2 p-4 bg-dark text-white">
                    <h6>
                      Total Rs{" "}
                      {summaryData.reduce((crr, el, i) => {
                        if (el.perRoomPerWithBreakFast) {
                          crr += el.perRoomPerWithBreakFast * getCount(1).item;
                        }
                        if (el.perRoom) {
                          crr += +el.perRoom * getCount(0).item;
                        }
                        return crr;
                      }, 0)}
                    </h6>
                    <button
                      onClick={() => {
                        navigate("/booking-form");
                      }}
                    >
                      Book Now
                    </button>
                  </CCard>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default BookingPage;
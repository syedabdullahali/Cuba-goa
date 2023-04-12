import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import "./BookingPage.css";
import { CImage } from "@coreui/react";
import axios from "axios";
import BookingCard from "../BookingCard/BookingCard";
import SummaryCard from "../SummaryCard/SummaryCard";
import RoomComparison from "../CompareModal/CompareModal";
import { Button } from "react-bootstrap";
import { CButton } from "@coreui/react"
import {AiOutlineCalendar} from'react-icons/ai'
import CustomInputDate from "./CustomInputDate/CustomInputDate";



const BookingPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [bookingData, setBookingData] = useState("");
  const [summaryData, setSummaryData] = useState([]);
  const [cart, setCart] = useState([]);
  const [compareList, setOnCompareList] = useState([]);
  const [showCompareModal, setShowCompareModal] = useState(false);
  const [normalRoom, setNormalRoom] = useState(false);
  const [breakfastRoom, setBreakfastRoom] = useState(false);
  const [del, setDel] = useState(false);
  const [checkInDate, setCheckInDate] = useState();
  const [checkOutDate, setCheckOutDate] = useState("");
  const [availability, setAvailability] = useState([]);
  const [toggaleCalender,setToggaleCalender] = useState(0)

  useEffect(() => {
    // Fetch availability data from backend for desired period
    const fetchAvailability = async () => {
      const response = await fetch(
        `/availability?checkIn=${checkInDate}&checkOut=${checkOutDate}`
      );
      const data = await response.json();
      setAvailability(data);
    };
    fetchAvailability();
  }, [checkInDate, checkOutDate]);

  // const handleCheckInDateChange = (event) => {
  //   setCheckInDate(event.target.value);
  // };

  // const handleCheckOutDateChange = (event) => {
  //   setCheckOutDate(event.target.value);
  // };

  // const getAvailableDates = () => {
  //   const startDate = new Date(checkInDate);
  //   const endDate = new Date(checkOutDate);
  //   const nights = (endDate - startDate) / (1000 * 60 * 60 * 24);
  //   const availableDates = [];

  //   for (let i = 0; i < nights; i++) {
  //     const date = new Date(startDate.getTime() + i * 24 * 60 * 60 * 1000);
  //     if (availability.includes(date)) {
  //       availableDates.push(date);
  //     }
  //   }

  //   return availableDates;
  // };

  const getCurrentDateInput = (dateObj) => {
    const month = ("0" + (dateObj.getMonth() + 1)).slice(-2);
    const day = ("0" + dateObj.getDate()).slice(-2);
    const year = dateObj.getFullYear();  
    const shortDate = `${day}/${month}/${year}`;
    return shortDate;
  };



  


 
  useEffect(()=>{
    const date = new Date()
    const date2 = new Date()
    date2.setDate(date.getDate()+2)
  setCheckInDate(date)
  setCheckOutDate(date2)
  },[])


  function onClickNormal(el) {
    setSummaryData((val) => {
      const obj = { ...el, item: 1 };
      delete obj.perRoomPerWithBreakFast;
      val.push(obj);
      setNormalRoom(true);
      return [...val];
    });
  }

  function onClickBreakfast(el) {
    setSummaryData((val) => {
      const obj = { ...el, item: 1 };
      delete obj.perRoom;
      val.push(obj);
      setNormalRoom(true);
      return [...val];
    });
  }

  const onChange = (item, checked) => {
    if (checked) {
      setOnCompareList([...compareList, item]);
    } else {
      setOnCompareList([...compareList.filter((data) => data._id != item._id)]);
    }
  };

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
  console.log(bookingData, "bookingdata");

  useEffect(() => {
    getHotelData();
    addCart(id);
    console.log(id);
  }, []);

  const handleRemove = (data, perRoom) => {
    console.log(perRoom, "sdxrfctvgbhn");
    if (perRoom) {
      setSummaryData(
        summaryData.filter((item) => item._id != data._id && item.perRoom)
      );
    } else {
      setSummaryData(
        summaryData.filter(
          (item) => item._id != data._id && item.perRoomPerWithBreakFast
        )
      );
    }
  };

  const incrementNormalItem = (room) => {
    setSummaryData((prevData) => {
      return prevData.map((data) => {
        console.log(data);
        if (data._id == room._id && data.perRoom) {
          return { ...data, item: data.item + 1 };
        }
        return data;
      });
    });
  };

  console.log(summaryData);

  const decrementNormalItem = (room) => {
    const shouldDelete = summaryData.some(
      (data) => data.item === 1 && data.perRoom && data._id == room._id
    );

    console.log(shouldDelete, "fjdsalkfdlsakj", summaryData.length == 1);

    if (shouldDelete && summaryData.length == 1) {
      setSummaryData([]);
      setNormalRoom(false);
      return;
    }

    if (shouldDelete && summaryData.length > 1) {
      setSummaryData((prevData) => {
        const newData = prevData.filter(
          (data) => data.perRoom && data._id != room._id
        );
        return newData;
      });
      setNormalRoom(false);
      return;
    }
    setSummaryData((prevData) => {
      const newData = prevData.map((data) => {
        if (data.perRoom && data.item !== 0 && data._id == room._id) {
          return { ...data, item: data.item - 1 };
        }
        return data;
      });
      return newData;
    });
  };

  const incrementBreakfastItem = (room) => {
    setSummaryData((prevData) => {
      return prevData.map((data) => {
        if (data.perRoomPerWithBreakFast && data._id == room._id) {
          return { ...data, item: data.item + 1 };
        }
        return data;
      });
    });
  };

  const decrementBreakfastItem = (room) => {
    const shouldDelete = summaryData.some(
      (data) =>
        data.item === 1 && data.perRoomPerWithBreakFast && data._id == room._id
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
          (data) => data.perRoomPerWithBreakFast && data._id != room._id
        );
        return newData;
      });
      setBreakfastRoom(false);

      return;
    }
    setSummaryData((prevData) => {
      const newData = prevData.map((data) => {
        if (
          data.perRoomPerWithBreakFast &&
          data.item !== 0 &&
          data._id == room._id
        ) {
          return { ...data, item: data.item - 1 };
        }
        return data;
      });
      const shouldDelete = newData.some(
        (data) =>
          data.item === 0 &&
          data.perRoomPerWithBreakFast &&
          data._id == room._id
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
          (data) => !data.perRoomPerWithBreakFast && data._id != room._id
        );
        return newData;
      });
    }
  };

  const getCount = (index, room) => {
    if (index == 0) {
      return summaryData.find((data) => {
        return data.perRoom && data._id == room._id ? true : false;
      });
    } else {
      return summaryData.find((data) => {
        return data.perRoomPerWithBreakFast && data._id == room._id
          ? true
          : false;
      });
    }
  };



// function getNoOfNight (date1,date2){
//   const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
//   const firstDate = new Date(date1);
//   const secondDate = new Date(date2);
//  const diffDays = Math.round(Math.abs((firstDate - secondDate) / oneDay));
// }

const toggaleCalenderFun=()=>{
  setToggaleCalender(0)
  console.log('hello')
}


console.log(toggaleCalender)

  return (
    <main className="BokingPage">
      {bookingData && (
        <div className="middale-parent">
          <div className="booking-banner">
          
            <h2>Enjoy Your Dream Vacation</h2>

            <div className="booking-head">
              <div className="date-check-b">
                <div className="date-checkIn" onClick={(e)=>{
                  if(e.target.id!=='Callender'){
                    setToggaleCalender(1)
                  }                  
                  }}>
                  <label>Check In</label>
                  <div className="checkIn"><span>{<AiOutlineCalendar/>}</span><span>{getCurrentDateInput(checkInDate)}</span></div>
                  {<CustomInputDate  toggaleCalenderFun={toggaleCalenderFun}  visible={toggaleCalender===1} setCutomDate={setCheckInDate} customDate={checkInDate}  />} 
                </div>
                <div className="date-checkout" id=''  onClick={(e)=>{
                  if(e.target.id!=='Callender'){
                    setToggaleCalender(2)
                  }
                  }}>
                  <label>Check Out</label>
                  <div className="checkout"><span>{<AiOutlineCalendar/>}</span><span>{ getCurrentDateInput(checkOutDate)}</span></div>
                 {<CustomInputDate  toggaleCalenderFun={toggaleCalenderFun} visible={toggaleCalender===2} setCutomDate={setCheckOutDate} customDate={checkOutDate} />} 
                </div>

                <div className="check-availablity">
                 <CButton  variant="outline" color="dark" >Availability</CButton>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h2 className="booking-b">{bookingData?.title}</h2>
          </div>

          <div className="filter-compare">
            <Button
              className="comp"
              onClick={() => {
                if (compareList.length > 1) {
                  setShowCompareModal(true);
                }
              }}
            >
              Compare
            </Button>
          </div>

          <RoomComparison
            show={showCompareModal}
            onHide={() => setShowCompareModal(false)}
            compareList={compareList}
            bookingData={bookingData}
          />

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
                        counter={getCount(0, el) ? getCount(0, el).item : 0}
                        increment={incrementNormalItem}
                        decrement={decrementNormalItem}
                        onClick={onClickNormal}
                        room={el}
                        bookingData={bookingData}
                        breakfastRoom={false}
                        onChange={onChange}
                      />
                    </div>

                    <div className="perRoom-book">
                      <BookingCard
                        counter={getCount(1, el) ? getCount(1, el).item : 0}
                        increment={incrementBreakfastItem}
                        decrement={decrementBreakfastItem}
                        onClick={onClickBreakfast}
                        room={el}
                        bookingData={bookingData}
                        breakfastRoom={true}
                        onChange={onChange}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="card-suummary">
              <div className="booking">Booking Summary</div>

              <div className="summary px-4 py-2 ">
                {summaryData[0] && (
                  <SummaryCard
                    summaryData={summaryData}
                    handleRemove={handleRemove}
                  />
                
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
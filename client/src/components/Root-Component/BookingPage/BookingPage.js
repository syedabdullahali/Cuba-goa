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
  const [allCapaCity,setAllCapaCity] = useState([])




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
    date2.setDate(date.getDate()+1)
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
      const { data } = await axios.post("https://cuba-goa-z4hl.onrender.com/add-cart" + id);
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
      `https://cuba-goa-z4hl.onrender.com/hotelbook/${id}`,
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

    console.log(data)
    console.log(perRoom, "sdxrfctvgbhn");
   
    if (perRoom) {
      setSummaryData(
        summaryData.filter((item) => item._id !== data._id || data.perRoom !== item.perRoom       )
      );
    } else {
      setSummaryData(
        summaryData.filter(
          (item) => item._id !== data._id || item.perRoomPerWithBreakFast!==data.perRoomPerWithBreakFast
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

    const decrement = (prevData) => {
      return prevData.map((data) => {
        if (data.perRoom && data._id == room._id) {
          return { ...data, item: data.item - 1 };
        }
        return data;
      });
    }

  setSummaryData(prevData=>decrement(prevData).filter((el)=>el.item));

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


    const decrement = (prevData) => {
        return prevData.map((data) => {
          if (data.perRoomPerWithBreakFast && data._id == room._id) {
            return { ...data, item: data.item - 1 };
          }
          return data;
        });
      }
  
    setSummaryData(prevData=>decrement(prevData).filter((el)=>el.item));

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
const toggaleCalenderFun=()=>{
  setToggaleCalender(0)
}



function toRoomCapacity(capacity,type="Add"){
  function prevState(prev){
    let copyPrev = [...prev]
if(type==='Add'){
     if(!prev.some((el)=>el.index===capacity.index && el.roomId ===capacity.roomId)){
      copyPrev.push(capacity)
    }else{  
       copyPrev = copyPrev.map((el)=>{
      if(el.index===capacity.index && el.roomId ===capacity.roomId){
         return capacity
      }
      return el
    })
  }
}else if (type==='remove'){
  copyPrev = copyPrev.filter((el)=>!(el.index===capacity.index && el.roomId ===capacity.roomId))

}
 
    setSummaryData((prev)=>{
      return prev.map((el)=>{
         el.capacityInfo =[]
        copyPrev.forEach((el2)=>{
          if(el.perRoomPerWithBreakFast && el2.index.includes('A') && el._id === el2.roomId )
          {
                el.capacityInfo.push(el2)
          }
          
          if(el.perRoom && el2.index.includes('B') && el._id === el2.roomId )
          {
                el.capacityInfo.push(el2)
          }
        })  
        return el       
         })
     })
 
    return copyPrev
   }
    setAllCapaCity((val)=>prevState(val))



 }


 





console.log(summaryData)
console.log(allCapaCity)


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
                  {<CustomInputDate 
                   toggaleCalenderFun={toggaleCalenderFun}  
                   visible={toggaleCalender===1}
                   setCutomDate={setCheckInDate}
                   customDate={checkInDate} 
                   datelimit={(()=>{
                    const dateF = new Date().setDate(new Date().getDate() -1)
                    return dateF
                  })()}

                   
                   />} 
                </div>
                <div className="date-checkout" id=''  onClick={(e)=>{
                  if(e.target.id!=='Callender'){
                    setToggaleCalender(2)
                  }
                  }}>
                  <label>Check Out</label>
                  <div className="checkout"><span>{<AiOutlineCalendar/>}</span><span>{ getCurrentDateInput(checkOutDate)}</span></div>
                 {<CustomInputDate  
                 toggaleCalenderFun={toggaleCalenderFun} 
                 visible={toggaleCalender===2} 
                 setCutomDate={setCheckOutDate} 
                 customDate={checkOutDate}
                 datelimit={(()=>{
                  const date = new Date(checkInDate).setDate(new Date(checkInDate).getDate()+1 )
                  return date
                 })()}
                 />} 
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
                    <img
                      width={2000}
                      height={2000}
                      src={bookingData.imgurl}
                      alt=""
                    />
                    <div className="type-of-room">
                      <h6>{el.title2}</h6>
                    </div>
                  </div>

                  <div className="card-content">
                    <div className="perRoom-book">
                      
                      <BookingCard
                        counter={getCount(0, el) ? getCount(0, el).item : 0}
                        increment={incrementNormalItem}
                        decrement={decrementNormalItem}
                        onClick={onClickNormal}
                        onClick2={onClickBreakfast}
                        room={{...el}}
                        bookingData={bookingData}
                        breakfastel={false}
                        onChange={onChange}
                        onChange2={onChange}
                        increment2={incrementBreakfastItem}
                        decrement2={decrementBreakfastItem}
                        counter2={getCount(1, el) ? getCount(1, el).item : 0}
                        toRoomCapacity={toRoomCapacity}
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
                    checkInDate={checkInDate}
                    checkOutDate={checkOutDate}
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
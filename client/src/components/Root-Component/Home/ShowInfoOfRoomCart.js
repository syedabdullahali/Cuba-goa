import React,{useState,useEffect} from 'react'
import { useParams } from 'react-router'
import './ShowInfoOfRoomCart.css'
import { CCard, CCardBody, CCardHeader, CCardTitle, CImage } from '@coreui/react'
import {AiFillStar,AiOutlineStar} from 'react-icons/ai'
import {MdBalcony} from 'react-icons/md'
import {SiAirtable} from 'react-icons/si'
import {GiComputerFan,GiShower,GiAmberMosquito,GiVacuumCleaner} from 'react-icons/gi'
import {FcWiFiLogo}from 'react-icons/fc'
import {TbAirConditioning} from 'react-icons/tb'


const ShowInfoOfRoomCart = () => {
    const {id,idChild} = useParams()

    const [ourRoom,setOurRoom] = useState([])
    const [mainImgUrl,setMainImgUrl] =useState('')
    const [showAllImage,setShowAllImage] = useState(false)

    const getRoom = async  ()=>{
      const response = await fetch(`https://cuba-goa-z4hl.onrender.com/hotelbook/${id}`,{headers:{
        method:'GET'
      }})
      const data = await response.json()
     const data2 = {...data.availableroom.find((el)=>el._id===idChild),
        prtitle:data?.title,
        primgurl:data?.imgurl,
        content:data?.content
      }
      setMainImgUrl(data2.imgurl)
      setOurRoom(data2)
      }
      
useEffect(()=>{
  getRoom()
},[])


console.log(ourRoom)
      


  return (ourRoom &&
    <div className='home-room-cart-parent'>
        <CCard>
          <CCardHeader>
            <CCardTitle><h2>{ourRoom.title2}</h2></CCardTitle>
          </CCardHeader>
          <CCardBody>
        
        <div className='our-roo-parent'>
        <div className='cutomer-reviews'>
           <h5>Customer reviews</h5> 
          <div className='our-room-page-rating'>   
              <AiFillStar/>
              <AiFillStar/>
              <AiFillStar/>
              <AiFillStar/>
              <AiOutlineStar/>
            </div>
        </div>   

            <div className='our-room-page-content'>
              
            <div className='our-room-img'>
              <img src={mainImgUrl} />
            </div>

            <div className='our-room-images'>
             <div className='our-room-sub-image'>
              <img src={ourRoom.imgurl} onClick={()=>setMainImgUrl(ourRoom.imgurl)}/>
              </div>
            {ourRoom?.allimgurl?.filter((el,i)=>(showAllImage||i<2)).map((el)=>{
             return <div className='our-room-sub-image'>
              <img src={el} onClick={()=>setMainImgUrl(el)}/>
              </div>
            })}
            {!showAllImage&&ourRoom?.allimgurl?.length>=3&& <div className='our-room-sub-image-more'>
                 <img src={ourRoom.allimgurl[3]} onClick={()=>setShowAllImage(true)} />
                 <p onClick={()=>setShowAllImage(true)} >Show All Image </p>
              </div>}
            </div>
            
            </div>

            <div className='our-room-content'>
              <h4>RESORT NAME:- <span style={{color:'gray',fontSize:'21px'}}>{ourRoom.prtitle} </span></h4>
              <p>{ourRoom.content}</p>
            </div>

            <div className='room-overview-info-amenities'>
               <h5>Room Amenities</h5>
               <h6></h6>
               <div>
                  <h6>{ourRoom.Balcony && "Balcony" } {ourRoom.Balcony&&<MdBalcony/>}</h6>
                  <h6> {ourRoom.Bedside_Table && "BedSide Table"} {ourRoom.Bedside_Table &&<SiAirtable/>}</h6>
                  <h6>{ourRoom.Fan&&"Fan"} {ourRoom.Fan&&<GiComputerFan/>}</h6>
                  <h6>{ourRoom.House_Keeping&&"House Keeping"} {ourRoom.House_Keeping&&<GiVacuumCleaner/>}</h6>
                  <h6>{ourRoom.Wifi &&"Wifi"} {ourRoom.Wifi &&<FcWiFiLogo/>}</h6>
                  <h6>{ourRoom.coldshower_24hrs&&"Coldshower 24hrs"} {ourRoom.coldshower_24hrs&&<GiShower/>}</h6>
                  <h6>{ourRoom.mosquitonet&&"Mosquitonet"} {ourRoom.mosquitonet&& <GiAmberMosquito/>}</h6>
                  <h6>{ourRoom.airconditioned&&"Airconditioned"} {ourRoom.airconditioned && <TbAirConditioning/>}</h6>
               </div>
          </div>

            </div>
          </CCardBody>
        </CCard>
    </div>
  )
}

export default ShowInfoOfRoomCart

import './OurProperties.css'
import {AiOutlineDown,AiOutlineUp} from 'react-icons/ai'
import {RiHotelLine} from 'react-icons/ri'
import { useState,useEffect,useRef } from 'react'
import { Link } from 'react-router-dom'
import {CButton,CCol,CModal,CModalHeader,
  CModalTitle,CModalBody,CModalFooter,CFormInput,CRow,
   CFormTextarea,CFormCheck,CCard,CCardHeader, CCardBody,
   CImage,CContainer
  } from '@coreui/react'
import { storage } from '../../firebase'
import { getDownloadURL, ref,uploadBytesResumable } from 'firebase/storage'

const AddMoreRoomForm = ({showRoomForm,setRoomForm,roomData,getPropertiesData}) => {


    const [roomImgUrl,setRoomImgUrl] = useState('')
    const [roomImgProgress,setRoomProgress] = useState(0)

    const [roomMultiPalImgUrls,setRoomMultiPalImgUrls] = useState([])
    const [roomMultipalImgPrograss,setRoomMultipalImgPrograss] = useState(0)


    const [fileUploaded,setFileUpload] = useState([])

    const [resortName,setResortName] = useState('')
    const [roomName,setRoomName] = useState('')
    const [max,setMax] = useState(0)
    const [min,setMin] = useState(0)
    const [content,setContent] = useState('')
    const [children,setChildren] = useState('')
    const [adults,setAdults] = useState('')
    const [room,setRoom] = useState(0)
    const [leftRoom,setLeftRoom] = useState(0)
    const [rsRoomOnly,setRoomOnly] = useState(0)
    const [rsbreakFast,setBreakFast] = useState(0)
    const [roomPerNight,setRomPerNight] = useState(0)
    const [roomAminities,setRoomAminities] = useState('')
    const [notCancable,setNotCacable] = useState(false)
    const [wardrobe,seWardRobe] = useState(false)
    const [besideTable,setBesideTable] = useState(false)
    const [fan,setFan] = useState(false)
    const [balcony,setBalcony] = useState(false)
    const [houseKeping,setHouseKeping] = useState(false)
    const [mosquito,setMosquito] = useState(false)
    const [hour24ColdShower,set24HourColdShower] = useState(false)
    const [wifi,setWifi] = useState(false)
    const [airCodition,setAirCondition] = useState(false)
    
    const [images, setImages] = useState([]);
    const [urls, setUrls] = useState([]);
    const [progress, setProgress] = useState(0);
    const imgref = useRef(null)
  //     const fileUploaded = event.target.files;
  //     const files = event.target.files
  //     console.log(files)

  //     // console.log([...files].map((el,i)=>{
  //     //   el.id=`${el.name}id${i}`
  //     //   return el
  //     // }))
  //     const alllImgFile = []

  //     for (let i= 0; i<=files.length;i++){
  //          const newImage = files[i]
  //           // alllImgFile.push(alllImgFile)
  //           alllImgFile.push(newImage)
  //     }

  //     console.log(alllImgFile)



       
  //         const uploadImage = (alllImgFile)=>{
  //  console.log(alllImgFile)
  //           const promisses =[] 

  //           if(!alllImgFile)return

  //         alllImgFile.filter((el)=>el).map((fileUploaded)=>{

  //          const storageRef =   ref(storage,`photos/${fileUploaded.name}`)
  //          promisses.push(storageRef)
  //          const uploadTask = uploadBytesResumable(storageRef,fileUploaded)
  //          uploadTask.on("state_changed",(snapshot)=>{
  //           const prog = Math.round((snapshot.bytesTransferred/snapshot.totalBytes) *100)    
  //          },(error)=>{
  //           console.log(error)
  //          },
  //         async ()=>{
  //           getDownloadURL(uploadTask.snapshot.ref).then((url)=>{
  //             setRoomMultiPalImgUrls((preVal)=>[...preVal,...url])
  //           })
  //          }
  //          )
  //         })

  //         Promise.all(promisses)
  //         console.log(promisses)
  //         console.log(roomMultiPalImgUrls)
  //         }         
  //         uploadImage(alllImgFile)
  //   };


  const handleChangeMultiPal = (e) => {

      const fileUploaded = []
    for (let i = 0; i < e.target.files.length; i++) {
      const newImage = e.target.files[i];
      fileUploaded.push(newImage)
    }

    setFileUpload(val=>[...val,...fileUploaded])






    
  fileUploaded.forEach((file1)=>{
    const uploadImage = (file)=>{
      if(!fileUploaded)return
     const storageRef =   ref(storage,`subphotos/${fileUploaded.name}`)
     const uploadTask = uploadBytesResumable(storageRef,file)

     uploadTask.on("state_changed",(snapshot)=>{
      // const prog = Math.round((snapshot.bytesTransferred/snapshot.totalBytes) *100)
      //  setRoomProgress(prog)
     },(error)=>{
      console.log(error)
     },
   async ()=>{
      getDownloadURL(uploadTask.snapshot.ref).then((url)=>{
        setRoomMultiPalImgUrls((prevVal)=>[...prevVal,url])
      })
     }
     )
    }
    uploadImage(file1)
  })
  };

// useEffect(()=>{
//   if(!roomMultiPalImgUrls.length&&!fileUploaded.length)return 
//   setRoomMultipalImgPrograss(~~(roomMultiPalImgUrls.length/fileUploaded.length)*100)
// },[roomMultiPalImgUrls.length,fileUploaded.length])

console.log(~~(roomMultiPalImgUrls.length/fileUploaded.length)*100)

console.log(roomMultiPalImgUrls)

    const handleChange = event => {
      const fileUploaded = event.target.files[0];
      const file = event.target.files[0]
      const reader = new FileReader();
      reader.readAsDataURL(file)
      reader.onload = (e) => {
           imgref.current.src = e.target.result
      }
          const uploadImage = (file)=>{
            if(!fileUploaded)return
           const storageRef =   ref(storage,`photos/${fileUploaded.name}`)
           const uploadTask = uploadBytesResumable(storageRef,fileUploaded)
    
           uploadTask.on("state_changed",(snapshot)=>{
            const prog = Math.round((snapshot.bytesTransferred/snapshot.totalBytes) *100)
             setRoomProgress(prog)
           },(error)=>{
            console.log(error)
           },
           ()=>{
            getDownloadURL(uploadTask.snapshot.ref).then((url)=>{
              setRoomImgUrl(url)
            })
           }
           )
          }
          uploadImage(file)




    };







 const saveRoom =()=>{
if(!roomData)return 
const newRoomdata = {    
  allimgurl:roomMultiPalImgUrls,
  imgurl:roomImgUrl,
  title2:roomName,
  roomcapacity:{max:"",min:""},
  perRoom:rsRoomOnly,
  adults:adults,
  chlidren:children,
  room:room,
  leftroom:"",
  perRoomPerWithBreakFast:rsbreakFast,
  Guest_Reviews:'No Reviews',
  Room_Amenities:'',
  nonCancel:notCancable,
  Wardrobe: wardrobe,
  Bedside_Table:besideTable,
  Fan:fan,
  Balcony:balcony,
  House_Keeping:houseKeping,
  pernightroom:roomPerNight,
  mosquitonet:mosquito,
  Wifi:wifi,
  coldshower_24hrs:hour24ColdShower,
  airconditioned:airCodition,
 }    

roomData.availableroom.push(newRoomdata)
   
const data ={...roomData}
      
fetch(`https://cuba-goa-z4hl.onrender.com/hotelbook/${roomData?._id}`, {
  method: "PUT",
  headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
  },
  body: JSON.stringify(data)
}).then((resp) => {
  resp.json().then(() => {
      alert("successfully submitted")
      getPropertiesData()
  }).catch((error)=>{
    console.log(error)
  })
})
 }

    






  return (
    <>
      <CModal
  keyboard={false}
  portal={false}
  visible={showRoomForm} 
  className='booking-form-p'
  scrollable
  size='lg'
 >

      <CModalHeader onClick={()=>setRoomForm(false)} >
        <CModalTitle><h4>Room Info</h4></CModalTitle>
      </CModalHeader>
      <CModalBody >
        <CRow className='py-4'>
          <CCol className='m-0 p-0'>
            {/* <CContainer className='m-0 p-0' > */}
              <CImage ref={imgref} className='p-0 m-0' width={300} height={200}/>
            {/* </CContainer> */}
          </CCol>
         <CCol lg={6} className='pt-5'>
         <CFormInput  type='file'  accept="image/*"  label={`Upload Uniq Room Image ${roomImgProgress}%`} onChange={handleChange} /> 
         </CCol>
        </CRow>
        <CRow>
         <CCol lg={6}>
         <CFormInput  type='file'  accept="image/*" multiple="multiple" label={`Upload Multipal Room Image ${~~(roomMultiPalImgUrls.length/fileUploaded.length)*100} %`}  onChange={handleChangeMultiPal} /> 
         </CCol>
         <CCol lg={6}>
         <CFormInput label='Room Name' value={roomName} onChange={(e)=>setRoomName(e.target.value)} type='text'/>
         </CCol>
        </CRow>
        
        <CRow>
          <CCol className='mt-2' lg={6}>
           <CFormInput label='Adult Capacity ' value={adults} type='number'  onChange={(e)=>setAdults(e.target.value)} />
          </CCol>
          <CCol className='mt-2' lg={6}>
           <CFormInput label='Children Capacity ' value={children} type='number' onChange={(e)=>setChildren(e.target.value)}  />
          </CCol>
        </CRow>
        <CRow>
          <CCol className='mt-2' lg={6}>
           <CFormInput label='Room' type='number' value={room} onChange={(e)=>setRoom(e.target.value)}  />
          </CCol>
          <CCol className='mt-2' lg={6}>
           <CFormInput label='Rs Room only' type='number' value={rsRoomOnly} onChange={(e)=>setRoomOnly(e.target.value)} />
          </CCol>
        </CRow>
        
        <CRow>
        
          <CCol className='mt-2' lg={6}>
           <CFormInput label='Rs Room with Breakfast' type='number' value={rsbreakFast} onChange={(e)=>setBreakFast(e.target.value)}  />
          </CCol>
          <CCol className='mt-2' lg={6}>
           <CFormInput label='Room No Of Per night' type='number' value={roomPerNight} onChange={(e)=>setRomPerNight(e.target.value)} />
          </CCol>
        </CRow>
     
 

        <CCard className='mx-2 mt-4'>
           <CCardHeader className='text-center'>
            <h4>Room Facility</h4>
           </CCardHeader>
           <CCardBody className='p-4 ' >
            
        <CRow className='text-start'>
        <CCol className='mt-2' >
           <CFormCheck type='checkbox' label='Non Cancel / Non Refundable' 
           checked={notCancable} onChange={()=>setNotCacable(val=>!val)} />
          </CCol>     
          <CCol className='mt-2' >
           <CFormCheck type='checkbox' label='Wardrobe' 
             checked={wardrobe} onChange={()=>seWardRobe(val=>!val)}
            />
          </CCol>                
        </CRow>

        <CRow className='text-start'>
        <CCol className='mt-2' >
           <CFormCheck type='checkbox' label='Bedside Table' 
           checked={besideTable} onChange={()=>setBesideTable(val=>!val)}  />
          </CCol>  
          <CCol className='mt-2' >
           <CFormCheck type='checkbox' label='Fan'
           checked={fan} onChange={()=>setFan(val=>!val)}/>
          </CCol>                 
        </CRow >

        <CRow className='text-start'>
        <CCol className='mt-2' >
           <CFormCheck type='checkbox' label='Balcony'
           checked={balcony} onChange={()=>setBalcony(val=>!val)}/>
          </CCol> 
          <CCol className='mt-2' >
           <CFormCheck type='checkbox' label='House Keeping' 
           checked={houseKeping} onChange={()=>setHouseKeping(val=>!val)}/>
          </CCol>                
        </CRow>

        <CRow className='text-start'>
        <CCol className='mt-2' >
           <CFormCheck type='checkbox' label='Mosquito Net'
           checked={mosquito} onChange={()=>setMosquito(val=>!val)}/>
          </CCol>  
          <CCol className='mt-2' >
           <CFormCheck type='checkbox' label='24hr hot & cold shower'
           checked={hour24ColdShower} onChange={()=>set24HourColdShower(val=>!val)}
           />
          </CCol>                
        </CRow>
        <CRow className='text-start' >
        <CCol className='mt-2' >
           <CFormCheck type='checkbox' label='WiFi' 
           checked={wifi}  onChange={()=>setWifi(val=>!val)} />
          </CCol>  
          <CCol className='mt-2' >
           <CFormCheck type='checkbox'  label='AIR-CONDITIONED' 
           checked={airCodition} onChange={()=>setAirCondition(val=>!val)}
            />
          </CCol>    
               
        </CRow>

           </CCardBody>
        </CCard>
      </CModalBody>

      <CModalFooter>
        <CButton color="primary" onClick={saveRoom}>Save Room</CButton>
      </CModalFooter>
</CModal>
    </>
  )
}

export default AddMoreRoomForm


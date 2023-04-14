import './Resorts.css'
import { useEffect, useState, } from 'react'
import beachResort2 from '../../../assets/resort.mp4'
import { CImage,CModal,CModalHeader,CModalFooter,CModalBody,CModalTitle,CRow,CCol} from '@coreui/react'
import React from 'react'

import cubapatnam from '../../../assets/CUBA_PATNEM_BEACH_BUNGALOWS.jpg'
import cubpatnam from '../../../assets/PALOLEM_BEACH_RESORT.jpg'
const Footer =React.lazy(()=>import( '../Footer/Footer'))





const Resorts = () => {

    const [hover,setHover] = useState(false)
    const [resortData,setResortData] = useState([])
    const [visibleResort,setVisibaleResort] = useState(false)
    const [resortData2,setRsortData2] = useState({})


 function hoverOverImg (e){
    setHover(true)
 }
 function hoverOverNotImg (){
    setHover(false)
 }

const getHotelData  = async  ()=>{
 const response = await  fetch(`https://cuba-goa-z4hl.onrender.com/hotelbook`)
 setResortData(await response.json())
}

useEffect(()=>{
getHotelData()
},[])

  return (
   
   <>

<CModal
 style={{marginTop:'1rem'}}
  keyboard={false}
  portal={false}
  visible={visibleResort} 
className='model-resort '  size='xl'>
    <CModalHeader  onClick={() => {setVisibaleResort(false)}}>
        <CModalTitle><h4>About Resort</h4></CModalTitle>
    </CModalHeader>    
    <CModalBody>
          <CCol className='d-flex justify-content-center'><h3>{resortData2.title}</h3></CCol>
          <CCol  className='d-flex justify-content-center'>
            <img  width={"300px"} src={resortData2.imgurl}  />
          </CCol>
          <CCol  className='d-flex justify-content-center'>
               {resortData2.content}
          </CCol>
    </CModalBody>
    </CModal>


    <section>


 <div  style={{height:'100vh'}}>
        < video style={{width:'100%',height:'100%' ,objectFit:'cover'}} src={beachResort2} autoPlay loop muted />
   </div>
<div className='resorts'>
<h2 className='resort-title'>LEARN MORE ABOUT OUR RESORTS</h2>
<div className='resorts-container'>
  
{resortData.map((el)=><div className='resort-card'>
<div className='img-parent-41' >
     <CImage rounded thumbnail src={el.imgurl} width={200} height={200} onClick={()=>{
     setRsortData2(el)
      setVisibaleResort(true)
      }} />
</div>

<div className={'text-of-resort'}  >
<p>{el.title}</p>
</div>
</div>
)}
</div>
</div>
</section>
<Footer/>
</>
  )
}

export default Resorts

import React from 'react'
import './ImageSliderModal.css'
import {CButton,CCol,CModal,CModalHeader,
  CModalTitle,CModalBody,CModalFooter,CFormInput,CRow,
   CFormTextarea,CFormCheck,CCard,CCardHeader, CCardBody,
   CImage,
   CContainer
  } from '@coreui/react'
  import Carousel from 'react-elastic-carousel';



const ImageSliderModal = ({visibleImageSlider,setVisibleImgSLider,visibleSliderImgData}) => {
  console.log(visibleSliderImgData)
  return (
<CModal
  keyboard={false}
  portal={false}
  visible={visibleImageSlider} 
className='booking-form-p '  size='xl'>
    <CModalHeader  onClick={() => {setVisibleImgSLider(false)}}>
        <CModalTitle><h4>Alll related image</h4></CModalTitle>
    </CModalHeader>    
    <CModalBody>
      <div className='imgSliderHeight'>
      <Carousel itemsToShow={1}>
        {visibleSliderImgData.map((el)=> <div className='img-parent-slider-m'><img src={el} alt='image not loaded'/></div>)}
       </Carousel>
      </div>
    </CModalBody>
    </CModal>
  )
}

export default ImageSliderModal

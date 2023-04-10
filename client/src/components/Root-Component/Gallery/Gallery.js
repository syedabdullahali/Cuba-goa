import './Gallery.css'
import React from 'react'
import { useEffect,useState } from 'react'
import { CCard,CCarousel,CCarouselItem,CCarouselCaption,CCardHeader,CCardBody,CImage, CButton,CCol,CRow } from '@coreui/react'





const Gallery = () => {

  const [galleryData,setgalleryData] = useState([])
  const [selectedImg,setSelectedImg] = useState('')

  const getHotelData  = async  ()=>{
    const response = await  fetch(`https://allapiresort-w3ql.vercel.app/hotelbook`)
    const data  =  await response.json() 

    const allImgUrl = []





    data.forEach(element => {

      allImgUrl?.push({imgUrl:element.imgurl,title:element.title})

      element.availableroom.forEach(element2 => {
        if(element2.imgurl){
          allImgUrl?.push({imgUrl:element2.imgurl,title:element2.title2+""+`(${element.title})`})
          }
      });

    });
  
       setgalleryData(allImgUrl)
   }

   
   useEffect(()=>{
   getHotelData()
   },[])


  return (
    <main className='gallery-main'>
      <div  style={{height:'fit-content'}} className='w-100 p-4 m-0 d-flex bg-white'>
 
          <div className='sub-img-parent '  >
            {galleryData.map((el)=>

                           <div className='img-gallary-parent' onClick={()=>setSelectedImg(el)} >                  
                           <div className='img-gallary'>                         
                            <img className='p-0' src={el.imgUrl} /> 
                            </div>
                           <div className='img-gallary-text '><p>{el.title}</p> </div>
                           </div>
                           )}
           
          </div>  
          {selectedImg &&<div className='selected-div-img'>
            <img className='img-selected' src={selectedImg.imgUrl}/>
             <div className='img-gallary-selected-text-2'>{selectedImg.title}</div>
             </div>}                  
       
         {/* </CCardBody> */}
      </div>
  
    </main>
  )

    //     <section className='gallery'>
               
    //          <CCard style={{width:'fit-content'}} className='d-flex m-auto'>
    //           <CCardHeader>
    //                   <h4>View our resorts Gallary</h4>
    //           </CCardHeader>
    //          <CCardBody>    
    //           <CButton></CButton>              
    //                  <CImage rounded thumbnail  src="https://www.greatblueresorts.com/wp-content/uploads/2018/01/Superior-Deluxe-400x235.jpg" alt="" />
    //           <CButton></CButton>              
    //           </CCardBody>
                
    //          </CCard >  
    //             <div className='gallery-image-slider'>
    //                <CCard className='d-flex'>
    //                </CCard>
    //             </div>
    //     </section>
}

export default Gallery

import './ForSale.css'
import { useState,useEffect,useRef } from 'react'
import {MdOutlineCancel} from 'react-icons/md'
import { storage } from '../../firebase'
import { getDownloadURL, ref,uploadBytesResumable } from 'firebase/storage'

const ForSale = () => {

  const [imagesData,setImagesData] = useState([])
  const [showForm,setForm] = useState(false)
  const [name,setName]=useState('')
  const [location1,setLocation] = useState('')
  const [noOfBathRoom,setNoBathRoom] =useState(0)
  const [noOfBedRoom,setBedRoom]=useState(0)
  const [price,setPrice] = useState(0)
  const [priceMonth,setPriceMonth] = useState(0)
  const [priceWeek,setPriceWeek] = useState(0)
  const [imgaeBackendData,setImageBackendData] = useState('')
  const [progres,setProgres] = useState(0)

  const hiddenFileInput = useRef('');

  const handleClick = event => {
    hiddenFileInput.current.click();
    console.log(hiddenFileInput.current)
  };

  const handleChange = event => {
  const fileUploaded = event.target.files[0];
  const file = event.target.files[0]

  const reader = new FileReader();
  reader.readAsDataURL(file)
  reader.onload = (event) => {
    setImagesData(event.target.result)
  }

  const formData = new FormData();
      formData.append("document", fileUploaded);
      formData.append("cif","jefi");
      formData.append("category", "knfj");
      formData.append("docOwnerType", "C");
      formData.append("niyoPartnerCompanyId","sk");
      formData.append("niyoCustomerCompanyId","u");
      setImageBackendData(formData)
   
      const uploadImage = (file)=>{
        if(!fileUploaded)return
       const storageRef =   ref(storage,`photos/${fileUploaded.name}`)
       const uploadTask = uploadBytesResumable(storageRef,fileUploaded)

       uploadTask.on("state_changed",(snapshot)=>{
        const prog = Math.round((snapshot.bytesTransferred/snapshot.totalBytes) *100)
        setProgres(prog)
       },(error)=>{},
       ()=>{
        getDownloadURL(uploadTask.snapshot.ref).then((url)=>{
        console.log(url)
        })
       }
       )
      }
      uploadImage()
};
  

 const getHotelData = async ()=>{
const response =   await fetch(`https://resort-api-5ws9.vercel.app/user`,{method: "GET"})

console.log(await response.json())

} 



useEffect(()=>{
getHotelData()
},[])


 const saveNewCart = async ()=>{


fetch(`https://pisoauat.niyogin.in/gates/1.0/sweeps/uploadDoc`, {
  method: "POST",
  headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
  },
  auth:{
    username: "xSgqh",
    password: "GKPejXE}c",
  },
  body: JSON.stringify(imgaeBackendData)
}).then((resp) => {
  resp.json().then(() => {
      alert("successfully submitted")
  }).catch((error)=>{
    console.log(error)
  })
  
})
  
 } 




  return (
    
    <section>
    <div className='forSale'>
      <h2 className='sale-Title'>Owning a Resort Cottage has never <br/> been so easy!</h2>
               <button>Ownership FAQSs</button>

           <p>
           * Pricing & interest rate subject to change without notice.
            Open finance rate from 7.99% OAC over 180 months, with no penalties or hidden fees,
             if you choose to pay down loan early. 20% down-payment required on new cottage purchases.
              Maximum to finance $200,000. **Financing subject to deposit criteria, 
           interest rates and previous bankruptcy. Renderings are artist concept only and not to scale. E & O.E.</p>  


    </div>
  <div className='newPlot-forSale'>
    <h2 className='new-sale-title'> NEW & PRE-OWNED COTTAGES, AND AVAILABLE LOTS</h2>  
  <div className='button-parent'>
    <button className='sales-new-button' onClick={()=>setForm(true)}>ADD NEW CART</button>
  </div>  


    <div className='sale-card'>
      <div className='img-container'>
        <img src='https://images.unsplash.com/photo-1614027164847-1b28cfe1df60?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGlvbiUyMGhlYWR8ZW58MHx8MHx8&w=1000&q=80'></img>
      </div>
      <h2 className='sale-card-title' >Tittle Of Mony</h2>
      <h3 className='sale-card-title-about'>Season</h3>
          <h4 className='card-info-1'> <span>1,207/mo</span> <span> 417/wk </span> <span> 47,437 down</span> 
          
           </h4>

          <h6><spna>baddroom</spna> <span>bathroom</span></h6>
          <h6>available at</h6>
    </div>
  </div>

  {showForm&& <div className='form-modal'  onClick={(e)=>{if(e.target.className ==='form-modal'){setForm(false)}}}>

  <div className='cart-modal'  >
       <button className='sale-cart-cancel' onClick={()=>setForm(false)}><MdOutlineCancel/></button>
  <div  className='sale-cart-form'>
   
    <div className='inputbox-sales-img'>
       <div className='img-parnet-sales'>
         <img  src={imagesData} width='100%'></img>
       </div>
       <button onClick={handleClick}>Upload image</button>
       <input style={{display:'none'}} type="file" accept="image/*" id="myfile" 
       name="myfile" ref={hiddenFileInput}  onChange={handleChange} ></input>
       
      </div>
    <div className='inputbox-sales'>
    <label for='Name' > Name</label>
    <input id='Name' value={name} onChange={(e)=>setName(e.target.value)} placeholder='Enter name' type='text' />
    </div>
    <div className='inputbox-sales'>
    <label for='Location'>Location</label>
    <input id='Location' type='text' placeholder='Enter Location' value={location1} onChange={(e)=>setLocation(e.target.value)} />
    </div>
    <div className='inputbox-sales'>
    <label for='Bathroom'>No Of Bathroom</label>
    <input id='Bathroom ' type='number' value={noOfBathRoom} onChange={(e)=>setNoBathRoom(e.target.value)} placeholder='Enter No Of Bathroom' />
    </div>
    <div className='inputbox-sales'>
    <label for='Bedroom '>No  Of Bedroom</label>
    <input id='Bedroom ' type='number' placeholder='Enter No  Of Bedroom' value={noOfBedRoom} 
     onChange={(e)=>setBedRoom(e.target.value)}/>
    </div>
    <div className='inputbox-sales'>
    <label for='price'>Price</label>
    <input id='price ' type='number'placeholder='Enter your  price' value={price} onChange={(e)=>setPrice(e.target.value)} />
    </div>

    <div className='inputbox-sales'>
    <label for='Price per month'>Price per week</label>
    <input id='Price per month'  placeholder='Price per week' value={priceWeek} onChange={(e)=>setPriceWeek(e.target.value)}  />
    </div>
    <div className='inputbox-sales'>
    <label for='Price per month'>Price per month</label>
    <input id='Price per month' placeholder='Enter your Price per month' value={priceMonth} onChange={(e)=>setPriceMonth(e.target.value)}  />
    </div>
    <div>
    </div>
    <div className='inputbox-sales2'>
    <button type='submit' className='sumbit' onClick={saveNewCart}>Submit</button>
    </div>
</div>
</div>
</div>}
</section>



  )
}

export default ForSale

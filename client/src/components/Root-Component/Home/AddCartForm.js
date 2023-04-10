import './AddCartForm.css'
import {CModal,CRow,CCol,CFormInput,CModalHeader,CModalTitle,CModalBody,CButton} from '@coreui/react'

function AddCartForm({showCartForm,setShowCartForm}){

return  <CModal
        keyboard={false}
        portal={false}
        backdrop={true}
        scrollable
        visible={showCartForm}
        size='md'
        style={{zIndex:1000000}}       
        className='add-to-cart mt-5'
        >

     <CModalHeader  onClick={() => {setShowCartForm(false)}}  >
        <CModalTitle><h4>Resort Info</h4></CModalTitle>
      </CModalHeader>


<CModalBody className='p-4'>
    <CCol className='mt-2 mx-4' >
        <CFormInput type='file' label="Upload resort image"/>
    </CCol>
    <CCol  className='mt-2 mx-4'  >
         <CFormInput type='text' label="Resort Name"/>
    </CCol>
    <CCol  className='mt-2 mx-4' >
         <CFormInput type='text' label="Resort Location"/>
    </CCol>
    <CCol  className='text-end pt-2 px-4' >
        <CButton>Save</CButton>
    </CCol>
</CModalBody>

</CModal>


}

export default AddCartForm
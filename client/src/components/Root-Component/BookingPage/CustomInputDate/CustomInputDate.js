import React, { useEffect } from 'react'
import './CustomInputDate.css'
import { useState } from 'react'
import {AiOutlineLeft,AiOutlineRight} from 'react-icons/ai'

const CustomInputDate = ({setCutomDate,customDate,visible,toggaleCalenderFun,datelimit}) => {
const [calenderMonthYear,setCalenderMonthYear]  = useState({
    month:new Date(customDate).getMonth(),
    year:new Date(customDate).getFullYear(),
})    

const [firstDate,setFirstDate] = useState([])
const [secondDate,setSecondDate] = useState([])


let weekday = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
]


function compareDate(date1,date2){
  return date1.getFullYear()===date2.getFullYear()&&
  date1.getMonth()===date2.getMonth()&&
  date1.getDate()===date2.getDate()
} 

function CompareDateLimit(date1,date2){

  if(new Date(date1).getTime() > new Date(date2).getTime()){
     return true
  } 
return false
}


function toDisableDate(date2,datelimit){
  if(CompareDateLimit(datelimit,date2)){
       return false
  }
  return true
}



function getDaysInMonth(month, year) {
        var date = new Date(year, month, 1);
        var days = [];
        while (date.getMonth() === month) {
          days.push(new Date(date));
          date.setDate(date.getDate() + 1);
        }
        return days;
}

useEffect(()=>{
{    
const {month,year}  = calenderMonthYear 
const daysObj = getDaysInMonth(month,year)
console.log(daysObj[0].getDay())
const startTo = new Array(daysObj[0].getDay()).fill('')
setFirstDate([...startTo,...daysObj])
}
{
const {month,year}  = calenderMonthYear   
const monthSecond = month +1===12?0:month+1
const daysObj = getDaysInMonth(monthSecond,monthSecond===0?year+1:year)  
const startTo = new Array(daysObj[0].getDay()).fill('')
setSecondDate([...startTo,...daysObj])
}
},[calenderMonthYear.month])

function incrementDate(){
    setCalenderMonthYear((prev)=>{
   const month = prev.month+1!==12
return {month:month?prev.month+1:prev.month=0,year:month?prev.year:prev.year+1}
    })
}

function decrementDate(){
    setCalenderMonthYear((prev)=>{
   const month = prev.month===0
return {month:!month?prev.month-1:11,year:month?prev.year-1:prev.year}
    })
}

function dateClassName(el){
 const TodayDate   =   new Date(customDate) 
 const selectedDate =   new Date(el) 

 if(compareDate(TodayDate,selectedDate)){
    return 'cus-date-active cus-date'
 }
 return 'cus-date'   

}

function visibaleHidden(){
    toggaleCalenderFun()
}

  return (
    <div className='calender-parent' style={{display:visible?'grid':'none'}}>
        <div className='first-calender-year'>
            <div className='left-icon-c' onClick={()=>decrementDate()}><AiOutlineLeft/></div>
            <h4 className=' ms-5'>{ monthNames[new Date(firstDate.find((el)=>el)).getMonth()]}</h4>
            <h4 className=' ms-3'>{
            new Date(firstDate.find((el)=>el)).getFullYear()}</h4>
        </div>    
        <div className='second-calender-year' onClick={()=>incrementDate()}>
            <h4 className='me-3'>{monthNames[new Date(secondDate.find((el)=>el)).getMonth()]}</h4>
            <h4 className='me-5'>{new Date(secondDate.find((el)=>el)).getFullYear()}</h4>
            <div className='right-icon-c'><AiOutlineRight/></div>

        </div>    
        <div className='calender-first'>
            <>
            {weekday.map((el)=><div className='week'>{el}</div>)}
            {firstDate.map((el)=>
            
              (toDisableDate(el,datelimit)? <div  id='Callender' className={el?dateClassName(el):''} onClick={(e)=>{
                if(!el)return
                setCutomDate(el) 
                visibaleHidden()}} >
                    {new Date(el).getDate()?new Date(el).getDate():''}</div>
                : <div  style={{opacity:'0.5',cursor:'not-allowed'}} className={el?dateClassName(el):''}  >
                      {new Date(el).getDate()?new Date(el).getDate():''}</div>    
                    )
                    
                    
                    )}

           </>
        </div>
        <div className='calender-second'>
          <>
            {weekday.map((el)=><div className='week'>{el}</div>)}
            {secondDate.map((el)=> (toDisableDate(el,datelimit)? <div  id='Callender' className={el?dateClassName(el):''} onClick={(e)=>{
                if(!el)return
                setCutomDate(el) 
                visibaleHidden()}} >
                    {new Date(el).getDate()?new Date(el).getDate():''}</div>
                : <div  style={{opacity:'0.5',cursor:'not-allowed'}} className={el?dateClassName(el):''}  >
                      {new Date(el).getDate()?new Date(el).getDate():''}</div>    
                    ))}
           </>
      </div>     
    </div>
  )
}

export default CustomInputDate

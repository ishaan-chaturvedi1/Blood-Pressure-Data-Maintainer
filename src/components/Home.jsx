import React, { useState, useEffect } from 'react'
import { useFormState } from 'react-dom'
import { v4 as uuidv4 } from "uuid"

const Home = () => {

  const date_actual = new Date();
  
  const [readings, setreadings] = useState([]);
  const [systolic_pressure, set_systolic] = useState();
  const [diastolic_pressure, set_diastolic] = useState();
  const [pulse, setpulse] = useState();
  const [patientname, setpatientname] = useState();
  const [date, setdate] = useState(`${String(date_actual.getDate()).padStart(2,"0")}-${String(date_actual.getMonth()+1).padStart(2, "0")}-${String(date_actual.getFullYear())}`);
  const [Time, setTime] = useState(`${String(date_actual.getHours()).padStart(2,"0")}:${String(date_actual.getMinutes()).padStart(2,"0")}`);

  useEffect(() => {
    let value = localStorage.getItem("readings")
    if (value){
      let main_value = JSON.parse(value)
      setreadings(main_value)
    }
  }, [])
    
    function saveReading(){
      setreadings([...readings, {pulse:pulse, diastolic:diastolic_pressure, systolic:systolic_pressure, date:date,patient:patientname, time:Time, id: uuidv4()}])
      saveToLs([...readings, {pulse:pulse, diastolic:diastolic_pressure, systolic:systolic_pressure, date:date, time:Time, id: uuidv4(), patient:patientname}])
    }

    function saveToLs(value){
      localStorage.setItem("readings", JSON.stringify(value))
    }
  return (
    <div className='bg-[#f3f3f6] min-h-[87vh] p-10'>
      <section className='flex flex-col gap-1 items-center justify-center text-black'>
        <input type="text" onChange={(e) => {set_systolic(e.target.value)}} value={systolic_pressure} name="Systolic" id="Systolic" placeholder='Systolic' className='p-2 text-xl rounded-4xl bg-white border-[#008060] border-[1px]'  />
        <input type="text" onChange={(e) => {set_diastolic(e.target.value)}} value={diastolic_pressure}  name="Diastolic" id="Diastolic" placeholder='Diastolic' className='p-2 text-xl rounded-4xl bg-white border-[#008060] border-[1px]' />
        <input type="text" onChange={(e) => {setpulse(e.target.value)}} value={pulse}  name="Pulse" id="Pulse" placeholder='Pulse' className='p-2 text-xl rounded-4xl bg-white border-[#008060] border-[1px]' />
        <input type="text" onChange={(e) => {setpatientname(e.target.value)}} value={patientname}  name="patientname" id="patientname" placeholder='Patient Name' className='p-2 text-xl rounded-4xl border-[#008060] border-[1px] bg-white' />
        <input type="text" onChange={(e) => {setdate(e.target.value)}} value={date}  name="date" id="date" placeholder='date' className='p-2 text-xl rounded-4xl bg-white border-[#008060] border-[1px]' />
        <input type="text" onChange={(e) => {setTime(e.target.value)}} value={Time}  name="Time" id="Time" placeholder='Time' className='p-2 text-xl rounded-4xl bg-white border-[#008060] border-[1px]' />
        <button onClick={() => {saveReading()}} className='rounded-4xl bg-white px-6 py-2 cursor-pointer text-xl border-[#008060] border-[1px]'>Save</button>
      </section>
    </div>
  )
}

export default Home

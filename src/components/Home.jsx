import React, { useState, useEffect } from 'react'
import { useFormState } from 'react-dom'
import { v4 as uuidv4 } from "uuid"

const Home = () => {

  const date_actual = new Date();


  const [choice, setChoice] = useState(1); // default
  const [readings, setreadings] = useState([]);
  const [systolic_pressure, set_systolic] = useState();
  const [diastolic_pressure, set_diastolic] = useState();
  const [pulse, setpulse] = useState();
  const [patientname, setpatientname] = useState();
  const [date, setdate] = useState(`${String(date_actual.getDate()).padStart(2, "0")}-${String(date_actual.getMonth() + 1).padStart(2, "0")}-${String(date_actual.getFullYear())}`);
  const [Time, setTime] = useState(`${String(date_actual.getHours()).padStart(2, "0")}:${String(date_actual.getMinutes()).padStart(2, "0")}`);
  const [numberOfReadings, setNumberOfReadings] = useState(1)
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    if (!localStorage.getItem("numberOfReadings")) {
      localStorage.setItem("numberOfReadings", 1);
    }
    setNumberOfReadings(Number(localStorage.getItem("numberOfReadings")));
  }, []);


  useEffect(() => {
    const stored = localStorage.getItem("readings" + choice);
    setreadings(stored ? JSON.parse(stored) : []);
  }, [choice]);



function addReadingList() {
  const newIndex = Number(localStorage.getItem("numberOfReadings")) + 1;

  localStorage.setItem("numberOfReadings", newIndex);
  localStorage.setItem("readings" + newIndex, "[]");

  setNumberOfReadings(newIndex);
}


function saveReading() {
  if (!systolic_pressure || !diastolic_pressure || !pulse || !patientname || !date || !Time) {
    alert("Please enter all the details.");
    return;
  }

  const newReading = {
    patient: patientname,
    date,
    time: Time,
    systolic: systolic_pressure,
    diastolic: diastolic_pressure,
    pulse,
    id: uuidv4()
  };

  setreadings(prev => {
    const updated = [...prev, newReading];
    saveToLs(updated);
    return updated;
  });
}



  function saveToLs(value) {
    localStorage.setItem(`readings${choice}`, JSON.stringify(value))
  }
  return (
    <div className='bg-[#f3f3f6] flex-1 p-8'>
      <section className='flex flex-col gap-1 items-center justify-center text-black'>
        <form onSubmit={handleSubmit} className="space-y-4 m-4">
          <div className="flex gap-2 items-center justify-center">
            {
              Array.from({ length: numberOfReadings }).map((_, index) => {


                return <div key={index}> <label htmlFor={`option-${index + 1}`} className="relative">
                  <input
                    type="radio"
                    name="choice"
                    id={`option-${index + 1}`}
                    value={index + 1}
                    checked={choice === index + 1}
                    onChange={(e) => setChoice(Number(e.target.value))}
                    className="peer sr-only"
                  />
                  <span
                    className="px-4 py-2 rounded-full border border-zinc-600 text-sm cursor-pointer
                       transition bg-zinc-900 text-white
                       peer-checked:bg-emerald-500 peer-checked:text-black peer-checked:border-emerald-500"
                  >
                    {index + 1}
                  </span>
                </label>
                </div>
              })
            }
            <button onClick={() => { addReadingList() }} className='px-[12px] py-[6px] rounded-full border border-zinc-600 text-sm cursor-pointer
                       transition bg-zinc-900 text-white items-center justify-center gap-1 flex'><img src="/add.svg" className='invert' alt="add" /> Add</button>
          </div>
        </form>
        <input type="text" onChange={(e) => { setpatientname(e.target.value) }} value={patientname} name="patientname" id="patientname" placeholder='Patient Name' className='p-2 text-xl rounded-4xl border-[#008060] border-[1px] bg-white' />
        <input type="text" onChange={(e) => { setTime(e.target.value) }} value={Time} name="Time" id="Time" placeholder='Time' className='p-2 text-xl rounded-4xl bg-white border-[#008060] border-[1px]' />
        <input type="text" onChange={(e) => { setdate(e.target.value) }} value={date} name="date" id="date" placeholder='date' className='p-2 text-xl rounded-4xl bg-white border-[#008060] border-[1px]' />
        <input type="text" onChange={(e) => { set_systolic(e.target.value) }} value={systolic_pressure} name="Systolic" id="Systolic" placeholder='Systolic' className='p-2 text-xl rounded-4xl bg-white border-[#008060] border-[1px]' />
        <input type="text" onChange={(e) => { set_diastolic(e.target.value) }} value={diastolic_pressure} name="Diastolic" id="Diastolic" placeholder='Diastolic' className='p-2 text-xl rounded-4xl bg-white border-[#008060] border-[1px]' />
        <input type="text" onChange={(e) => { setpulse(e.target.value) }} value={pulse} name="Pulse" id="Pulse" placeholder='Pulse' className='p-2 text-xl rounded-4xl bg-white border-[#008060] border-[1px]' />
        <button onClick={() => { saveReading() }} className='rounded-4xl bg-white px-6 py-2 cursor-pointer text-xl border-[#008060] border-[1px]'>Save</button>
      </section>
    </div>
  )
}

export default Home

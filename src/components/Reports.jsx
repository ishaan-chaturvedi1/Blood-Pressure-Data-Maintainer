import React, { useEffect, useState } from 'react'
import Reading from "./Reading"

const Reports = () => {

  const [readings, setreadings] = useState([]);

  useEffect(() => {
      let readings_ls = localStorage.getItem("readings");
      if (readings_ls){
        let main_readings = JSON.parse(readings_ls);
        setreadings(main_readings)
        console.log(main_readings)
      }
  }, [])

  return (
    <div className='flex justify-center items-center m-6'>
        {readings.length<1?<div>No readings to display.</div>:

          <table className='table-auto rounded-md mt-2 overflow-hidden overflow-x-hidden md:max-w-[91%] md:min-w-[91%] w-[99%]'>
              <thead className='bg-[#008060] text-white'>
                <tr>
                  <th className='md:text-lg text-sm'>Patient</th>
                  <th className='md:text-lg text-sm'>Date</th>
                  <th className='md:text-lg text-sm'>Time</th>
                  <th className='md:text-lg text-sm'>Systolic</th>
                  <th className='md:text-lg text-sm'>Diastolic</th>
                  <th className='md:text-lg text-sm'>Pulse</th>
                </tr>
              </thead>
              <tbody className='bg-white'>
                  {readings.map(item => {
                        return <Reading key = {item.id} systolic={item.systolic} diastolic={item.diastolic} time={item.time} date={item.date} pulse={item.pulse} patient={item.patient}/>
                  })}
              </tbody>
          </table>

        }
    </div>
  )
}

export default Reports

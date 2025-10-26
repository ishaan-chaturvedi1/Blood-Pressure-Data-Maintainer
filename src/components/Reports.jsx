import React, { useEffect, useState } from 'react'
import Reading from "./Reading"
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const Reports = () => {

  const [readings, setreadings] = useState([]);

  useEffect(() => {
      let readings_ls = localStorage.getItem("readings");
      if (readings_ls){
        let main_readings = JSON.parse(readings_ls);
        setreadings(main_readings)
      }
  }, [])


    const handleDownloadExcel = () => {
    if (readings.length === 0) return; // safety check

    // Remove 'id' from each object
    const excelData = readings.map(({ id, ...rest }) => rest);

    // Generate worksheet
    const worksheet = XLSX.utils.json_to_sheet(excelData);

    // Create workbook and append sheet
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "sheet1");

    // Generate Excel buffer
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });

    // Convert to Blob and trigger download
    const blob = new Blob([excelBuffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
    saveAs(blob, "Report.xlsx");
  };

  const deletefunction = (id) => {
    let new_readings = readings.filter((item) => {
        return item.id!=id
    })
    console.log(new_readings)
    setreadings(new_readings)
    localStorage.setItem("readings", JSON.stringify(new_readings))
  }



  return (
    <div className='flex justify-center items-center md:p-6 p-2 bg-[#f3f3f6] flex-col'>

        {readings.length<1?<div>No readings to display.</div>:

      <>
       <button onClick={() => {handleDownloadExcel()}} className='text-xs md:ml-13.5 md:text-md  font-bold cursor-pointer self-start bg-[#008060] p-2 rounded-lg px-1 text-white '>Download Excel</button>

          <table className='table-auto rounded-md mt-2 overflow-hidden overflow-x-hidden md:max-w-[91%] md:min-w-[91%] w-[99%]'>
              <thead className='bg-[#008060] text-white'>
                <tr>
                  <th className='md:text-lg px-1 text-sm'>Patient</th>
                  <th className='md:text-lg px-1 text-sm'>Date</th>
                  <th className='md:text-lg px-1 text-sm'>Time</th>
                  <th className='md:text-lg px-1 text-sm'>Systolic</th>
                  <th className='md:text-lg px-1 text-sm'>Diastolic</th>
                  <th className='md:text-lg px-1 text-sm'>Pulse</th>
                  <th className='md:text-lg px-1 text-sm'>Actions</th>
                </tr>
              </thead>
              <tbody className='bg-white'>
                  {readings.map(item => {
                        return <Reading deletefunction={deletefunction} id={item.id} key = {item.id} systolic={item.systolic} diastolic={item.diastolic} time={item.time} date={item.date} pulse={item.pulse} patient={item.patient}/>
                  })}
              </tbody>
          </table>
          </>

        }
    </div>
  )
}

export default Reports

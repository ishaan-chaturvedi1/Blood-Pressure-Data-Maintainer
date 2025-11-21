import React, { useEffect, useState } from 'react'
import Reading from "./Reading"
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { v4 as uuidv4 } from "uuid"

const Reports = () => {

  const [readingListSelected, setReadingListSelected] = useState(1);
  const [readings, setreadings] = useState([]);
  const [numberOfReadings, setNumberOfReadings] = useState(1)

useEffect(() => {
    // ensure the count exists
    const storedCount = localStorage.getItem("numberOfReadings");
    if (!storedCount) {
        localStorage.setItem("numberOfReadings", 1);
        setNumberOfReadings(1);
    } else {
        setNumberOfReadings(Number(storedCount));
    }

    // load correct readings
    const stored = localStorage.getItem("readings" + readingListSelected);
    setreadings(stored ? JSON.parse(stored) : []);
}, [readingListSelected]);


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
  let new_readings = readings.filter((item) => item.id !== id);

  setreadings(new_readings);

  localStorage.setItem(
    "readings" + readingListSelected,
    JSON.stringify(new_readings)
  );
};




  return (
    <div className='flex flex-1 justify-center items-center md:p-6 p-2 bg-[#f3f3f6] flex-col'>
      <form className="space-y-4 m-4">
        <div className="flex gap-2 items-center justify-center">
          {
            Array.from({ length: numberOfReadings }).map((_, index) => {


              return <div key={uuidv4()}> <label htmlFor={`option-${index + 1}`} className="relative">
                <input
                  type="radio"
                  name="choice"
                  id={`option-${index + 1}`}
                  value={index + 1}
                  checked={readingListSelected === index + 1}
                  onChange={(e) => setReadingListSelected(Number(e.target.value))}
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
        </div>
      </form>

      {readings.length < 1 ? <div>No readings to display.</div> :

        <>
          <button onClick={() => { handleDownloadExcel() }} className='text-xs md:ml-13.5 md:text-md  font-bold cursor-pointer self-start bg-[#008060] p-2 rounded-lg px-1 text-white '>Download Excel</button>

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
                return <Reading deletefunction={deletefunction} id={item.id} key={item.id} systolic={item.systolic} diastolic={item.diastolic} time={item.time} date={item.date} pulse={item.pulse} patient={item.patient} />
              })}
            </tbody>
          </table>
        </>

      }
    </div>
  )
}

export default Reports

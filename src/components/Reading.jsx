import React from 'react'

const Reading = (props) => {
  return (
    <tr className=''>
        <td className='max-w-[16.6%] min-w-[16.6%] text-black md:text-lg text-sm text-center'>{props.patient}</td>
        <td className='max-w-[16.6%] min-w-[16.6%] text-black md:text-lg text-sm text-center'>{props.date}</td>
        <td className='max-w-[16.6%] min-w-[16.6%] text-black md:text-lg text-sm text-center'>{props.time}</td>
        <td className='max-w-[16.6%] min-w-[16.6%] text-black md:text-lg text-sm text-center'>{props.systolic}</td>
        <td className='max-w-[16.6%] min-w-[16.6%] text-black md:text-lg text-sm text-center'>{props.diastolic}</td>
        <td className='max-w-[16.6%] min-w-[16.6%] text-black md:text-lg text-sm text-center'>{props.pulse}</td>
    </tr>
  )
}

export default Reading

import React from 'react'
import { useState, useEffect } from 'react'

const Reading = (props) => {
  const [systolic_color, setsystolic_color] = useState("text-black")
  const [diastolic_color, setdiastolic_color] = useState("text-black")
  const [pulse_color, setpulse_color] = useState("text-black")

  useEffect(() => {
    if (props.systolic<90){
      setsystolic_color("text-[#2196F3]")
    }
    else if (props.systolic>90&&props.systolic<121){
      setsystolic_color("text-[#43A047]")
    }
    else if(props.systolic>120 && props.systolic<130){
      setsystolic_color("text-[#FBC02D]")
    }
    else if(props.systolic>=130&& props.systolic<140){
      setsystolic_color("text-[#FFB74D]")      
    }
    else if (props.systolic>=140&&props.systolic<180){
      setsystolic_color("text-[#E53935]")
    }
    else if (props.systolic>=180){
      setsystolic_color("text-[#8E24AA]")
    }

    if(props.diastolic<60){
      setdiastolic_color("text-[#2196F3]")
    }
    else if(props.diastolic>59 && props.diastolic<81){
      setdiastolic_color("text-[#43A047]")
    }
    else if(props.diastolic>80&& props.diastolic<90){
      setdiastolic_color("text-[#FBC02D]")
    }
    else if (props.diastolic>89 && props.diastolic<120){
      setdiastolic_color("text-[#E53935]")
    }
    else if (props.diastolic>=120){
      setdiastolic_color("text-[#8E24AA]")
    }

    if (props.pulse<60){
      setpulse_color("text-[#2196F3]")
    }
    else if (props.pulse>59&& props.pulse<100){
      setpulse_color("text-[#43A047]")
    }
    else if (props.pulse>99 && props.pulse<120){
      setpulse_color("text-[#FBC02D]")
    }
    else if (props.pulse>119 && props.pulse<140){
      setpulse_color("text-[#FB8C00]")
    }
    else if (props.pulse>=140){
      setpulse_color("text-[#E53935]")
    }
  }, [])
  

  return (
    <tr className=''>
        <td className={`max-w-[15%] min-w-[15%] text-black md:text-lg px-1 text-sm text-center`}>{props.patient}</td>
        <td className={`max-w-[25%] min-w-[25%] text-black md:text-lg px-1 text-xs text-center`}>{props.date}</td>
        <td className={`max-w-[10%] min-w-[10%] text-black md:text-lg px-1 text-sm text-center`}>{props.time}</td>
        <td className={`max-w-[12%] min-w-[12%] ${systolic_color} md:text-lg px-1 text-sm text-center font-bold`}>{props.systolic}</td>
        <td className={`max-w-[12%] min-w-[12%] ${diastolic_color} md:text-lg px-1 text-sm text-center font-bold`}>{props.diastolic}</td>
        <td className={`max-w-[12%] min-w-[12%] ${pulse_color} md:text-lg px-1 text-sm text-center font-bold`}>{props.pulse}</td>
        <td className={`max-w-[9%] min-w-[9%] text-black md:text-lg px-1 text-sm text-center font-bold cursor-pointer`} onClick={() => {props.deletefunction(props.id)}}>          <lord-icon className="md:w-7 w-5"
    src="https://cdn.lordicon.com/xyfswyxf.json"
    trigger="hover">
</lord-icon></td>
    </tr>
  )
}

export default Reading

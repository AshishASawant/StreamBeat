import React, { useEffect } from "react";
import { fetchDataFromApi } from "../../utils/movieApi";

const TimeWindowToggle = ({window, url, storage,originalWindow}) => {

  useEffect(() => {
    getToogleData()

    // eslint-disable-next-line
  }, [originalWindow.currentWindow])


  const getToogleData=async()=>{
    let data=await fetchDataFromApi(url)
    storage((prev)=>({...prev,'data':data?.results,}))
  }
  

  return (
    <div className="flex bg-black rounded-full px-1 py-1 relative">
      {window?.map((item,i) => (
        <span key={i}
          className="z-10 md:w-20 w-14 md:text-base text-center text-sm capitalize cursor-pointer"
          onClick={() => storage((prev)=>({...prev,'currentWindow':item}))
        }
        >
          {item}
        </span>
      ))}
      <span
        className={`absolute bg-red-600 md:w-20 w-14 md:h-6 h-5 rounded-full transition-transform duration-300 capitalize ${
          originalWindow.currentWindow !== window[0] ? "md:translate-x-[80px] translate-x-[56px]" : ""
        }`}
      ></span>
    </div>
  );
};

export default TimeWindowToggle;

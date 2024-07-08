import { BeatLoader } from "react-spinners";
import TriangleIcon from "../../../svg/Triangle"
import { useSelector } from "react-redux";



export function Typing({message}) {
    
    
    


  return (
    <div className={`w-full flex mt-2 space-x-3 max-w-xs `}>
        {/**MEssage container */}
        <div>
            <div className={`relative h-full dark:text-dark_text_1 p-2 rounded-lg dark:bg-dark_bg_2`}>
                <p className="float-left h-full text-sm pb-5 pr-8">
                    Typing
                </p>

                {/**Typing animation */}

                <BeatLoader color="#fff" size={10}/>
                
                <span >
                    <TriangleIcon className="dark:fill-dark_bg_2 rotate-[60deg] absolute top-[-5px] -left-1.5"/>
                </span>
             
            </div>
        </div>
    </div>
  )
}

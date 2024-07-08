import moment from "moment/moment"
import  TriangleIcon  from "../../../svg/Triangle"
import { useSelector } from "react-redux";
export function Message({message, me}) {
    const { user } = useSelector(state => state.user);
    const isCurrentUser = message.sender._id === user._id;
  console.log("Message sender ID:", message.sender._id, "Current user ID:", user._id, "Is current user:", isCurrentUser);  // Añade un log para verificar

  return (
    <div className={`w-full flex mt-2 space-x-3 max-w-xs ${me ? "ml-auto justify-end" : " "}`}>
        {/**MEssage container */}
        <div>
            <div className={`relative h-full dark:text-dark_text_1 p-2 rounded-lg ${me ? "bg-green_3" : "dark:bg-dark_bg_2"}`}>
                <p className="float-left h-full text-sm pb-5 pr-8">
                    {message.message}
                </p>
                {/**Fecha de mensaje */}
                <span className="absolute right-1.5 text-xs pt-6 text-dark_text_5 leading-none">
                    {moment(message.createdAt).format("HH:mm")}
                </span>
                {
                    !me ? (
                        <span >
                            <TriangleIcon className="dark:fill-dark_bg_2 rotate-[60deg] absolute top-[-5px] -left-1.5"/>
                        </span>
                    ) : null
                }
            </div>
        </div>
    </div>
  )
}

import { useDispatch, useSelector } from "react-redux"
import { 
  ChatHeader,
  ChatMessages,
  ChatActions 

} from "./index"
import { useEffect } from "react";
import { getConversationMessages } from "../../features/chatSlice";
import { getConversationId, checkOnlineStatus } from "../../utils/chat.utils";


export const ChatContainer = ({onlineUsers, typing}) => {

  const dispatch = useDispatch();

  const {activeConversation, messages} = useSelector((state) => state.chat);
  const {user} = useSelector((state) => state.user);
  const {token} = user;
  const values = {
    token,
    convo_id: activeConversation?._id
  }

  useEffect(()=>{
    if(activeConversation?._id){
      dispatch(getConversationMessages(values));
    }
  },[activeConversation]);

  console.log("messages: ",messages);

  return (
    <div className="realtive w-full h-full border-1 dark:border-1-dark_border_2 select-none overflow-hidden">
        {/**Container */}
        <div>
            {/**chat Header */}
            <ChatHeader 
              online={checkOnlineStatus(
                  onlineUsers, 
                  user, 
                  activeConversation.users
                )}
            />
            {/**Mensajes del chat */}
            <ChatMessages typing={typing}/>
            {/**Acciones del chat */}
            <ChatActions/>
        </div>
    </div>
  )
}

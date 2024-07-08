import React, { useEffect, useState } from 'react'
import { Sidebar } from '../components/sidebar'
import { useDispatch, useSelector } from 'react-redux'
import { getConversations, updateMessagesAndConversations } from '../features/chatSlice';
import { ChatContainer, WhatsappHome } from '../components/Chat';
import SocketContext from '../context/SocketContext';



function Home({socket}) {

  const dispatch = useDispatch();
  
  
  const { user } = useSelector((state) => state.user);
  //const { conversations } = useSelector((state) => state.chat);
  const { activeConversation } = useSelector((state) => state.chat);

  // console.log("conversations: ",conversations);
  // console.log("active conversations: " ,activeConversation);


  const [onlineUsers,setOnlineUsers] = useState([]);
  const [typing,setTyping] = useState(false);



  //join user en el socket

  useEffect(()=>{
    socket.emit('join', user._id);
    //getOnlineUsers
    socket.on('getOnlineUsers', (users) => {
      console.log("online users: ",users);
      setOnlineUsers(users);
    })
  },[user]);
 

  //get conversations
  useEffect(()=>{
    console.log("user",user)
    if(user?.token){
      dispatch(getConversations(user.token));
    }
  },[user]);


  

  // useEffect(() => {
  //   socket.on("receive message", message => {
  //     if(activeConversation._id === message.conversation._id){
  //       dispatch(updateMessagesAndConversations(message));
  //     }
      
  //   });
  // },[])

  useEffect(() => {
    //escucha la recepción del mensaje
    const handleMessage = (message) => {
      if (activeConversation._id === message.conversation._id) {
        dispatch(updateMessagesAndConversations(message));
      }
    };

    socket.on("receive message", handleMessage);
    
    //escucha cuando el usuario tipea
    socket.on("typing", (conversation) => setTyping(conversation));
    socket.on("stop typing", () => setTyping(false));
    
    return () => {
      socket.off("receive message", handleMessage);
    };
  }, [socket, dispatch, activeConversation._id]);


  return (
    <div className="min-h-screen bg-dark_bg_1 flex items-center justify-center overflow-hidden">
      {/**Container */}
      <div className="container h-screen flex py-[19px]">
        {/**Sidebard */}
        <Sidebar 
          onlineUsers={onlineUsers}
          typing={typing}
        />
          {/**  */}
        {
          activeConversation._id ? 
          <ChatContainer 
            onlineUsers={onlineUsers}
            typing={typing}
          /> 
          : 
          <WhatsappHome/>
        }
     
      </div>
    </div>
  )
}

const HomeWithSocket = (props) => {
  return (
    <SocketContext.Consumer>
      {(socket) => <Home {...props} socket={socket} />}
    </SocketContext.Consumer>
  );
}

export default HomeWithSocket
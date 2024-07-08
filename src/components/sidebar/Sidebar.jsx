import { useState } from 'react';
import { SidebarHeader } from "./header";
import Notificactions from "./notifications/Notificactions";

import { Searchbar , SearchResults } from './searchbar/index';
import { Conversations } from './conversations';



export default function Sidebar({onlineUsers, typing}) {

    const [searchResults, setSearchResults] = useState([]);

    


  return (
    <div className="felx0030 max-w-[30%] h-full select-none">
        {/**Sidebar Header */}
        <SidebarHeader/>
        {/**Notificaciones */}
        <Notificactions/>
        {/**Searchbar */}
        <Searchbar 
          searchLenght={searchResults.lenght} 
          setSearchResults={setSearchResults}
        />
        {
          searchResults.length > 0 ? (
          <>
            {/**Search Results */}
            <SearchResults 
              searchResults={searchResults}
              setSearchResults={setSearchResults}
            />
          </>
        ) : (
          <>
            {/**Conversations */}
            <Conversations 
              onlineUsers={onlineUsers}
              typing={typing}
            />
          </>
        )}
        
      
    </div>
  )
}

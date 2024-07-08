import { useSelector } from "react-redux"
import { useState } from "react"
import { Menu } from "./Menu"
import { CommunityIcon, ChatIcon, DotsIcon, StoryIcon } from '../../../svg';


export default function SidebarHeader() {

  const [showMenu,setShowMenu] = useState(false);
  
  const { user } = useSelector((state) => state.user)
  
  return (
    <div className="h-[50px] bg-dark_bg_2 flex items-center p16">
      {/**Container */}
      <div className="w-full flex items-center justify-between">
        {/**User image */}
        <button className="btn">
          <img 
            src={user?.picture} 
            alt={user?.name}
            className="w-full min-w-[50px] max-w-[50px] h-[50px] rounded-full object-cover"          
          />
        </button>
        {/**User Icons */}
        <ul className="flex items-center gap-x-2">
          <li>
            <button className="btn">
              <CommunityIcon className="dark:fill-dark_svg_1"/>
            </button>
          </li>
          <li>
            <button className="btn">
              <StoryIcon className="dark:fill-dark_svg_1"/>
            </button>
          </li>
          <li>
            <button className="btn">
              <ChatIcon className="dark:fill-dark_svg_1"/>
            </button>
          </li>
          <li 
            className="relative"
            onClick={() => setShowMenu((prev) => !prev)}
          >
            <button className={`btn ${showMenu ? "bg-dark_hover_1" : "" } `}>
              <DotsIcon className="dark:fill-dark_svg_1"/>
            </button>
            {
              showMenu ? <Menu/> : null
            }
          </li>
        </ul>
      </div>

    </div>
  )
}

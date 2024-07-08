import { useState } from "react";
import { AttachmentIcon } from '../../../../svg'
import Menu from "./Menu"

export function Attachments({
  showAttachments, 
  setShowAttachments,
  setShowPicker
}) {

  const[show,setShow] = useState(false);

  return (
    <li className="relative">
        <button
          onClick={()=>{
            setShowPicker(false);
            setShowAttachments((prev) => !prev);
          }} 
          type='button'
          className="button btn">
            <AttachmentIcon className="dark:fill-dark_svg_1"/>
        </button>
        {/**Menu */}
        {
          showAttachments ? <Menu/> : null
        }
    </li>
  )
}

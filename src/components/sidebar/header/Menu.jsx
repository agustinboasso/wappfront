import React from 'react';
import {logout} from '../../../features/userSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export const Menu = () => {
    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const handleLogout = () => {
        dispatch(logout());
        navigate('/login'); 
    };
    
    return (
    <div className="absolute right-1 z-50 dark:bg-dark_bg_2 dark:text-dark_text_1 shadow-md w-52">
        <ul>
            <li className="py-3 pl-5 cursor-pointer hover:bg-dark_bg_3">
                <span>Nuevo grupo</span>
            </li>
            <li className="py-3 pl-5 cursor-pointer hover:bg-dark_bg_3">
                <span>Nueva Comunidad</span>
            </li>
            <li className="py-3 pl-5 cursor-pointer hover:bg-dark_bg_3">
                <span>Mensajes Destacados</span>
            </li>
            <li className="py-3 pl-5 cursor-pointer hover:bg-dark_bg_3">
                <span>Congifuraciones</span>
            </li>
            <li 
                className="py-3 pl-5 cursor-pointer hover:bg-dark_bg_3"
                onClick={handleLogout}
            >
                <span>Logout</span>
            </li>
           
        </ul>
    </div>
  )
}

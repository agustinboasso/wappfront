import { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { FilterIcon, ReturnIcon, SearchIcon } from '../../../svg';

export const Searchbar = ({searchLength, setSearchResults}) => {

    const { user } = useSelector((state) => state.user);
    const { token } = user;
    const [show,setShow] = useState(false);

    const handleSearch = async(e) => {
      // console.log(e.target.value);
      // if(e.key === "Enter"){
      //   console.log("presiona enter")
      // }
      if(e.target.value && e.key === "Enter"){
        try {
          const { data } = await axios.get(`http://localhost:8000/api/v1/user?search=${e.target.value}`,{
            headers:{
              Authorization: `Bearer ${token}`
            },
          }
        );
        setSearchResults(data);
        } catch (error) {
          console.log(error);
        }
      } else {
        setSearchResults([]);
      }
    }


  return (
    <div className="h-[49px] py-1.5">
      {/*Container*/}
      <div className="px-[10px]">
        {/*Search input container*/}
        <div className="flex items-center gap-x-2">
          <div className="w-full flex dark:bg-dark_bg_2 rounded-lg pl-2">
            {show || searchLength > 0 ? (
              <span
                className="w-8 flex items-center justify-center rotateAnimation cursor-pointer"
                onClick={() => setSearchResults([])}
              >
                <ReturnIcon className="fill-green_1 w-5" />
              </span>
            ) : (
              <span className="w-8 flex items-center justify-center ">
                <SearchIcon className="dark:fill-dark_svg_2 w-5" />
              </span>
            )}
            <input
              type="text"
              placeholder="Busca o comienza un nuevo chat"
              className="input"
              onFocus={() => setShow(true)}
              //revisar aqui el tema de la flecha boton y el cambio a la lupa
              onBlur={() => {
                if (searchLength === 0) setShow(false);
              }}
              onKeyDown={(e) => handleSearch(e)}
            />
          </div>
          <button className="btn">
            <FilterIcon className="dark:fill-dark_svg_2" />
          </button>
        </div>
      </div>
    </div>
  )
}

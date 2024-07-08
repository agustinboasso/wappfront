import React, { useState } from 'react'
import axios from 'axios'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { signUpSchema } from '../../utils/validation';
import AuthInput from './AuthInput';
import { useDispatch, useSelector } from 'react-redux';
import { PulseLoader } from 'react-spinners'
import { Link, useNavigate } from 'react-router-dom';
import { changeStatus,registerUser } from '../../features/userSlice';
import Picture from './Picture';

const cloud_name = process.env.REACT_APP_CLOUD_NAME;
const cloud_secret = process.env.REACT_APP_CLOUD_SECRET;



const RegisterForm = () => {
  
  const navigate = useNavigate();  
  const dispatch = useDispatch();  
  const { status, error } = useSelector((state) => state.user); 
  
  const [picture,setPicture] = useState(); 
  const [readablePicture, setReadablePicture] = useState("");  


  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },  

  } = useForm({
    resolver: yupResolver(signUpSchema),
  });

  const onSubmit = async (data) => {
    dispatch(changeStatus("loading"));
    if (picture) {
      //upload to cloudinary and then register user
      await uploadImage().then(async (response) => {
        let res = await dispatch(
          registerUser({ ...data, picture: response.secure_url })
        );
        if (res?.payload?.user) {
          navigate("/");
        }
      });
    } else {
      let res = await dispatch(registerUser({ ...data, picture: "" }));
      if (res?.payload?.user) {
        navigate("/");
      }
    }
  };

    console.log(picture, readablePicture)
//   console.log("values", watch);
//   console.log("errors: ", errors)
  
const uploadImage = async () => {
    let formData = new FormData();
    formData.append("upload_preset", cloud_secret);
    formData.append("file", picture);
    const { data } = await axios.post(
      `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
      formData
    );
    return data;
  };

    return (

    <div className="h-screen w-full flex items-center justify-center overflow-hidden">
        {/**Container */}
        <div className="max-w-md space-y-8 p-10 dark:bg-dark_bg_2 rounded-xl">
            {/**Heading */}
            <div className="text-center dark:text-dark_text_1">
                <h2 className="mt-6 text-3xl font-bold">Bienvenido!</h2>
                <p className="mt-2 text-sm">Registrate</p>
            </div>
            {/**Form */}
            <form 
                onSubmit={handleSubmit(onSubmit)}
                className="mt-6 space-y-6"
            >
                <AuthInput
                    name="name"
                    type="text"
                    placeholder="Nombre completo"
                    register={register}
                    error={errors?.name?.message}
                />
                <AuthInput
                    name="email"
                    type="text"
                    placeholder="Dirección de email"
                    register={register}
                    error={errors?.email?.message}
                />
                <AuthInput
                    name="status"
                    type="text"
                    placeholder="Status (Opcional)"
                    register={register}
                    error={errors?.status?.message}
                />
                <AuthInput
                    name="password"
                    type="password"
                    placeholder="Contraseña"
                    register={register}
                    error={errors?.password?.message}
                />
                {/**Picture */}
                <Picture 
                    readablePicture={readablePicture}
                    setReadablePicture={setReadablePicture}
                    setPicture={setPicture}
                />
                {/**Si tienes un error */}
                {
                    error ? <div>
                        <p className="text-red-400">
                            {error}
                        </p>
                    </div> : null
                }
                {/**Submit butto */}
                <button 
                    className="w-full flex justify-center bg-green_1 text-gray-100 p-4 rounded-full tracking-wide font-semibold focus:outline-none hover:bg-green_2 shadow-lg cursor-pointer transition ease-in duration-300"
                    type="submit"
                >
                    {status == "loading" ? (
                        <PulseLoader color="#36d7b7"/>
                        ) : (
                            "Registrate"
                    )}
                    
                </button>
                {/** Sign in link */}
                <p className="flex flex-col items-center justify-center mt-10 text-center text-md dark:text-dark_text_1">
                    <span>Tienes una cuenta?</span>
                    <Link 
                        href="/login"
                        className="hover:underline cursor-pointer transition ease-in duration-300"
                    >
                        Logeate
                    </Link>
                </p>
            </form>   
        </div>
    </div>
  )
}

export default RegisterForm

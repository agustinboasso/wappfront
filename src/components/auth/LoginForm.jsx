import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { signInSchema } from '../../utils/validation';
import AuthInput from './AuthInput';
import { useDispatch, useSelector } from 'react-redux';
import { PulseLoader } from 'react-spinners'
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../../features/userSlice';






const RegisterForm = () => {
  
  const navigate = useNavigate();  
  const dispatch = useDispatch();  
  const { status, error } = useSelector((state) => state.user); 
  
  


  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },  

  } = useForm({
    resolver: yupResolver(signInSchema),
  });

  const onSubmit = async (values) => {
    let res = await dispatch(loginUser({...values}));
    console.log(res)

    if(res?.payload?.user){
      navigate("/");
    }
  };

    
//   console.log("values", watch);
//   console.log("errors: ", errors)
  

    return (

    <div className="h-screen w-full flex items-center justify-center overflow-hidden">
        {/**Container */}
        <div className="max-w-md space-y-8 p-10 dark:bg-dark_bg_2 rounded-xl">
            {/**Heading */}
            <div className="text-center dark:text-dark_text_1">
                <h2 className="mt-6 text-3xl font-bold">Bienvenido de vuelta!</h2>
                <p className="mt-2 text-sm">Logeate</p>
            </div>
            {/**Form */}
            <form 
                onSubmit={handleSubmit(onSubmit)}
                className="mt-6 space-y-6"
            >
                
                <AuthInput
                    name="email"
                    type="text"
                    placeholder="Dirección de email"
                    register={register}
                    error={errors?.email?.message}
                />
                
                <AuthInput
                    name="password"
                    type="password"
                    placeholder="Contraseña"
                    register={register}
                    error={errors?.password?.message}
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
                            "Logeate"
                    )}
                    
                </button>
                {/** Sign in link */}
                <p className="flex flex-col items-center justify-center mt-10 text-center text-md dark:text-dark_text_1">
                    <span>¿No tienes una cuenta?</span>
                    <Link 
                        href="/register"
                        className="hover:underline cursor-pointer transition ease-in duration-300"
                    >
                        Registrate
                    </Link>
                </p>
            </form>   
        </div>
    </div>
  )
}

export default RegisterForm

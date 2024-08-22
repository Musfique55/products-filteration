import { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import googleIcon from '../../../public/google-Bp_336oh.png';

const Registration = () => {
    const {register,google} = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
   
    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value; 
        register(email,password)
        .then(() => {
            navigate(location?.state ? location.state : '/');
        })
        .catch(error => {
            console.log(error);
        })
        
    }

    const handleGoogle = () => {
        google()
        .then(() => {
            navigate(location?.state ? location.state : '/');
        })
        .catch(error => {
            console.log(error);
        })
    }
    return (
        <div className="flex flex-col items-center  border ">
            <div className=" w-2/4 flex flex-col items-center bg-[#F2EEFE] relative">
            <div className="reg-wrapper w-full flex flex-col items-center justify-center min-h-[calc(1024px/3)]">
            </div>
            <div className="bg-white rounded-3xl flex flex-col items-center w-[calc(100%-30px)] mb-5 lg:-mt-[5.25rem]">
                    <h3 className="mt-12 mb-8 text-2xl font-semibold">Sign Up</h3>
                    <form onSubmit={handleSubmit} className="space-y-4 flex flex-col items-center mb-4">
                        <input type="text" name="name" placeholder="Full Name" className="py-2 px-3 rounded-lg bg-[#F0F0F0] border focus:outline-none lg:min-w-[538px]" required/>
                        <input type="email" name="email" placeholder="Email" className="py-2 px-3 rounded-lg bg-[#F0F0F0] border focus:outline-none lg:min-w-[538px]" required/>
                        
                        <input  type="password" name="password" placeholder="Password" className="py-2 px-3 rounded-lg bg-[#F0F0F0] border focus:outline-none lg:min-w-[538px]" required/>
                        <button type="submit" className="bg-[#7B51F1] text-white font-semibold py-2 w-full rounded-lg ">Register</button>
                    </form>
                    <p className="mb-4">OR</p>
                    <button onClick={handleGoogle} className='flex border-2 items-center gap-4 mb-10 justify-center lg:min-w-[538px] py-2'><img className='h-6 w-6' src={googleIcon} />Continue With Google</button>
            </div>
                <p className="font-medium text-lg fixed bg-[#F2EEFE] w-[663px] text-[#5A5C5E] py-3  bottom-0 text-center">
                    Already Have an Account? <Link to={'/login'}><span  className="font-semibold text-black">Sign in</span></Link>
                </p>
            </div>
        </div>
    );
};

export default Registration;
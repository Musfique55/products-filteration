import {  Link, NavLink, useNavigate } from "react-router-dom";
import AxiosPublic from "../../CustomHooks/AxiosPublic";
import { useContext, useState } from "react";
import { AuthContext } from "../../AuthProvider/AuthProvider";


const Header = () => {
    const {user,logout} = useContext(AuthContext);
    const axiosPublic = AxiosPublic(); 
    const navigate = useNavigate();
    const [suggestions,setSuggestions] = useState([]);
    const [values,setValues] = useState('');
    console.log(user);
    const handleSearch = (e) => {
        e.preventDefault();
        const item = e.target.search.value;
        axiosPublic.get(`/search?q=${item}`)
        .then(res => {
            navigate(`/search/${res.data._id}`)
        })
    }  

    const handleSuggestion = (e) => {
        const search = e.target.value;
        setValues(search)
        if(search){
            axiosPublic.get(`/suggestions?q=${values}`)
            .then(res => {
                setSuggestions(res.data)
            })
        }else{
            setValues("");
        }
    }

    const handleLogout = () => {
        logout();
        
    } 
    
    return (
        <div>
            <div className={` w-full`}>
            <div className={`hidden lg:flex lg:justify-between  w-full  bg-white text-black h-32 `}>
                <div className='flex justify-between flex-1 items-center '>
                    <div>
                        <h2 className="text-4xl font-semibold text-black">TokoStore</h2>
                    </div>
                    {/* desktop menu */}
                    <div className="flex gap-6">
                        
                        <div className="relative">
                        <form onChange={handleSuggestion} onSubmit={handleSearch} className="flex">
                            <input type="text" placeholder="Search" name="search" className='w-full border  rounded-l-full p-2 focus:outline-none'/>
                            <button type="submit" className='bg-zinc-800 p-2 font-semibold text-white rounded-r-full'>Search</button>
                        </form>
                        <div className="bg-white absolute z-50 mt-5">
                        {
                            values && suggestions?.map(({productName,_id}) => {
                                return <Link  key={_id}>
                                <div className='bg-white px-5 pt-5 z-50' >
                                <p  className='text-lg font-medium text-black border-b bg-white pb-5 z-50'>{productName}</p>
                            </div>
                            </Link>
                            })
                        }
                        </div>
                        </div>
                    
                    </div>
                    <div>
                        {user?.email ? <button className="bg-zinc-800 font-medium px-4 py-2 rounded-lg text-white" onClick={handleLogout}>Logout</button> : <p>Login</p>}
                    </div>
                </div>
               
            </div>


            <div className="flex flex-col lg:hidden">
                <div className={`flex gap-5 py-8 px-2 items-center  w-full z-50 bg-white text-black`}>
                 
                    {/* mobile menu */}
                       <div>
                       <h2 className="text-xl font-semibold text-black">TokoStore</h2>
                       </div>

                        <div className="relative">
                            <form onChange={handleSuggestion} onSubmit={handleSearch} className="flex">
                                <input type="text" placeholder="Search" name="search" className='w-full border  rounded-l-full p-2 focus:outline-none'/>
                                <button type="submit" className='bg-black p-2 font-semibold text-white rounded-r-full'>Search</button>
                            </form>
                            <div className="bg-white absolute z-50 mt-5">
                            {
                                values && suggestions?.map(({productName,_id}) => {
                                    return <Link  key={_id}>
                                    <div className='bg-white px-5 pt-5 z-50' >
                                    <p  className='text-lg font-medium text-black border-b bg-white pb-5 z-50'>{productName}</p>
                                </div>
                                </Link>
                                })
                            }
                            </div>
                        </div>
                </div>
            </div>
            

        </div>
        </div>
    );
};

export default Header;
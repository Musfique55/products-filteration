import { useEffect, useState } from "react";
import AxiosPublic from "../../CustomHooks/AxiosPublic";
import { Link, useLoaderData, useNavigate } from "react-router-dom";

const Home = () => {
    const axiosPublic = AxiosPublic(); 
    const [data,setData] = useState([]);
    const [category,setCategory] = useState([]);
    const [selected,setSelected] = useState('');
    const [type,setType] = useState('');
    const [currentPage,setCurrentPage] = useState(1);
    const[price,setPrice] = useState(1);
    const [values,setValues] = useState('');
    const [suggestions,setSuggestions] = useState([]);
    const {count} = useLoaderData();
    const productPerPage =  10;
    const totalPage = count / productPerPage;
    const btns = [...Array(totalPage).keys()];
    const navigate = useNavigate();
    
    useEffect(() => {
        
        axiosPublic(`/products?page=${currentPage+1}&size=${productPerPage}&price=${price}&type=${type}&category=${selected}`)
        .then(res => {
            setData(res.data);
        })

    },[axiosPublic,currentPage,selected,type,price])

    useEffect(() => {
        setCurrentPage(0)
    },[selected,price])

    useEffect(() => {
        axiosPublic(`/products`)
        .then(res => {
            setCategory(res.data);
        })
    },[axiosPublic])

    

    const handlePrev = () => {
        if(currentPage > 0) {
            setCurrentPage(currentPage-1)  
        }
    }
    const handleNext = () => {
        if(currentPage < btns.length - 1) {
            setCurrentPage(currentPage+1)  
        }
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

    const handleSearch = (e) => {
        e.preventDefault();
        const item = e.target.search.value;
        axiosPublic.get(`/search?q=${item}`)
        .then(res => {
            navigate(`/search/${res.data._id}`)
        })
    }  
    
    console.log(price);
    return (
        <div>

            <div className="mx-20">
                {/* search suggestions */}
                <form onChange={handleSuggestion} onSubmit={handleSearch}>
                    <input type="text" placeholder="Search" name="search" className='w-full border  lg:w-[500px] rounded-l-xl p-4 focus:outline-none'/>
                    <button type="submit" className='bg-green-500 p-4 text-white rounded-r-xl'>Search</button>
                </form>
                {
                        values && suggestions?.map(({productName,_id}) => {
                            return <Link  key={_id}>
                            <div className='bg-white px-5 pt-5' >
                            <p  className='text-lg font-medium text-black border-b pb-5'>{productName}</p>
                        </div>
                        </Link>
                        })
                }

                <div className="grid grid-cols-4 gap-6 mt-8">
                    <div className="col-span-1 border p-7 rounded-lg">


                        {/* price range */}
                        <div>
                            <h3 className="font-semibold text-lg">Price Range</h3>
                            <input onChange={(e) => setPrice(e.target.value)} value={price} type="range" min="1" max="150"  className="min-slider" id="myRange" ></input>
                           <div className="flex gap-5">
                           <input type="text" value={price} className="w-1/2 border focus:outline-none"/>
                           <input type="text" value={150} className="w-1/2 border focus:outline-none"/>
                           </div>
                        </div>

                        {/* Brand filtering */}
                        <div>
                            <h3 className="font-semibold text-lg mt-3">Brands</h3>

                            {
                                [...new Set(category.map(d => d.brandName))].map((brandName,idx) => {
                                    return (
                                        <Link key={idx} onClick={() => {setSelected(brandName);setType('brand')}}><p className="mt-2">{brandName}</p></Link>
                                    )
                                })
                            }
                        </div>


                        {/* category filtering */}
                        <div>
                            <h3 className="font-semibold text-lg mt-3">Categories</h3>
                            {
                                [...new Set(category.map(d => d.category))].map((category,idx) => {
                                    return (
                                        <Link key={idx} onClick={() => {setSelected(category);setType('category')}}><p className="mt-2">{category}</p></Link>
                                    )
                                })
                            }
                        </div>
                    </div>
                    {/* products */}
                    <div className="col-span-3">
                        <div className="grid grid-cols-4 gap-6">
                        {
                        data.map((d,idx) => {
                            return (
                                <div key={idx} className="flex flex-col mb-5 border rounded-lg p-5 text-center items-center space-y-3 cursor-pointer">
                                    <img src={d.productImage} className="w-[191px] h-[191px] object-cover" alt="perfume" />
                                    <p className="font-semibold text-lg">{d.productName}</p>
                                    <p className="font-medium ">{d.price}$</p>
                                    <p><span className="font-medium">Published:</span> {new Date(d.creationDate).toLocaleDateString()}</p>
                                </div> 
                            )
                        })
                    }
                        </div>
                    </div>
                </div>


                <div>
                    
                </div>
            </div>
           

            <div className="flex justify-center gap-5">
                <button onClick={handlePrev}>Prev</button>
                {
                    btns.map((btn,idx) => {
                        return <button key={idx} onClick={() => setCurrentPage(btn)} className={currentPage === btn ? 'active' : undefined }>{btn+1}</button>
                    })
                }
                <button onClick={handleNext}>Next</button>
            </div>
        </div>
    );
};

export default Home;
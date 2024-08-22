import { useContext, useEffect, useState } from "react";
import AxiosPublic from "../../CustomHooks/AxiosPublic";
import { Link, useLoaderData } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import ReactStars from "react-rating-stars-component";
import { Rating } from "react-simple-star-rating";
import { AuthContext } from "../../AuthProvider/AuthProvider";
const Home = () => {
    const axiosPublic = AxiosPublic(); 
    const [data,setData] = useState([]);
    const [category,setCategory] = useState([]);
    const [selected,setSelected] = useState('');
    const [type,setType] = useState('');
    const [currentPage,setCurrentPage] = useState(1);
    const [price,setPrice] = useState(1);
    const [sorted,setSorted] = useState('');    
    const {count} = useLoaderData();
    const [currentItem,setCurrentItem] = useState([]);
    const productPerPage =  10;
    const totalPage = Math.ceil(count / productPerPage);
    const btns = [...Array(totalPage).keys()];
    
    
    useEffect(() => {
        
        axiosPublic(`/products?page=${currentPage+1}&size=${productPerPage}&price=${price}&type=${type}&category=${selected}&sort=${sorted}`)
        .then(res => {
            setData(res.data);
        })

    },[axiosPublic,currentPage,selected,type,price,sorted])

    useEffect(() => {
        setCurrentPage(0)
    },[selected,price])

    useEffect(() => {
        axiosPublic(`/allproducts`)
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

    const ratingStars = {
        size: 24,
        value: currentItem.ratings,
        edit: false,
        isHalf : true,
        emptyIcon : <i className="far fa-star"></i>,
        halfIcon : <i className="fa fa-star-half-alt"></i>,
        fullIcon : <i className="fa fa-star"></i>,
        activeColor : "#ffd700"
      };

    return (
        <div>

            <div className="mx-5 lg:mx-20">
                <Header></Header>
                {/* search suggestions */}
                

                {/* sorting functionality */}
                <div className="mt-5 text-right">
                        <form >
                        <label htmlFor="sort" className="font-medium">Sort By </label>
                        <select name="sort" onChange={(e) => setSorted(e.target.value)} className="border p-1 focus:outline-none rounded-lg">
                            <option value="" >Default</option>
                            <option value="pricelow" >Price Low to High</option>
                            <option value="pricehigh" >Price High to Low</option>
                            <option value="date" >Newest First</option>
                        </select>
                        </form>
                  
                </div>


                <div className="grid grid-cols-2 gap-6 mt-3 lg:grid-cols-4">
                    <div className="col-span-2 border p-5 rounded-lg lg:p-7 lg:col-span-1">


                        {/* price range */}
                        <div>
                            <h3 className="font-semibold text-lg">Price Range</h3>
                            <input onChange={(e) => setPrice(e.target.value)} value={price} type="range" min="1" max="150"  className="min-slider" id="myRange" ></input>
                           <div className="flex  gap-5 flex-wrap  lg:flex-nowrap">
                           <input type="text" value={price} className="w-1/2 border focus:outline-none"/>
                           <input type="text" value={150} className="w-1/2 border focus:outline-none"/>
                           </div>
                        </div>

                        {/* Brand filtering */}
                        <div>
                            <h3 className="font-semibold text-lg mt-3">Brands</h3>

                            {
                                [...new Set(category?.map(d => d.brandName))]?.map((brandName,idx) => {
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
                                [...new Set(category?.map(d => d.category))]?.map((category,idx) => {
                                    return (
                                        <Link key={idx} onClick={() => {setSelected(category);setType('category')}}><p className="mt-2">{category}</p></Link>
                                    )
                                })
                            }
                        </div>
                    </div>


                    {/* products */}
                    <div className=" col-span-2 lg:col-span-3">
                        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 ">
                        {
                        data?.map((d,idx) => {
                            return (
                                <div key={idx} className="flex flex-col  border rounded-lg p-5 text-center items-center space-y-3 cursor-pointer">
                                    <img src={d.productImage} className="w-[191px] h-[191px] object-cover" alt="perfume" />
                                    <p className="font-semibold text-lg">{d.productName}</p>
                                    <p className="font-medium ">{d.price}$</p>
                                    <p><span className="font-medium">Published:</span> {new Date(d.creationDate).toLocaleDateString()}</p>
                                    <button onClick={()=>{document.getElementById('my_modal_3').showModal();setCurrentItem(d)}} className="bg-black w-full py-2 rounded-2xl text-white font-medium">View</button>
                                </div> 
                            )
                        })
                    }
                        </div>
                    </div>
                </div>

                {/* modal for products details */}
                <div>
                    {/* You can open the modal using document.getElementById('ID').showModal() method */}
                    <dialog id="my_modal_3" className="modal">
                    <div className="modal-box  max-w-2xl">

                        <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                        </form>
                        <div className="flex flex-col gap-10 lg:flex-row">
                            <div className="relative">
                                <img src={currentItem?.productImage} className="w-[300px] h-[200px] object-contain" alt="" />
                                <p className="absolute -top-2 -left-3 bg-zinc-700 text-white px-2 rounded-full">{currentItem.brandName}</p>
                            </div>
                            <div className="space-y-3">
                               <Rating initialValue={currentItem.ratings} SVGstyle={{"display": 'inline'}} readonly={true} allowFraction={true}></Rating>
                                    
                                <h3 className="text-xl font-semibold">{currentItem.productName}</h3>
                                <p className="font-medium">{currentItem.description}</p>
                                <p className="font-semibold text-lg">${currentItem.price}</p>
                            </div>
                        </div>
                    </div>
                    </dialog>
                </div>
            </div>
           
            {/* pagination */}
            <div className="flex justify-center gap-5 mt-10">
                <button onClick={handlePrev}>Prev</button>
                {
                    btns.map((btn,idx) => {
                        return <button key={idx} onClick={() => setCurrentPage(btn)} className={currentPage === btn ? 'active' : undefined }>{btn+1}</button>
                    })
                }
                <button onClick={handleNext}>Next</button>
            </div>

            {/* foooter */}
            <Footer></Footer>
        </div>
    );
};

export default Home;
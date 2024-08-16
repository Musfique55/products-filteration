import { useEffect, useState } from "react";
import AxiosPublic from "../../CustomHooks/AxiosPublic";
import { useLoaderData } from "react-router-dom";

const Home = () => {
    const axiosPublic = AxiosPublic(); 
    const [data,setData] = useState([]);
    const [currentPage,setCurrentPage] = useState(1);
    const {count} = useLoaderData();
    const productPerPage =  10;
    const totalPage = count / productPerPage;
    const btns = [...Array(totalPage).keys()];
    
    useEffect(() => {
        axiosPublic(`/products?page=${currentPage+1}&size=${productPerPage}`)
        .then(res => {
            setData(res.data);
        })
    },[axiosPublic,currentPage])

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
    
    return (
        <div>
            {
                data.map((d,idx) => {
                    return (
                        <p key={idx}>{d.productName}</p>
                    )
                })
            }

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
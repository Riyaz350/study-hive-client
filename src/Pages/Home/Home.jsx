import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import Footer from "../../Shared/Footer";
import Navbar from "../../Shared/Navbar";
import { useEffect, useState } from 'react';
import Review from '../../Components/review';
import Featured from './Featured/Featured';



const Home = () => {



  const [reviews, setReviews] =useState([])
  
  useEffect(()=>{
    fetch('https://assignment-server-sand.vercel.app/reviews')
    .then(res => res.json())
    .then(data => setReviews(data))

  },[])



 

  return (
        <div>
      <Navbar></Navbar>

           <div>
             <div className=" max-w-7xl mx-auto mt-20">
            <div className="carousel max-h-[700px]  rounded-xl">
              <div id="slide1" className="carousel-item relative w-full">
                <img src="https://i.ibb.co/9VjMWPk/Untitled-Export-ZLebldtxs-1.jpg" className="w-full" />
                <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                  <a href="#slide3" className="btn btn-circle">❮</a> 
                  <a href="#slide2" className="btn btn-circle">❯</a>
                </div>
              </div> 
              <div id="slide2" className="carousel-item relative w-full">
                <img src="https://i.ibb.co/RQ9mKSh/image.png" className="w-full" />
                <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                  <a href="#slide1" className="btn btn-circle">❮</a> 
                  <a href="#slide3" className="btn btn-circle">❯</a>
                </div>
              </div> 
              <div id="slide3" className="carousel-item relative w-full">
                <img src="https://i.ibb.co/ccSXd29/image.png" className="w-full" />
                <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                  <a href="#slide2" className="btn btn-circle">❮</a> 
                  <a href="#slide1" className="btn btn-circle">❯</a>
                </div>
              </div>
            </div>
            </div>
  
            
            <Featured></Featured>
  
  
            <div className='p-5 rounded-2xl mb-10 max-h-30 bg-[#92140c] border-black lg:w-1/2 mx-auto cursor-pointer'>
            <h1 className="text-xl lg:text-2xl  bg-[#FFDDB6] px-2 my-2 rounded-lg text-[#92140c] w-fit mx-auto">FAQ</h1>
            <Swiper
          slidesPerView={1}
          spaceBetween={30}
          pagination={{
            clickable: true,
          }}
          modules={[Pagination]}
          className=" "
        >
          <div className='flex flex-col' >
          {
              reviews.map(review =><SwiperSlide className=' mb-10' key={review._id} ><Review  review={review}></Review></SwiperSlide>)
          }
          </div>
          
          
        </Swiper>
            </div> 
           </div>
           <div className=" bottom-0 w-full">
          <Footer></Footer>
          </div>
        </div>
    );
     
        
      
};

export default Home;
import axios from "axios"
import {useContentStore} from "../store/content.js"
import { useEffect, useState, useRef } from 'react';
import {Link} from "react-router-dom"
import {SMALL_IMG_BASE_URL} from ".././utils/constants.js"
import {ChevronLeft, ChevronRight} from "lucide-react"

const MovieSlider = ({category}) => {
  const {contentType} = useContentStore()
  const [content, setContent] = useState([])
  const formattedContentType = contentType === "movie" ? "Movies" : "Tv Shows";
  const formattedCategoryName = category.replaceAll("_", " ")[0].toUpperCase() + category.replaceAll("_", " ").slice(1);
  const [showArrow, setShowArrow] = useState(false)
  
  const sliderRef = useRef(null)
  
  useEffect(() => {
    const getContent = async () => {
      const result = await axios.get(`/api/v1/${contentType}/${category}`)
      setContent(result.data.content)
    }
    
    getContent()
  }, [contentType, category])
  
  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({
        left:-sliderRef.current.offsetWidth, behavior:"smooth"
      })
    }
  }
  const scrollRight = () => {
    sliderRef.current.scrollBy({
        left:sliderRef.current.offsetWidth, behavior:"smooth"
      })
  }
  
  return (
    <div className="text-white bg-black relative px-5 md:px-20 scrollbar-hide"
    onMouseEnter={() => setShowArrow(true)}
    onMouseLeave={() => setShowArrow(false)}
    >
      <h2 className="mb-4 text-2xl font-bold">
       {formattedCategoryName} {formattedContentType}
      </h2>
      
      <div className="flex space-x-4 overflow-x-scroll scrollbar-hide" ref={sliderRef}>
        {content?.map((item) => (
          <Link to={`/watch/${item?.id}`} className="min-w-[250px] relative group" key={item.id}>
            <div className="rounded-lg overflow-hidden">
             <img src={SMALL_IMG_BASE_URL+item?.backdrop_path} alt={item?.name || item.title + "image"}
             className="transition-transform duration-300 ease-in-out group-hover:scale-125"
             />
            </div>
            <p className="mt-2 text-center">{item?.name || item?.title}</p>
          </Link>
          ))}
      </div>
      {showArrow && (
         <>
          <button className="absolute top-1/2 translate-y-1/2 left-5 md:left-24 flex items-center justify-center size-10 rounded-full bg-black bg-opacity-50 hover:bg-opacity-75 text-white z-10 " onClick={scrollLeft}>
           <ChevronLeft size={24}/>
          </button>
          <button className="absolute top-1/2 translate-y-1/2 right-5 md:right-24 flex items-center justify-center size-10 rounded-full bg-black bg-opacity-50 hover:bg-opacity-75 text-white z-10 " onClick={scrollRight}>
           <ChevronRight size={24}/>
          </button>
         </>
        )}
    </div>
  );
}
export default MovieSlider


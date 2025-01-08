import {useParams, Link} from "react-router-dom"
import {useState, useEffect, useRef} from "react"
import {useContentStore} from "../store/content"
import axios from 'axios';
import ReactPlayer from "react-player"
import {ORIGINAL_IMG_BASE_URL, SMALL_IMG_BASE_URL} from "../utils/constants"
import {ChevronLeft, ChevronRight} from "lucide-react"
import Navbar from "../componets/Navbar"
import WatchPageSkeleton from "../componets/skeleton/WatchPageSkeleton"
function formatReleaseDate(date) {
  return new Date(date).toLocaleDateString("id-ID", {
    year: "numeric",
    month: "long",
    day: "numeric"
  })
}

const WatchPage = () => {
    const {id} = useParams()
    const [trailers, setTrailers] = useState([])
    const [currentTrailerIdx, setCurrenTrailersIdx] = useState(0)
    const [loading, setLoading] = useState(true)
    const [content, setContent] = useState({})
    const [similarsContent, setSimilarContent] = useState([])
    const {contentType} = useContentStore()
    
    useEffect(() => {
      
        const getTrailers = async () => {
          try {
            const res = await axios.get(`/api/v1/${contentType}/${id}/trailers`)
            setTrailers(res.data.trailer)
            
          } catch (error) {
            if (error.message.includes("404")) {
              setTrailers([])
            }
            
          }
      }
      getTrailers();
    }, [contentType, id])
    useEffect(() => {
      
        const getSimilarContent = async () => {
          try {
            const res = await axios.get(`/api/v1/${contentType}/${id}/similar`)
            setSimilarContent(res.data.similar)
            
          } catch (error) {
            if (error.message.includes("404")) {
              setSimilarContent([])
            }
            
          }
      }
      getSimilarContent();
    }, [contentType, id])
    useEffect(() => {
      
        const getContentDetails = async () => {
          try {
            const res = await axios.get(`/api/v1/${contentType}/${id}/details`)
            setContent(res.data.details)
            
          } catch (error) {
            if (error.message.includes("404")) {
              console.log(error.message);
              setContent([])
            }
          } finally {
            setLoading(false)
          }
      }
      getContentDetails();
    }, [contentType, id])
    
   const sliderRef = useRef(null)
    const handleNext = () => {
      if(currentTrailerIdx < trailers.length -1) {
        setCurrenTrailersIdx(currentTrailerIdx + 1)
      }
    }
    const handlePrev = () => {
      if(currentTrailerIdx > 0) {
      setCurrenTrailersIdx(currentTrailerIdx - 1)
      }
    }
    
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
  
  if (loading) {
    return (
        <div className="min-h-screen bg-black p-10">
         <WatchPageSkeleton />
        </div>
      )
  }
  
  if (!content) {
    return (
        <div className="bg-black text-white h-screen">
         <div className="max-w-6xl mx-auto">
          <Navbar />
          <div className="text-center mx-auto px-4 py-8 h-full mt-40">
            <h2 className="text-2xl sm:text-5xl font-bold text-balence">NOT FOUMD PAGE</h2>
          </div>
         </div>
        </div>
      )
  }
    
    console.log({trailers});
    console.log({similarsContent});
    console.log({content});
    console.log({currentTrailerIdx});
  return (
     <div className="bg-black min-h-screen text-white">
        <Navbar />
      <div className="mx-auto container px-4 py-8 h-full">
        
        {trailers?.length > 0 && (
          
          <div className="flex justify-between items-center mb-4 mt-2">
           <button className={`bg-gray-500/70 hover:bg-gray-500 text-white py-2 px-4 rounded ${currentTrailerIdx === 0 ? 'opacity-50 cursor-not-allowed' : ""}
           
           `} disabled={currentTrailerIdx === 0}
            onClick={handlePrev}
           >
            <ChevronLeft size={24} 
            />
           </button>
           
           <button className={`bg-gray-500/70 hover:bg-gray-500 text-white py-2 px-4 rounded ${currentTrailerIdx === trailers?.length - 1 ? 'opacity-50 cursor-not-allowed' : ""}
           
           `} disabled={currentTrailerIdx === trailers?.length - 1}
           onClick={handleNext}
           >
            <ChevronRight size={24}
            />
           </button>
          </div>
          )}
          
          <div className="aspect-video mb-8 p-2 sm:px-10 md:px-32 ">
            {trailers?.length > 0 && (
              <ReactPlayer 
               controls={true}
               width={"100%"}
               height={"70vh"}
               className="mx-auto overflow-hidden rounded-lg "
               url={`https://youtube.com/watch?v=${trailers[currentTrailerIdx].key}`}
              />
              )}
              
              {trailers?.length === 0 && (
                <h2 className="text-xl text-center mt-5">
                 No trailers avaliable for{" "}
                 <span className="font-bold text-red-600 ">{content?.title || content?.name}🤡</span>
                </h2>
                )}
          </div>
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-20 max-w-6xl mx-auto">
             <div className="mb-4 md:mb-0 ">
              <h2 className="text-5xl font-bold text-balence">{content?.title || content?.name}</h2>
              <p className="mt-2 text-lg">
               {formatReleaseDate(content?.release_date || content?.first_air_date)} | {" "}
               {content?.adult ? (
                 <span className="text-red-600">18+</span>
                 ) : (
                   <span className="text-green-600">PG-13</span>
                   )}{" "}
              </p>
              <p className="mt-4 text-lg">{content?.overview}</p>
             </div>
             <img src={ORIGINAL_IMG_BASE_URL + content?.poster_path}
             alt="poster-image"
             className="max-h-[600px] rounded-md "
             />
          </div>
          {similarsContent.length > 0 && (
            <div className="mt-12 max-w-5xl mx-auto relative">
             <h3 className="text-3xl font-bold mb-4">
              Similar Movies/Tv Show
             </h3>
             <div className="flex overflow-x-scroll srollbar-hide gap-4 pb-4 group" ref={sliderRef}>
              {similarsContent.map((content) => {
                if (content.poster_path === null) {
                  return null
                }
                return (
               <Link className="w-52 flex-none" to={`/watch/${content.id}`} key={content.id}>
                 <img src={SMALL_IMG_BASE_URL + content.poster_path} alt="img-poster"
                 className="w-full h-auto rounded-md "
                 />
                 <h4 className="mt-2 text-lg font-semibold">
                  {content.title || content.name}
                 </h4>
               </Link>
                  )
              })}
                
            <button className="absolute top-1/2 translate-y-1/2 left-5 md:left-24 flex items-center justify-center size-10 rounded-full bg-black bg-opacity-50 hover:bg-opacity-75 text-white z-10 " onClick={scrollLeft}>
           <ChevronLeft size={24}/>
          </button>
          <button className="absolute top-1/2 translate-y-1/2 right-5 md:right-24 flex items-center justify-center size-10 rounded-full bg-black bg-opacity-50 hover:bg-opacity-75 text-white z-10 " onClick={scrollRight}>
           <ChevronRight size={24}/>
          </button>
          
             </div>
            </div>
            )}
      </div>
     </div>
    )
}

export default WatchPage
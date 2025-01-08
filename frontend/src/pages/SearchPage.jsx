import { useState } from 'react';
import {Link} from "react-router-dom"
import {ORIGINAL_IMG_BASE_URL} from "../utils/constants.js"
import {useContentStore} from "../store/content"
import Navbar from "../componets/Navbar"
import toast from "react-hot-toast"
import axios from 'axios';
import {Search} from "lucide-react"
const SearchPage = () => {
  const [activeTab, setActiveTab] = useState("movie")
  const [searchValue, setSearchValue] = useState("")
  
  const [results, setResults] = useState([])
  const {setContentType} = useContentStore()

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    tab === "movie" ? setContentType("movie") : setContentType("tv")
    setResults([])
  }
  
  const handleSearch = async(e) => {
    e.preventDefault();
    try {
      const res = await axios.get(`/api/v1/search/${activeTab}/${searchValue}`)
      setResults(res.data.content)
    } catch (error) {
      if (error.response.status === 404) {
        toast.error("Nothing found broo")
      } else {
        toast.error("An error occurred, please try again")
      }
    }
  }
  
  console.log({results});
  return (
     <div className="bg-black min-h-screen text-white">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
       <div className="flex justify-center gap-3 mb-4">
        <button className={`py-2 px-4 rounded ${activeTab === "movie" ? "bg-red-600" : "bg-gray-800"} hover:bg-red-700`}
        onClick={() => handleTabClick("movie")}
        >
        Movies
        </button>
        <button className={`py-2 px-4 rounded ${activeTab === "tv" ? "bg-red-600" : "bg-gray-800"} hover:bg-red-700`}
        onClick={() => handleTabClick("tv")}
        >
         Tv Show
        </button>
        <button className={`py-2 px-4 rounded ${activeTab === "person" ? "bg-red-600" : "bg-gray-800"} hover:bg-red-700`}
        onClick={() => handleTabClick("person")}
        >
        Actor
        </button>
       </div>
       
       <form className="flex gap-2 items-stretch mb-8 max-w-2xl mx-auto" onSubmit={handleSearch}>
        <input 
         type="text"
         value={searchValue}
         onChange={(e) => setSearchValue(e.target.value)}
         placeholder={"telusuri untuk " +  activeTab}
         className="w-full p-2 rounded bg-gray-800 text-white"
        />
        <button className="bg-red-600 hover:bg-red-700 text-white p-2 rounded">
         <Search className="size-6"/>
        </button>
       </form>
       
       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
         {results.map((result) => {
           if(!result?.poster_path && !result?.profile_path) return null;
           return (
             <div key={result.id} className="bg-gray-800 p-4 rounded">
             {activeTab === "person" ? (
               <div
               className="flex flex-col items-center"
               >
                <img 
                src={ORIGINAL_IMG_BASE_URL + result.profile_path}
                alt={result?.name}
                className="max-h-96 text-xl font-bold"
                />
                <h2 className="mt-2 text-xl font-bold">{result?.name}</h2>
               </div>
               ) : (
                 <Link to={"/watch/" + result?.id}
               >
                <img 
                src={ORIGINAL_IMG_BASE_URL + result?.poster_path}
                alt={result?.name || result?.title}
                className="w-full h-auto rounded"
                />
                <h2 className="mt-2 text-xl font-bold">{result?.name || result?.title}</h2>
               </Link>
                 )}
             </div>
             )
         })}
       </div>
      </div>
     </div>
    )
}

export default SearchPage
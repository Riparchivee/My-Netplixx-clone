import {Link} from "react-router-dom"
import {useState} from "react"
import {useAuthStore} from "../store/authStore"
import {Search, Menu, LogOut} from "lucide-react"
import {useContentStore} from "../store/content"
const Navbar = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false)
  
  const {user, logout} = useAuthStore()
  
  const togleMobileMenu = () => setMobileMenuOpen(!isMobileMenuOpen)
  
  const {contentType, setContentType} = useContentStore()
  console.log({contentType});
  return (
      <header className="max-w-6xl mx-auto flex flex-wrap items-center justify-between p-4 h-20">
        <div className="flex items-center gap-10 z-50">
         <Link to={"/"}>
          <img src="/netflix-logo.png" alt="avt" className="w-32 sm:w-40"/>
         </Link>
         
         {/*Navvar destop*/}
         <div className="hidden sm:flex gap-2 items-center">
         <Link to={"/"} className="hover:underline " onClick={() => setContentType("movie")}>
          Movie
         </Link>
         <Link to={"/"} className="hover:underline" 
         onClick={() => setContentType("tv")}>
          Tv Show
         </Link>
         <Link to={"/search"} className="hover:underline ">
          search History
         </Link>
         </div>
        </div>
        
        <div className="flex gap-2 items-center z-50">
          <Link to={"/search"}>
            <Search className="size-6 cursor-pointer "/>
          </Link>
          <img src={user.image} alt="avtr" className="h-4 rounded cursor-pointer"/>
           <LogOut className="size-6 cursor-pointer" onClick={logout}/>
           
           <div className="sm:hidden">
            <Menu className="size-6" onClick={togleMobileMenu}/>
           </div>
           
        </div>
        
         {/*Navbar Mobile*/}
        {isMobileMenuOpen && (
          <div className="w-full sm:hidden mt-4 bg-black border rounded border-gray-800 z-50">
            <Link to={"/"}className="block hover:underline p-2" 
            onClick={togleMobileMenu, () => setContentType("movie")}>
            Movies
            </Link>
            <Link to={"/"}className="block hover:underline p-2" 
            onClick={togleMobileMenu, () => setContentType("tv")}>
            TV Show
            </Link>
            <Link to={"/history"}className="block hover:underline p-2" 
            onClick={togleMobileMenu}>
            Search History
            </Link>
          </div>
       )}
         
         
      </header>
    )
}

export default Navbar
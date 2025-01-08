import {fetchFromTmdb} from "../services/tmdb.service.js"
import { User } from "../modules/user.model.js"
export async function searchPerson(req, res) {
  const {query} = req.params
  try {
   const respons = await fetchFromTmdb(`https://api.themoviedb.org/3/search/person?query=${query}&include_adult=false&language=en-US&page=1`)

    if (respons.results.length === 0) {
      return res.status(404).send(null)
    }

    await User.findByIdAndUpdate(req.user._id, {
      $push:{
        searchHistory:{
          id:respons.results[0].id,
          image:respons.results[0].profile_path,
          title:respons.results[0].name,
          searchType:"person",
          createAt: new Date()
        }
      }
    })

    res.status(200).json({
      success:true,
      content:respons.results
    })
  } catch (error) {
   console.log("Error in Search Person controller ", error.message )
    res.status(500).json({
      success:false,
      message:"Internal Server Error"
    })
  }
}

export async function searchMovie(req, res) {
  const { query } = req.params
  try {
   const respons = await fetchFromTmdb(`https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`)

    if (respons.results.length === 0) {
      return res.status(404).send(null)
    }


    await User.findByIdAndUpdate(req.user._id, {
      $push:{
        searchHistory:{
          id:respons.results[0].id,
          image:respons.results[0].poster_path,
          title:respons.results[0].title,
          searchType:"movie",
          createAt: new Date()
        }
      }
    })

    res.status(200).json({
      success:true,
      content:respons.results
    })
  } catch (error) {  
   console.log("Error in Search Movie controller ", error.message )
    res.status(500).json({
      success:false,
      message:"Internal Server Error"
    })
  }
}


export async function searchTv(req, res) {
  const { query } = req.params;

  try {
    const respons = await fetchFromTmdb(`https://api.themoviedb.org/3/search/tv?query=${query}&include_adult=false&language=en-US&page=1`)

    if (respons.results.length === 0) {
      return res.status(404).send(null)
    }


    await User.findByIdAndUpdate(req.user._id, {
      $push:{
        searchHistory:{
          id:respons.results[0].id,
          image:respons.results[0].poster_path,
          title:respons.results[0].name,
          searchType:"tv show",
          createAt: new Date()
        }
      }
    })

    res.status(200).json({
      success:true,
      content:respons.results
    })
  } catch (error) {
    console.log("Error in Search Movie controller ", error.message )
    res.status(500).json({
      success:false,
      message:"Internal Server Error"
    })
  }
}


export async function getSearchHistory(req, res) {
  try {
   res.status(200).json({
      success:true,
      content:req.user.searchHistory
    }) 
  } catch (error) {
    res.status(500).json({
      success:false,
      message:"Internal server error"
    })
  }
}

export async function removeItemFromSearchHistory(req, res) {
  let { id } = req.params;
  id = parseInt(id);
  

  try {
   await User.findByIdAndUpdate(req.user._id, {
      $pull:{
        searchHistory:{id:id}
      },
    })

    res.status(200).json({
      success:true,
      message:"Item removed from searchHistory"
    })
  } catch (error) {
    console.log("Error in removeItemFromSearchHistory controller", error.message)
    res.status(500).json({
      success:false,
      message:"Internal server error"
    })
  }
}

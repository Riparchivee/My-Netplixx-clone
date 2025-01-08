import { fetchFromTmdb } from "../services/tmdb.service.js"

export async function getTrendingTv(req, res) {
  try {
   const data = await fetchFromTmdb("https://api.themoviedb.org/3/tv/popular?language=en-US&page=1")

    const randomTv = data.results[Math.floor(Math.random() * data.results.length )];

    res.json({
      success:true,
      content:randomTv
    })



  } catch (error) {
    console.error(error.message)
   res.status(500).json({
      success:false,
      message:"Faild get randomTv"
    }) 
  }
}


export async function getTvTrailers(req, res) {
 const {id} = req.params;
  try {
    const data = await fetchFromTmdb(`https://api.themoviedb.org/3/tv/${id}/videos?language=en-US`);
    res.json({
      success:true,
      trailer:data.results
    })
  } catch (error) {
    console.log(error.message)
    res.status(500).json({
      success:false,
      message:"Faild to get Tv Trailers"
    })
  }
}

export async function getTvDetails(req, res) {
  const {id} = req.params
 try {
  const data = await fetchFromTmdb(`https://api.themoviedb.org/3/tv/${id}?language=en-US`)
    res.status(200).json({
      success:true,
      details:data
    })

 } catch (error) {
    console.log(error.message)
    res.status(500).json({
      success:false,
      message:"Faild to get tv Details"
    })
 } 
}

export async function getSimilarTv(req, res) {
  const {id} = req.params;
  try {
   const data = await fetchFromTmdb(`https://api.themoviedb.org/3/tv/${id}/similar?language=en-US&page=1`)
  res.status(200).json({
    success:true,
    similar:data.results
  })
  } catch (error) {
    res.status(500).json({
    success:false,
    message:"Faild to get Similar Tv"
  })
  }
}

export async function getTvsByCategory(req, res) {
  const {category} = req.params
  try {
   const data = await fetchFromTmdb(`https://api.themoviedb.org/3/tv/${category}?language=en-US&page=1`)
    res.status(200).json({
      success:true,
      content:data.results
    })
  } catch (error) {
    res.status(500).json({
      success:false,
      message:"Faild to get Tvs by Category"
    })
  }
}

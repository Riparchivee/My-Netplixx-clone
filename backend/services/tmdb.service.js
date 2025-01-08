import axios from 'axios';
import { ENV_VARS } from '../config/envVar.js'

export const fetchFromTmdb = async (url) => {
 
 const options = {
   method: 'GET',
   headers: {
     accept: 'application/json',
     Authorization: 'Bearer ' + ENV_VARS.TMDB_API_KEY
   }
 };

  const respons = await axios.get(url, options)

  if (respons.status !== 200) {
    console.error("Falid to fetch from TMDB API" + respons.statusText)
    
  }
  
  return respons.data;

}

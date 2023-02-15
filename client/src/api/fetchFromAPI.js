import axios from "axios";

const BASE_URL = 'https://deezerdevs-deezer.p.rapidapi.com'

const options = {
    headers: {
      'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY,
      'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com'
    }
};

export const fetchFromAPI = async (url) => {
    try{
        const {data} = await axios.get(`${BASE_URL}/${url}`,options);
        return data;
    }
    catch(e){
        console.log(e);
    }
}
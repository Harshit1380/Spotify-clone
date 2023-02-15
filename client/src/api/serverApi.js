import axios from "axios";

const API = axios.create({baseURL: 'http://localhost:5000'});

API.interceptors.request.use((req) => {
    if(localStorage.getItem("profile")){
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem("profile")).token}`;
    }
    return req;
});

export const signup = (data) =>  API.post(`/user/signup`,data);
export const signin = (data) =>  API.post(`/user/signin`,data);
export const likesong = async (song,navigate) => {
    const {data} = await API.post(`/user/like`,song);
    if(data.message === "connection over"){
        localStorage.clear();
        navigate('/login');
    }else{
        return data;
    }
};

export const addPlaylist = async (playlist,navigate) => {
    const {data} = await API.post('/user/playlist',playlist);
    if(data.message === "connection over"){
        localStorage.clear();
        navigate('/login');
    }else{
        return data;
    }
};

export const updateUser = async (updatedUser,navigate) => {
    const {data} = await API.post('/user',updatedUser);
    if(data.message === "connection over"){
        localStorage.clear();
        navigate('/login');
    }else{
        return data;
    }
}

export const getuser = () => API.get('/user');
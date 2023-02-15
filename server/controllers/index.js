import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import userData from "../models/index.js";

const ValidateEmail = (input) => {
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(input.match(mailformat)){return true;}
    else{return false;}
}

export const signin = async (req,res) => {
    const user = req.body;
    try {
        const existingUser = await userData.findOne({email: user.email});
        if(!existingUser) res.status(404).json({message: "No user exist with those credentials"});
        else{
        const isCorrectPassword = await bcrypt.compare(user.password,existingUser.password);
        if(!isCorrectPassword) res.status(400).json({message: "Incorrect credentials"});
        else {const token = jwt.sign({email: existingUser.email},process.env.TOKEN_CODE,{expiresIn: "1h"});
        res.status(200).json({result: existingUser,token})}};

    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Something went wrong",error});
    }
}


export const signup = async (req,res) => {
    const user = req.body;
    try {
        const existingUser = await userData.findOne({email: user.email});
        if(!ValidateEmail(user.email)) res.status(400).json({message: "Incorrect Email"}); 
        else if(existingUser) res.status(404).json({message: "User already exist with those credentials"});
        else if(user.password !== user.confirmPassword) res.status(400).json({message: "Passwords do not match"});
        else{
            const hashedPassword = await bcrypt.hash(user.password,12);
            console.log(hashedPassword);
            const result = new userData({email: user?.email,password: hashedPassword,username: user?.username,gender:user?.gender,profile:user?.profile,likedSongs: [],playlists: []});
            await result.save();
            const token = jwt.sign({email: user.email},process.env.TOKEN_CODE,{expiresIn: "1h"});
            res.status(200).json({result,token});
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Something went wrong",error});
    }
}

export const likeSong = async (req,res) => {
    const data = req.body;
    try {
        const existingUser = await userData.findOne({email: req.email});
        let songs = existingUser.likedSongs;
        if(songs){
            if(songs.findIndex((song) => song?.key === data?.key)!==-1) songs = songs.filter((song)=>song?.key !== data?.key);
            else songs.push(data);
        }else{
            songs = [data,];
        }
        const result = await userData.findOneAndUpdate({email: req.email},{likedSongs: songs});
        res.status(200).json(result);
    } catch (error) {
        console.log(error);
    }
}

export const addPlaylist = async (req,res) => {
    const data = req.body;
    try {
        const existingUser = await userData.findOne({email: req.email});
        let plays = existingUser?.playlists;
        const updatedPlaylists = [...plays,data];
        const result = await userData.findOneAndUpdate({email: req.email},{playlists: updatedPlaylists});
        res.status(200).json(result);
    } catch (error) {
        console.log(error);
    }
}

export const getUser = async (req,res) => {
    const result = await userData.findOne({email: req.email});
    const token = jwt.sign({email: req.email},process.env.TOKEN_CODE,{expiresIn: "1h"});
    res.status(200).json({result,token});
}

export const updateUser = async (req,res) => {
    const user = req.body;
    if(user){const result = await userData.findOneAndUpdate({email: user.email},user);}
    const token = jwt.sign({email: req.email},process.env.TOKEN_CODE,{expiresIn: "1h"});
    res.status(200).json({result,token})
}
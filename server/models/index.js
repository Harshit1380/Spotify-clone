import mongoose from "mongoose";

const songSchema = mongoose.Schema({
    key: {
        type:String,
        required: [true,"song key cannot be empty"]
    },
    title: {
        type: String,
        required: [true,"Song name cannot be empty"]
    },
    subtitle: String,
    images: String,
    uri: String
});

const playlistSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true,"Playlist name cannot be empty"]
    },
    key: {
        type:String,
        required: [true,"Playlist key cannot be empty"],
    },
    color: {
        type: String,
        default: "#121212"
    },
    songs: [songSchema]
});

const schema = mongoose.Schema({
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: [true,"Account already exist with this email"],
        required: [true,'Email address is required'],
    },
    password: {
        type: String,
        required: [true,"Password cannot be empty"],
    },
    username: {
        type: String,
        required: [true,"Username cannot be empty"],
    },
    gender: String,
    profile: String,
    likedSongs: {
        type: [songSchema],
        default: []
    },
    playlists: {
        type: [playlistSchema],
        default: []
    }
});

const userData = mongoose.model('user',schema);

export default userData;
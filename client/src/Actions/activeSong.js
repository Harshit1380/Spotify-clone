export const setSong = (song) => {
    return {type: "setSong", payload: song};
} 

export const setIsPlaying = (data) => {
    return {type: "isPlaying", payload: data};
}

export const clearSong = () => {
    return {type: "clear"};
}
const reducer = (state = {song: null,isPlaying: false},action) => {
    switch (action.type) {
        case "setSong":
            return {song:action.payload,isPlaying: true};
        case "isPlaying":
            return {...state,isPlaying: action.payload};
        case "clear":
            return {...state,song: null};
        default:
            return state;
    }
};

export default reducer;
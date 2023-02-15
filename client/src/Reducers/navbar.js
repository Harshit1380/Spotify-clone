 const reducer = (state={isOpen: 0,libraryType: "playlists"},action) => {
    switch (action.type) {
        case "libraryType":
            return {...state,libraryType: action.payload};
        case "open":
            return {...state,isOpen: state.isOpen ? 0 : 1};
        default:
            return state;
    }
}

export default reducer;
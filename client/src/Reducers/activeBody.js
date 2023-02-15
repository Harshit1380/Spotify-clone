const reducer = (state="Home",action) => {
    switch (action.type) {
        case "Home":
            return "Home";
        case "Search":
            return "Search";
        case "Your Library":
            return "Your Library";
        case "Liked Songs":
            return "Liked Songs";
        case "queue":
            return "queue";
        default:
            return state;
    }
}

export default reducer;
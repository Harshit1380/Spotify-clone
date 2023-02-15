const reducer = (activeUser = null,action) => {
    switch (action.type) {
        case "auth":
            localStorage.setItem('profile',JSON.stringify({...action?.payload}));
            return action.payload;
        case "set":
            return action.payload;
        case "get": 
            return action.payload;
        default:
            return activeUser;
    }
}

export default reducer;
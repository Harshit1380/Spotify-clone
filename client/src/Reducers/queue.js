const reducer = (state = [],action) => {
    switch (action.type) {
        case "ADD":
            return [...state,action.payload];
        case "APPEND":
            return [...state,...(action.payload)];
        case "CLEAR":
            return [];
        default:
            return state;
    }
};

export default reducer;
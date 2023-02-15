const reducer = (display={library: 'hidden',create: 'hidden',liked: 'hidden'},action) => {
    switch (action.type) {
        case "library":
            return {...display,library: display.library === 'hidden' ? 'visible':'hidden'};
        case "create":
            return {...display,create: display.create === 'hidden' ? 'visible':'hidden'};
        case "liked":
            return {...display,liked: display.liked === 'hidden' ? 'visible':'hidden'};
        default:
            return display;
    }
}

export default reducer;
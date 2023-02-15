export const changeLibraryType = (library) => {
    return {type: "libraryType" , payload: library};
}

export const toggleIsOpen = () => {
    return {type: "open"};
}

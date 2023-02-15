export const add = (songs) => {
    return {type: "ADD",payload: songs};
}

export const append = (songs) => {
    return {type: "APPEND",payload: songs};
}

export const clear = () => {
    return {type: 'CLEAR'};
}
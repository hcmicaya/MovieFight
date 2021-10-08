const debounce = (func, delay = 1000) => {
    let timeoutId;
    return (...args) => {
        if (timeoutId) {
            clearInterval(timeoutId);//resets the time before auto search
        }
        timeoutId = setTimeout(() => {
            func.apply(null, args);//accepts ...args
        }, delay);//proceeds with the search
    };
}

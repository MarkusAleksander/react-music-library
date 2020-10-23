export const updateObject = (oldObject, updatedValues) => {
    return {
        ...oldObject,
        ...updatedValues
    }
}

const request_limit = 10;

export const chunkArray = (myArray, chunk_size) => {
    var results = [];
    var arr = [...myArray];

    chunk_size = chunk_size ? chunk_size : request_limit;

    while (arr.length) {
        results.push(arr.splice(0, chunk_size));
    }

    return results;
}
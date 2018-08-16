export function getFormUrlEncoded(toConvert) {
    const formBody = [];
    for (const property in toConvert) {
        const encodedKey = encodeURIComponent(property);
        const encodedValue = encodeURIComponent(toConvert[property]);
        formBody.push(encodedKey + '=' + encodedValue);
    }
    return formBody.join('&');
}
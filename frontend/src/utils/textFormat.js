export const capitalizeWord = (str) => {
    if (typeof str !== 'string') return ''; 
    if (str && str.length === 0) return str;
    var str_small = str.toLowerCase();
    return str_small.charAt(0).toUpperCase() + str_small.slice(1);
}
  
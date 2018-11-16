// Write a program that accepts one or more numbers as command-line arguments 
// and prints the sum of those numbers to the console (stdout).

const args = Array.prototype.slice.call(process.argv, 2);
const sum = args.reduce((total, cur, index, array) => {
    total += +cur;
    return total;
}, 0);
console.log(sum);

function euler5(num) {
    const mults = []; //create an empty array name called mults.
    
    for(let i = 1; i <= num; i++) { //loop through the numbers starting from 1
        let newMult = i; //discard the number in which we circulate the variable newMult
        mults.forEach(function(mult) { //will traverse the array of mults with the forEach return
            if(newMult % mult == 0) { //check if the number is divisible by the number in the array
                newMult /= mult; //if it is, divide the number by the number in the array
            }
        })
        mults.push(newMult); //push the number in the array
    }
    return mults.reduce((nmbr = 1, mult) => nmbr *= mult); //reduce the array to the nmbr of all the numbers
}
console.log(euler5(20));
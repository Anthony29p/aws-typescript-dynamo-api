
const luhnAlgorithm =(card_number:number) =>{
    var sum = 0;
    const sNumber = card_number.toString()

    for (var i = 0, len = sNumber.length; i < len; i += 1) {
        var num = Number(sNumber.charAt(i));

        if(i%2===0){
            num *= 2
        }
        sum += num;
    }

    return(sum%10===0)
}

const cardValidation = (card_number:any) => {
    
    return(Number.isInteger(card_number) && Math.pow(10,13)<card_number && card_number<Math.pow(10,17))
}

const cvvValidation = (cvv:any) => {
    
    return(Number.isInteger(cvv) && Math.pow(10,3)<cvv && cvv<=Math.pow(10,4))
}

const monthValidation = (month:any) => {
    
    return(typeof month === 'string' && 0<Number(month) && Number(month)<=12)
}

const yearValidation = (year:any) => {
    let fecha = new Date();
    let año = fecha.getFullYear()
    return(typeof year === 'string' && año<Number(year) && Number(year)<=año+5)
}
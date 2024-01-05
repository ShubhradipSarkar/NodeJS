function add(a:number, b:number):number{
    return a+b;
}

function sub(a:number, b:number):number{
    return a-b;
}

function div(a:number, b:number):number|string{
    if(b===0) return "Infinity";
    else return (a/b);
}

function mul(a:number, b:number):number{
    return a*b;
}

module.exports={add, sub, div, mul};
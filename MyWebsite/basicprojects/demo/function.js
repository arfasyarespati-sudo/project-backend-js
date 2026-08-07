
function fun1(callback){
    setTimeout(() => {console.log('hahaah'); callback()}, 3000);
}

function fun2(){
    console.log('hay');
    console.log('ya betul');
    console.log('yeah');
}

fun1(fun2);

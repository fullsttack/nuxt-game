// // importScripts('/vendor/jquery-3.6.4.slim.min.js');
// self.addEventListener('message', function(e) {
//     console.log("In worker (public): received data: "+ e.data)
//     let sum = countSum(e.data)
//     let message = 'In worker (public): The sum of 1 to ' + e.data + ' is ' + sum
//     console.log(message)
//     self.postMessage(sum)
// }, false);
var i = 0;

function timedCount() {
    i = i + 1;
    postMessage(i);
    setTimeout("timedCount()",500);
}

timedCount();
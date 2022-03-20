var handlers = [
    (res=>{
    console.log('Harshit success');
    console.log(res);
}),
(err => {
    console.log('Harshit Error');
    console.log(err);
})
];

module.exports = handlers;
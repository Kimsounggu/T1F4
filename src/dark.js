
// 다크모드
let Body = {
setcolor:function(color){
  document.querySelector('body').style.color = color;
},
setbackgroundcolor:function(color){
  document.querySelector('body').style.backgroundColor = color;
}
}
function nightdayhandler(self){
if(document.getElementById('darkMode').value === 'night'){
 Body.setbackgroundcolor('black');
 Body.setcolor('white');
 self.value ='day'
}else{
Body.setbackgroundcolor('white');
Body.setcolor('black');
self.value ='night'
}
}



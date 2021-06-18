
let rightarrow=document.querySelector('.right');
let leftarrow=document.querySelector('.left');
let imggal=document.querySelector('#portfolio')
let popdiv=document.querySelector('#popup');
let image=document.querySelectorAll('#imgflex img');
let close=document.querySelector('#popup .close');
let travimg=document.querySelectorAll('#imgflex .landscapes');
let mobimg=document.querySelectorAll('#imgflex .mobile');
let themeimg=document.querySelectorAll('#imgflex .theme');
let commimg=document.querySelectorAll('#imgflex .commercial');
let popp=document.querySelector('#popup img');
let blurr=document.querySelectorAll("#navbar,#contact,#about,#landing, .showcase, #footer, #social, #portfolio");
// alert(contact.length);

 var travimgsrc= [];
travimg.forEach(trav => travimgsrc.push(trav.getAttribute("src")));
 var mobimgsrc= [];
mobimg.forEach(trav => mobimgsrc.push(trav.getAttribute("src")));
 var themeimgsrc= [];
themeimg.forEach(trav => themeimgsrc.push(trav.getAttribute("src")));
 var commimgsrc= [];
commimg.forEach(trav => commimgsrc.push(trav.getAttribute("src")));
// alert(travimgsrc[0]);

image.forEach(pic => pic.addEventListener('click',()=>
{
 
    popp.setAttribute("src",pic.getAttribute("src"));
    popp.setAttribute("class",pic.getAttribute("class"));
    // alert(popp.getAttribute('class'));
    
    popdiv.setAttribute("style","display:flex");
    imggal.setAttribute("style","filter:blur(5px)");
    blurr.forEach(i=> i.setAttribute("style","filter:blur(5px)"));
      //  blurr.setAttribute();
    
  
}));

rightarrow.addEventListener('click',()=>{
// alert(popp.getAttribute('class'));
var currentclass=popp.getAttribute("class");
var currentimg= popp.getAttribute("src");

if(currentclass=="landscapes"){
  var index=travimgsrc.indexOf(currentimg);
  if(index>=travimgsrc.length-1) index=-1;
  index++;
  popp.setAttribute("src",travimgsrc[index]);
}
if(currentclass=="theme"){
  var index=themeimgsrc.indexOf(currentimg);
  if(index>=themeimgsrc.length-1) index=-1;
  index++;
  popp.setAttribute("src",themeimgsrc[index]);
}

if(currentclass=="mobile"){
  var index=mobimgsrc.indexOf(currentimg);
  if(index>=mobimgsrc.length-1) index=-1;
  index++;
  popp.setAttribute("src",mobimgsrc[index]);
}
if(currentclass=="commercial"){
  var index=commimgsrc.indexOf(currentimg);
  if(index>=commimgsrc.length-1) index=-1;
  index++;
  popp.setAttribute("src",commimgsrc[index]);
}

});

leftarrow.addEventListener('click',()=>{
  var currentclass=popp.getAttribute("class");
  var currentimg= popp.getAttribute("src");
  var index=travimgsrc.indexOf(currentimg);
  if(currentclass=='landscapes'){
    var index=travimgsrc.indexOf(currentimg);
    if(index<=0) index=travimgsrc.length;
    index--;
    popp.setAttribute("src",travimgsrc[index]);
    
  }
  if(currentclass=='theme'){
    var index=themeimgsrc.indexOf(currentimg);
    if(index<=0) index=themeimgsrc.length;
    index--;
    popp.setAttribute("src",themeimgsrc[index]);
    
  }
  if(currentclass=='mobile'){
    var index=mobimgsrc.indexOf(currentimg);
    if(index<=0) index=mobimgsrc.length;
    index--;
    popp.setAttribute("src",mobimgsrc[index]);

    
  }
  if(currentclass=='commercial'){
    var index=commimgsrc.indexOf(currentimg);
    if(index<=0) index=commimgsrc.length;
    index--;
    popp.setAttribute("src",commimgsrc[index]);

    
  }
 
});
close.addEventListener('click',()=>{
popdiv.setAttribute("style","display:none");
imggal.setAttribute("style","filter:blur(0px)");
});




$('a').on('click',function(e){
    
  if(this.hash!=='')
  {
      e.preventDefault();
      hash=this.hash;
      $('html,body').animate({
          scrollTop: $(hash).offset().top
      },1000)
  }
});
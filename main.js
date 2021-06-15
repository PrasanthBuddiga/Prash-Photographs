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

let popdiv=document.querySelector('#popup')
let image=document.querySelectorAll('#imgflex img');
image.forEach(pic => pic.addEventListener('click',()=>
{
    // pic.classList.toggle('active');
    var popp=document.querySelector('#popup img');
    popp.setAttribute("src",pic.src);
    popdiv.setAttribute("style","display:flex");
    console.log(pic.src);
}));
popdiv.addEventListener('click',()=>{
popdiv.setAttribute("style","display:none");
});
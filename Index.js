document.addEventListener ("DOMContentLoaded",fetchingAnime)
function fetchingAnime(){
    fetch("http://localhost:3000/anime") 
    .then(responce=>responce.json())
    .then(data=>{
        const genre=document.getElementById("genre")
        genre.innerHTML="";
        data.forEach(anime => {
            
            const span =document.createElement("span")
            span.textContent=anime.name;
            span.style.cursor="pointer"
            span.addEventListener("click",()=>showAnimeDescription(anime));
            genre.appendChild(span)
        });
    })
    .catch(error=>console.log("Anime not fetched:",error));
}
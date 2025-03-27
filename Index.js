// Store anime data
document.addEventListener("DOMContentLoaded",()=>{
    fetchAnimeData()
})
let animeData = {}; 
function fetchAnimeData() {
    fetch("http://localhost:3000/anime") 
        .then(response => response.json()) 
        .then(data => {
            animeData = data.anime;
            showGenres(Object.keys(animeData))  
        })
        .catch(error => console.error("Error fetching anime:", error))
}
 
function  showGenres(genres){
    const genreContainer= document.getElementById("genreContainer")
    genreContainer.innerHTML="";
    genres.forEach(genre => {
        const button=document.createElement("button")
        button.textContent=genre;
        button.classList.add("genreButton")
        button.addEventListener("click",()=>showAnimeTitles(genre))
        genreContainer.appendChild (button)
        
    });
}

document.getElementById ("watchlist").addEventListener("submit",(event)=>{
    event.preventDefault()
})
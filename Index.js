let animeData = {}; // Store anime data
document.addEventListener("DOMContentLoaded", function () {
    fetch("http://localhost:3000/anime") 
        .then(response => response.json()) 
        .then(data => {
            animeData = data.anime;  
        })
        .catch(error => console.log("Error fetching anime:", error))
})
 

document.getElementById ("watchlist").addEventListener("submit",(event)=>{
    event.preventDefault()
})
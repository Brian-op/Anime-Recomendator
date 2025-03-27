// Store anime data
let animeData = {}; 
document.addEventListener("DOMContentLoaded",()=>{
    fetchAnimeData()

    function fetchAnimeData() {
     fetch("http://localhost:3000/anime") 
        .then(response => response.json()) 
        .then(data => {
            animeData = data;

            console.log(Object.keys(animeData));
            
            showGenres(Object.keys(animeData))  
        })
         .catch(error => console.error("Error fetching anime:", error))
    }
})
 
function  showGenres(genres){
    console.log(genres);
    
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

function showAnimeTitles(genre){
    console.log(showAnimeTitles);

    const animeList=document.getElementById("animeList")
    animeList.innerHTML="";
    const animeTitles= animeData[genre]?.titles||{}
    
    Object.keys(animeTitles).forEach(title=>{
        const listItem=document.createElement("li")
        listItem.textContent=title;
        listItem.classList.add("anime-title")
        listItem.addEventListener("click",()=>animeDescription(title,genre))
        animeList.appendChild(listItem);
    })
}
function animeDescription(title, genre){
    console.log(animeDescription);
    
    const descriptionId= document.getElementById("description")
    descriptionId.textContent=animeData[genre].titles[title]
}
//CURD
//Updating
const updateButton = document.createElement("button")
updateButton.textContent="Update"
updateButton.onclick=()=>updateAnimeDescription(title, genre)

//Deleting
const deleteButton = document.createElement("delete")
deleteButton.textContent="Delete"
deleteButton.onclick=()=>deleteAnime(title, genre)


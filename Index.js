// Store anime data
let animeData = {}; 

document.addEventListener("DOMContentLoaded",()=>{
    fetchAnimeData()

    function fetchAnimeData() {
     fetch("https://phase1-backend-server.vercel.app/anime") 
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
    
    const genreContainer= document.getElementById("genreContainer");
    console.log(genreContainer);
    
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
    console.log(`Showing titles for genre:${genre}`);

    const animeList=document.getElementById("animeList")
    animeList.innerHTML="";

    const animeTitles= animeData[genre]?.titles || {}
    
    Object.keys(animeTitles).forEach(title=>{
        const listItem=document.createElement("li")
        listItem.textContent=title;
        listItem.classList.add("anime-title")
        listItem.addEventListener("click",()=>animeDescription(title,genre))
       animeList.appendChild(listItem);
        
      //CRUD buttons
      //Updating
       const updateButton = document.createElement("button")
      updateButton.textContent="Update"
      updateButton.onclick=()=>updateAnimeDescription(title, genre)

      //Deleting
      const deleteButton = document.createElement("button")
      deleteButton.textContent="Delete"
      deleteButton.onclick=()=>deleteAnime(title, genre)
 
      listItem.appendChild(updateButton)
      listItem.appendChild(deleteButton)
      animeList.appendChild(listItem)
    })
    animeList.appendChild(createAnimeForm(genre))
}
 
  function createAnimeForm(genre){
    const animeForm = document.createElement("form")
    animeForm.innerHTML=`
     <input type ="text" name="newAnimeGenre" placeholder="New Anime Genre" required>
    <input type ="text" name="newAnimeTitle" placeholder="New Anime Title" required>
    <input type ="text" name="newAnimeDescription" placeholder="Include a Brief Description" required>
    <button type="submit">Add Anime</button>
    <input type ="text" name="newAnimeImage" placeholder="Provide an Image URL" required>
    <button type="submit">Add Anime</button>
    `;

  animeForm.onsubmit=(event)=>{
    event.preventDefault();
    const titleInput=animeForm.querySelector("[name='newAnimeTitle']").value.trim();
    const descriptionInput = animeForm.querySelector("[name='newAnimeDescription']").value.trim() ;
    const title= titleInput.value.trim();
    const description= descriptionInput.value.trim();

    if (title && description) {
       if(!animeData[genre]){
        animeData[genre]={titles:{}};
       }
    
        animeData[genre].titles[title] ={description,image:""};
        showAnimeTitles(genre)
        titleInput.value="";
        descriptionInput.value="";
    }
 };
 
  return animeForm;
}

 //updating anime description
 function updateAnimeDescription(title, genre) {
    const newDescription= prompt(`Update description for ${title}:`,animeData[genre]?.titles[title]?.description);
    if(newDescription !== null && newDescription.trim()!==""){
        animeData[genre].titles[title].description=newDescription;
        animeDescription(title, genre)
    }}
 //delete 
 function deleteAnime(title,genre){
    if(confirm(`Are you sure you want to delete ${title}?`)){
        delete animeData[genre].titles[title];
        showAnimeTitles(genre)
    }
 }

 function animeDescription(title, genre){
    console.log(`Showing anime description for:${title}`);
   const animeInfo = animeData[genre]?.titles[title];
   
   if (animeInfo){
    const descriptionId = document.getElementById("description")
    descriptionId.textContent =animeInfo.description
    console.log(animeDescription);
    const image = document.getElementById("animeImage")
    image.src =animeInfo.image
   }
   
  }
  

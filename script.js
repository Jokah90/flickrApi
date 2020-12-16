const key = "51444c1c092948d36d530fdf66473531";
const form = document.querySelector('#input-box');
const searchTerm = document.querySelector('#search');
let btn = document.getElementById('cta-btn');
let overlay = document.getElementById('overlay');
const img = document.querySelector('#img');


form.addEventListener('submit', e => {
    e.preventDefault();
    console.log(searchTerm.value);
    getData(searchTerm.value);
});

async function getData(query) {
    try {
        overlay.innerHTML = null; //Clearar tidigare resultat
        const API_URL = `https://www.flickr.com/services/rest/?api_key=${key}&method=flickr.photos.search&text=${query}&sort=relevance&per_page=1&page=6&format=json&nojsoncallback=1`;
        const response = await fetch(API_URL);
        const data = await response.json();
        console.log(data)

        showPhotos(data.photos.photo);

    } catch (err) {
        console.log(err);
        //meddela användare att ett fel har inträffat.
    }
}
 
function showPhotos(photos) {
    photos.forEach(value => {
        figUrl = `https://farm${value.farm}.staticflickr.com/${value.server}/${value.id}_${value.secret}_m.jpg`;
        console.log(figUrl);

      
  

        let template = `
            <article>
                <figure id="fig">
                    <img id="img" src="${figUrl}" alt="${value.title}"></img>
                </figure>
            </article>
        `;
        overlay.innerHTML += template; //La in article i template så man slipper ha en extra kodrad och skapar dem på detta vis för att slippa alla AdjacentHTML
     
    
        
    });

    let exitBtn = `<button id="exit" class="exit-button"><p>X</p></button>`; //Skapa upp exitknapp
    overlay.innerHTML += exitBtn; //Släng med den i HTML
    document.getElementById('exit').addEventListener('click', exit); //Lägg på eventLyssnare för att nå funktionen
    let img = document.getElementById('img')
    img.addEventListener('click', () => {
        showImage(img);
    });
}

// lyssnar efter ett click och animerar en overlay, grid i js
btn.addEventListener('click', () => {
    overlay.style.display = ('grid');
    overlay.classList.add('animate-overlay')
});

//Func som tar bort className från overlay, så att det inte längre syns
const exit = () => {
    overlay.classList.remove('animate-overlay'); 
}

let showImage = (overlay) => {
    overlay.classList.add('animate-overlay'); 
}







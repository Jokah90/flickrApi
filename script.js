const key = "51444c1c092948d36d530fdf66473531";
const form = document.querySelector('#input-box');
const searchTerm = document.querySelector('#search');
let startBtn = document.getElementById('start-btn');

form.addEventListener('submit', e => {
    e.preventDefault();
    console.log(searchTerm.value);
    getData(searchTerm.value);
});

async function getData(query) {
    try {

        const API_URL = `https://www.flickr.com/services/rest/?api_key=${key}&method=flickr.photos.search&text=${query}&per_page=2&page=6&format=json&nojsoncallback=1`;
        const response = await fetch(API_URL);
        const data = await response.json();
        console.log(data)

        showPhotos(data.photos.photo);

    } catch (err) {
        console.log(err);
        //meddela användare att ett fel har inträffat.
    }

}

let overlay = document.getElementById('overlay');
startBtn.addEventListener('click', () => {
    overlay.style.display = 'grid';
})

function showPhotos(photos) {

    photos.forEach(value => {
        figUrl = `https://farm${value.farm}.staticflickr.com/${value.server}/${value.id}_${value.secret}_m.jpg`;
        console.log(figUrl);

        let art = document.createElement('article');
        startBtn.addEventListener('click', () => {
    
        })
        let template = `
            <figure>
                <img src="${figUrl}" alt="${value.title}"></img>
            </figure>
            
            `;
            


        art.insertAdjacentHTML('afterbegin', template)
        document.querySelector('main').appendChild(art)
    });
    
}








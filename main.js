
const search = document.querySelector('.search-box button');
const container = document.querySelector('.container');
const mainBox = document.querySelector('.main-box');
const error404 = document.querySelector('.not-found');
const apiresults = document.querySelector('.main-box .results');
search.addEventListener('click', ()=> {

    const city = document.querySelector('.search-box input').value;
    if (city === '')
        return;

    const paylaod = {
        urls: city
    }
    
    fetch('https://django-favihash.up.railway.app/api/v1/get_hash/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({urls : city}),
    })
    .then((response) => response.json())
    .then((json) => {
        if (json.failed === 'there was an error to generating hash') {
            container.style.height = '450px';
            error404.style.display = 'block';
            error404.classList.add('fadeIn');
            return;
        } else {
            apiresults.innerHTML = `http.favicon.hash:${parseInt(json.hash)}`;
            console.log(json)
            mainBox.style.display = '';
            mainBox.classList.add('fadeIn');
            container.style.height = '200px';
        }

        error404.style.display = 'none';
        error404.classList.remove('fadeIn');

        
    });

})
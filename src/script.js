const gallery = document.getElementById('gallery');
const loadMoreBtn = document.getElementById('loadMore');
const clearGalleryBtn = document.getElementById('clearGallery');
const removeLastBtn = document.getElementById('removeLast');
const reverseGalleryBtn = document.getElementById('reverseGallery');
const shuffleGalleryBtn = document.getElementById('shuffleGallery');

let page = 1;
let images = [];

async function loadImages(count = 4) {
    try {
        const response = await fetch(`https://picsum.photos/v2/list?page=${page}&limit=${count}`);
        const data = await response.json();
        data.forEach(img => images.push(img));
        displayImages(data);
        page++;
    } catch (error) {
        console.error('Помилка завантаження картинок:', error);
    }
}

function displayImages(imgArray) {
    imgArray.forEach(img => {
        const imgElement = document.createElement('img');
        imgElement.src = `https://picsum.photos/id/${img.id}/300/200`;
        imgElement.alt = img.author;
        gallery.appendChild(imgElement);
    });
}

function clearGallery() {
    gallery.innerHTML = '';
    images = [];
}

function removeLast() {
    if (gallery.lastChild) {
        gallery.removeChild(gallery.lastChild);
        images.pop();
    }
}

function reverseGallery() {
    images.reverse();
    gallery.innerHTML = '';
    displayImages(images);
}

function shuffleGallery() {
    for (let i = images.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [images[i], images[j]] = [images[j], images[i]];
    }
    gallery.innerHTML = '';
    displayImages(images);
}

window.addEventListener('DOMContentLoaded', () => loadImages());

loadMoreBtn.addEventListener('click', () => loadImages());
clearGalleryBtn.addEventListener('click', clearGallery);
removeLastBtn.addEventListener('click', removeLast);
reverseGalleryBtn.addEventListener('click', reverseGallery);
shuffleGalleryBtn.addEventListener('click', shuffleGallery);


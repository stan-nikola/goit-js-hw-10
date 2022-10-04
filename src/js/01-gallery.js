// Add imports above this line
import { galleryItems } from './gallery-items';
// Change code below this line
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const galleryContainer = document.querySelector('.gallery');

function createGalleryMarkup(galleryItems) {
  return galleryItems
    .map(({ preview, original, description }) => {
      return `
    <div class="gallery__item">
    <a class="gallery__link"  href="${original}">
    <img loading="lazy" class="gallery__image lazyload" data-source="${original}" data-src="${preview}" alt="${description}"></img>
    </a>
    </div>
    `;
    })
    .join('');
}
galleryContainer.innerHTML = createGalleryMarkup(galleryItems);

new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
  alertErrorMessage:
    'Изображение не найдено, будет загружено следующее изображение',
  disableRightClick: true,
});

// ================================================================
const lazyImage = document.querySelectorAll('img[data-src]');

lazyImage.forEach(image => {
  image.addEventListener('load', onImageLoad, { once: true });
});

function onImageLoad(evt) {
  console.log('Image loaded');
  evt.target.classList.add('appear');
}

if ('loading' in HTMLImageElement.prototype) {
  console.log('Браузер поддерживает lazyload ');
  addLazyImagesSrc();
} else {
  console.log('Браузер не поддерживает lazyload ');
  addLazyLoadingScript();
}

function addLazyImagesSrc() {
  const lazyImages = document.querySelectorAll('img[loading="lazy"]');
  lazyImages.forEach(img => {
    img.src = img.dataset.src;
  });
}

function addLazyLoadingScript() {
  const script = document.createElement('script');
  script.src =
    'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
  script.integrity =
    'sha512-q583ppKrCRc7N5O0n2nzUiJ+suUv7Et1JGels4bXOaMFQcamPk9HjdUknZuuFjBNs7tsMuadge5k9RzdmO+1GQ==';
  script.crossOrigin = 'anonymous';
  script.referrerPolicy = 'no-referrer';

  document.body.appendChild(script);
}

import { galleryItems } from "./gallery-items.js";
// Change code below this line

const galleryRef = document.querySelector(".gallery");
const markup = createMarkup(galleryItems);

galleryRef.insertAdjacentHTML("beforeend", markup);
galleryRef.addEventListener("click", onGalleryClick);

function createMarkup(galleryItems) {
  return galleryItems
    .map(
      ({ preview, original, description }) => `<div class="gallery__item">
    <a class="gallery__link" href="large-image.jpg">
      <img
        class="gallery__image"
        src="${preview}"
        data-source="${original}"
        alt="${description}"
      />
    </a>
  </div>`
    )
    .join("");
}

function onGalleryClick(event) {
  event.preventDefault();

  const targetElement = event.target.classList.contains("gallery__image");
  if (!targetElement) {
    return;
  }

  const originImage = event.target.dataset.source;

  showModal(originImage);
}

function showModal(urlImage) {
  const modal = basicLightbox.create(`
    <img src="${urlImage}" width="800" height="600">
`);

  modal.show(() => window.addEventListener("keydown", closeModalByEsc));

  function closeModalByEsc(event) {
    if (event.code === "Escape") {
      modal.close(() => window.removeEventListener("keydown", closeModalByEsc));
    }
  }
}

import fetch from "node-fetch";

const api_key = "2a8cf44357a719b5c5a67ef8134cb474";
const tags = "aurora, borealis";
const per_page = "10";

//Fetch photos from Flickr api
export const getPhotos = async () => {
  return new Promise((resolve, reject) => {
    fetch(
      `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${api_key}&tags=${tags}&sort=relevance&per_page=${per_page}&format=json&nojsoncallback=1`
    )
      .then((response) => response.json())
      .then((data) => {
        let photoUrls = [];
        data.photos.photo.forEach((url) => {
          photoUrls.push(getPhoto(url));
        });
        resolve(photoUrls);
      })
      .catch((err) => {
        console.log(err);
      });
  });
};

export const getPhoto = (photo) => {
  return `https://live.staticflickr.com/${photo.server}/${photo.id}_${
    photo.secret
  }_${"b"}.jpg`;
};

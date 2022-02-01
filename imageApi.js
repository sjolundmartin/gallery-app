import fetch from "node-fetch";

const api_key = "af7a9fd7141689c02b6bee9975865352";
const tags = "aurora, borealis";
const per_page = "20";
const sort = "interestingness-desc";

//Fetch photos from Flickr api and return array of urls and titles
export const getPhotos = async () => {
  return new Promise((resolve, reject) => {
    fetch(
      `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${api_key}&tags=${tags}&sort=${sort}&per_page=${per_page}&format=json&nojsoncallback=1`
    )
      .then((response) => response.json())
      .then((data) => {
        let photos = [];
        //Create url and title array
        data.photos.photo.forEach((photo) => {
          if (photo.title) {
            photos.push({
              url: getPhotoURL(photo),
              title: photo.title,
            });
          }
        });
        resolve(photos);
      })
      .catch((err) => {
        console.log(err);
        reject(err);
      });
  });
};

//Create image url from photo api
export const getPhotoURL = (photo) => {
  return `https://live.staticflickr.com/${photo.server}/${photo.id}_${
    photo.secret
  }_${"b"}.jpg`;
};

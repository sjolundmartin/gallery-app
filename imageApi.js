import fetch from "node-fetch";

const api_key = "2a8cf44357a719b5c5a67ef8134cb474";
const tags = "aurora, borealis";
const per_page = "5";
const sort = "interestingness-desc";

let photos = [];

//Fetch photos from Flickr api and return array of urls
export const getPhotos = async () => {
  return new Promise((resolve, reject) => {
    fetch(
      `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${api_key}&tags=${tags}&sort=${sort}&per_page=${per_page}&format=json&nojsoncallback=1`
    )
      .then((response) => response.json())
      .then((data) => {
        data.photos.photo.forEach((photo) => {
          photos.push({
            url: getPhoto(photo),
            title: photo.title,
          });
        });
        resolve(photos);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

//Fetch photos from Flickr api and return array of urls
export const getUser = async (photo) => {
  return new Promise((resolve, reject) => {
    fetch(
      `https://www.flickr.com/services/rest/?method=flickr.people.getInfo&api_key=${api_key}&user_id=${photo.owner}&format=json&nojsoncallback=1`
    )
      .then((response) => response.json())
      .then((data) => {
        resolve(data.person.realname._content || data.person.username._content);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

//Create image url from photo api
export const getPhoto = (photo) => {
  return `https://live.staticflickr.com/${photo.server}/${photo.id}_${
    photo.secret
  }_${"b"}.jpg`;
};

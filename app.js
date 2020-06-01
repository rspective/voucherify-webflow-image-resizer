const Webflow = require("webflow-api");
const download = require("image-downloader");
const sharp = require("sharp");


//Use NGROK to host resized images on localhost

const api_token =
  "API_TOKEN";

const collectionId = "COLLECTION_ID";

const webflow = new Webflow({ token: api_token });

async function changeImages() {
  const items = webflow.items({ collectionId: collectionId });

  images = await items;

  for (let i = 0; i < images.items.length; i++) {
    let options = {
      url: `${images.items[i]["thumbnail-image"]["url"]}`,
      dest: "./images/",
    };

    //Download images
    download
      .image(options)
      //Resize image
      .then(({ filename }) => {
        sharp(filename).toFile(`./images/resized_${i}.jpg`, function (err) {});
      })
      .catch((err) => console.error(err));

    //Update image on Webflow
    const updateImage = webflow.updateItem({
      collectionId: collectionId,
      itemId: images.items[i]["_id"],
      fields: {
        name: images.items[i]["name"],
        slug: images.items[i]["slug"],
        _archived: false,
        _draft: false,
        "author-2": images.items[i]["author-2"],
        "thumbnail-image": `http://ec463da7a7fb.ngrok.io/resized_${i}.jpg`,
      },
    });

    updateImage.then((i) => console.log(i));
  }
}

changeImages();

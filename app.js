const Webflow = require("webflow-api");
const download = require("image-downloader");
const sharp = require("sharp");

//Set up local server using http-server in the app folder and in the second terminal tab start Ngrok. Point Ngrok to the same port as local server.
const ngrok_url = "NGROK_URL"

const api_token =
  "WEBFLOW_API_TOKEN";

const collectionId = "WEBFLOW_COLLECTION_ID";

const webflow = new Webflow({ token: api_token });

async function changeImages() {
  //Connect to your Webflow collection
  const items = webflow.items({ collectionId: collectionId });

  images = await items;

  for (let i = 0; i < images.items.length; i++) {
    //Set up the absolute URL to thumbnail image for image download
    let options = {
      url: `${images.items[i]["thumbnail-image"]["url"]}`,
      dest: "./",
    };

    //Start downloading images
    download
      .image(options)
      //Start resizing images
      .then(({ filename }) => {
        sharp(filename).toFile(`./resized_${i}.jpg`, function (err) {});
      })
      .catch((err) => console.error(err));

    //Send images to your Webflow Collection through NGROK
    const updateImage = webflow.updateItem({
      collectionId: collectionId,
      itemId: images.items[i]["_id"],
      fields: {
        name: images.items[i]["name"],
        slug: images.items[i]["slug"],
        _archived: false,
        _draft: false,
        "author-2": images.items[i]["author-2"], //This field may be not important for your configuration
        "thumbnail-image": `${ngrok_url}resized_${i}.jpg`, //New image URL made with NGROK
      },
    });

    updateImage.then((i) => console.log(i));
  }
}

changeImages();

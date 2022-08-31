// Importing axios from axios module and parse function from node-html-parser
var axios = require("axios");
var { parse } = require("node-html-parser");
const { JSDOM } = require("jsdom");

// Scrape function to fetch the data from a webpage and show it's HTML Elements in the parsed data
let scrape = async (url) => {
  let data = await axios.get(url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.90 Safari/537.36",
    },
  });
  //console.log(data.data); // the actual data scraped from webpage
  const dom = new JSDOM(data.data);
  //console.log(dom.window.document.querySelector("p")); // "Hello world"
  const productTitle = dom.window.document
    .querySelector("#productTitle")
    .innerHTML.trim();
  const productPrice =
    dom.window.document.querySelector(".a-offscreen").innerHTML;
  const productImage = dom.window.document.querySelector("#landingImage");
  let d = dom.window.document.querySelector(
    "span.a-size-small.a-color-secondary.aok-align-center.basisPrice"
  );
  if (d) d = d.firstElementChild;
  if (d) d = d.firstElementChild.innerHTML;
  let merchantInfo =
    dom.window.document.querySelector("#merchant-info").children[1];
  if (merchantInfo) merchantInfo = merchantInfo.firstElementChild.innerHTML;
  let discount;
  discount = dom.window.document.querySelector(
    "div.a-section.a-spacing-none.aok-align-center"
  );
  if (discount) discount = discount.firstElementChild.innerHTML;
  const product = {
    Title: productTitle,
    Price: productPrice,
    MRP: d,
    discount: discount,
    sellerInfo: merchantInfo,
  };
  console.log(product);
  //console.log( merchantInfo[0])
  //let res = parse(data.data);
  //console.log(res); // HTML Element from the parsed data
};

try {
  scrape("https://www.amazon.in/dp/9356290156/ref=s9_acsd_al_bw_c2_x_0_t");
} catch (err) {
  console.log(err);
}

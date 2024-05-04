const { default: axios } = require("axios");
const AppError = require("../Helpers/AppError");
const Article = require("../Models/articles");
const jsdom = require("jsdom");

const { JSDOM } = jsdom;

const getAllArticles = async (req, res, next) => {
  try {
    const Articles = await Article.find();
    if (Articles.length === 0) {
      return next(new AppError("No Articles found!", 404));
    }
    res.send(Articles);
  } catch (error) {
    return next(error);
  }
};
const getProductByKeyword = async (req, res, next) => {
  try {
    // const keyword = req.param("keyword");
    const keyword = req.query.keyword;

    const response = await fetch(`https://www.amazon.com/s?k=${keyword}`);
    if (!response.ok) {
      throw new Error("Failed to fetch data from Amazon");
    }
    // const html = response.data;
    const html = await response.text();
    // console.log("HTML content:", html);
    // res.send(html);

    const dom = new JSDOM(html);

    const document = dom.window.document;

    const cards = document.querySelectorAll(
      ".sg-col-4-of-24,.sg-col-4-of-12,.s-result-item,.sg-col-4-of-16,.sg-col,.s-widget-spacing-small,.sg-col-4-of-20"
    );

    const products = [];

    cards.forEach((card) => {
      const titleElement = card.querySelector("h2.a-size-mini a.a-text-normal");
      const title = titleElement ? titleElement.textContent.trim() : "N/A";

      const ratingElement = card.querySelector(
        "a.a-popover-trigger span.a-icon-alt"
      );
      const ratingText = ratingElement
        ? ratingElement.textContent.trim()
        : "N/A";
      const rating = parseFloat(ratingText);

      const reviewsElement = card.querySelector(
        "span.a-size-base.s-underline-text"
      );
      const reviews = reviewsElement
        ? reviewsElement.textContent.trim()
        : "N/A";

      const imageElement = card.querySelector(
        "div.s-product-image-container a.s-no-outline img.s-image"
      );
      const imageURL = imageElement ? imageElement.getAttribute("src") : "N/A";

      if (
        title !== "N/A" &&
        rating !== null &&
        reviews !== "N/A" &&
        imageURL !== "N/A"
      ) {
        products.push({ title, rating, reviews, imageURL });
      }
    });
    res.send(products);
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getAllArticles,
  getProductByKeyword,
};

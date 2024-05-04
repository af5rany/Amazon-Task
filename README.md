# Product Search Webpage

This project demonstrates a simple yet functional webpage that allows users to enter a search keyword, initiates a search process upon clicking a button, and displays the search results in a clean and user-friendly manner.

## Features

- Input field for entering a search keyword.
- Button to initiate the search process.
- Dynamic display of search results including product title, rating, reviews, and image URL.

## Prerequisites

- Basic understanding of HTML, CSS, and JavaScript.
- installed Nodejs to handle search requests and returning product data.

## Setup

### Frontend

1. Clone the repository or download the project files.
2. Open the `index.html` file in a web browser to view the webpage.

### Backend

Assuming you have a backend NodeJs:

1. Ensure the backend endpoint is correctly configured to receive the search keyword, perform the search, and return the products array of objects.
2. The frontend JavaScript code makes an AJAX call to the `/products?keyword=${"Desired KEYWORD"}` endpoint with the search keyword as a query parameter.

## Usage

1. Enter a search keyword in the input field.
2. Click the "Search" button to initiate the search process.
3. The search results will be dynamically displayed on the page, including product title, rating, reviews, and image URL.

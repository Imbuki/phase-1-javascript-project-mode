const accessKey ="Yb8sNF7Pa0Lm5q6YRgNqCkEGlB_QlI6v0_LRWN9UNsA";

const formEl = document.querySelector("form");
const inputEl = document.getElementById("search-input");
const searchResults = document.querySelector(".Search-results");
const showMore = document.getElementById("Show-more-button");

let inputData = "";
let page = 1;

async function searchImages() {
    inputData = inputEl.value;
    const url =`https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;
    
    const response = await fetch(url);
    const data = await response.json();

    const results = data.results;

    if (page ===1) {
        searchResults.innerHTML = "";
    }

    results.map((result) => {
        const imageWrapper = document.createElement("div");
        imageWrapper.classList.add("Search-result");
        const image = document.createElement("img");
        image.src = result.urls.small;
        image.alt = result.alt_description;
        const imagelink = document.createElement("a");
        imagelink.href = result.links.html;
        imagelink.target = "_blank";
        imagelink.textContent = result.alt_description;

        imageWrapper.appendChild(image);
        imageWrapper.appendChild(imagelink);
        searchResults.appendChild(imageWrapper);
    });
    page++;
    if (page >1) {
        showMore.style.display = "block";
    }
}
formEl.addEventListener("submit",(event) => {
    event.preventDefault();
    page = 1;
    searchImages();
});
showMore.addEventListener("click",() =>{
    searchImages();
});
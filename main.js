
//const API_KEY = `41109769dcc64e81a99117924af22df3`;

let newsList = [];

let searchIcon = document.getElementById("search-icon");
let searchRight = document.getElementById("search-right");
let searchInput = document.getElementById("search-input");
let url = new URL(`https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines`)

const sidenavLinks = document.querySelectorAll(".sidenav a:not(.closebtn)");

sidenavLinks.forEach(link => link.addEventListener("click", (event) => {
    closeNav();
    getNewsByCategory(event);
}));


searchIcon.addEventListener("click", toggleSearch);
searchInput.addEventListener("focus", function () { searchInput.value = ""; })

searchInput.addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
        getNewsByKeyword();
    }
});

const getNews = async () => {
    const response = await fetch(url);
    const data = await response.json();
    newsList = data.articles;
    render();

}



const getLatestNews = async () => {

    url = new URL(`https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines`);

    getNews()
}

getLatestNews();


const getNewsByCategory = async (event) => {
    const category = event.target.textContent.toLowerCase()//newsapl 공홈가면 소문자로 되어있으니까 소문자로 바꿔줌

    url = new URL(`https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?category=${category}`)
    getNews()
}


const getNewsByKeyword = async () => {
    const keyword = document.getElementById("search-input").value;

    url = new URL(`https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?q=${keyword}`);
    getNews()
}

function openNav() {
    document.getElementById("mySidenav").style.width = "250px";

}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";

}

const render = () => {
    const newsHTML = newsList.map((news) => {
        let description = news.description ?
            (news.description.length > 60 ? news.description.slice(0, 60) + '…' : news.description) : '내용없음';


        return `<div class="row news">
            <div class="col-lg-4">
                <img class="news-img-size" src="${news.urlToImage}" onError="this.src='https://icrier.org/wp-content/uploads/2022/12/media-Event-Image-Not-Found.jpg'"/>
            </div>
            <div class="col-lg-8">
                <h2>${news.title}</h2>
                <p>${description}</p>
                <div>${news.source.name} - ${moment(news.publishedAt).fromNow()} </div>
            </div>
        </div>`;
    }).join("");

    document.getElementById("news-board").innerHTML = newsHTML;
}



function toggleSearch() {

    if (searchRight.style.display === "none" || searchRight.style.display === "") {
        searchRight.style.display = "block";
    } else {
        searchRight.style.display = "none";
        searchIcon.style.display = 'block';
    }
}
/*
const API_KEY = `41109769dcc64e81a99117924af22df3`
let newsList = [];
const getLatestNews = async () => {
    const url = new URL(`https://newsapi.org/v2/top-headlines?country=us&category=health&page=1&pageSize=20&apiKey=${API_KEY}`);
   
    const response = await fetch(url);
    const data = await response.json();
    newsList = data.articles;
    console.log("rrr",newsList);
};

getLatestNews();

*/



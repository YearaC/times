//search-icon을 클릭하면 search-bar가 나온다 > 다시 search -icon을 누르면 검색창이 사라진다.
//media query max screen 992px 이면 search-icon이 사라지고
// search-icon이 햄버거 아이콘으로 바뀐다

//햄버거 아이콘 클릭시 사이드 메뉴가 나온다 > 다시 햄버거 아이콘 누르면 사이드 메뉴가 들어간다





//const API_KEY = `41109769dcc64e81a99117924af22df3`

let newsList = [];
const getLatestNews = async () => {

   const url = new URL(`https://playful-kangaroo-f139ee.netlify.app/top-headlines`)
    const response = await fetch(url);
    const data = await response.json();
    newsList = data.articles;
    render()
    console.log("rrr",newsList);
};

getLatestNews();



let searchIcon = document.getElementById("search-icon");
let searchRight = document.getElementById("search-right");


searchIcon.addEventListener ("click", toggleSearch);

function toggleSearch(){
    
    if (searchRight.style.display === "none" || searchRight.style.display === "") {
        searchRight.style.display = "block";
    } else {
        searchRight.style.display = "none";
    }
    
}


function init() {

    if (window.innerWidth <= 992) {
        searchIcon.style.display = 'none';
    } else {
        searchIcon.style.display = 'block';
    }
}

// 윈도우 크기 변경 이벤트 리스너 추가
window.addEventListener('resize', function() {
    
    if (window.innerWidth <= 992) {
        searchIcon.style.display = 'none';
    } else {
        searchIcon.style.display = 'block';
    }
});

// 페이지 로드 시 초기화 함수 실행
window.onload = init;


//hamburger icon side nav
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
                <div> ${news.source.name == null || news.source.name == '' ? 'no source' : news.source.name} * ${news.publishedAt} * ${news.publishedAt}</div>
            </div>
        </div>`;
    }).join("");

    document.getElementById("news-board").innerHTML = newsHTML;
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



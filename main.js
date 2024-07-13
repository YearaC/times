
//const API_KEY = `41109769dcc64e81a99117924af22df3`;

let newsList = [];

let searchIcon = document.getElementById("search-icon");
let searchRight = document.getElementById("search-right");
let searchInput = document.getElementById("search-input");
let url = new URL(`https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines`)
let totalResults = 0
let page = 1
const pageSize = 10
const groupSize = 5

const sidenavLinks = document.querySelectorAll(".sidenav a:not(.closebtn)");
const menuList = document.querySelectorAll(".menus button");

sidenavLinks.forEach(link => link.addEventListener("click", (event) => {
    closeNav();
    getNewsByCategory(event);
}));
menuList.forEach(link => link.addEventListener("click", (event) => {
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
    try{ 
        url.searchParams.set("page", page); // =>&page=page
        url.searchParams.set("pageSize", pageSize)
   
        const response = await fetch(url);
       
        const data = await response.json()
       
        if(response.status === 200){
            
            
            if (data.articles.length === 0){
                throw new Error("No result for this search")
            }

            newsList=data.articles;
            totalResults =data.totalResults
            render()
            paginationRender()
        }else{
            throw new Error(data.message)
        }
        

    }catch(error){
        
        errorRender(error.message)

    }

}

const getLatestNews = async () => {
    url = new URL(`https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines`);
    page = 1; // 새로운 URL을 설정할 때 페이지를 1로 초기화
    await getNews();
};

const getNewsByCategory = async (event) => {
    const category = event.target.textContent.toLowerCase();
    url = new URL(`https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?category=${category}`);
    page = 1; // 새로운 URL을 설정할 때 페이지를 1로 초기화
    await getNews();
};

const getNewsByKeyword = async () => {
    const keyword = searchInput.value;
    url = new URL(`https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?q=${keyword}`);
    page = 1; // 새로운 URL을 설정할 때 페이지를 1로 초기화
    await getNews();
};

function openNav() {
    document.getElementById("mySidenav").style.width = "250px";

}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";

}

const render = () => {
    const newsHTML = newsList.map((news) => {
        let description = news.description ?
            (news.description.length > 200 ? news.description.slice(0, 200) + '…' : news.description) : '내용없음';
            


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

const errorRender = (errorMessage) =>{
    const errorHTML = 
    `<div class="alert alert-danger" role="alert">
  ${errorMessage}
</div>`
document.getElementById("news-board").innerHTML=errorHTML
}



function toggleSearch() {

    if (searchRight.style.display === "none" || searchRight.style.display === "") {
        searchRight.style.display = "block";
    } else {
        searchRight.style.display = "none";
        searchIcon.style.display = 'block';
    }
}

const paginationRender = () => {
    //totalPages
    const totalPages = Math.ceil(totalResults / pageSize)
    //pageGroup
    const pageGroup =  Math.ceil (page / groupSize)
    //lastPage
   
    let lastPage = pageGroup * groupSize;
    // 마지막 페이지 그룹이 그룹 사이즈보다 작다> lastPage = totalPage
    // 마지막 정보 없이 비어있는 페이지 없애기
    if(lastPage > totalPages){
        lastPage = totalPages

    }
    
    let firstPage = lastPage - 4 <= 0 ? 1 : lastPage - 4;
    
    
    let paginationHTML = ``;
    if(page > 1){
        paginationHTML += `<li class="page-item"><a class="page-link" onclick="moveToPage(${1})">&lt&lt</a></li>`;
        paginationHTML += `<li class="page-item"><a class="page-link" onclick="moveToPage(${page-1})">&lt</a></li>`;    
    }

    for(let i=firstPage; i<=lastPage; i++){
        paginationHTML += `<li class="page-item ${i===page? 'active' : ''}" onclick="moveToPage(${i})"><a class="page-link">${i}</a></li>`;
    }

    if(page < totalPages){
        paginationHTML += `<li class="page-item"><a class="page-link" onclick="moveToPage(${page+1})" href="#">&gt;</a></li>`;
        paginationHTML += `<li class="page-item"><a class="page-link" onclick="moveToPage(${totalPages})" href="#">&gt;&gt;</a></li>`;
    }

    document.querySelector(".pagination").innerHTML = paginationHTML;

    
}

const moveToPage= async(pageNum) =>{
    console.log("movetoPage",pageNum)
    page = pageNum
    await getNews()
}




getLatestNews();


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



//const API_KEY = `41109769dcc64e81a99117924af22df3`
let news = [];
const getLatestNews = async () => {
     // const url = new URL(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`);
   const url = new URL(`https://playful-kangaroo-f139ee.netlify.app/top-headlines`)
    const response = await fetch(url);
    const data = await response.json();
    news = data.articles;
    console.log("rrr",data.articles);
};

getLatestNews();




/*
const API_KEY = `41109769dcc64e81a99117924af22df3`
let news = [];
const getLatestNews = async () => {
    const url = new URL(`https://newsapi.org/v2/top-headlines?country=kr&category=health&q=암&page=1&pageSize=20&apiKey=${API_KEY}`);
   
    const response = await fetch(url);
    const data = await response.json();
    news = data;
    console.log("111rrr",data);
};

getLatestNews();
*/


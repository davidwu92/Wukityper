function scraperJS(){
  console.log("HELLO WORLD")
  goWiki();
  const goWiki = ()=>{
    let term = "rainbow"
    let url = `https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=`
    console.log(url+term);
    const articles = require(url+term)
    console.log(articles);
  }
  
  const gotData = (data)=>{
    console.log(data)
  }
}
export default scraperJS
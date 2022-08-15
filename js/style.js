var script = document.getElementsByTagName('script');   
script = script[script.length-1].src.replace(/^[^\?]+\?/, '').replace(/#.+$/, '').split('&');                                   
var queries = {}, query;
while(script.length){                      
     query = script.shift().split('=');    
     queries[query[0]] = query[1];   
}
$.ajax({
  url:`./css/${queries.src}.css`,
  type: 'POST',
  dataType:"text",
  success:(data)=> {
    $("head").append(`<style>${data}</style>`);
    $("head").append(`<style>@media (max-width:${queries.width}px) { ${data.replace(/([0-9]+)px/g, (v) => v.replace('px', '')/Number(queries.size)+'vw')} }</style>`);
  }
});
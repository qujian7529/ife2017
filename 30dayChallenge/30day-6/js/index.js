const a = 'https://gist.githubusercontent.com/soyaine/81399bb2b24ca1bb5313e1985533c640/raw/bdf7df2cbcf70706c4a5e51a7dfb8c933ed78878/TangPoetry.json';
const poem = [];
fetch(a)
    .then( blob => blob.json())
    .then( data => {
        data.forEach((item)=>{
            poem.push({
                author:item['detail_author'][0] || '无名',
                article:item['detail_text'] || '无文章',
                title:item['title'] || '无题'    
            })
        });
        let nowStr = '';
        for(let i = 0 ; i<15; i++){
            nowStr += `<li>
                    <p>
                        ${poem[i].article}
                    </p>
                    <span>${poem[i].title} - ${poem[i].author}</span>
                </li>`
        }
        oUl.innerHTML = nowStr;
    });
const oText = document.querySelector('[name="value"]');
const oUl = document.querySelector('ul');
function findPoem(val){
    let str = '';
    let author = '';
    let article = '';
    let title = '';
    poem.forEach((item)=>{
        if(item.author.includes(val) || item.article.includes(val) || item.title.includes(val)){
            str += `<li>
                <p>
                    ${fontSelected(item.article, val)}
                </p>
                <span>${fontSelected(item.title, val)} - ${fontSelected(item.author, val)}</span>
                </li>`
        };
    })
    oUl.innerHTML = str;
}
function fontSelected(val, keyword){
    let index = val.indexOf(keyword);
    if(index !== -1){
        return val.replace(keyword, `<em>${keyword}</em>`);
    }
    return val;
}
oText.addEventListener('change',()=>{
    findPoem(oText.value);
})
oText.addEventListener('keyup',()=>{
    findPoem(oText.value);
})

const input = document.getElementById("searchText");
const datalist = document.getElementById("blog-result");
input.addEventListener("keyup", async function() {
    datalist.innerHTML = "";
    const searchText = this.value;
    const result = await (await fetch(`http://127.0.0.1:3000/blogs/regexp-multifields-search?searchText=${searchText}`)).json();
    for (const blog of result) {
        const item = document.createElement("li");
        item.innerHTML = "Title : " + blog._source.title
        const br = document.createElement("br");
        const small = document.createElement("small");
        const strong = document.createElement("strong");
        strong.innerHTML = "Text : " + blog._source.text
        small.innerHTML = "Author : " + blog._source.author
        datalist.appendChild(item)
        item.appendChild(br)
        item.appendChild(strong)
        item.appendChild(br.cloneNode(true))
        item.appendChild(small)
    }
})
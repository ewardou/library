let myLibrary=[];
let popUp=document.querySelector(".pop-up");
let overlay=document.querySelector(".overlay");
let cardsHolder=document.querySelector(".cards");

function Book(title,author,pages,read){
    this.title=title;
    this.author=author;
    this.pages=pages;
    this.read=read;
}

function addBookToLibrary(){
    let titleInput=document.querySelector("#title");
    let authorInput=document.querySelector("#author");
    let pagesInput=document.querySelector("#pages")
    let read=document.querySelector("#read");

    let newBook=new Book(titleInput.value,authorInput.value,pagesInput.value,read.checked);
    myLibrary.push(newBook);
    createCard(newBook);
    titleInput.value="";
    authorInput.value="";
    pagesInput.value="";
    read.checked=false;
}

let harryPotter=new Book("Harry Potter and the Philosopher's Stone","J.K Rowling","233",true);
myLibrary.push(harryPotter);
let readyPlayerOne=new Book("Ready Player One","Ernest Cline","374",true);
myLibrary.push(readyPlayerOne);
let sapiens=new Book("Sapiens: A Brief History of Humankind", "Yuval Noah Harari","512",false);
myLibrary.push(sapiens)

function createCard(book){
    let card=document.createElement("div");
    for (let property in book){
        if (property==="read") {continue}
        let newItem=document.createElement("p");
        let content=document.createElement("p");
        newItem.textContent=`${property}`;
        card.appendChild(newItem);
        content.textContent=`${book[property]}`;
        card.appendChild(content);
    }
    let remove=document.createElement("button");
    let icon=document.createElement("img");
    icon.setAttribute("src","./icons/block_FILL0_wght400_GRAD0_opsz48.svg");
    remove.appendChild(icon);
    card.appendChild(remove);
    cardsHolder.appendChild(card);
}
 for (let i=0;i<myLibrary.length;i++){
    createCard(myLibrary[i]);
 }

 let addButton=document.querySelector("form>button");
 addButton.addEventListener("click", (event) => {
    event.preventDefault();
    addBookToLibrary();
    closePopUp();
 });

 let newBookButton=document.querySelector("main>button");
 newBookButton.addEventListener("click",()=>{
    popUp.classList.add("active");
    overlay.classList.add("active");
 })

 function closePopUp(){
    popUp.classList.remove("active");
    overlay.classList.remove("active");
 }

 overlay.addEventListener("click",closePopUp)

 let closeButton=document.querySelector(".close");
 closeButton.addEventListener("click",(event)=>{
    event.preventDefault();
    closePopUp()
});
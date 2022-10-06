let myLibrary=[];
let popUp=document.querySelector(".pop-up");
let overlay=document.querySelector(".overlay");
let cardsHolder=document.querySelector(".cards");

function Book(title,author,pages,read,cover){
    this.title=title;
    this.author=author;
    this.pages=pages;
    this.read=read;
    this.cover=cover;
};

Book.prototype.markAsRead=function(){
    let index=this.getAttribute("data-index");
    if (myLibrary[index].read===false){
        myLibrary[index].read=true;
        document.querySelector(`div[data-index="${index}"]`).classList.add("read");
    } else {
        myLibrary[index].read=false;
        document.querySelector(`div[data-index="${index}"]`).classList.remove("read");
    }
};

function addBookToLibrary(){
    let titleInput=document.querySelector("#title");
    let authorInput=document.querySelector("#author");
    let pagesInput=document.querySelector("#pages")
    let read=document.querySelector("#read");
    let cover=document.querySelector("#cover");

    let file=cover.files[0];
    let url;
    if (file===undefined){
        url="./covers/_.png"
    } else{
        url=URL.createObjectURL(file);
    }


    let newBook=new Book(titleInput.value,authorInput.value,pagesInput.value,read.checked,url);
    myLibrary.push(newBook);
    createCard(newBook);
    titleInput.value="";
    authorInput.value="";
    pagesInput.value="";
    read.checked=false;
    cover.value="";
}

let harryPotter=new Book("Harry Potter and the Philosopher's Stone","J.K Rowling","233",true,"./covers/harrypotter.jpg");
myLibrary.push(harryPotter);
let readyPlayerOne=new Book("Ready Player One","Ernest Cline","374",true,"./covers/readyplayerone.jpg");
myLibrary.push(readyPlayerOne);
let sapiens=new Book("Sapiens: A Brief History of Humankind", "Yuval Noah Harari","512",false,"./covers/sapiens.jpg");
myLibrary.push(sapiens);
let dragonflyInAmber=new Book("Dragonfly in Amber","Diana Gabaldon","947",true,"./covers/dragonfly-in-amber.jpg");
myLibrary.push(dragonflyInAmber);
let thereWereNone=new Book("And Then There Were None","Agatha Christie","264",false,"./covers/and-then-there-were-none.jpg");
myLibrary.push(thereWereNone);

function createCard(book){
    let card=document.createElement("div");
    let image=document.createElement("img");
    image.setAttribute("src",book.cover);
    image.setAttribute("style","height:200px;width:auto")
    card.appendChild(image);
    for (let property in book){
        if (book.hasOwnProperty(property)){
            if (property==="read" || property==="cover") {continue}
            let newItem=document.createElement("p");
            let content=document.createElement("p");
            newItem.textContent=`${property}`;
            card.appendChild(newItem);
            content.textContent=`${book[property]}`;
            card.appendChild(content);
    
        }
    }
    let removeButton=document.createElement("button");
    let removeIcon=document.createElement("img");
    removeIcon.setAttribute("src","./icons/block_FILL0_wght400_GRAD0_opsz48.svg");
    removeButton.appendChild(removeIcon);
    removeButton.classList.add("remove");
    card.appendChild(removeButton);
    let bookIndex=myLibrary.indexOf(book);
    card.setAttribute("data-index",bookIndex);
    card.setAttribute("data-title",book.title);
    removeButton.setAttribute("data-index",bookIndex);
    removeButton.addEventListener("click",removeBook);

    let readButton=document.createElement("button");
    let readIcon=document.createElement("img");
    readIcon.setAttribute("src","./icons/menu_book_FILL0_wght400_GRAD0_opsz48.svg");
    readButton.appendChild(readIcon);
    card.appendChild(readButton);
    readButton.setAttribute("data-index",bookIndex);
    readButton.addEventListener("click",book.markAsRead);

    if (book.read){card.classList.add("read")};
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

 function removeBook(){
    let index=this.getAttribute("data-index");
    let cardToRemove=document.querySelector(`div[data-index="${index}"]`);
    myLibrary.splice(index,1);
    console.log(myLibrary);
    cardsHolder.removeChild(cardToRemove);
    updateDataIndex();
}

function updateDataIndex(){
    for (let i=0;i<myLibrary.length;i++){
        let currentBook=myLibrary[i];
        let currentCard=document.querySelector(`div[data-title="${currentBook.title}"]`);
        let currentButtons=document.querySelectorAll(`div[data-title="${currentBook.title}"]>button`);
        currentCard.setAttribute("data-index",i);
        currentButtons.forEach(button=>{
            button.setAttribute("data-index",i);
        })
    }
}
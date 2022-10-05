let myLibrary=[];
let popUp=document.querySelector(".pop-up");
let overlay=document.querySelector(".overlay");
let cardsHolder=document.querySelector(".cards");

function Book(title,author,pages){
    this.title=title;
    this.author=author;
    this.pages=pages;
}

function addBookToLibrary(){
    let titleInput=document.querySelector("#title");
    let authorInput=document.querySelector("#author");
    let pagesInput=document.querySelector("#pages")

    let newBook=new Book(titleInput.value,authorInput.value,pagesInput.value);
    myLibrary.push(newBook);
    createCard(newBook);
    titleInput.value="";
    authorInput.value="";
    pagesInput.value="";
}

let harryPotter=new Book("Harry Potter and the Philosopher's Stone","J.K Rowling","233");
myLibrary.push(harryPotter);
let readyPlayerOne=new Book("Ready Player One","Ernest Cline","374");
myLibrary.push(readyPlayerOne);
let sapiens=new Book("Sapiens: A Brief History of Humankind", "Yuval Noah Harari","512");
myLibrary.push(sapiens)

function createCard(book){
    let card=document.createElement("div");
    for (let property in book){
        let newItem=document.createElement("p");
        let content=document.createElement("p");
        newItem.textContent=`${property}`;
        card.appendChild(newItem);
        content.textContent=`${book[property]}`;
        card.appendChild(content);
    }
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
// function createForm(){
//     let newForm=document.createElement("form");
//     let titleInput=document.createElement("input");
//     let authorInput=document.createElement("input");
//     let pagesInput=document.createElement("input");


//     popUp.appendChild(newForm);
//     newForm.appendChild(titleInput);
//     newForm.appendChild(authorInput);
//     newForm.appendChild(pagesInput);
// }

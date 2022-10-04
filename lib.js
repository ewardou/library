let myLibrary=[];
let popUp=document.querySelector(".pop-up");
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
        newItem.textContent=`${property} : ${book[property]}`;
        card.appendChild(newItem);
    }
    cardsHolder.appendChild(card);
}
 for (let i=0;i<myLibrary.length;i++){
    createCard(myLibrary[i]);
 }
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

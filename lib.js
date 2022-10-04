let myLibrary=[];
let popUp=document.querySelector(".pop-up")

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

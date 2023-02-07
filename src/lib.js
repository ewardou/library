import "./style.css";
import readyPlayerOneCover from "./covers/readyplayerone.jpg";
import sapiensCover from "./covers/sapiens.jpg";
import harryPotterCover from "./covers/harrypotter.jpg";
import dragonflyInAmberCover from "./covers/dragonfly-in-amber.jpg";
import thereWereNoneCover from "./covers/and-then-there-were-none.jpg";
import bookIcon from "./icons/menu_book_FILL0_wght400_GRAD0_opsz48.svg";
import deleteIcon from "./icons/block_FILL0_wght400_GRAD0_opsz48.svg";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCPMiZVHlznbo5sc3XU-YeioB1nricjk1g",
  authDomain: "library-3f33a.firebaseapp.com",
  projectId: "library-3f33a",
  storageBucket: "library-3f33a.appspot.com",
  messagingSenderId: "347599461313",
  appId: "1:347599461313:web:9cce401a8a46b2047f6d40"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

let myLibrary=[];
let popUp=document.querySelector(".pop-up");
let overlay=document.querySelector(".overlay");
let cardsHolder=document.querySelector(".cards");

class Book{
    constructor(title,author,pages,read,cover){
        this.title=title;
        this.author=author;
        this.pages=pages;
        this.read=read;
        this.cover=cover;    
    }
    markAsRead(){
        let index=this.getAttribute("data-index");
        if (myLibrary[index].read===false){
            myLibrary[index].read=true;
            document.querySelector(`div[data-index="${index}"]`).classList.add("read");
        } else {
            myLibrary[index].read=false;
            document.querySelector(`div[data-index="${index}"]`).classList.remove("read");
        }    
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
        url="https://i.pinimg.com/originals/9e/96/e0/9e96e04a23a8a08cda9fd978529cb2dc.png"
    } else{
        url=URL.createObjectURL(file);
    };

    if(titleInput.value===""){
        return alert("Please enter a title.")
    };

    let newBook=new Book(titleInput.value,authorInput.value,pagesInput.value,read.checked,url);
    myLibrary.push(newBook);
    createCard(newBook);
    document.querySelector("form").reset();
}

let harryPotter=new Book("Harry Potter and the Philosopher's Stone","J.K Rowling","233",true,harryPotterCover);
myLibrary.push(harryPotter);
let readyPlayerOne=new Book("Ready Player One","Ernest Cline","374",true,readyPlayerOneCover);
myLibrary.push(readyPlayerOne);
let sapiens=new Book("Sapiens: A Brief History of Humankind", "Yuval Noah Harari","512",false, sapiensCover);
myLibrary.push(sapiens);
let dragonflyInAmber=new Book("Dragonfly in Amber","Diana Gabaldon","947",true, dragonflyInAmberCover);
myLibrary.push(dragonflyInAmber);
let thereWereNone=new Book("And Then There Were None","Agatha Christie","264",false, thereWereNoneCover);
myLibrary.push(thereWereNone);

function createCard(book){
    let card=document.createElement("div");
    let image=document.createElement("img");
    image.setAttribute("src",book.cover);
    image.setAttribute("style","height:200px;width:auto")
    card.appendChild(image);

    let informationContainer=document.createElement("div")
    for (let property in book){
        if (book.hasOwnProperty(property)){
            if (property==="read" || property==="cover") {continue}
            let newItem=document.createElement("p");
            let content=document.createElement("p");
            newItem.textContent=capitalize(`${property}`);
            newItem.classList.add("information-section");
            informationContainer.appendChild(newItem);
            content.textContent=`${book[property]}`;
            if (content.textContent===""){
                content.textContent="-";
            }
            informationContainer.appendChild(content);
        }
    }
    card.appendChild(informationContainer);

    let buttonContainer=document.createElement("div");
    let removeButton=document.createElement("button");
    let removeIcon=document.createElement("img");
    removeIcon.setAttribute("src",deleteIcon);
    removeButton.appendChild(removeIcon);
    removeButton.classList.add("remove");
    buttonContainer.appendChild(removeButton);
    let bookIndex=myLibrary.indexOf(book);
    card.setAttribute("data-index",bookIndex);
    card.setAttribute("data-title",book.title);
    removeButton.setAttribute("data-index",bookIndex);
    removeButton.addEventListener("click",openConfirmationModal);

    let readButton=document.createElement("button");
    let readIcon=document.createElement("img");
    readIcon.setAttribute("src", bookIcon);
    readButton.appendChild(readIcon);
    buttonContainer.appendChild(readButton);
    readButton.setAttribute("data-index",bookIndex);
    readButton.addEventListener("click",book.markAsRead);

    card.appendChild(buttonContainer);
    if (book.read){card.classList.add("read")};
    cardsHolder.appendChild(card);
}
function render(){
    for (let i=0;i<myLibrary.length;i++){
        createCard(myLibrary[i]);
    }
};
render();

 let addButton=document.querySelector("form>button");
 addButton.addEventListener("click", (event) => {
    event.preventDefault();
    addBookToLibrary();
    closePopUp();
 });

 let newBookButton=document.querySelector("main>div:first-child>button");
 newBookButton.addEventListener("click",()=>{
    popUp.classList.add("active");
    overlay.classList.add("active");
 })

 function closePopUp(){
    popUp.classList.remove("active");
    overlay.classList.remove("active");
    let confirmDeletionModal=document.querySelector(".deletion-confirmation");
    confirmDeletionModal.classList.remove("active");
    confirmDeletionButton.removeAttribute("data-index");
 }

 overlay.addEventListener("click",closePopUp)

 let closeButton=document.querySelector(".close");
 closeButton.addEventListener("click",(event)=>{
    event.preventDefault();
    closePopUp()
});

let confirmDeletionModal=document.querySelector(".deletion-confirmation");
let cancelDeletionButton=confirmDeletionModal.querySelector("button:first-of-type");
cancelDeletionButton.addEventListener("click",closePopUp);

let confirmDeletionButton=confirmDeletionModal.querySelector("button:nth-of-type(2)");
confirmDeletionButton.addEventListener("click",removeBook);

function openConfirmationModal(){
    confirmDeletionModal.classList.add("active");
    overlay.classList.add("active");
    confirmDeletionButton.setAttribute("data-index",this.getAttribute("data-index"));
};
 
function removeBook(){
    let oldBooks=document.querySelectorAll(".cards>div");
    oldBooks.forEach(book=>cardsHolder.removeChild(book));
    let index=confirmDeletionButton.getAttribute("data-index");
    myLibrary.splice(index,1);
    render();
    updateDataIndex();    
    closePopUp();
};

function updateDataIndex(){
    for (let i=0;i<myLibrary.length;i++){
        let currentBook=myLibrary[i];
        let currentCard=document.querySelector(`div[data-title="${currentBook.title}"]`);
        let currentButtons=document.querySelectorAll(`div[data-title="${currentBook.title}"]>div>button`);
        currentCard.setAttribute("data-index",i);
        currentButtons.forEach(button=>{
            button.setAttribute("data-index",i);
        })
    }
}
function capitalize(word){
    return word.charAt(0).toUpperCase()+word.slice(1);
}

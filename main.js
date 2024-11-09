
const bookContainer = document.querySelector("#containerBooks");
const bookMenu = document.querySelector("#bookMenu");

const closeBookMenu = document.querySelector('#closeBookMenu');
const starterText = document.querySelector("#starterText");
const addFirstBook = document.querySelector("#gettingStartedButton");
const headerAddBook = document.querySelector("#headerAddBook");

const bookLibrary = [];


//book constructor and methods
function Book(title, author, pages, isRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
}

Book.prototype.printBook = function() {
    console.log(this.title, this.author, this.pages, this.isRead);
}

Book.prototype.addBook = function() {

    if (this.title && this.author && this.pages && this.isRead !== ''){
        const bookDiv = document.createElement('div');
        bookDiv.classList.add("bookContainer")
        bookContainer.appendChild(bookDiv);
        document.body.appendChild(bookContainer);
    
        let elementsArr = [
            createElem("h1",this.title),
            createElem("h2",this.author),
            createElem("p",this.pages),
            createElem("p",this.isRead)
        ]
        elementsArr.forEach(element => {
            console.log("llegue")
            bookDiv.appendChild(element);
        });

        bookLibrary.push(this);
        bookMenu.classList.toggle('hidden');

    } else{
        alert("Please make sure all the fields are correctly filled :)")
    }

}

//submit book button
document.querySelector('#submitBook').addEventListener('click', function(e){
    e.preventDefault(); //avoid going to another page when submitting a book

    const bookTitle = document.querySelector("#bookTitle").value;
    const bookAuthor = document.querySelector("#bookAuthor").value;
    const bookPages = document.querySelector("#bookPages").value;
    
    let isBookRead = "No";
    if(document.querySelector("#bookIsReadYes").checked) {
        isBookRead = document.querySelector("#bookIsReadYes").value;
    }

    const newBook = new Book(bookTitle, bookAuthor, bookPages, isBookRead);
    newBook.printBook();
    newBook.addBook();
});

//helper function for the submitBook
function createElem(tag,content){
    const element = document.createElement(tag);
    element.innerText = content;
    return element;
}

// ~ ~ ~ 

//if the user doesn't have any books, display an special message
addFirstBook.addEventListener('click',() =>{
    bookMenu.classList.toggle('hidden');
    starterText.classList.add('hidden');
})

closeBookMenu.addEventListener('click', () =>{
    bookMenu.classList.toggle('hidden');
    starterText.classList.remove('hidden');
})

headerAddBook.addEventListener('click', () =>{
    bookMenu.classList.remove('hidden');
    starterText.classList.add('hidden');
})


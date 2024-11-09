
const bookContainer = document.querySelector("#containerBooks");
const bookMenu = document.querySelector("#bookMenu");

const closeBookMenu = document.querySelector('#closeBookMenu');
const starterText = document.querySelector("#starterText");
const addFirstBook = document.querySelector("#gettingStartedButton");
const headerAddBook = document.querySelector("#headerAddBook");

const bookLibrary = [];


//book constructor and methods
function Book(title, author, pages, isRead, index) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
    this.index = index;
}

Book.prototype.printBook = function() {
    console.log(this.title, this.author, this.pages, this.isRead);
}

Book.prototype.addBook = function() {
    
    if (this.title && this.author && this.pages !== ''){
        cleanForm();
        bookMenu.classList.add('hidden');
        bookMenu.classList.remove('pageContent')
        
        const bookDiv = document.createElement('div');
        bookDiv.classList.add("bookContainer")
        bookContainer.appendChild(bookDiv);
        document.body.appendChild(bookContainer);
    
        let elementsArr = [
            createElem("h1",this.title),
            createElem("h2",this.author),
            createElem("p",this.pages),
            createElem("p",this.isRead),
            createElem("button",'X')
        ]

        const currentBook = this;
        elementsArr[4].addEventListener('click',()=>{
            currentBook.deleteBook();
        })

        elementsArr.forEach(element => {
            bookDiv.appendChild(element);
        });

        bookLibrary.push(this);

        //add the index to a data set and to the book itself
        this.index = bookLibrary.indexOf(this);
        bookDiv.dataset.index = this.index;
  
        bookMenu.classList.add('hidden');

    } else{
        alert("Please make sure all the fields are correctly filled :)")
    }

}

Book.prototype.deleteBook = function() {

    const divToDelete = document.querySelector(`[data-index="${this.index}"]`);
    console.log(`[data-index="${this.index}"]`);

    divToDelete.remove();

    if (this.index >= 0 ){
        bookLibrary.splice(this.index,1);
    }
    if (bookLibrary.length === 0) {
        starterText.classList.remove('hidden');
    }
}



//submit book button
document.querySelector('#submitBook').addEventListener('click', function(e){
    e.preventDefault(); //avoid going to another page when submitting a book

    console.log("SUBMIT")

    const bookTitle = document.querySelector("#bookTitle").value;
    const bookAuthor = document.querySelector("#bookAuthor").value;
    const bookPages = document.querySelector("#bookPages").value;
    
    let isBookRead = "No";
    if(document.querySelector("#bookIsReadYes").checked) {
        isBookRead = document.querySelector("#bookIsReadYes").value;
    }

    const newBook = new Book(bookTitle, bookAuthor, bookPages, isBookRead);
   //newBook.printBook();
    newBook.addBook();
});

//helper function for the submitBook
function createElem(tag,content){
    const element = document.createElement(tag);
    element.innerText = content;
    return element;
}

function cleanForm(){
    let list = bookMenu.querySelectorAll('input');
    list.forEach(function(item){
        item.value = '';
    })
}

// ~ ~ ~ 

//if the user doesn't have any books, display an special message
addFirstBook.addEventListener('click',() =>{
    bookMenu.classList.toggle('hidden');
    starterText.classList.add('hidden');
    bookMenu.classList.add('pageContent')
})

closeBookMenu.addEventListener('click', () =>{
    cleanForm()
    console.log("close menu")
    bookMenu.classList.remove('pageContent')
    bookMenu.classList.add('hidden');
    if (bookLibrary.length == 0){
        starterText.classList.remove('hidden');
    } 
    
})

headerAddBook.addEventListener('click', () =>{
    bookMenu.classList.add('pageContent')
    bookMenu.classList.remove('hidden');
    starterText.classList.add('hidden');
})
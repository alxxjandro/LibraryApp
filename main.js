
const bookContainer = document.querySelector("#containerBooks");

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
    } else{
        alert("Please make sure all the fields are correctly filled :)")
    }

}

function createElem(tag,content){
    const element = document.createElement(tag);
    element.innerText = content;
    return element;
}

document.querySelector('#addBook').addEventListener('click', function(e){
    e.preventDefault(); 

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
```javascript
const titleInput = document.getElementById("bookTitle");
const authorInput = document.getElementById("bookAuthor");
const addButton = document.getElementById("addBook");
const bookList = document.getElementById("bookList");

let books = JSON.parse(localStorage.getItem("readingBooks")) || [];

function saveBooks() {
    localStorage.setItem("readingBooks", JSON.stringify(books));
}

function updateStats() {
    document.getElementById("totalBooks").textContent = books.length;

    const completed = books.filter(book => book.completed).length;

    document.getElementById("completedBooks").textContent = completed;
    document.getElementById("pendingBooks").textContent = books.length - completed;
}

function displayBooks() {
    bookList.innerHTML = "";

    if (books.length === 0) {
        bookList.innerHTML =
            '<p class="empty-message">No books yet. Add your first book! ✨</p>';
    }

    books.forEach(book => {
        const card = document.createElement("div");
        card.className = "book-card";

        if (book.completed) {
            card.classList.add("completed");
        }

        const info = document.createElement("div");
        info.className = "book-info";

        const heading = document.createElement("h3");
        heading.textContent = book.title;

        const author = document.createElement("p");
        author.textContent = "By " + book.author;

        info.appendChild(heading);
        info.appendChild(author);

        const actions = document.createElement("div");
        actions.className = "book-actions";

        const completeButton = document.createElement("button");
        completeButton.className = "complete-btn";
        completeButton.textContent = book.completed ? "↩ Undo" : "✓ Complete";

        completeButton.addEventListener("click", () => {
            book.completed = !book.completed;
            saveBooks();
            displayBooks();
        });

        const deleteButton = document.createElement("button");
        deleteButton.className = "delete-btn";
        deleteButton.textContent = "🗑 Delete";

        deleteButton.addEventListener("click", () => {
            books = books.filter(item => item.id !== book.id);
            saveBooks();
            displayBooks();
        });

        actions
```

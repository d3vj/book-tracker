const express = require("express");
const app = express();
const sequelize = require("./config/database");
const Book = require("./models/Book");
app.use(express.json());
const PORT = 3000;

app.get("/", (req,res) => {
    res.send("Api to track books is running");
});

sequelize.authenticate()
  .then(() => console.log("Database connected"))
  .catch((error) => console.log("Database connection failed", error));



sequelize.sync()
  .then(() => console.log("Tables synced"))
  .catch(error => console.log(error));

app.listen(PORT, () => {
console.log(`Server Is Running on port ${PORT}`);
});

app.get("/books",async (req, res) => {
const books = await Book.findAll();
  res.json(books);

  //await res.json(Book.findAll());//would this work even?????
});

app.get("/books/:id", async (req,res) => {
    const book = await Book.findByPk(req.params.id);

    if(!book){
        return res.status(404).json({ 
            error: "Book not found"
         });
    }
    res.json(book)
})

// POST create a new book
app.post('/books', async (req, res) => {

     if (!req.body.title || !req.body.author || !req.body.status) {
  return res.status(400).json({
    error: "Missing required fields"
  });
}
const newBook = await Book.create({
  title: req.body.title,
  author: req.body.author,
  status: req.body.status
});

res.status(201).json(newBook);
});

// PUT update book

app.put("/books/:id", async (req, res) => {
  const book = await Book.findByPk(req.params.id);

  if (!book) {
    return res.status(404).json({
      error: "Book not found"
    });
  }

  book.title = req.body.title;
  book.author = req.body.author;
  book.status = req.body.status;

  await book.save();

  res.json(book);
});

// DELETE a book
// DELETE a book
app.delete('/books/:id', async (req, res) => {
  const book = await Book.findByPk(req.params.id);

  if (!book) {
    return res.status(404).json({
      error: "Book not found"
    });
  }

  await book.destroy();

  res.json(book);
});
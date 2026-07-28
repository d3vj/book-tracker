const express = require("express");
const app = express();
app.use(express.json());
const PORT = 3000;

const books = [
  {
    id: 1,
    title: "The Stranger",
    author: "Albert Camus",
    status: "Finished"
  }
]

app.get("/", (req,res) => {
    res.send("Api to track books is running");
});

app.listen(PORT, () => {
console.log(`Server Is Runnig on port ${PORT}`);
});

app.get("/books", (req, res) => {
  res.json(books);
});

app.get("/books/:id", (req,ses) => {
    const book = books.find((book) => book.id === Number(req.params.id));

    if(!book){
        return res.status(404).json({Message: "Book not found"})
    }
    res.json(boo)
})
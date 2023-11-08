var express = require('express');

var router = express.Router();
var books=require('../resources/books')
//const Book = require('../models/book');
/* GET home page. */
router.get('/add', function (req, res, next) {
  res.render('addBooks', { title: 'Book App' });
});

router.post('/save', function (req, res, next) {
  books.push({ ...req.body, id: `00${books.length + 1}` })
  res.redirect('/')
})

// router.post('/save', async function (req, res) {
//   await Book.insertMany([ { ...req.body } ])
//   res.redirect('/');

// });

router.get('/edit/:_id', function(req, res, next){
  const book = books.find((book)=>book._id === req.params._id)
  res.render('editBooks', {title: "Edit Books", book})
})


// router.get('/edit/:_id', async function (req, res) {
//   console.log(req.params._id);
//   const book = await Book.findOne({ _id: req.params._id });
//   res.render('editBooks', {
//     title: "Edit Book",
//     book
//   })
// });

router.get('/delete/:_id', function(req, res, next) {
  const delIndex = books.findIndex((book) => book._id === req.params._id);
  if (delIndex !== -1) {
      books.splice(delIndex, 1);
      console.log(`Book with _id ${req.params._id} deleted`);
  } else { console.log(`Book with _id ${req.params._id} not found`); }

  res.redirect('/');
});

router.post('/saveEdited/:_id', function(req, res, next){
    const currIndex = books.findIndex((book)=>book._id === req.params._id)
    books.splice(currIndex, 1, {...req.body, _id: req.params._id})
    res.redirect('/')
})

// router.post('/saveEdited/:_id', async function (req, res, next) {
//   const currIndex =await  Book.findOneAndUpdate((book) => book._id === req.params._id)
//   Book.splice(currIndex, 1, { ...req.body, _id: req.params._id })
//   res.redirect('/')
// });
//  New route for deleting a book
// router.get('/delete/:_id', function(req, res, next){
//   const book = Book.findOne((book)=>book._id === req.params._id)
//   res.render('deleteBooks', {title: "Edit Books", book})
//   if (index !== -1) {
//       // Remove the book from the array
//       Book.splice(index, 1);
//   }
//   res.redirect('/');
// });
// router.get('/delete/:id',async function (req,res, next) {
//   const book=await Book.findOneAndDelete((book)=>book._id ===req.params._id)
//   res.render('deleteBooks', {title: "Edit Books", Book})
//   res.redirect('/')
  
//   //   if (index !== -1) {
// });

module.exports = router;

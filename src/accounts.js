function findAccountById(accounts, id) {
   let foundId = accounts.find((account) => account.id === id);
 return foundId;
}

function sortAccountsByLastName(accounts) {
  accounts.sort((accountA, accountB) =>
  accountA.name.last.toLowerCase() > accountB.name.last.toLowerCase() ? 1 : -1
 );
 return accounts;
}

function getTotalNumberOfBorrows(account, books) {
 let { id: accountId } = account;
   return books.reduce((accumulator, book) => {
     return (accumulator + book.borrows
             .filter(borrow => borrow.id === accountId)
             .reduce((accumulatorBorrows, borrow) => accumulatorBorrows + 1, 0)
        );
    }, 0);
}

function getBooksPossessedByAccount(account, books, authors) {
  let  borrowedBooks = books.filter(book => book.borrows.some(borrow => (!borrow.returned && borrow.id === account.id)));
  let result = [];
  let { findAuthorById } = require("./books");
  borrowedBooks.forEach(book => {
    let bookAuthor = findAuthorById(authors, book.authorId);
    result.push({
      id: book.id,
      title: book.title,
      genre: book.genre,
      authorId: book.authorId,
      author: bookAuthor,
      borrows: book.borrows,
    });
  });
  return result;
}
function borrowsById (book, {id}) {
  return book.borrows.filter(borrow => borrow.id === id);
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};

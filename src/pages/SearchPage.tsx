import axios from "axios";
import { FormEvent, useState } from "react";
import { Book } from "../@types/Book";

export default function SearchPage() {
  const [bookName, setBookName] = useState<string>("");
  const [books, setBooks] = useState<Book[]>([]);

  const searchBooksByName = async (event: FormEvent) => {
    event.preventDefault();
    try {
      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${bookName}`
      );

      if (response.data.items && response.data.items.length > 0) {
        const foundBooks: Book[] = response.data.items;
        setBooks(foundBooks);
        console.log(response);
      } else {
        setBooks([]);
      }
    } catch (error) {
      console.error("Error fetching books by name:", error);
    }
  };

  return (
    <div className="flex flex-col items-center mt-20">
      <div className="w-full max-w-7xl font-medium">
        <form
          onSubmit={searchBooksByName}
          className="flex items-center gap-3 my-8"
          action=""
        >
          <input
            type="text"
            placeholder="Enter book name"
            className="grow p-2 border outline-none rounded"
            value={bookName}
            onChange={(e) => setBookName(e.target.value)}
          />

          <button
            onClick={searchBooksByName}
            className="rounded p-2 bg-blue-500 text-white font-medium"
          >
            Search
          </button>
        </form>
        <ul>
          {books.length > 0 && (
            <ul className="flex flex-col gap-20">
              {books.map((book) => (
                <li key={book.id} className="flex flex-col gap-3">
                  <div>
                    {book.volumeInfo.imageLinks && (
                      <img
                        src={book.volumeInfo.imageLinks.thumbnail}
                        alt={`Capa do livro ${book.volumeInfo.title}`}
                      />
                    )}
                  </div>
                  <div className="flex flex-col gap-2">
                    <h2>Título: {book.volumeInfo.title}</h2>
                    {book.volumeInfo.authors && (
                      <p>Autor: {book.volumeInfo.authors.join(", ")}</p>
                    )}
                    {book.volumeInfo.categories && (
                      <p>Gênero: {book.volumeInfo.categories.join(", ")}</p>
                    )}
                    {book.volumeInfo.publisher ? (
                      <p>Editora: {book.volumeInfo.publisher}</p>
                    ) : (
                      <p>Editora: N/A</p>
                    )}
                    {book.volumeInfo.publishedDate && (
                      <p>
                        Ano: {book.volumeInfo.publishedDate.substring(0, 4)}
                      </p>
                    )}
                    {book.volumeInfo.industryIdentifiers &&
                      book.volumeInfo.industryIdentifiers.map((identifier) => (
                        <p key={identifier.type}>
                          {identifier.type}: {identifier.identifier}
                        </p>
                      ))}
                    {book.volumeInfo.pageCount && (
                      <p>Número de páginas: {book.volumeInfo.pageCount}</p>
                    )}
                    {book.volumeInfo.description && (
                      <p>Descrição: {book.volumeInfo.description}</p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </ul>
      </div>
    </div>
  );
}

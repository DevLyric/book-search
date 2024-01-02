import { FormEvent, useState } from "react";
import axios from "axios";
import Form from "../components/Form";
import BookDetails from "../components/BookDetails";
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
      } else {
        setBooks([]);
      }
    } catch (error) {
      console.error("Error fetching books by name:", error);
    }
  };

  return (
    <div className="flex flex-col items-center mt-20">
      <div className="w-full max-w-7xl px-6">
        <Form
          onSubmit={searchBooksByName}
          value={bookName}
          onChange={(event) => setBookName(event.target.value)}
        />
        {books.length > 0 && (
          <>
            {books.map((book) => (
              <BookDetails key={book.id} book={book} />
            ))}
          </>
        )}
      </div>
    </div>
  );
}

import { Book } from "../@types/Book";

export default function BookDetails({ book }: { book: Book }) {
  return (
    <li key={book.id} className="flex flex-col gap-3 my-20">
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
          <p>
            Autor: {""}
            {book.volumeInfo.authors.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </p>
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
          <p>Ano: {book.volumeInfo.publishedDate.substring(0, 4)}</p>
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
  );
}

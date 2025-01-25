// src/App.tsx
import { useState, useEffect } from "react";
import { fetchBibleVerse, fetchBooks } from "./api";

interface BibleVerse {
  book: string;
  chapter: number;
  verse: number;
  text: string;
}

const App = () => {
  const [books, setBooks] = useState<string[]>([]);
  const [book, setBook] = useState<string>("");
  const [chapter, setChapter] = useState<number | "">("");
  const [verse, setVerse] = useState<number | "">("");
  const [bibleVerse, setBibleVerse] = useState<BibleVerse | null>(null);

  // 성경 책 목록을 가져오는 useEffect
  useEffect(() => {
    const getBooks = async () => {
      const booksList = await fetchBooks();
      setBooks(booksList);
    };

    getBooks();
  }, []);

  // 검색 처리 함수
  const handleSearch = async () => {
    if (book && chapter && verse) {
      try {
        const verseData = await fetchBibleVerse(
          book,
          Number(chapter),
          Number(verse)
        );
        setBibleVerse(verseData);
      } catch (error) {
        alert("성경 구절을 찾을 수 없습니다.");
      }
    } else {
      alert("책, 장, 절을 모두 입력해주세요!");
    }
  };

  return (
    <div className="container">
      <h1>성경 구절 검색</h1>

      <div>
        <label htmlFor="book">책: </label>
        <select
          id="book"
          value={book}
          onChange={(e) => setBook(e.target.value)}
        >
          <option value="">책을 선택하세요</option>
          {books.map((bookName, index) => (
            <option key={index} value={bookName}>
              {bookName}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="chapter">장: </label>
        <input
          type="number"
          id="chapter"
          value={chapter}
          onChange={(e) =>
            setChapter(e.target.value === "" ? "" : Number(e.target.value))
          }
        />
      </div>

      <div>
        <label htmlFor="verse">절: </label>
        <input
          type="number"
          id="verse"
          value={verse}
          onChange={(e) =>
            setVerse(e.target.value === "" ? "" : Number(e.target.value))
          }
        />
      </div>

      <button onClick={handleSearch}>검색</button>

      {bibleVerse && (
        <div>
          <h2>
            {bibleVerse.book} {bibleVerse.chapter}:{bibleVerse.verse}
          </h2>
          <p>{bibleVerse.text}</p>
        </div>
      )}
    </div>
  );
};

export default App;

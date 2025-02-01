import { useState, useEffect } from "react";
import { fetchBibleChapter, fetchBooks } from "./api";

interface BibleVerse {
  book: string;
  chapter: number;
  verse: number;
  text: string;
}

const BibleReader = () => {
  const [books, setBooks] = useState<string[]>([]);
  const [book, setBook] = useState<string>("Genesis");
  const [chapter, setChapter] = useState<number>(1);
  const [verses, setVerses] = useState<BibleVerse[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  // 성경 책 목록 불러오기
  useEffect(() => {
    const loadBooks = async () => {
      const booksList = await fetchBooks();
      setBooks(booksList);
    };
    loadBooks();
  }, []);

  // 성경 구절 가져오기
  useEffect(() => {
    fetchVerses();
  }, [book, chapter]);

  const fetchVerses = async () => {
    setLoading(true);
    try {
      const data = await fetchBibleChapter(book, chapter);
      setVerses(data);
    } catch (error) {
      setVerses([]);
      console.error("구절을 불러오는 중 오류 발생:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">📖 성경 읽기</h1>

      {/* 성경 책 선택 */}
      <div>
        <label htmlFor="book">📚 책:</label>
        <select
          id="book"
          value={book}
          onChange={(e) => setBook(e.target.value)}
          className="border p-2 m-2"
        >
          {books.map((bookName, index) => (
            <option key={index} value={bookName}>
              {bookName}
            </option>
          ))}
        </select>
      </div>

      {/* 장 선택 */}
      <div>
        <label htmlFor="chapter">📜 장:</label>
        <input
          type="number"
          id="chapter"
          value={chapter}
          onChange={(e) => setChapter(Number(e.target.value))}
          className="border p-2 m-2 w-20"
        />
      </div>

      <button onClick={fetchVerses} className="bg-blue-500 text-white px-4 py-2 rounded">
        🔍 검색
      </button>

      {/* 로딩 상태 */}
      {loading ? (
        <p>⏳ 로딩 중...</p>
      ) : (
        <div className="mt-4">
          {verses.length > 0 ? (
            verses.map((verse) => (
              <p key={verse.verse}>
                <strong>{verse.verse}</strong> {verse.text}
              </p>
            ))
          ) : (
            <p>⚠️ 구절을 찾을 수 없습니다.</p>
          )}
        </div>
      )}

      {/* 다음 장으로 이동 */}
      <button
        onClick={() => setChapter((prev) => prev + 1)}
        className="mt-4 bg-green-500 text-white px-4 py-2 rounded"
      >
        다음 장 →
      </button>
    </div>
  );
};

export default BibleReader;

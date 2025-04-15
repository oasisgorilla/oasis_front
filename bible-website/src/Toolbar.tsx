import React from "react";
import "./Toolbar.css";

interface ToolbarProps {
  books: string[];
  book: string;
  setBook: (book: string) => void;
  chapters: number[];
  chapter: number;
  setChapter: (chapter: number) => void;
  fetchVerses: () => void;
}

const Toolbar: React.FC<ToolbarProps> = ({
  books,
  book,
  setBook,
  chapters,
  chapter,
  setChapter,
  fetchVerses,
}) => {
  return (
    <div className="toolbar">
      <h2 className="toolbar-title">📚 성경</h2>
      <div className="toolbar-section">
        <h3 className="toolbar-subtitle">책</h3>
        <select
          className="toolbar-select"
          value={book}
          onChange={(e) => setBook(e.target.value)}
        >
          {books.map((b) => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
        </select>
      </div>
      <div className="toolbar-section">
        <h3 className="toolbar-subtitle">장</h3>
        <select
          className="toolbar-select"
          value={chapter}
          onChange={(e) => setChapter(Number(e.target.value))}
        >
          {chapters.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>
      <button className="toolbar-button" onClick={fetchVerses}>
        불러오기 🔍
      </button>
    </div>
  );
};

export default Toolbar;
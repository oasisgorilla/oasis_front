import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  loadBooks,
  loadVerses,
  setBook,
  setChapter,
} from "./features/bible/bibleSlice";
import type { RootState, AppDispatch } from "./app/store";
import Toolbar from "./Toolbar.tsx";
import "./BibleReader.css";

const BibleReader = () => {
  const dispatch = useDispatch<AppDispatch>();
  const contentRef = useRef<HTMLDivElement>(null);
  const { books, book, chapters, chapter, verses, loading } = useSelector(
    (state: RootState) => state.bible
  );

  useEffect(() => {
    dispatch(loadBooks());
  }, [dispatch]);

  useEffect(() => {
    dispatch(loadVerses({ book, chapter }));
  }, [dispatch, book, chapter]);

  useEffect(() => {
    const handleScroll = () => {
      const toolbar = document.querySelector(".toolbar") as HTMLElement;
      if (toolbar && contentRef.current) {
        toolbar.style.top = `${-contentRef.current.scrollTop}px`;
      }
    };
    const node = contentRef.current;
    node?.addEventListener("scroll", handleScroll);
    return () => {
      node?.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="reader-container">
      <Toolbar
        books={books}
        book={book}
        setBook={(b) => dispatch(setBook(b))}
        chapters={chapters}
        chapter={chapter}
        setChapter={(c) => dispatch(setChapter(c))}
        fetchVerses={() => dispatch(loadVerses({ book, chapter }))}
      />
      <div className="reader-content">
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
      </div>
    </div>
  );
};

export default BibleReader;
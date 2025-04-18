import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchBibleChapter, fetchBooks } from "../../api";

interface BibleVerse {
  book: string;
  chapter: number;
  verse: number;
  text: string;
}

interface BibleState {
  books: string[];
  book: string;
  chapters: number[];
  chapter: number;
  verses: BibleVerse[];
  loading: boolean;
}

const initialState: BibleState = {
  books: [],
  book: "Genesis",
  chapters: [
    1,  2,  3,  4,  5,  6,  7,  8,  9, 10,
   11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
   21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
   31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
   41, 42, 43, 44, 45, 46, 47, 48, 49, 50
  ],
  chapter: 1,
  verses: [],
  loading: false,
};

export const loadBooks = createAsyncThunk("bible/loadBooks", async () => {
  return await fetchBooks();
});

export const loadVerses = createAsyncThunk(
  "bible/loadVerses",
  async ({ book, chapter }: { book: string; chapter: number }) => {
    return await fetchBibleChapter(book, chapter);
  }
);

const bibleSlice = createSlice({
  name: "bible",
  initialState,
  reducers: {
    setBook: (state, action) => {
      state.book = action.payload;
      state.chapter = 1;
      const chapterCount = bibleStructure[state.book];
      state.chapters = Array.from({ length: chapterCount }, (_, i) => i + 1);
    },
    setChapter: (state, action) => {
      state.chapter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadBooks.fulfilled, (state, action) => {
        state.books = action.payload;
      })
      .addCase(loadVerses.pending, (state) => {
        state.loading = true;
        state.verses = [];
      })
      .addCase(loadVerses.fulfilled, (state, action) => {
        state.verses = action.payload;
        state.loading = false;
      })
      .addCase(loadVerses.rejected, (state) => {
        state.verses = [];
        state.loading = false;
      });
  },
});

const bibleStructure: { [key: string]: number } = {
    "Genesis": 50,
    Exodus: 40,
    Leviticus: 27,
    Numbers: 36,
    Deuteronomy: 34,
    Joshua: 24,
    Judges: 21,
    Ruth: 4,
    "1 Samuel": 31,
    "2 Samuel": 24,
    "1 Kings": 22,
    "2 Kings": 25,
    "1 Chronicles": 29,
    "2 Chronicles": 36,
    Ezra: 10,
    Nehemiah: 13,
    Esther: 10,
    Job: 42,
    Psalms: 150,
    Proverbs: 31,
    Ecclesiastes: 12,
    "Song of Solomon": 8,
    Isaiah: 66,
    Jeremiah: 52,
    Lamentations: 5,
    Ezekiel: 48,
    Daniel: 12,
    Hosea: 14,
    Joel: 3,
    Amos: 9,
    Obadiah: 1,
    Jonah: 4,
    Micah: 7,
    Nahum: 3,
    Habakkuk: 3,
    Zephaniah: 3,
    Haggai: 2,
    Zechariah: 14,
    Malachi: 4,
    Matthew: 28,
    Mark: 16,
    Luke: 24,
    John: 21,
    Acts: 28,
    Romans: 16,
    "1 Corinthians": 16,
    "2 Corinthians": 13,
    Galatians: 6,
    Ephesians: 6,
    Philippians: 4,
    Colossians: 4,
    "1 Thessalonians": 5,
    "2 Thessalonians": 3,
    "1 Timothy": 6,
    "2 Timothy": 4,
    Titus: 3,
    Philemon: 1,
    Hebrews: 13,
    James: 5,
    "1 Peter": 5,
    "2 Peter": 3,
    "1 John": 5,
    "2 John": 1,
    "3 John": 1,
    Jude: 1,
    Revelation: 22,
  };

export const { setBook, setChapter } = bibleSlice.actions;
export default bibleSlice.reducer;

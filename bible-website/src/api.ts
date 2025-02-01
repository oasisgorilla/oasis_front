// src/api.ts
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api/bible';

export const fetchBibleChapter = async (book: string, chapter: number) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${book}/${chapter}/`); // 장만 가져오도록 함
    return response.data;
  } catch (error) {
    console.error('Error fetching Bible verse:', error);
    throw error;
  }
};

export const fetchBooks = async () => {
  // 성경 책 목록을 API에서 받아오는 함수 (예시로 제공)
  return [
    "Genesis", "Exodus", "Leviticus", "Numbers", "Deuteronomy",
    "Joshua", "Judges", "Ruth", "1 Samuel", "2 Samuel",
    "1 Kings", "2 Kings", "1 Chronicles", "2 Chronicles", "Ezra",
    "Nehemiah", "Esther", "Job", "Psalms", "Proverbs",
    "Ecclesiastes", "Song of Solomon", "Isaiah", "Jeremiah", "Lamentations",
    "Ezekiel", "Daniel", "Hosea", "Joel", "Amos",
    "Obadiah", "Jonah", "Micah", "Nahum", "Habakkuk",
    "Zephaniah", "Haggai", "Zechariah", "Malachi", "Matthew",
    "Mark", "Luke", "John", "Acts", "Romans",
    "1 Corinthians", "2 Corinthians", "Galatians", "Ephesians", "Philippians",
    "Colossians", "1 Thessalonians", "2 Thessalonians", "1 Timothy", "2 Timothy",
    "Titus", "Philemon", "Hebrews", "James", "1 Peter",
    "2 Peter", "1 John", "2 John", "3 John", "Jude",
    "Revelation"
  ];
};

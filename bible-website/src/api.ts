// src/api.ts
import axios from 'axios';

const API_BASE_URL = 'http://oasisgorilla.ddns.net:8000/api';
// const API_BASE_URL = 'http://127.0.0.1:8000/api/bible'; // 로컬

export const fetchBibleChapter = async (book: string, chapter: number) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/bible/${book}/${chapter}/`); // 장만 가져오도록 함
    return response.data;
  } catch (error) {
    console.error('Error fetching Bible verse:', error);
    throw error;
  }
};

// 챗봇 응답을 가져오는 API
export const fetchLlamaResponse = async (text: string) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/chat/`, {
      prompt: text, // input 데이터를 포함
    });
    return response.data.response; // 응답이 'response'로 전달됨
  } catch (error) {
    console.error("Error fetching llama response:", error);
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

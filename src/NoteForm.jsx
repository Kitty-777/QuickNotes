import { useState } from "react";
import { db } from "./firebaseConfig";
import { collection, addDoc } from "firebase/firestore";

export default function NoteForm() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !content) return;

    try {
      await addDoc(collection(db, "notes"), {
        title,
        content,
        createdAt: new Date()
      });
      setTitle("");
      setContent("");
    } catch (err) {
      console.error("Error adding note: ", err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 bg-gradient-to-tr from-purple-50 via-pink-50 to-blue-50 p-6 rounded-3xl shadow-xl backdrop-blur-md"
    >
      <h2 className="text-2xl font-bold text-purple-700 text-center">Write a New Note</h2>

      <input
        type="text"
        className="p-3 rounded-xl border-2 border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-400 placeholder-purple-500 text-purple-800"
        placeholder="Note Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        rows="5"
        className="p-3 rounded-xl border-2 border-purple-300 focus:outline-none focus:ring-2 focus:ring-pink-300 placeholder-purple-500 text-purple-800 resize-none"
        placeholder="Your note here..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <button
        type="submit"
        className="bg-gradient-to-r from-pink-400 to-purple-500 text-white px-6 py-2 rounded-xl font-semibold hover:scale-105 transition-all shadow-md hover:shadow-pink-400 cursor-pointer"
      >
        Save Note
      </button>
    </form>
  );
}

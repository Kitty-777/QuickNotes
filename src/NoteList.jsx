import { useState, useEffect } from "react";
import { db } from "./firebaseConfig";
import {
  collection,
  onSnapshot,
  query,
  orderBy,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

export default function NoteList() {
  const [notes, setNotes] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");

  useEffect(() => {
    const q = query(collection(db, "notes"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const notesArr = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setNotes(notesArr);
    });

    return () => unsubscribe();
  }, []);

  const handleEdit = (note) => {
    setEditingId(note.id);
    setEditTitle(note.title);
    setEditContent(note.content);
  };

  const handleSave = async (id) => {
    const noteRef = doc(db, "notes", id);
    await updateDoc(noteRef, {
      title: editTitle,
      content: editContent,
    });
    setEditingId(null);
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditTitle("");
    setEditContent("");
  };

  return (
    <div className="flex flex-col gap-4 max-h-[70vh] overflow-y-auto pr-2">
      {notes.map((note) => (
        <div
          key={note.id}
          className="bg-gradient-to-tr from-pink-200 via-purple-200 to-blue-200 p-4 rounded-2xl shadow-xl relative transition-transform hover:scale-[1.01]"
        >
          {editingId === note.id ? (
            <>
              <input
                className="w-full p-2 mb-2 rounded text-purple-800 outline-violet-500"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
              />
              <textarea
                className="w-full p-2 rounded text-purple-800 outline-violet-500"
                rows="4"
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
              />
              <div className="flex justify-end gap-2 mt-2">
                <button
                  onClick={() => handleSave(note.id)}
                  className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 text-sm cursor-pointer"
                >
                  Save
                </button>
                <button
                  onClick={handleCancel}
                  className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600 text-sm cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </>
          ) : (
            <>
              <h3 className="text-xl font-semibold text-purple-800">
                {note.title}
              </h3>
              <p className="text-gray-700 mt-2">{note.content}</p>
              <div className="absolute top-2 right-2 flex gap-2">
                <button
                  onClick={() => handleEdit(note)}
                  className="bg-yellow-400 text-white px-2 py-1 rounded text-xs hover:bg-yellow-500 transition cursor-pointer"
                >
                  Edit
                </button>
                <button
                  onClick={async () => {
                    await deleteDoc(doc(db, "notes", note.id));
                  }}
                  className="bg-red-500 text-white px-2 py-1 rounded text-xs hover:bg-red-600 transition cursor-pointer"
                >
                  Delete
                </button>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
}

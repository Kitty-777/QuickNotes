import NoteForm from './NoteForm'
import NoteList from './NoteList'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-pink-100 p-4 font-sans">
    <div className="flex flex-col md:flex-row gap-6">
      {/* Left Page: Note Form */}
      <div className="flex-1 bg-white/80 rounded-xl shadow-lg p-6">
        <NoteForm />
      </div>

      {/* Right Page: Note Display */}
      <div className="flex-1 bg-white/80 rounded-xl shadow-lg p-6 overflow-x-auto">
        <NoteList />
      </div>
    </div>
  </div>
  );
}

export default App;

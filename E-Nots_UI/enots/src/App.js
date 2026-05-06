import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// ✅ Updated paths to match your exact folder structure
import NotesList from './Components/NotesList/NotesList';
import NoteForm from './Components/NoteForm/NoteForm'; 
import './index.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <header style={{ textAlign: 'center', padding: '20px', backgroundColor: '#333', color: 'white' }}>
          <h1 style={{ margin: 0 }}>Notes Management System</h1>
        </header>
        
        <main>
          <Routes>
            <Route path="/" element={<NotesList />} />
            <Route path="/create" element={<NoteForm />} /> 
            <Route path="/edit/:id" element={<NoteForm />} /> 
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
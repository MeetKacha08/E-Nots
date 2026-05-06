import './SearchBar.css'; // Import the new CSS file

const SearchBar = ({ searchTerm, onSearchChange }) => {
  return (
    <div className="search-bar-container">
      <input
        type="text"
        placeholder="Search notes by title or content..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="search-bar-input"
      />
    </div>
  );
};

export default SearchBar;
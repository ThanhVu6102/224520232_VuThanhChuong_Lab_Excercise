import { useId, useState } from 'react';

// CHECKPOINT 2 DATA SCHEMA
export const SMART_PEOPLE = [
  { id: 'sp-1', name: 'Johann Goethe', age: 82, iq: 210 },
  { id: 'sp-2', name: 'Albert Einstein', age: 76, iq: 205 },
  { id: 'sp-3', name: 'Leonardo da Vinci', age: 67, iq: 180 },
  { id: 'sp-4', name: 'Isaac Newton', age: 84, iq: 190 },
  { id: 'sp-5', name: 'James Maxwell', age: 48, iq: 190 },
  { id: 'sp-6', name: 'William Sidis', age: 46, iq: 200 },
];

export function ScientistDirectory({ initialData = SMART_PEOPLE }) {
  const queryId = useId();
  const iqId = useId();
  const sortId = useId();

  // 1. SINGLE SOURCE OF TRUTH (Raw independent inputs)
  const [people, setPeople] = useState(initialData);
  const [query, setQuery] = useState('');
  const [minIq, setMinIq] = useState(160);
  const [sortBy, setSortBy] = useState('iq-desc');

  // 2. PURE DERIVED STATE (Computed in 1 pass during render, zero effect hooks)
  const visiblePeople = people
    .filter((p) => p.name.toLowerCase().includes(query.trim().toLowerCase()))
    .filter((p) => p.iq >= minIq)
    .toSorted((a, b) => {
      if (sortBy === 'iq-desc') return b.iq - a.iq;
      if (sortBy === 'iq-asc') return a.iq - b.iq;
      if (sortBy === 'age-asc') return a.age - b.age;
      return 0;
    });

  // 3. IMMUTABLE DELETION & RESTORATION
  const handleDelete = (id) => {
    setPeople((prev) => prev.filter((p) => p.id !== id));
  };

  const handleReset = () => {
    setPeople(initialData);
    setQuery('');
    setMinIq(160);
    setSortBy('iq-desc');
  };

  // Type-safe numeric handler: valueAsNumber keeps minIq a number (never 'string' >= number)
  const handleIqChange = (e) => {
    const val = e.target.valueAsNumber;
    setMinIq(Number.isNaN(val) ? 0 : val);
  };

  return (
    <section aria-label="Pioneer Directory" style={{ padding: '20px', maxWidth: '600px' }}>
      <form role="search" onSubmit={(e) => e.preventDefault()} style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '15px' }}>
        {/* Search Input */}
        <div>
          <label htmlFor={queryId}>Search Name: </label>
          <input
            id={queryId}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="e.g. Einstein"
          />
        </div>

        {/* Min IQ Input */}
        <div>
          <label htmlFor={iqId}>Min IQ: </label>
          <input
            id={iqId}
            type="number"
            value={minIq}
            onChange={handleIqChange}
          />
        </div>

        {/* Sort Dropdown */}
        <div>
          <label htmlFor={sortId}>Sort By: </label>
          <select id={sortId} value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="iq-desc">IQ (High to Low)</option>
            <option value="iq-asc">IQ (Low to High)</option>
            <option value="age-asc">Age (Youngest first)</option>
          </select>
        </div>

        <button type="button" onClick={handleReset}>Reset Data</button>
      </form>

      {/* Screen-Reader Live Counter */}
      <output role="status" aria-live="polite" style={{ display: 'block', marginBottom: '15px', fontWeight: 'bold' }}>
        Found {visiblePeople.length} pioneers
      </output>

      {/* Data List */}
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {visiblePeople.map((p) => (
          <li key={p.id} style={{ padding: '10px', borderBottom: '1px solid #ccc', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>
              <strong>{p.name}</strong> — IQ: {p.iq} (Age: {p.age})
            </span>
            <button
              type="button"
              onClick={() => handleDelete(p.id)}
              aria-label={`Delete ${p.name}`}
              style={{ color: 'red', cursor: 'pointer' }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>

      {visiblePeople.length === 0 && (
        <p style={{ color: 'gray', fontStyle: 'italic' }}>No pioneers match your criteria.</p>
      )}
    </section>
  );
}

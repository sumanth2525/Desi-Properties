export default function SegmentToggle({ options, value, onChange }) {
  return (
    <div className="segment-toggle">
      {options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          className={`segment-btn ${value === opt.value ? 'active' : ''}`}
          onClick={() => onChange(opt.value)}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

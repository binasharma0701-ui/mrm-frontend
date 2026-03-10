import './Select.css'

export default function Select({
  label,
  error,
  options = [],
  value,
  onChange,
  disabled = false,
  required = false,
  placeholder = 'Select an option',
  className = '',
  ...props
}) {
  return (
    <div className={`select-wrapper ${error ? 'error' : ''}`}>
      {label && (
        <label className="select-label">
          {label}
          {required && <span className="required">*</span>}
        </label>
      )}
      <select
        className={`select ${className}`}
        value={value}
        onChange={onChange}
        disabled={disabled}
        {...props}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <span className="select-error">{error}</span>}
    </div>
  )
}

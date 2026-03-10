export default function Breadcrumb({ items = [] }) {
  return (
    <nav className="breadcrumb">
      {items.map((item, index) => (
        <div key={index} className="breadcrumb-item">
          {item.link ? (
            <a href={item.link}>{item.label}</a>
          ) : (
            <span>{item.label}</span>
          )}
          {index < items.length - 1 && <span className="breadcrumb-separator">/</span>}
        </div>
      ))}
    </nav>
  )
}

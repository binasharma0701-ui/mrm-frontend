import './RatingStars.css'

export default function RatingStars({ rating = 0, count = 0, interactive = false, onRate = null }) {
  const stars = [1, 2, 3, 4, 5]

  return (
    <div className="rating-stars">
      <div className="stars-container">
        {stars.map(star => {
          const fillLevel = Math.max(0, Math.min(100, (rating - (star - 1)) * 100));
          const starId = `star-${star}-${Math.random().toString(36).substr(2, 9)}`;

          return (
            <div
              key={star}
              className="star-wrapper"
              onClick={() => interactive && onRate?.(star)}
              style={{ cursor: interactive ? 'pointer' : 'default' }}
            >
              <svg
                viewBox="0 0 24 24"
                className="star-svg"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <linearGradient id={starId}>
                    <stop offset={`${fillLevel}%`} stopColor="#FFB800" />
                    <stop offset={`${fillLevel}%`} stopColor="#E2E8F0" />
                  </linearGradient>
                </defs>
                <path
                  d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
                  fill={`url(#${starId})`}
                />
              </svg>
            </div>
          );
        })}
      </div>
      {(count > 0 || (rating > 0)) && (
        <span className="rating-text">
          {rating.toFixed(1)} {count > 0 && `(${count} Reviews)`}
        </span>
      )}
    </div>
  )
}

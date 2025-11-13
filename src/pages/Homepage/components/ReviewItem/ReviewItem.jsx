import React, { useState } from "react";
import { Card } from "react-bootstrap";
import "./ReviewItem.style.css";

const ReviewItem = ({ review }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const contentLength = review.content.length;
  const MAX_LENGTH = 300;
  const shouldTruncate = contentLength > MAX_LENGTH;

  // 항상 처음에는 축약된 상태
  const displayContent = isExpanded ? review.content : shouldTruncate ? review.content.slice(0, MAX_LENGTH) + "..." : review.content;

  return (
    <Card className="review-card mb-3">
      <Card.Body>
        <div className="review-header">
          <div className="review-author">
            {review.author_details.avatar_path ? (
              <img
                src={review.author_details.avatar_path.startsWith("/https") ? review.author_details.avatar_path.slice(1) : `https://image.tmdb.org/t/p/w45${review.author_details.avatar_path}`}
                alt={review.author}
                className="review-avatar"
                onError={(e) => {
                  e.target.style.display = "none";
                  e.target.nextSibling.style.display = "flex";
                }}
              />
            ) : (
              <div className="review-avatar-placeholder">{review.author[0].toUpperCase()}</div>
            )}
            <div>
              <h6 className="mb-0">{review.author}</h6>
              <small className="text-muted">{new Date(review.created_at).toLocaleDateString("ko-KR")}</small>
            </div>
          </div>
          {review.author_details.rating && <div className="review-rating">⭐ {review.author_details.rating}/10</div>}
        </div>
        <Card.Text className="review-content mt-3">{displayContent}</Card.Text>
        {shouldTruncate && (
          <button className="btn btn-link p-0 text-decoration-none toggle-btn" onClick={() => setIsExpanded(!isExpanded)}>
            {isExpanded ? "접기 ▲" : "더보기 ▼"}
          </button>
        )}
      </Card.Body>
    </Card>
  );
};

export default ReviewItem;

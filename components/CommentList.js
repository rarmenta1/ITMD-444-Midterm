import React from 'react';

const CommentList = ({ comments, onDelete, onEdit }) => {
  return (
    <div>
      <h2>Comment List</h2>
      <ul>
        {comments.map((comment) => (
          <li key={comment.id}>
            {comment.content} - User ID: {comment.User ? comment.User.id : 'N/A'} - Post ID: {comment.Post ? comment.Post.id : 'N/A'}
            <button onClick={() => onDelete(comment.id)}>Delete</button>
            <button onClick={() => onEdit(comment)}>Edit</button> {/* Pass the specific comment to onEdit */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CommentList;

"use client";  // Mark this component as a Client Component

import React, { useState } from 'react';
import PostComponent from '@/components/PostComponent';
import { Post } from '@/lib/interface';

interface PaginationBlogProps {
  posts: Post[];
}

const PaginationBlog: React.FC<PaginationBlogProps> = ({ posts }) => {
  const postsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(posts.length / postsPerPage);

  const currentPosts = posts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  );

  const goToNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const goToPrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  return (
    <div>
      {currentPosts?.length > 0 &&
        currentPosts.map((post) => (
          <PostComponent key={post._id} post={post} />
        ))}

      {/* Pagination controls */}
      <div className="flex justify-between mt-4">
        <button
          onClick={goToPrevPage}
          disabled={currentPage === 1}
          className={`px-4 py-2 bg-gray-200 rounded ${currentPage === 1 ? 'opacity-50' : ''}`}
        >
          Previous
        </button>

        <span>Page {currentPage} of {totalPages}</span>

        <button
          onClick={goToNextPage}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 bg-gray-200 rounded ${currentPage === totalPages ? 'opacity-50' : ''}`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PaginationBlog;

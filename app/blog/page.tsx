import React from 'react';
import { client } from "@/sanity/lib/client";
import PaginationBlog from '@/components/PaginationBlog';  // Create this component for pagination logic
import Header from '@/components/Header';
import { Post } from '@/lib/interface';

async function getPosts() {
  const query = `
  *[_type == "post"] {
    _id,
    title,
    slug,
    publishedAt,
    excerpt,
    tags[]-> {
      _id,
      slug,
      name
    }
  }
  `;
  const data = await client.fetch(query);
  return data;
}

export const revalidate = 60;

export default async function Blog() {
  const posts: Post[] = await getPosts();  // Fetch data on the server

  return (
    <div>
      <Header title="Articles" />
      <div className="max-w-2xl mx-auto w-full p-4">
        {/* Pass the posts data to the client-side PaginationBlog component */}
        <PaginationBlog posts={posts} />
      </div>
    </div>
  );
}

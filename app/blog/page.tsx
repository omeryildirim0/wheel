import React from 'react'
import { client } from "@/sanity/lib/client";
import Header from '@/components/Header';
import PostComponent from '@/components/PostComponent';
import { Post } from '@/lib/interface';


async function getPosts() {
  const query = `
  *[_type == "post"] {
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

export default async function blog () {
  const posts: Post[] = await getPosts();

  return (
    <div>
      <Header title="Articles"/>
      <div>
        {posts?.length > 0 &&
          posts?.map((post) => <PostComponent key={post?._id} post={post} />)}
      </div>
    </div>
    
  )
}

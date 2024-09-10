import React from 'react'
import { client } from "@/sanity/lib/client";
import Header from '@/components/Header';


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


export default async function blog () {
  const posts = await getPosts();

  return (
    <div>
      <Header title="Articles" />
    </div>
  )
}

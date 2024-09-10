import React from 'react'
import { client } from "@/sanity/lib/client";


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


export default function blog () {
  return (
    <div>blog</div>
  )
}

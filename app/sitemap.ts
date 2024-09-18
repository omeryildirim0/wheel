import { client } from "@/sanity/lib/client";
import { MetadataRoute } from "next";
import { Post } from "@/lib/interface";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {

  // Function to fetch posts dynamically from Sanity
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

  const posts: Post[] = await getPosts();

  // Map over posts to create their URLs for the sitemap
  const postUrls = posts.map((post) => ({
    url: `https://www.wheelofmeals.com/blog/posts/${post.slug.current}`,
    lastModified: new Date(post.publishedAt),
  }));

  // Static routes to include in the sitemap
  const staticRoutes = [
    {
      url: `https://www.wheelofmeals.com/`,
      lastModified: new Date(),
    },
    {
      url: `https://www.wheelofmeals.com/about`,
      lastModified: new Date(),
    },
    {
      url: `https://www.wheelofmeals.com/blog/tag`,
      lastModified: new Date(),
    },
  ];

  // Combine static and dynamic routes, excluding the studio component
  return [
    ...staticRoutes,
    ...postUrls, // Adding dynamic blog post URLs
  ];
}

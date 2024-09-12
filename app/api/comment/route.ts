import { client } from "@/sanity/lib/client";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const data = await req.json();
  const { name, email, comment, postId } = data;

  if (!name || !email || !comment || !postId) {
    return NextResponse.json(
      {
        message: "All fields are required",
      },
      { status: 400 }
    );
  }

  try {
    const newComment = await client.create({
      _type: "comment",
      name,
      email,
      comment,
      post: {
        _type: "reference",
        _ref: postId,
      },
    });
    return NextResponse.json(
      { message: "Comment added successfully", comment: newComment },
      { status: 201 }
    );
  } catch (error) {
    // Use a type assertion to ensure 'error' is treated as an instance of Error
    const errorMessage = (error as Error).message || 'Unknown error';
    console.error("Error creating comment:", errorMessage);

    return NextResponse.json(
      { message: "Failed to create a comment", error: errorMessage },
      { status: 500 }
    );
  }
}

import { google } from "@ai-sdk/google";
import { generateText } from "ai";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { image } = await req.json();

  const system =
    "You are the greatest physicist and mathematician. When I provide you with images, analyze them and give brief yet insightful explanations. If the image contains mathematical equations, solve them, first giving the final answer and then a brief explanation of the steps involved. If the image includes physics-related content (like diagrams or concepts such as gravity), explain the relevant principles in simple terms. For images related to math or physics without explicit equations or concepts, describe the context using your expertise. For all other images, provide a concise description of what is happening based on visual clues. Ensure your explanations are concise yet detailed enough for understanding. If the image has very easy and basic equations then just give the answer no need to explain it. Always Give answer in the form like : The answer is : ...  like this and solution like : Explanation : ... like this ";

  const result = await generateText({
    model: google("gemini-1.5-flash"),
    system,
    messages: [
      {
        role: "user",
        content: [
          {
            type: "image",
            image: new URL(image),
          },
        ],
      },
    ],
  });

  //   return result.response;
  return NextResponse.json(result.text);
}

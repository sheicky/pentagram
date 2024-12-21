import { NextResponse } from "next/server";
import { put } from "@vercel/blob";
import { randomUUID } from "crypto";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { text } = body;   

    // TODO: Call your Image Generation API here
    // For now, we'll just echo back the text
    console.log(text);
    const urlString = process.env.PENTAGRAM_URL;
    if (!urlString) {
      throw new Error("PENTAGRAM_URL is not defined in the environment variables");
    }
    const url = new URL(urlString);
    url.searchParams.set("prompt", text);
    console.log("Requesting image from:", url.toString());  
    
    // Creating a fetch request 
    const apiToken = process.env.API_TOKEN_PENTAGRAM;
    if (!apiToken) {
      return NextResponse.json({
        success: false,
        error: "Unauthorized",
      }, { status: 401 });
    }

    const response = await fetch(url.toString(), {
      method: "GET",
      headers: {
        "X-API-Key": apiToken,
        Accept: "image/jpeg",
      },
    }); 

    if (!response.ok) { 
      const errorText = await response.text();
      console.error("Error response from Pentagram API:", errorText); 
      throw new Error(`Failed to fetch image from Pentagram API: ${response.status}, message: ${errorText}`);
    } 
   
    // Uploading the image to Vercel Blob Storage
    const imageBuffer = await response.arrayBuffer(); 
    const filename = `${crypto.randomUUID()}.jpg`;
    const blob = await put(filename, imageBuffer, {
      access: "public",
      contentType: "image/jpeg",
    });

    console.log("Image uploaded to Vercel Blob Storage:", blob);

    return NextResponse.json({
      success: true,
      imageUrl: blob.url,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to process request" },
      { status: 500 }
    );
  }
}

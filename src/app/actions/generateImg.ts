"use server"

export async function generateImg(text: string) {

    try {
        const response = await fetch(`http://localhost:3000/api/generate-image`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-API-SECRET": process.env.API_SECRET_PENTAGRAM || "",
            },
            body: JSON.stringify({ text }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error ! : ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error generating image:", error);
        return { 
            success: false, 
            error:
                error instanceof Error ? error.message : "Failed to generate image" 
        };     
    }
}


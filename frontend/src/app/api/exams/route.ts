"use server";

export async function GET() {
  const response: Response = await fetch(`${process.env.BACKEND_URI}/exams`);

  if (!response.ok) {
    console.error(`Failed to fetch exams, status: ${response.status}`);
    return {
      status: response.status,
      body: { message: "Failed to fetch exams from the backend" },
    };
  }

  const exams = await response.json();
  return response;
}

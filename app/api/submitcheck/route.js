import { NextResponse } from "next/server";

export async function POST(req) {
  const { submission_id, slug, xcsrftoken, cookie } = await req.json();

  const statusUrl = `https://leetcode.com/submissions/detail/${submission_id}/check/`;
  const refer = `https://leetcode.com/problems/${slug}/`;
  const headers = {
    "Accept-Language": "en-GB,en;q=0.8",
    "Content-Type": "application/json",
    Referer: refer,

    Referer: refer, // Correct usage
    "Sec-CH-UA-Mobile": "?1",
    "X-CSRFToken": xcsrftoken, // Correct usage
    Cookie: cookie, // Correct usage
  };
  try {
    const response = await fetch(statusUrl, {
      method: "GET",
      headers: headers,
    });
    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching submission status:", error);
    return NextResponse.json({ error: "Failed to fetch status" });
  }
}

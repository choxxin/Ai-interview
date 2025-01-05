import { NextResponse } from "next/server";

export async function POST(req) {
  const { interpret_id, slug, xcsrftoken, cookie } = await req.json();
  const statusUrl = `https://leetcode.com/submissions/detail/${interpret_id}/check/`;
  const refer = `https://leetcode.com/problems/${slug}/`;
  const headers = {
    "Accept-Language": "en-GB,en;q=0.8",
    "Content-Type": "application/json",
    Referer: refer, // Correct usage
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
    console.log(data, response.status, response);
    return NextResponse.json(data);
  } catch (error) {
    console.log(data, response.status, response);
    console.error("Error fetching submission status:", error);
    return NextResponse.json({ error: "Failed to fetch status" });
  }
}

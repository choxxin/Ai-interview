import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    // Parse JSON body
    const { cookie, xcsrftoken, typed_code, lang, question_id, slug } =
      await req.json();
    // console.log(cookie, xcsrftoken, typed_code, lanq, question_id, slug);

    const url = `https://leetcode.com/problems/${slug}/submit/`;
    const refer = `https://leetcode.com/problems/${slug}/description/`;

    const headers = {
      "Sec-CH-UA-Mobile": "?1",
      "Content-Type": "application/json", // Explicit content type
      Cookie: cookie, // Ensure valid cookies are passed
      "X-CSRFToken": xcsrftoken, // Ensure valid CSRF token is passed
      Referer: refer, // Ensure the referer matches the expected URL
    };

    const body = {
      lang: lang,
      question_id: question_id,
      typed_code: typed_code,
    };
    // Send POST request
    const response = await fetch(url, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error submitting code:", error); // Log the error for debugging
    return NextResponse.json({ error: error.message });
  }
}

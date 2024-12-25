import { NextResponse } from "next/server";

export async function POST(req) {
  const { interpret_id, slug, xcsrftoken, cookie } = await req.json();
  const statusUrl = `https://leetcode.com/submissions/detail/${interpret_id}/check/`;
  const refer = `https://leetcode.com/problems/${slug}/`;
  const headers = {
    "Accept-Language": "en-GB,en;q=0.8",
    "Content-Type": "application/json",
    Referer: "https://leetcode.com/problems/longest-common-prefix/",
    //Origin:https://leetcode.com
    //Sec-CH-UA:"Brave";v="131", "Chromium";v="131", "Not_A Brand";v="24"
    //Sec-CH-UA-Mobile:?1
    //Sec-CH-UA-Platform:"Android"
    //Sec-Fetch-Dest:empty
    //Sec-Fetch-Mode:same-origin
    //Sec-GPC:1
    //User-Agent:	Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Mobile Safari/537.36
    "X-CSRFToken":
      "irNACXCSl6VcV44kAiRwH9352JWJbz0ZJdYzDq2xbZTjasQcLHNcshIpKeA6FW7H",
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

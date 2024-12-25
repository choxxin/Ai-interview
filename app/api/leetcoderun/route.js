import { NextResponse } from "next/server";
export async function POST(req) {
  const {
    slug,
    xcsrftoken,
    cookie,
    lang,
    question_id,
    typed_code,
    data_input,
  } = await req.json();

  // ("https://leetcode.com/problems/longest-common-prefix/interpret_solution/");
  const url = `https://leetcode.com/problems/${slug}/interpret_solution/`;
  const refer = `https://leetcode.com/problems/${slug}/description/`;
  const headers = {
    Referer: refer, // Correct usage
    "Sec-CH-UA-Mobile": "?1",
    "X-CSRFToken": xcsrftoken, // Correct usage
    Cookie: cookie, // Correct usage
  };

  // Body for the POST request
  const body = {
    lang: lang,
    question_id: question_id,
    typed_code: typed_code,
    data_input: data_input,
  };

  try {
    // Make the POST request
    const response = await fetch(url, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(body),
    });

    // Parse the response
    const data = await response.json();

    // Return the response
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch data" });
  }
}

// export async function POST(request) {
//   const url =
//     "https://leetcode.com/problems/longest-common-prefix/interpret_solution/";
//   const headers = {
//     // Accept: "/",
//     // "Accept-Encoding": "gzip, deflate, br, zstd",
//     // "Accept-Language": "en-GB,en;q=0.8",
//     // "Content-Type": "application/json",
//     Referer: "https://leetcode.com/problems/longest-common-prefix/",
//     // Origin: "https://leetcode.com",
//     // "Sec-CH-UA": '"Brave";v="131", "Chromium";v="131", "Not_A Brand";v="24"',
//     "Sec-CH-UA-Mobile": "?1",
//     // "Sec-CH-UA-Platform": '"Android"',
//     // "Sec-Fetch-Dest": "empty",
//     "Sec-Fetch-Mode": "same-origin",
//     // "Sec-GPC": "1",
//     // "User-Agent":
//     //   "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Mobile Safari/537.36",
//     "X-CSRFToken":
//       "J66TcOv7Kepdgy2yiF7TNh6lWdrvaL7ZCEsFtQtsZBay8hawNTbFsRhXKmAmKa6D",
//     Cookie:
//       "cf_clearance=w3d6hHUTjoA7.1BUTupMGbNQj5bDxXVutMt61vOKYzA-1734868360-1.2.1.1-QWXKJvNPX9kPu6M2teN_zSdpBHgPbzF37CYkPhdD1F4g2zYwn9b.EfagZyjt5cNHk0h1tqKhC7it49WvKzjuLx_cLlBDg_3f3oYSMhiMuzL20KpBjCzqAUzlzJYoFVBFAdJZNf5DvBBrk1RPreujMqdLijnhKZZAv3QoW052B9qDeE9E8OSXWa5DYYTldvkmn_K40mzkkro88Iq.FplIGcpomRWJiY_bwSHIBvZi_RrGf_kPDhg8rGhYlXS9oGXk2G9tHGbIzzPqI1FXIPJnbSHKbogghcQZryVnjEw.FBMgl9xvkl36eLfECl4BjZYfmT_gElJS8Mzn2faUG8qAFPf3NgL3RY0MX7hJxl7qgznpICaNh.1XYH9iYB4Dm_xtQkKOuDgUqkftf_J7sHQUbcYwOexQTy37edwqKGwX9BsWC3S.YnyeJW.Lzu7eaLj3; ip_check=(false, '202.142.81.110'); _dd_s=rum=0&expire=1734949829369; csrftoken=J66TcOv7Kepdgy2yiF7TNh6lWdrvaL7ZCEsFtQtsZBay8hawNTbFsRhXKmAmKa6D; messages=W1siX19qc29uX21lc3NhZ2UiLDAsMjUsIlN1Y2Nlc3NmdWxseSBzaWduZWQgaW4gYXMgZGF6ZWxmcmluay4iXV0:1tPfTN:7ByDhmoRUb9AMjXm-pufMzXs2QNowmNdNB9C3-n6skg; LEETCODE_SESSION=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJfYXV0aF91c2VyX2lkIjoiOTE4MzI2MSIsIl9hdXRoX3VzZXJfYmFja2VuZCI6ImFsbGF1dGguYWNjb3VudC5hdXRoX2JhY2tlbmRzLkF1dGhlbnRpY2F0aW9uQmFja2VuZCIsIl9hdXRoX3VzZXJfaGFzaCI6IjZjNGMzODNjYTQ0NGM4OGI1M2RmMTlmNThjNDc4ZDk4YjgzZGRjNTM2NzU5Yjk3OTU4NWY0OGFiNzUyNzY0MjQiLCJzZXNzaW9uX3V1aWQiOiIyZTNjNTNlNSIsImlkIjo5MTgzMjYxLCJlbWFpbCI6ImRhemVsZnJpbmtAZ21haWwuY29tIiwidXNlcm5hbWUiOiJkYXplbGZyaW5rIiwidXNlcl9zbHVnIjoiZGF6ZWxmcmluayIsImF2YXRhciI6Imh0dHBzOi8vYXNzZXRzLmxlZXRjb2RlLmNvbS91c2Vycy9hdmF0YXJzL2F2YXRhcl8xNjgwNDE0MjYwLnBuZyIsInJlZnJlc2hlZF9hdCI6MTczNDk0ODkzNywiaXAiOiIyMDIuMTQyLjgxLjEzMCIsImlkZW50aXR5IjoiZjUxYmI0ODJjNjYwZDBlZWFkZDFmMDU4MDU4YTJiMzUifQ.E0pmnqpm_J04rscWEkBYUCcl7wsp1b_O8fqhFgtbYgw; INGRESSCOOKIE=4f22ffb59de2b7a86fee64e4dcdee4d7|8e0876c7c1464cc0ac96bc2edceabd27",
//   };

//   // Body for the POST request
//   const body = {
//     lang: "java",
//     question_id: "14",
//     typed_code: `class Solution {
//             public String longestCommonPrefix(String[] strs) {
//                 jjjjj
//             }
//         }`,
//     data_input: '["flower","flow","flight"]\n["dog","racecar","car"]',
//   };

//   try {
//     // Make the POST request
//     const response = await fetch(url, {
//       method: "POST",
//       headers: headers,
//       body: JSON.stringify(body),
//     });

//     // Parse the response
//     const data = await response.json();

//     // Return the response
//     return NextResponse.json(data);
//   } catch (error) {
//     return NextResponse.json({ error: "Failed to fetch data" });
//   }
// }

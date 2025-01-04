// export async function POST(req) {
//   try {
//     const { url, Cookie } = await req.json();
//     // const cookies = {
//     //   __stripe_mid: "fded14d8-e50b-41b3-b9d5-793b6f1f69a25f5cf2",
//     //   INGRESSCOOKIE:
//     //     "04ea8f59b8f8291a012bc1031c29569c|8e0876c7c1464cc0ac96bc2edceabd27",
//     //   ip_check: '(false, "202.142.81.22")',
//     //   cf_clearance:
//     //     "sxO39O7MrQzdKNa9GlScnkRQjdIXdg2Fd36aaTX9AtY-1735728907-1.2.1.1-rQJHqwDm.6rSz5GnWEbzCXROYR2Yc82EOvdfa3EQacSq63kcwFexxKMNEIRfwLVxwWSSn6s9ix5QcBnqeeLump2Br0DNKYNo9XpLqXw0hEPbetBQjBu7.j4IJnI7Y4W9fnfhDzPDitwY1mriLJ9LlGmY86yE3GUKpoLAMKEt.kvZbk1HeUl25q0jNjFG15TEojSn10giIzvAo7oRjkEPcZ5zm7tTERWnLRg0IBJ6pB.2O7MoOiDDy9Kwt2txBqLdqgnaBfM3Ay9kn_5T1DTGKm.0mQVwnZGTlUJUHqb3jESEPWOhHkrxo6ayOHXpNgITHO4EBVvUTX_5Uz_BM1kfU3bE55WAQiI9pAWmuxp3UNew6Cps_DiNyFRPFERzaA9SjWTpBWyK66qkjI9QGifBecanj8QySDpNu1qMA34XK_ureXzhFgJixBz7Kw7dCnTTmnMJpM0tAO4cnCWlfGjqbQ",
//     //   csrftoken:
//     //     "k8wGlWFXnDNZfFP8Ew2yuvkT0qrgtwpOlE58nMVyV6oVtrV5XOyJWvjshDQywgwL",
//     //   messages:
//     //     "W1siX19qc29uX21lc3NhZ2UiLDAsMjUsIlN1Y2Nlc3NmdWxseSBzaWduZWQgaW4gYXMgZGF6ZWxmcmluay4iXV0:1tSwNc:TqvBr3a4PFSC6eDGLxngAZhoL6omO6WVzXbN9si6c1c",
//     //   LEETCODE_SESSION:
//     //     "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJfYXV0aF91c2VyX2lkIjoiOTE4MzI2MSIsIl9hdXRoX3VzZXJfYmFja2VuZCI6ImFsbGF1dGguYWNjb3VudC5hdXRoX2JhY2tlbmRzLkF1dGhlbnRpY2F0aW9uQmFja2VuZCIsIl9hdXRoX3VzZXJfaGFzaCI6IjZjNGMzODNjYTQ0NGM4OGI1M2RmMTlmNThjNDc4ZDk4YjgzZGRjNTM2NzU5Yjk3OTU4NWY0OGFiNzUyNzY0MjQiLCJzZXNzaW9uX3V1aWQiOiI3MzBiMmMyOCIsImlkIjo5MTgzMjYxLCJlbWFpbCI6ImRhemVsZnJpbmtAZ21haWwuY29tIiwidXNlcm5hbWUiOiJkYXplbGZyaW5rIiwidXNlcl9zbHVnIjoiZGF6ZWxmcmluayIsImF2YXRhciI6Imh0dHBzOi8vYXNzZXRzLmxlZXRjb2RlLmNvbS91c2Vycy9hdmF0YXJzL2F2YXRhcl8xNjgwNDE0MjYwLnBuZyIsInJlZnJlc2hlZF9hdCI6MTczNTcyODkxMiwiaXAiOiIyMDIuMTQyLjgxLjgiLCJpZGVudGl0eSI6Ijg0MGUxYTZjZTE4MTg0OTZkNjIyMWVjODAyOGJjMWY0IiwiZGV2aWNlX3dpdGhfaXAiOlsiOWM4OTk5YjY3YjI1MWJmMjA4ZDkyYjk4YWYwN2ExY2EiLCIyMDIuMTQyLjgxLjgiXX0.N78rnTBAFWV8yDRBkRusRv9-xaot5YBj005RwmsuqX8",
//     // };

//     // Custom headers to simulate a real browser request
//     const headers = {
//       "Sec-CH-UA-Mobile": "?1",
//       Cookie: Cookie,
//     };

//     // Make the GET request to fetch the HTML content
//     const response = await fetch(url, {
//       method: "GET",
//       headers: headers,
//     });

//     console.log("Response Status:", response.status); // Debug response status

//     if (!response.ok) {
//       throw new Error(`HTTP error! Status: ${response.status}`);
//     }

//     const htmlContent = await response.text();
//     const $ = cheerio.load(htmlContent);

//     // Extract JSON data from the script tag
//     const rawData = $("#__NEXT_DATA__").html();
//     if (!rawData) {
//       throw new Error("Failed to locate the data in the HTML content");
//     }

//     const jsonData = JSON.parse(rawData);

//     // Locate the question data in the JSON structure
//     const questionData =
//       jsonData?.props?.pageProps?.dehydratedState?.queries.find(
//         (query) => query.queryKey[0] === "questionDetail"
//       )?.state?.data?.question;

//     if (!questionData) {
//       throw new Error("Failed to locate question data in JSON");
//     }

//     // Extract required data
//     const codeSnippets = questionData.codeSnippets || [];
//     const description = $('meta[name="description"]').attr("content");
//     const titleSlug = questionData.titleSlug || "No slug found";
//     const exampleTestcaseList = questionData.exampleTestcaseList || [];

//     const result = {
//       title: questionData.title || "No title found",
//       slug: titleSlug,
//       id: questionData.questionId || "n/a",
//       stats: questionData.stats || "No stats found",
//       description: description || "No description found",
//       difficulty: questionData.difficulty || "No difficulty found",
//       exampleTestcaseList: exampleTestcaseList,
//       codeSnippets: codeSnippets.map((snippet) => ({
//         language: snippet.lang,
//         code: snippet.code,
//       })),
//     };

//     // Return the extracted data as JSON
//     return new Response(JSON.stringify(result, null, 2), {
//       status: 200,
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });
//   } catch (error) {
//     console.error("Error:", error); // Debug the error stack trace
//     return new Response(
//       JSON.stringify({
//         message: "Error fetching the HTML content",
//         error: error.message,
//       }),
//       { status: 500, headers: { "Content-Type": "application/json" } }
//     );
//   }
// }
const puppeteer = require("puppeteer");
const cheerio = require("cheerio");

export async function POST(req) {
  try {
    const { url, Cookie } = await req.json();

    // const browser = await puppeteer.launch({
    //   headless: true, // Running in non-headless mode helps bypass some bot detection
    //   args: ["--disable-blink-features=AutomationControlled"], // Avoid detection
    // });
    const browser = await puppeteer.launch({
      executablePath: "/usr/bin/google-chrome-stable", // Path to the system-installed Chrome
      args: ["--no-sandbox", "--disable-setuid-sandbox"], // Required in most server environments
    });
    const page = await browser.newPage();

    // Set user agent to mimic a real browser
    await page.setUserAgent(
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36"
    );

    // Set headers, including cookies
    await page.setExtraHTTPHeaders({
      "Sec-CH-UA-Mobile": "?1",
      Cookie: Cookie,
    });

    // Intercept requests to optimize and avoid issues
    await page.setRequestInterception(true);
    page.on("request", (request) => {
      if (["image", "stylesheet", "font"].includes(request.resourceType())) {
        request.abort(); // Skip loading unnecessary resources
      } else {
        request.continue();
      }
    });

    // Navigate to the URL and wait for the page to load fully
    await page.goto(url, { waitUntil: "networkidle2" });

    // Wait for the Cloudflare challenge to be resolved, if any
    await new Promise((resolve) => setTimeout(resolve, 5000)); // 5 seconds delay

    // Get the page content
    const htmlContent = await page.content();
    console.log("HTML content fetched successfully.");

    // Close the browser
    await browser.close();

    // Load HTML into Cheerio for parsing
    const $ = cheerio.load(htmlContent);

    // Extract JSON data from the `__NEXT_DATA__` script tag
    const rawData = $("#__NEXT_DATA__").html();
    if (!rawData) {
      throw new Error("Failed to locate the `__NEXT_DATA__` JSON in the HTML.");
    }

    const jsonData = JSON.parse(rawData);

    // Locate question details in JSON
    const questionData =
      jsonData?.props?.pageProps?.dehydratedState?.queries.find(
        (query) => query.queryKey[0] === "questionDetail"
      )?.state?.data?.question;

    if (!questionData) {
      throw new Error("Failed to locate question data in JSON.");
    }

    // Extract relevant details
    const codeSnippets = questionData.codeSnippets || [];
    const description = $('meta[name="description"]').attr("content");
    const titleSlug = questionData.titleSlug || "No slug found";
    const exampleTestcaseList = questionData.exampleTestcaseList || [];

    const result = {
      title: questionData.title || "No title found",
      slug: titleSlug,
      id: questionData.questionId || "n/a",
      stats: questionData.stats || "No stats found",
      description: description || "No description found",
      difficulty: questionData.difficulty || "No difficulty found",
      exampleTestcaseList: exampleTestcaseList,
      codeSnippets: codeSnippets.map((snippet) => ({
        language: snippet.lang,
        code: snippet.code,
      })),
    };

    // Respond with the extracted data
    return new Response(JSON.stringify(result, null, 2), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({
        message: "Error processing the request.",
        error: error.message,
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}

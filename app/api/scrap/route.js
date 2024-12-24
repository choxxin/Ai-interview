import * as cheerio from "cheerio";

export async function POST(req) {
  try {
    const { url } = await req.json();

    // Custom headers to simulate a real browser request
    const headers = {
      "Sec-CH-UA-Mobile": "?1",
    };

    // Make the GET request to fetch the HTML content
    const response = await fetch(url, {
      method: "GET",
      headers: headers,
    });

    console.log("Response Status:", response.status); // Debug response status

    if (!response.ok) {
      throw new Error("Failed to fetch HTML content from LeetCode");
    }

    const htmlContent = await response.text();
    const $ = cheerio.load(htmlContent);

    // Extract JSON data from the script tag
    const rawData = $("#__NEXT_DATA__").html();
    if (!rawData) {
      throw new Error("Failed to locate the data in the HTML content");
    }

    const jsonData = JSON.parse(rawData);

    // Locate the question data in the JSON structure
    const questionData =
      jsonData?.props?.pageProps?.dehydratedState?.queries.find(
        (query) => query.queryKey[0] === "questionDetail"
      )?.state?.data?.question;

    if (!questionData) {
      throw new Error("Failed to locate question data in JSON");
    }

    // Extract code snippets
    const codeSnippets = questionData.codeSnippets || [];
    const description = $('meta[name="description"]').attr("content");
    const result = {
      title: questionData.title || "No title found",

      id: questionData.questionId || "n/a",
      stats: questionData.stats || "No stats found",
      description: description || "No description found",
      difficulty: questionData.difficulty || "No difficulty found",
      codeSnippets: codeSnippets.map((snippet) => ({
        language: snippet.lang,
        code: snippet.code,
      })),
    };

    // Return the extracted data as JSON
    return new Response(JSON.stringify(result, null, 2), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error:", error); // Debug the error stack trace
    return new Response(
      JSON.stringify({
        message: "Error fetching the HTML content",
        error: error.message,
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

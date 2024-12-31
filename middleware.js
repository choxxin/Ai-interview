import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher([
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/Pages/landing(.*)",
  "/assets/(.*)",
  "/api/(.*)",
]);

export default clerkMiddleware(async (auth, request) => {
  console.log("Requested Route:", request.url);

  if (!isPublicRoute(request)) {
    console.log("Protected Route Accessed:", request.url);
    await auth.protect();
  } else {
    console.log("Public Route Accessed:", request.url);
  }
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};

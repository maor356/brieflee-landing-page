import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
  }, [location.pathname]);

  return (
    <section className="container py-24">
      <div className="mx-auto max-w-xl text-center">
        <h1 className="text-5xl font-serif">404</h1>
        <p className="mt-2 text-lg text-muted-foreground">We couldn’t find that page.</p>
        <a href="/" className="mt-6 inline-block text-primary underline underline-offset-4">Back to home</a>
      </div>
    </section>
  );
};

export default NotFound;

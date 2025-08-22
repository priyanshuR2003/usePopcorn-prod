import { useEffect, useState } from "react";

const KEY = "11e786c1";

export function useMovies(query, onResetSelection) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(
    function () {
      const controller = new AbortController();

      async function fetchMovie() {
        try {
          setIsLoading(true);
          setError("");

          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
            { signal: controller.signal }
          );

          if (!res.ok) throw new Error("Something went wrong with fetching movies");
          const data = await res.json();
          if (data.Response === "False") throw new Error("Movie not found");
          setMovies(data.Search);
        } catch (err) {
          if (err.name !== "AbortError") setError(err.message);
        } finally {
          setIsLoading(false);
        }
      }

      if (!query) {
        setMovies([]);
        setError("");
        return;
      }
      onResetSelection?.();
      fetchMovie();
      return () => controller.abort();
    },
    [query, onResetSelection]
  );

  return { movies, isLoading, error };
}

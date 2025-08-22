import { useState } from "react";
import { NavBar, Logo, Search, NumResults, Main, Box, Loader, ErrorMessage } from "./components/UI";
import { MovieList } from "./components/MovieList";
import { MovieDetails } from "./components/MovieDetails";
import { WatchedSummary, WatchedMoviesList } from "./components/Watched";
import { useMovies } from "./hooks/useMovies";
import { useLocalStorageState } from "./hooks/useLocalStorageState";

export default function App() {
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const [watched, setWatched] = useLocalStorageState([], "watched");

  function handleSelectMovie(id) {
    setSelectedId((cur) => (id === cur ? null : id));
  }
  function handleCloseMovie() {
    setSelectedId(null);
  }
  function handleAddWatched(movie) {
    setWatched((prev) => [...prev.filter((m) => m.imdbID !== movie.imdbID), movie]);
  }
  function handleDeleteWatched(id) {
    setWatched((prev) => prev.filter((m) => m.imdbID !== id));
  }

  const { movies, isLoading, error } = useMovies(query, handleCloseMovie);

  return (
    <>
      <NavBar>
        <Logo />
        <Search query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </NavBar>
      <Main>
        <Box>
          {isLoading && <Loader />}
          {!isLoading && !error && (
            <MovieList movies={movies} onSelectMovie={handleSelectMovie} />
          )}
          {error && <ErrorMessage message={error} />}
        </Box>
        <Box>
          {selectedId ? (
            <MovieDetails
              selectedId={selectedId}
              onCloseMovie={handleCloseMovie}
              onAddWatched={handleAddWatched}
              watched={watched}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedMoviesList watched={watched} onDeleteWatched={handleDeleteWatched} />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}

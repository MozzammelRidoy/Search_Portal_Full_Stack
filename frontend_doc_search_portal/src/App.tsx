import { useState, useRef } from "react";
import type { RequestStatus, LegalResult } from "./types";
import { generate } from "./api/legalSearch";
import { SearchBar } from "./components/SearchBar";
import { ResultList } from "./components/ResultList";
import { LoadingState } from "./components/LoadingState";
import { ErrorState } from "./components/ErrorState";
import { EmptyState } from "./components/EmptyState";

export function App() {
  const [status, setStatus] = useState<RequestStatus>("idle");
  const [results, setResults] = useState<LegalResult[]>([]);
  const [error, setError] = useState<string>("");
  const [lastQuery, setLastQuery] = useState<string>("");
  const searchBarKey = useRef(0);

  async function handleSearch(query: string) {
    setStatus("loading");
    setError("");
    setLastQuery(query);
    try {
      const data = await generate(query);

      setResults(data.data);
      setStatus("success");
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Something went wrong.");
      setStatus("error");
    }
  }

  function handlePickExample(query: string) {
    searchBarKey.current += 1;
    handleSearch(query);
  }

  return (
    <div className="min-h-screen bg-[#FBFAF7]">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        {/* Header */}
        <header className="mb-10 sm:mb-12">
          <h1 className="font-serif text-3xl font-semibold text-[#1A1D23] mb-2">
            Legal Document Search
          </h1>
          <p className="text-sm text-[#6B7280]">
            Search and retrieve summaries from a curated legal document corpus.
          </p>
        </header>

        {/* Search bar */}
        <div className="mb-8">
          <SearchBar
            key={searchBarKey.current}
            onSearch={handleSearch}
            isLoading={status === "loading"}
            initialValue={lastQuery}
          />
        </div>

        {/* Divider */}
        <div className="border-t border-[#E4E1DA] mb-8" />

        {/* State-driven content */}
        {status === "idle" && <EmptyState onPickExample={handlePickExample} />}
        {status === "loading" && <LoadingState />}
        {status === "error" && (
          <ErrorState message={error} onRetry={() => handleSearch(lastQuery)} />
        )}
        {status === "success" && (
          <ResultList results={results} query={lastQuery} />
        )}
      </div>
    </div>
  );
}

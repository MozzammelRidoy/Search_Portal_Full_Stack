import type { LegalResult } from "../types";
import { ResultCard } from "./ResultCard";

interface ResultListProps {
  results: LegalResult[];
  query: string;
}

export function ResultList({ results, query }: ResultListProps) {
  if (results.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-[#6B7280] text-sm">
          No documents found for <span className="italic">"{query}"</span>. Try different terms.
        </p>
      </div>
    );
  }

  return (
    <section aria-label="Search results">
      <p className="text-xs text-[#6B7280] mb-4">
        {results.length} {results.length === 1 ? "result" : "results"} for{" "}
        <span className="italic">"{query}"</span>
      </p>
      <div className="flex flex-col gap-3">
        {results.map((r, i) => (
          <ResultCard key={r.id} result={r} index={i} />
        ))}
      </div>
    </section>
  );
}

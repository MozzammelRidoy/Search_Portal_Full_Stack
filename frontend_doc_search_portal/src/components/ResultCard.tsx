import type { LegalResult } from "../types";

interface ResultCardProps {
  result: LegalResult;
  index: number;
}

export function ResultCard({ result, index }: ResultCardProps) {
  return (
    <article
      className="
        bg-white border border-[#E4E1DA] rounded-lg p-5
        animate-fade-in
        hover:shadow-md hover:border-[#2D5F8A]/30 transition-all duration-200
      "
      style={{
        animationDelay: `${index * 80}ms`,
        animationFillMode: "both",
      }}
    >
      <div className="flex items-start justify-between gap-3 mb-2">
        <h3 className="font-serif text-lg font-semibold text-[#1A1D23] leading-snug">
          {result.title}
        </h3>
        <span
          className="shrink-0 text-xs font-medium px-2 py-0.5 rounded-full bg-[#2D5F8A]/10 text-[#2D5F8A] border border-[#2D5F8A]/20"
          title="Document ID"
        >
          #{result.id}
        </span>
      </div>
      <p className="text-sm text-[#6B7280] leading-relaxed">{result.summary}</p>
    </article>
  );
}

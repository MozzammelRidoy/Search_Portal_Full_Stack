const EXAMPLE_QUERIES = [
  "contract breach",
  "property transfer",
  "criminal penalty",
];

interface EmptyStateProps {
  onPickExample: (query: string) => void;
}

export function EmptyState({ onPickExample }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center gap-6 py-16 text-center">
      <div className="w-12 h-12 rounded-full bg-[#2D5F8A]/10 flex items-center justify-center">
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
          <circle cx="10" cy="10" r="7" stroke="#2D5F8A" strokeWidth="1.5" />
          <path d="M15.5 15.5l3.5 3.5" stroke="#2D5F8A" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </div>
      <div>
        <p className="text-sm font-medium text-[#1A1D23] mb-1">Search legal documents</p>
        <p className="text-sm text-[#6B7280]">
          Enter a legal topic, case type, or keyword to find relevant documents.
        </p>
      </div>
      <div className="flex flex-wrap justify-center gap-2">
        <span className="text-xs text-[#6B7280] self-center mr-1">Try:</span>
        {EXAMPLE_QUERIES.map((q) => (
          <button
            key={q}
            onClick={() => onPickExample(q)}
            className="
              px-3 py-1.5 text-xs rounded-full
              border border-[#E4E1DA] bg-white text-[#2D5F8A]
              hover:border-[#2D5F8A] hover:bg-[#2D5F8A]/5
              focus:outline-none focus:ring-2 focus:ring-[#2D5F8A] focus:ring-offset-1
              transition-colors cursor-pointer
            "
          >
            {q}
          </button>
        ))}
      </div>
    </div>
  );
}

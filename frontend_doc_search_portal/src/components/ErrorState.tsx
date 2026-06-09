interface ErrorStateProps {
  message: string;
  onRetry: () => void;
}

export function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <div
      role="alert"
      className="
        flex flex-col items-center gap-4 py-12 px-6 text-center
        bg-white border border-[#B4413C]/20 rounded-lg
      "
    >
      <div className="w-10 h-10 rounded-full bg-[#B4413C]/10 flex items-center justify-center">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <path
            d="M10 3a7 7 0 100 14A7 7 0 0010 3zm0 4v3m0 3h.01"
            stroke="#B4413C"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </div>
      <div>
        <p className="text-sm font-medium text-[#1A1D23] mb-1">Search failed</p>
        <p className="text-sm text-[#6B7280]">{message}</p>
      </div>
      <button
        onClick={onRetry}
        className="
          px-5 py-2 text-sm font-medium rounded-lg
          bg-[#2D5F8A] text-white
          hover:bg-[#245079] active:bg-[#1d4063]
          focus:outline-none focus:ring-2 focus:ring-[#2D5F8A] focus:ring-offset-2
          transition-colors
        "
      >
        Try again
      </button>
    </div>
  );
}

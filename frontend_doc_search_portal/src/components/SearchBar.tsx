import { useState, type KeyboardEvent, type FormEvent } from "react";

interface SearchBarProps {
  onSearch: (query: string) => void;
  isLoading: boolean;
  initialValue?: string;
}

export function SearchBar({
  onSearch,
  isLoading,
  initialValue = "",
}: SearchBarProps) {
  const [value, setValue] = useState(initialValue);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (value.trim() && !isLoading) {
      onSearch(value.trim());
    }
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      handleSubmit(e as unknown as FormEvent);
    }
  }

  const disabled = isLoading || !value.trim();

  return (
    <form onSubmit={handleSubmit} className="flex gap-3 w-full">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Search legal documents…"
        disabled={isLoading}
        aria-label="Search legal documents"
        className="
          flex-1 px-4 py-3 rounded-lg border border-[#E4E1DA] bg-white
          text-[#1A1D23] placeholder-[#6B7280] text-sm
          focus:outline-none focus:ring-2 focus:ring-[#2D5F8A] focus:border-transparent
          disabled:opacity-60 disabled:cursor-not-allowed
          transition-shadow
        "
      />
      <button
        type="submit"
        disabled={disabled}
        aria-label={isLoading ? "Searching…" : "Search"}
        className="
          px-6 py-3 rounded-lg bg-[#2D5F8A] text-white text-sm font-medium
          hover:bg-[#245079] active:bg-[#1d4063]
          focus:outline-none focus:ring-2 focus:ring-[#2D5F8A] focus:ring-offset-2
          disabled:opacity-50 disabled:cursor-not-allowed
          transition-colors whitespace-nowrap
        "
      >
        {isLoading ? "Searching…" : "Search"}
      </button>
    </form>
  );
}

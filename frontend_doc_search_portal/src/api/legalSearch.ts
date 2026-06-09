import { apiClient } from "./client";
import type { GenerateResponse } from "../types";

export async function generate(query: string): Promise<GenerateResponse> {
  const trimmed = query.trim();
  if (!trimmed) {
    throw new Error("Please enter a search query.");
  }

  try {
    const { data } = await apiClient.post<GenerateResponse>("/generate", {
      query: trimmed,
    });
    return data;
  } catch (err: unknown) {
    const e = err as {
      code?: string;
      response?: { status: number; data?: { message?: string; error?: string } };
      request?: unknown;
      message?: string;
    };

    if (e.code === "ECONNABORTED") {
      throw new Error("Request timed out. The server took too long to respond.");
    }
    if (e.response) {
      const serverMsg = e.response.data?.message ?? e.response.data?.error;
      throw new Error(serverMsg || `Server error (${e.response.status}).`);
    }
    if (e.request) {
      throw new Error("Cannot reach the server. Is the backend running?");
    }
    throw new Error(e.message || "Something went wrong.");
  }
}

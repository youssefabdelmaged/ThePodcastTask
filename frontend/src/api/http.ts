import { API_BASE_URL } from "@/constants";

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export interface HttpOptions<TBody = unknown> {
  method?: HttpMethod;
  headers?: Record<string, string>;
  query?: Record<string, string | number | boolean | undefined>;
  body?: TBody;
  signal?: AbortSignal;
}

export async function http<TResponse, TBody = unknown>(
  path: string,
  options: HttpOptions<TBody> = {}
): Promise<TResponse> {
  const { method = "GET", headers, query, body, signal } = options;

  const url = new URL(path, API_BASE_URL);
  if (query) {
    Object.entries(query).forEach(([key, value]) => {
      if (value !== undefined && value !== null)
        url.searchParams.set(key, String(value));
    });
  }
console.log("Fetching URL:", url.toString());
  const res = await fetch(url.toString(), {
    method,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    body: body && method !== "GET" ? JSON.stringify(body) : undefined,
    signal,
    cache: "no-store",
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`HTTP ${res.status}: ${text || res.statusText}`);
  }

  // Try JSON first, fallback to text
  const contentType = res.headers.get("content-type") || "";
  if (contentType.includes("application/json")) {
    return (await res.json()) as TResponse;
  }
  return (await res.text()) as unknown as TResponse;
}

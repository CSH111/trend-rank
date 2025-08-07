// lib/titleFetcher.ts
function decodeHtmlEntities(text: string): string {
  if (typeof document !== "undefined") {
    const textarea = document.createElement("textarea");
    textarea.innerHTML = text;
    return textarea.value;
  }

  // 기본 엔티티만 처리
  return text
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, " ");
}

export async function getTitleFromUrl(url: string): Promise<string | null> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 5000); // 5초 타임아웃

  try {
    const proxyUrl = `/api/proxy?url=${encodeURIComponent(url)}`;

    const response = await fetch(proxyUrl, {
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const html = await response.text();

    // 클라이언트에서 title 추출
    const titleMatch = html.match(/<title[^>]*>(.*?)<\/title>/i);

    if (titleMatch) {
      const rawTitle = titleMatch[1].trim();
      return decodeHtmlEntities(rawTitle);
    }

    return null;
  } catch (error: any) {
    clearTimeout(timeoutId);

    if (error.name === "AbortError") {
      console.log("Request timed out");
    } else {
      console.error("Fetch error:", error.message);
    }

    return null;
  }
}

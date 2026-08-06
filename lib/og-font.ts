/**
 * Fetches a Noto Sans Georgian TTF for use in `ImageResponse`.
 *
 * Satori (which renders the OG image) accepts TTF/OTF/WOFF but not WOFF2.
 * Requesting the CSS endpoint without a modern `User-Agent` makes Google
 * serve the legacy TTF URL, which is what we want here.
 *
 * Returns `null` if anything goes wrong, so a network hiccup degrades the
 * image to its Latin-only fallback instead of failing the build.
 */
export async function loadGeorgianFont(weight: 400 | 600): Promise<ArrayBuffer | null> {
  try {
    const cssResponse = await fetch(
      `https://fonts.googleapis.com/css2?family=Noto+Sans+Georgian:wght@${weight}`,
      { headers: { 'User-Agent': 'Mozilla/5.0' } },
    );
    if (!cssResponse.ok) return null;

    const css = await cssResponse.text();
    const url = css.match(/src:\s*url\((https:\/\/[^)]+\.(?:ttf|otf|woff))\)/)?.[1];
    if (!url) return null;

    const fontResponse = await fetch(url);
    if (!fontResponse.ok) return null;

    return await fontResponse.arrayBuffer();
  } catch {
    return null;
  }
}

import { ImageResponse } from 'next/og';
import { loadGeorgianFont } from '@/lib/og-font';
import { siteConfig } from '@/data/site';

export const alt = 'SilkHire — vetted outsourcing teams in India and the Philippines';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

/**
 * One shared social card for the whole site. It carries both languages,
 * because a link can be shared into either audience, and neither locale
 * should look like an afterthought.
 */
export default async function OpengraphImage() {
  const [regular, semibold] = await Promise.all([
    loadGeorgianFont(400),
    loadGeorgianFont(600),
  ]);

  const fonts = [
    regular && { name: 'Noto Sans Georgian', data: regular, weight: 400 as const, style: 'normal' as const },
    semibold && { name: 'Noto Sans Georgian', data: semibold, weight: 600 as const, style: 'normal' as const },
  ].filter((font) => font !== null);

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: '#ffffff',
          color: '#1d1d1f',
          padding: 80,
          fontFamily: 'Noto Sans Georgian',
          // A single accent hairline along the top edge — the card is
          // otherwise the same white ground as the site.
          borderTop: '8px solid #0a6e52',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <svg width="44" height="44" viewBox="0 0 24 24" fill="none">
            <path
              d="M3 18c4.5 0 4.5-12 9-12s4.5 12 9 12"
              stroke="#0a6e52"
              strokeWidth="1.9"
              strokeLinecap="round"
            />
            <circle cx="12" cy="6" r="2.1" fill="#0a6e52" />
          </svg>
          <span style={{ fontSize: 36, fontWeight: 600, color: '#1d1d1f' }}>
            {siteConfig.name}
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <span
            style={{
              fontSize: 56,
              fontWeight: 600,
              color: '#1d1d1f',
              letterSpacing: '-0.02em',
              lineHeight: 1.15,
            }}
          >
            გადამოწმებული აუტსორსინგ გუნდები ინდოეთსა და ფილიპინებში
          </span>
          <span style={{ fontSize: 32, color: '#5c5c62', lineHeight: 1.35 }}>
            Vetted outsourcing teams in India and the Philippines
          </span>
        </div>

        <span style={{ fontSize: 24, color: '#0a6e52', letterSpacing: '0.06em' }}>
          {siteConfig.url.replace(/^https?:\/\//, '')}
        </span>
      </div>
    ),
    { ...size, fonts: fonts.length > 0 ? fonts : undefined },
  );
}

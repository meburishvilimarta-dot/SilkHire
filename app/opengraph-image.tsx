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
          backgroundColor: '#fbfaf8',
          padding: 80,
          fontFamily: 'Noto Sans Georgian',
          // A single hairline of brand colour along the top edge.
          borderTop: '14px solid #14453d',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <svg width="44" height="44" viewBox="0 0 24 24" fill="none">
            <path
              d="M3 18c4.5 0 4.5-12 9-12s4.5 12 9 12"
              stroke="#14453d"
              strokeWidth="1.9"
              strokeLinecap="round"
            />
            <circle cx="12" cy="6" r="2.1" fill="#14453d" />
          </svg>
          <span style={{ fontSize: 36, fontWeight: 600, color: '#16181a' }}>
            {siteConfig.name}
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <span
            style={{
              fontSize: 58,
              fontWeight: 600,
              color: '#16181a',
              letterSpacing: '-0.02em',
              lineHeight: 1.15,
            }}
          >
            გადამოწმებული აუტსორსინგ გუნდები ინდოეთსა და ფილიპინებში
          </span>
          <span style={{ fontSize: 34, color: '#5a6068', lineHeight: 1.3 }}>
            Vetted outsourcing teams in India and the Philippines
          </span>
        </div>

        <span style={{ fontSize: 26, color: '#a9662a', letterSpacing: '0.06em' }}>
          {siteConfig.url.replace(/^https?:\/\//, '')}
        </span>
      </div>
    ),
    { ...size, fonts: fonts.length > 0 ? fonts : undefined },
  );
}

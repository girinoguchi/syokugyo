import { MARQUEE_ROW_DURATIONS, MEDIA_LOGOS, splitMediaLogosIntoRows, type MediaLogo } from "@/lib/home-content";

const MEDIA_ROWS = splitMediaLogosIntoRows(MEDIA_LOGOS);

function MarqueeRow({
  logos,
  duration,
  reverse,
}: {
  logos: MediaLogo[];
  duration: string;
  reverse?: boolean;
}) {
  const tiles = [...logos, ...logos];

  return (
    <div className={`logo-marquee logo-marquee--bg${reverse ? " logo-marquee--reverse" : ""}`}>
      <div className="logo-marquee__track" style={{ "--marquee-duration": duration } as React.CSSProperties}>
        {tiles.map((logo, i) => (
          <div key={`${logo.file}-${i}`} className="logo-tile">
            <img src={`/img/media/${logo.file}`} alt="" loading="lazy" decoding="async" width={168} height={96} />
          </div>
        ))}
      </div>
    </div>
  );
}

export function MediaLogoMarquee() {
  return (
    <div
      className="absolute inset-0 z-0 flex flex-col justify-center gap-3 md:gap-4 select-none pointer-events-none"
      aria-hidden="true"
    >
      {MEDIA_ROWS.map((row, r) => (
        <MarqueeRow
          key={r}
          logos={row}
          duration={MARQUEE_ROW_DURATIONS[r]}
          reverse={r % 2 === 1}
        />
      ))}
    </div>
  );
}

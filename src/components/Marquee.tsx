import type { CSSProperties, ReactNode } from "react";

type Props = {
  children: ReactNode;
  reverse?: boolean;
  speed?: number;
  className?: string;
};

export function Marquee({ children, reverse = false, speed = 32, className = "" }: Props) {
  return (
    <div
      className={`marquee ${reverse ? "marquee--reverse" : ""} ${className}`.trim()}
      aria-hidden="true"
      style={{ "--marquee-duration": `${speed}s` } as CSSProperties}
    >
      <div className="marquee__track">
        <div className="marquee__group">{children}</div>
        <div className="marquee__group">{children}</div>
      </div>
    </div>
  );
}

export function MarqueeItems({ items }: { items: string[] }) {
  return (
    <>
      {items.map((item) => (
        <span className="marquee-item" key={item}>
          {item}
          <span className="marquee-item__sep" />
        </span>
      ))}
    </>
  );
}

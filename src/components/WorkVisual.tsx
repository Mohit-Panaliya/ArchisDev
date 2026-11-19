import type { WorkVariant } from "../data/work";

const bars = [34, 58, 44, 72, 50, 86, 62, 94, 56, 78, 66, 88];

const pipeline = [
  { name: "Leads", count: 12, deals: [false, true, false] },
  { name: "Quoted", count: 8, deals: [true, false, false] },
  { name: "Won", count: 5, deals: [false, false, true] },
];

export function WorkVisual({ variant }: { variant: WorkVariant }) {
  if (variant === "site") {
    return (
      <div className="mock mock--site">
        <div className="mock-site__nav">
          <span className="mock-site__brand">SAVOR</span>
          <div className="mock-site__navlinks">
            <i />
            <i />
            <i />
          </div>
          <span className="mock-site__cta">Reserve</span>
        </div>
        <div className="mock-site__hero">
          <div>
            <span className="mock-site__kicker">Fine dining · Anand</span>
            <div className="mock-site__headline">
              Quiet luxury,
              <br />
              <em>plated.</em>
            </div>
            <div className="mock-site__lines">
              <i />
              <i />
            </div>
          </div>
          <div className="mock-plate" />
        </div>
        <div className="mock-site__strip">
          <i />
          <i />
          <i />
        </div>
      </div>
    );
  }

  if (variant === "app") {
    return (
      <div className="mock mock--app">
        <div className="phone">
          <div className="phone__notch" />
          <div className="phone__screen">
            <span className="phone__label">Live tracking</span>
            <div className="phone__map">
              <svg viewBox="0 0 100 160" preserveAspectRatio="none" aria-hidden="true">
                <path
                  d="M16 144 C38 126 18 96 48 80 S70 44 84 18"
                  fill="none"
                  stroke="rgba(201,242,77,.55)"
                  strokeWidth="1.4"
                  strokeDasharray="3 3"
                />
                <circle cx="16" cy="144" r="3" fill="#c9f24d" />
                <circle cx="84" cy="18" r="2.5" fill="#c9f24d" opacity="0.6" />
              </svg>
            </div>
            <div className="phone__card">
              <b>Order #2841</b>
              <span>Arriving in 12 min · 2.4 km</span>
              <div className="phone__row">
                <span className="phone__avatar" />
                <i />
                <span className="phone__pill">On time</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (variant === "commerce") {
    return (
      <div className="mock mock--commerce">
        <div className="mock-commerce__top">
          <b>Northline Supply</b>
          <span className="mock-commerce__cart">Cart · 04</span>
        </div>
        <div className="mock__products">
          {[
            ["Canvas tote", "₹1,240"],
            ["Utility jacket", "₹4,860"],
            ["Field notebook", "₹640"],
            ["Steel flask", "₹1,980"],
          ].map(([name, price]) => (
            <div className="mock__product" key={name}>
              <div className="mock__product-art" />
              <b>{name}</b>
              <span>{price}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (variant === "pipeline") {
    return (
      <div className="mock mock--dashboard">
        <div className="mock__chrome">
          <span className="mock__dot" />
          <span className="mock__dot" />
          <span className="mock__dot" />
          <em className="mock__url">archis.erp / crm / pipeline</em>
        </div>
        <div className="mock__pipeline">
          {pipeline.map((column) => (
            <div className="mock__col" key={column.name}>
              <b>
                {column.name} · {column.count}
              </b>
              {column.deals.map((hot, index) => (
                <div className={`mock__deal ${hot ? "is-hot" : ""}`} key={index}>
                  <i />
                  <i />
                </div>
              ))}
              <div className="mock__deal">
                <i />
                <i />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="mock mock--dashboard">
      <div className="mock__chrome">
        <span className="mock__dot" />
        <span className="mock__dot" />
        <span className="mock__dot" />
        <em className="mock__url">archis.erp / dashboard</em>
      </div>
      <div className="mock__layout">
        <aside className="mock__sidebar">
          <i className="is-brand" />
          <i className="is-active" />
          <i />
          <i />
          <i />
          <i />
        </aside>
        <div className="mock__main">
          <div className="mock__kpis">
            <div className="mock__kpi">
              <span>Revenue</span>
              <b>₹8.4L</b>
              <i />
            </div>
            <div className="mock__kpi">
              <span>Orders</span>
              <b>1,284</b>
              <i />
            </div>
            <div className="mock__kpi">
              <span>In stock</span>
              <b>96%</b>
              <i />
            </div>
          </div>
          <div className="mock__chart">
            {bars.map((height, index) => (
              <span className="mock__bar" key={index} style={{ height: `${height}%` }} />
            ))}
          </div>
          <div className="mock__rows">
            {[0, 1, 2].map((row) => (
              <div className="mock__row" key={row}>
                <i />
                <i />
                <i />
                <em />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

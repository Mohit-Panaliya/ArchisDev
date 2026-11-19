import { useId, useState } from "react";
import type { Faq } from "../data/services";

export function Accordion({ items }: { items: Faq[] }) {
  const [open, setOpen] = useState<number | null>(null);
  const baseId = useId();

  return (
    <div className="faq-list">
      {items.map((item, index) => {
        const isOpen = open === index;
        const buttonId = `${baseId}-trigger-${index}`;
        const panelId = `${baseId}-panel-${index}`;

        return (
          <div className={`faq-item ${isOpen ? "is-open" : ""}`} key={item.q}>
            <button
              type="button"
              className="faq-trigger"
              id={buttonId}
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => setOpen(isOpen ? null : index)}
            >
              <span className="faq-index">{String(index + 1).padStart(2, "0")}</span>
              <span className="faq-question">{item.q}</span>
              <span className="faq-icon" aria-hidden="true" />
            </button>
            <div
              className="faq-panel"
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              aria-hidden={!isOpen}
            >
              <div className="faq-panel__inner">
                <p>{item.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

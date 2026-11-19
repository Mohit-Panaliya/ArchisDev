import { useEffect, useRef, useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { Accordion } from "../components/Accordion";
import { Icon } from "../components/Icon";
import { Magnetic } from "../components/Magnetic";
import { SplitWords } from "../components/SplitWords";
import { homeFaqs, services } from "../data/services";
import { site } from "../data/site";
import { usePageMeta } from "../hooks/usePageMeta";

type FormValues = {
  name: string;
  email: string;
  company: string;
  service: string;
  budget: string;
  message: string;
};

type FieldErrors = Partial<Record<"name" | "email" | "message", string>>;

const initialValues: FormValues = {
  name: "",
  email: "",
  company: "",
  service: services[1]?.navName ?? "Website Development",
  budget: "Not sure yet",
  message: "",
};

const budgets = [
  "Under ₹10,000",
  "₹10,000 – ₹25,000",
  "₹25,000 – ₹50,000",
  "₹50,000 – ₹1,00,000",
  "₹1,00,000+",
  "Not sure yet",
];

const endpoint = import.meta.env.VITE_CONTACT_ENDPOINT as string | undefined;

function CopyEmailButton() {
  const [copied, setCopied] = useState(false);
  const timer = useRef<number | undefined>(undefined);

  useEffect(
    () => () => {
      if (timer.current) window.clearTimeout(timer.current);
    },
    [],
  );

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      if (timer.current) window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(false);
    }
  };

  return (
    <button type="button" className="copy-btn" onClick={copy}>
      <Icon name="copy" />
      {copied ? "Copied" : "Copy email"}
    </button>
  );
}

export default function Contact() {
  usePageMeta({
    title: "Contact — ArchisDev",
    description:
      "Tell us what you are building. ArchisDev replies within one business day with availability, a sensible next step and honest advice.",
    path: "/contact",
  });

  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const update = (field: keyof FormValues, value: string) => {
    setValues((current) => ({ ...current, [field]: value }));
    if (field === "name" || field === "email" || field === "message") {
      setErrors((current) => ({ ...current, [field]: undefined }));
    }
    if (status !== "idle") setStatus("idle");
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors: FieldErrors = {};
    if (!values.name.trim()) nextErrors.name = "Please add your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
      nextErrors.email = "Enter a valid email address.";
    }
    if (values.message.trim().length < 10) {
      nextErrors.message = "Tell us a little more — at least 10 characters.";
    }

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    setErrors({});

    if (endpoint) {
      setStatus("sending");
      try {
        const response = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify(values),
        });
        if (!response.ok) throw new Error("Request failed");
        setStatus("sent");
      } catch {
        setStatus("error");
      }
      return;
    }

    const subject = `Project enquiry — ${values.service} — ${values.name}`;
    const body = [
      `Name: ${values.name}`,
      `Email: ${values.email}`,
      values.company ? `Company: ${values.company}` : "",
      `Service: ${values.service}`,
      `Budget: ${values.budget}`,
      "",
      values.message,
    ]
      .filter(Boolean)
      .join("\n");

    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;
    setStatus("sent");
  };

  return (
    <>
      <section className="page-hero">
        <div className="page-hero__glow" aria-hidden="true" />
        <div className="page-hero__grid-bg" aria-hidden="true" />
        <div className="wrap">
          <nav className="breadcrumbs" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">Contact</span>
          </nav>

          <span className="label">
            <span className="label__dot" />
            {site.availability}
          </span>
          <SplitWords
            as="h1"
            className="page-hero__title"
            text="Tell us what you're building."
          />
          <p className="lead page-hero__lead">
            Share the messy version — goals, constraints, the spreadsheet that is held together
            with tape. We will reply within one business day with a clear next step.
          </p>
          <div className="page-hero__meta">
            <span className="chip">Reply within 1 business day</span>
            <span className="chip">NDA friendly</span>
            <span className="chip">Remote worldwide</span>
          </div>
        </div>
      </section>

      <section className="section contact-section">
        <div className="wrap contact-grid">
          <form className="contact-form" onSubmit={handleSubmit} noValidate>
            <div className="contact-form__head">
              <div>
                <h2 className="contact-form__title">Start with a few details.</h2>
                <p className="form-note" style={{ marginTop: 6 }}>
                  The more context you share, the more useful our first reply will be.
                </p>
              </div>
              <span className="mono" style={{ color: "var(--faint)", whiteSpace: "nowrap" }}>
                Step 1 / 2
              </span>
            </div>

            <div className="form-row">
              <div className={`field ${errors.name ? "field--error" : ""}`.trim()}>
                <label htmlFor="contact-name">Your name *</label>
                <input
                  id="contact-name"
                  name="name"
                  value={values.name}
                  onChange={(event) => update("name", event.target.value)}
                  placeholder="Your name"
                  autoComplete="name"
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? "contact-name-error" : undefined}
                />
                {errors.name && (
                  <span className="field__error" id="contact-name-error">
                    {errors.name}
                  </span>
                )}
              </div>

              <div className={`field ${errors.email ? "field--error" : ""}`.trim()}>
                <label htmlFor="contact-email">Email *</label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  value={values.email}
                  onChange={(event) => update("email", event.target.value)}
                  placeholder="you@company.com"
                  autoComplete="email"
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? "contact-email-error" : undefined}
                />
                {errors.email && (
                  <span className="field__error" id="contact-email-error">
                    {errors.email}
                  </span>
                )}
              </div>
            </div>

            <div className="form-row">
              <div className="field">
                <label htmlFor="contact-company">Company / brand</label>
                <input
                  id="contact-company"
                  name="company"
                  value={values.company}
                  onChange={(event) => update("company", event.target.value)}
                  placeholder="Optional"
                  autoComplete="organization"
                />
              </div>

              <div className="field">
                <label htmlFor="contact-service">What do you need?</label>
                <div className="select-wrap">
                  <select
                    id="contact-service"
                    name="service"
                    value={values.service}
                    onChange={(event) => update("service", event.target.value)}
                  >
                    {services.map((service) => (
                      <option value={service.navName} key={service.slug}>
                        {service.name}
                      </option>
                    ))}
                    <option value="Not sure yet">Not sure yet</option>
                  </select>
                  <Icon name="chevronDown" />
                </div>
              </div>
            </div>

            <div className="field">
              <label htmlFor="contact-budget">Budget range</label>
              <div className="select-wrap">
                <select
                  id="contact-budget"
                  name="budget"
                  value={values.budget}
                  onChange={(event) => update("budget", event.target.value)}
                >
                  {budgets.map((budget) => (
                    <option value={budget} key={budget}>
                      {budget}
                    </option>
                  ))}
                </select>
                <Icon name="chevronDown" />
              </div>
            </div>

            <div className={`field ${errors.message ? "field--error" : ""}`.trim()}>
              <label htmlFor="contact-message">What are you building? *</label>
              <textarea
                id="contact-message"
                name="message"
                value={values.message}
                onChange={(event) => update("message", event.target.value)}
                placeholder="A few lines about the project, the problem, your timeline — and anything you are unsure about."
                aria-invalid={Boolean(errors.message)}
                aria-describedby={errors.message ? "contact-message-error" : undefined}
              />
              {errors.message && (
                <span className="field__error" id="contact-message-error">
                  {errors.message}
                </span>
              )}
            </div>

            {status === "sent" && (
              <div className="form-status" role="status">
                <Icon name="check" />
                <span>
                  {endpoint
                    ? "Message sent. We will reply within one business day."
                    : "Your details are ready in your email app — press send. If nothing opened, email us directly at "}
                  {!endpoint && (
                    <a href={`mailto:${site.email}`} style={{ color: "var(--accent)" }}>
                      {site.email}
                    </a>
                  )}
                  {!endpoint && "."}
                </span>
              </div>
            )}

            {status === "error" && (
              <div className="form-status form-status--error" role="alert">
                <Icon name="spark" />
                <span>
                  Something went wrong sending the form. Please email us directly at{" "}
                  <a href={`mailto:${site.email}`} style={{ color: "var(--accent)" }}>
                    {site.email}
                  </a>
                  .
                </span>
              </div>
            )}

            <div className="form-foot">
              <Magnetic>
                <button
                  type="submit"
                  className="btn btn--primary btn--lg"
                  style={{ width: "100%" }}
                  disabled={status === "sending"}
                >
                  {status === "sending" ? "Sending…" : "Send the details"}
                  <Icon name="arrowUpRight" />
                </button>
              </Magnetic>
              <p className="form-note">
                By sending this, you agree to us replying by email. Your details are never shared
                or added to a mailing list.
              </p>
            </div>
          </form>

          <aside className="contact-aside">
            <div className="contact-card">
              <span className="contact-card__label">Direct line</span>
              <a className="contact-email" href={`mailto:${site.email}`}>
                {site.email}
              </a>
              <CopyEmailButton />
              <p className="form-note">
                Prefer email? Write directly — include the same context and we will take it from
                there.
              </p>
            </div>

            <div className="contact-card">
              <span className="contact-card__label">What happens next</span>
              <div className="next-steps">
                {[
                  ["01", "We read and reply", "Within one business day, with questions or a suggested next step."],
                  ["02", "A short intro call", "Twenty minutes to understand the project and whether we fit."],
                  ["03", "Scope and quote", "A written scope, timeline and price — no obligation."],
                ].map(([num, title, copy]) => (
                  <div className="next-step" key={num}>
                    <span className="next-step__num">{num}</span>
                    <div>
                      <div className="next-step__title">{title}</div>
                      <p className="next-step__copy">{copy}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="contact-card">
              <span className="contact-card__label">Studio</span>
              <p className="lead" style={{ fontSize: "0.9rem" }}>
                {site.location}
                <br />
                {site.timezone} · remote worldwide
              </p>
              <span className="tag" style={{ width: "fit-content" }}>
                {site.availability}
              </span>
            </div>
          </aside>
        </div>
      </section>

      <section className="section section--line">
        <div className="wrap faq-layout">
          <div className="faq-aside">
            <span className="label">
              <span className="label__dot" />
              Before you write
            </span>
            <SplitWords as="h2" className="section-title" text="A few useful answers." />
            <p className="lead" style={{ fontSize: "0.95rem" }}>
              If your question is here, you can skip straight to the form.
            </p>
          </div>
          <div>
            <Accordion items={homeFaqs.slice(0, 4)} />
          </div>
        </div>
      </section>
    </>
  );
}

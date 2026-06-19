"use client";

import { CONTACT } from "@/lib/constants";

const PROJECT_TYPES = [
  "Residential",
  "Hospitality",
  "Commercial",
  "Retail",
  "Custom specification",
] as const;

export function ContactSection() {
  return (
    <section id="connect" className="connect section--light">
      <div className="connect-inner section-pad">
        <div className="connect-grid">
          <div className="connect-info">
            <p className="eyebrow font-body">Connect</p>
            <h2 className="connect-title font-display">Let&apos;s create atmospheres</h2>
            <p className="connect-lead font-body">{CONTACT.lead}</p>

            <ul className="connect-details">
              <li>
                <span className="connect-detail-label font-mono">Email</span>
                <a href={`mailto:${CONTACT.email}`} className="connect-detail-value font-body">
                  {CONTACT.email}
                </a>
              </li>
              <li>
                <span className="connect-detail-label font-mono">Phone</span>
                <a href={`tel:${CONTACT.phone.replace(/\s/g, "")}`} className="connect-detail-value font-body">
                  {CONTACT.phone}
                </a>
              </li>
              <li>
                <span className="connect-detail-label font-mono">Studio</span>
                <span className="connect-detail-value font-body">{CONTACT.location}</span>
              </li>
              <li>
                <span className="connect-detail-label font-mono">Hours</span>
                <span className="connect-detail-value font-body">{CONTACT.hours}</span>
              </li>
            </ul>
          </div>

          <form className="connect-form font-body" onSubmit={(e) => e.preventDefault()}>
            <div className="connect-form-row">
              <label className="connect-field">
                <span className="connect-label font-mono">Name</span>
                <input type="text" name="name" autoComplete="name" />
              </label>
              <label className="connect-field">
                <span className="connect-label font-mono">Email</span>
                <input type="email" name="email" autoComplete="email" />
              </label>
            </div>

            <label className="connect-field">
              <span className="connect-label font-mono">Project type</span>
              <select name="project" defaultValue="">
                <option value="" disabled>
                  Select a category
                </option>
                {PROJECT_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </label>

            <label className="connect-field">
              <span className="connect-label font-mono">Message</span>
              <textarea name="message" rows={5} placeholder="Tell us about your space, timeline, and vision…" />
            </label>

            <button type="submit" className="connect-submit font-mono">
              Send message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

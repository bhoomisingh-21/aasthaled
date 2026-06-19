"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { FAQ_GALLERY, FAQ_ITEMS } from "@/lib/constants";

export function FAQSection() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" className="faq section--dark">
      <div className="faq-inner section-pad">
        <div className="faq-layout">
          <div className="faq-gallery">
            <div className="faq-gallery-col">
              <div className="faq-photo faq-photo--sq">
                <Image src={FAQ_GALLERY[0]} alt="" fill className="object-cover" sizes="280px" />
              </div>
              <div className="faq-photo faq-photo--sq">
                <Image src={FAQ_GALLERY[2]} alt="" fill className="object-cover" sizes="280px" />
              </div>
            </div>
            <div className="faq-gallery-col">
              <div className="faq-photo faq-photo--landscape">
                <Image src={FAQ_GALLERY[1]} alt="" fill className="object-cover" sizes="280px" />
              </div>
              <div className="faq-photo faq-photo--tall">
                <Image src={FAQ_GALLERY[3]} alt="" fill className="object-cover" sizes="280px" />
              </div>
            </div>
          </div>

          <div className="faq-panel">
            <h2 className="faq-heading font-body">FAQs</h2>
            <div className="faq-list">
              {FAQ_ITEMS.map((item, i) => {
                const isOpen = open === i;
                return (
                  <div key={item.q} className="faq-item">
                    <button
                      type="button"
                      className="faq-q font-body"
                      onClick={() => setOpen(isOpen ? null : i)}
                      aria-expanded={isOpen}
                    >
                      <span>{item.q}</span>
                      <span className="faq-icon" aria-hidden>{isOpen ? "−" : "+"}</span>
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          className="faq-a-wrap"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                        >
                          <p className="faq-a font-body">{item.a}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";
import React from 'react';
import { motion } from 'framer-motion';

type FeatureCard = {
  title: string;
  description: string;
  icon: string;
  iconBg: string;
  iconColor: string;
};

const featureCards: FeatureCard[] = [
  {
    title: 'Global Reach',
    description:
      'Access a diverse community of over 500k developers and researchers across 120 countries through our global broadcast network.',
    icon: 'public',
    iconBg: 'bg-green-100',
    iconColor: 'text-green-600',
  },
  {
    title: 'Targeted Audience',
    description:
      'Our AI-driven recommendation engine ensures your event is placed directly in front of the exact technical experts you want to engage.',
    icon: 'center_focus_strong',
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-600',
  },
  {
    title: 'Seamless Ticketing',
    description:
      'Automated registration, secure global payments, and instant attendee analytics all built into a single elegant dashboard.',
    icon: 'confirmation_number',
    iconBg: 'bg-amber-100',
    iconColor: 'text-amber-600',
  },
];

export default function WhyHostSection() {
  return (
    <section className="py-24" aria-labelledby="why-host-heading">
      <div className="max-w-4xl mx-auto text-center mb-12">
        <motion.h2
          id="why-host-heading"
          className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          viewport={{ once: true }}
        >
          Why Host With Us
        </motion.h2>
        <motion.p
          className="max-w-2xl mx-auto text-lg text-gray-600 leading-relaxed"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut', delay: 0.15 }}
          viewport={{ once: true }}
        >
          VickyBytes provides the infrastructure, the audience, and the prestige to elevate your technical event.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {featureCards.map((card, index) => (
          <motion.article
            key={card.title}
            className="group rounded-2xl bg-slate-50 shadow-md p-8 text-center flex flex-col items-center justify-center transition-all duration-300 ease-out hover:-translate-y-1.5 hover:scale-[1.03] hover:shadow-xl hover:bg-white"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: (index + 1) * 0.1 }}
            viewport={{ once: true }}
          >
            <div className={`w-14 h-14 rounded-xl ${card.iconBg} ${card.iconColor} flex items-center justify-center mb-4 transition-transform duration-300 ease-out group-hover:scale-105`}>
              <span
                className="material-symbols-outlined transition-transform duration-300 ease-out group-hover:rotate-3"
                aria-hidden="true"
              >
                {card.icon}
              </span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">{card.title}</h3>
            <p className="text-sm text-gray-600 leading-relaxed">{card.description}</p>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

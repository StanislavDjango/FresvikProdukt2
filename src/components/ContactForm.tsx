"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import type { Locale } from "@/i18n/config";
import enMessages from "@/i18n/messages/en.json";
import nnMessages from "@/i18n/messages/nn.json";

const messages = {
  nn: nnMessages.ContactForm,
  en: enMessages.ContactForm,
};

type ContactFormValues = {
  name: string;
  company?: string;
  email: string;
  phone: string;
  message: string;
};

type ContactFormProps = {
  recipientEmail: string;
  locale: Locale;
};

export function ContactForm({ recipientEmail, locale }: ContactFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const labels = messages[locale];
  const contactSchema = z.object({
    name: z.string().min(2, labels.validationName),
    company: z.string().optional(),
    email: z.string().email(labels.validationEmail),
    phone: z.string().min(6, labels.validationPhone),
    message: z.string().min(12, labels.validationMessage),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  });

  function onSubmit(values: ContactFormValues) {
    const subject = encodeURIComponent(`${labels.emailSubject} ${values.name}`);
    const body = encodeURIComponent(
      [
        `${labels.name}: ${values.name}`,
        values.company ? `${labels.company}: ${values.company}` : "",
        `${labels.email}: ${values.email}`,
        `${labels.phone}: ${values.phone}`,
        "",
        values.message,
      ]
        .filter(Boolean)
        .join("\n"),
    );

    window.location.assign(
      `mailto:${recipientEmail}?subject=${subject}&body=${body}`,
    );
    setSubmitted(true);
    reset();
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid gap-4 rounded-[8px] border border-slate-200 bg-white p-5 shadow-sm"
    >
      <div className="grid gap-1">
        <label htmlFor="name" className="text-sm font-medium text-slate-900">
          {labels.name}
        </label>
        <input
          id="name"
          className="h-11 rounded-[6px] border border-slate-300 px-3 text-sm outline-none transition focus:border-cyan-700 focus:ring-2 focus:ring-cyan-700/15"
          autoComplete="name"
          {...register("name")}
        />
        {errors.name ? <p className="text-sm text-red-700">{errors.name.message}</p> : null}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="grid gap-1">
          <label htmlFor="company" className="text-sm font-medium text-slate-900">
            {labels.company}
          </label>
          <input
            id="company"
            className="h-11 rounded-[6px] border border-slate-300 px-3 text-sm outline-none transition focus:border-cyan-700 focus:ring-2 focus:ring-cyan-700/15"
            autoComplete="organization"
            {...register("company")}
          />
        </div>
        <div className="grid gap-1">
          <label htmlFor="phone" className="text-sm font-medium text-slate-900">
            {labels.phone}
          </label>
          <input
            id="phone"
            className="h-11 rounded-[6px] border border-slate-300 px-3 text-sm outline-none transition focus:border-cyan-700 focus:ring-2 focus:ring-cyan-700/15"
            autoComplete="tel"
            {...register("phone")}
          />
          {errors.phone ? <p className="text-sm text-red-700">{errors.phone.message}</p> : null}
        </div>
      </div>

      <div className="grid gap-1">
        <label htmlFor="email" className="text-sm font-medium text-slate-900">
          {labels.email}
        </label>
        <input
          id="email"
          type="email"
          className="h-11 rounded-[6px] border border-slate-300 px-3 text-sm outline-none transition focus:border-cyan-700 focus:ring-2 focus:ring-cyan-700/15"
          autoComplete="email"
          {...register("email")}
        />
        {errors.email ? <p className="text-sm text-red-700">{errors.email.message}</p> : null}
      </div>

      <div className="grid gap-1">
        <label htmlFor="message" className="text-sm font-medium text-slate-900">
          {labels.message}
        </label>
        <textarea
          id="message"
          rows={5}
          className="resize-none rounded-[6px] border border-slate-300 px-3 py-3 text-sm outline-none transition focus:border-cyan-700 focus:ring-2 focus:ring-cyan-700/15"
          {...register("message")}
        />
        {errors.message ? (
          <p className="text-sm text-red-700">{errors.message.message}</p>
        ) : null}
      </div>

      <button
        type="submit"
        className="inline-flex h-12 items-center justify-center gap-2 rounded-[6px] bg-slate-950 px-5 text-sm font-semibold text-white transition hover:bg-cyan-800 focus:outline-none focus:ring-2 focus:ring-cyan-700 focus:ring-offset-2"
      >
        {labels.submit} <ArrowRight aria-hidden="true" size={18} />
      </button>

      {submitted ? (
        <p className="inline-flex items-center gap-2 text-sm font-medium text-cyan-800">
          <CheckCircle2 aria-hidden="true" size={18} />
          {labels.confirmation}
        </p>
      ) : null}
    </form>
  );
}

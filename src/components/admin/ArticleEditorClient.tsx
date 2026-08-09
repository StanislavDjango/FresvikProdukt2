"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  AlertCircle,
  CheckCircle2,
  LoaderCircle,
  Pencil,
  Save,
  X,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, type ReactNode } from "react";
import { useForm } from "react-hook-form";
import {
  editableNewsArticleSchema,
  type EditableNewsArticleFormValues,
} from "@/lib/adminArticleSchema";
import type { Locale } from "@/i18n/config";

type ArticleEditorClientProps = {
  pathname: string;
  locale: Locale;
};

type EditorMessage = {
  type: "error" | "success";
  text: string;
};

const editorLabels = {
  nn: {
    open: "Rediger artikkel",
    heading: "Rediger publisert artikkel",
    description:
      "Endringane blir lagra direkte i Sanity og publiserte på denne sida.",
    title: "Tittel",
    date: "Publiseringsdato",
    excerpt: "Kort samandrag",
    body: "Artikkeltekst",
    cancel: "Avbryt",
    save: "Lagre endringar",
    loading: "Hentar artikkelen...",
    saved: "Artikkelen er lagra i Sanity.",
    loadError: "Artikkelen kunne ikkje hentast frå Sanity.",
    saveError: "Endringane kunne ikkje lagrast.",
    conflict:
      "Artikkelen er endra ein annan stad. Lukk editoren og opne han på nytt.",
    required: "Feltet må fyllast ut.",
  },
  en: {
    open: "Edit article",
    heading: "Edit published article",
    description:
      "Changes are saved directly to Sanity and published on this page.",
    title: "Title",
    date: "Publication date",
    excerpt: "Short summary",
    body: "Article text",
    cancel: "Cancel",
    save: "Save changes",
    loading: "Loading article...",
    saved: "The article was saved in Sanity.",
    loadError: "The article could not be loaded from Sanity.",
    saveError: "The changes could not be saved.",
    conflict:
      "The article was changed elsewhere. Close and reopen the editor.",
    required: "This field is required.",
  },
} as const;

export function ArticleEditorClient({
  pathname,
  locale,
}: ArticleEditorClientProps) {
  const labels = editorLabels[locale];
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<EditorMessage | null>(null);
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<EditableNewsArticleFormValues>({
    resolver: zodResolver(editableNewsArticleSchema),
    defaultValues: { title: "", date: "", excerpt: "", body: "" },
  });

  async function openEditor() {
    setIsOpen(true);
    setIsLoading(true);
    setMessage(null);

    try {
      const response = await fetch(
        `/api/admin/news-articles?pathname=${encodeURIComponent(pathname)}`,
        { cache: "no-store" },
      );
      const result = await response.json();

      if (!response.ok || !result.article) {
        throw new Error(result.error || "load_failed");
      }

      reset(result.article);
    } catch {
      setMessage({ type: "error", text: labels.loadError });
    } finally {
      setIsLoading(false);
    }
  }

  function closeEditor() {
    if (isSubmitting) return;
    setIsOpen(false);
    setMessage(null);
  }

  const saveArticle = handleSubmit(async (values) => {
    setMessage(null);

    try {
      const response = await fetch("/api/admin/news-articles", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pathname, ...values }),
      });
      const result = await response.json();

      if (!response.ok) {
        setMessage({
          type: "error",
          text:
            result.error === "revision_conflict"
              ? labels.conflict
              : labels.saveError,
        });
        return;
      }

      reset(result.article);
      setMessage({ type: "success", text: labels.saved });
      router.refresh();
    } catch {
      setMessage({ type: "error", text: labels.saveError });
    }
  });

  if (!isOpen) {
    return (
      <button
        type="button"
        onClick={openEditor}
        className="inline-flex h-11 items-center justify-center gap-2 rounded-[8px] bg-slate-950 px-4 text-sm font-semibold text-white transition hover:bg-cyan-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-700 focus-visible:ring-offset-2"
      >
        <Pencil aria-hidden="true" size={16} />
        {labels.open}
      </button>
    );
  }

  return (
    <div className="overflow-hidden rounded-[8px] border border-cyan-200 bg-white shadow-sm">
      <div className="flex items-start justify-between gap-4 border-b border-slate-200 bg-cyan-50 px-5 py-4">
        <div>
          <p className="text-sm font-semibold text-slate-950">{labels.heading}</p>
          <p className="mt-1 text-sm leading-6 text-slate-600">
            {labels.description}
          </p>
        </div>
        <button
          type="button"
          onClick={closeEditor}
          disabled={isSubmitting}
          aria-label={labels.cancel}
          title={labels.cancel}
          className="inline-flex size-9 shrink-0 items-center justify-center rounded-[8px] text-slate-600 transition hover:bg-white hover:text-slate-950 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-700 disabled:opacity-50"
        >
          <X aria-hidden="true" size={18} />
        </button>
      </div>

      {isLoading ? (
        <div className="flex min-h-40 items-center justify-center gap-3 p-6 text-sm font-medium text-slate-600">
          <LoaderCircle className="animate-spin" aria-hidden="true" size={18} />
          {labels.loading}
        </div>
      ) : (
        <form onSubmit={saveArticle} className="grid gap-5 p-5 sm:p-6">
          <div className="grid gap-5 md:grid-cols-[minmax(0,1fr)_12rem]">
            <EditorField
              label={labels.title}
              error={errors.title ? labels.required : undefined}
            >
              <input
                {...register("title")}
                className="h-11 w-full rounded-[8px] border border-slate-300 bg-white px-3 text-base text-slate-950 outline-none transition focus:border-cyan-700 focus:ring-2 focus:ring-cyan-700/15"
              />
            </EditorField>
            <EditorField
              label={labels.date}
              error={errors.date ? labels.required : undefined}
            >
              <input
                type="date"
                {...register("date")}
                className="h-11 w-full rounded-[8px] border border-slate-300 bg-white px-3 text-base text-slate-950 outline-none transition focus:border-cyan-700 focus:ring-2 focus:ring-cyan-700/15"
              />
            </EditorField>
          </div>

          <EditorField
            label={labels.excerpt}
            error={errors.excerpt ? labels.required : undefined}
          >
            <textarea
              rows={3}
              {...register("excerpt")}
              className="w-full resize-y rounded-[8px] border border-slate-300 bg-white px-3 py-2.5 text-base leading-6 text-slate-950 outline-none transition focus:border-cyan-700 focus:ring-2 focus:ring-cyan-700/15"
            />
          </EditorField>

          <EditorField
            label={labels.body}
            error={errors.body ? labels.required : undefined}
          >
            <textarea
              rows={14}
              {...register("body")}
              className="w-full resize-y rounded-[8px] border border-slate-300 bg-white px-3 py-2.5 text-base leading-7 text-slate-950 outline-none transition focus:border-cyan-700 focus:ring-2 focus:ring-cyan-700/15"
            />
          </EditorField>

          <div className="flex flex-col gap-3 border-t border-slate-200 pt-5 sm:flex-row sm:items-center sm:justify-between">
            <div aria-live="polite">
              {message ? (
                <p
                  className={`flex items-center gap-2 text-sm font-medium ${
                    message.type === "success"
                      ? "text-emerald-700"
                      : "text-red-700"
                  }`}
                >
                  {message.type === "success" ? (
                    <CheckCircle2 aria-hidden="true" size={17} />
                  ) : (
                    <AlertCircle aria-hidden="true" size={17} />
                  )}
                  {message.text}
                </p>
              ) : null}
            </div>
            <div className="flex gap-3 sm:justify-end">
              <button
                type="button"
                onClick={closeEditor}
                disabled={isSubmitting}
                className="inline-flex h-11 items-center justify-center rounded-[8px] border border-slate-300 bg-white px-4 text-sm font-semibold text-slate-950 transition hover:border-slate-400 hover:bg-slate-50 disabled:opacity-50"
              >
                {labels.cancel}
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex h-11 items-center justify-center gap-2 rounded-[8px] bg-cyan-800 px-4 text-sm font-semibold text-white transition hover:bg-cyan-900 disabled:cursor-wait disabled:opacity-60"
              >
                {isSubmitting ? (
                  <LoaderCircle className="animate-spin" aria-hidden="true" size={17} />
                ) : (
                  <Save aria-hidden="true" size={17} />
                )}
                {labels.save}
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}

function EditorField({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <label className="grid gap-2 text-sm font-semibold text-slate-800">
      {label}
      {children}
      {error ? <span className="text-xs text-red-700">{error}</span> : null}
    </label>
  );
}

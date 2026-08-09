"use client";

import {
  AlertCircle,
  CheckCircle2,
  ChevronDown,
  LoaderCircle,
  Pencil,
  Save,
  X,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import type { Locale } from "@/i18n/config";
import {
  editableContentPageSchema,
  type EditableContentPageFormValues,
} from "@/lib/adminContentPageSchema";

type ContentPageEditorClientProps = {
  pathname: string;
  locale: Locale;
};

type ApiResponse = {
  page?: EditableContentPageFormValues;
  error?: string;
};

export function ContentPageEditorClient({
  pathname,
  locale,
}: ContentPageEditorClientProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [draft, setDraft] = useState<EditableContentPageFormValues | null>(
    null,
  );
  const [message, setMessage] = useState<string | null>(null);
  const [isError, setIsError] = useState(false);

  const copy =
    locale === "en"
      ? {
          admin: "Administrator",
          description: "Edit this page directly in Sanity.",
          edit: "Edit page",
          title: "Page title",
          intro: "Introduction",
          sectionTitle: "Section title",
          sectionIntro: "Section introduction",
          itemTitle: "Item title",
          itemText: "Text",
          itemMeta: "Additional text",
          save: "Save changes",
          cancel: "Cancel",
          loading: "Loading page...",
          saved: "Changes have been saved.",
          loadError: "The page could not be loaded for editing.",
          saveError: "The changes could not be saved.",
          invalid: "Check the title and text lengths.",
          conflict: "The page changed elsewhere. Reload and try again.",
          section: "Section",
          item: "Item",
        }
      : {
          admin: "Administrator",
          description: "Rediger denne sida direkte i Sanity.",
          edit: "Rediger sida",
          title: "Sidetittel",
          intro: "Ingress",
          sectionTitle: "Seksjonstittel",
          sectionIntro: "Seksjonsingress",
          itemTitle: "Tittel",
          itemText: "Tekst",
          itemMeta: "Tilleggstekst",
          save: "Lagre endringar",
          cancel: "Avbryt",
          loading: "Lastar sida...",
          saved: "Endringane er lagra.",
          loadError: "Sida kunne ikkje lastast for redigering.",
          saveError: "Endringane kunne ikkje lagrast.",
          invalid: "Kontroller tittel og tekstlengder.",
          conflict: "Sida er endra ein annan stad. Last inn på nytt.",
          section: "Seksjon",
          item: "Punkt",
        };

  async function openEditor() {
    setIsOpen(true);
    setMessage(null);
    setIsError(false);

    if (draft) return;

    setIsLoading(true);
    try {
      const response = await fetch(
        `/api/admin/content-pages?pathname=${encodeURIComponent(pathname)}`,
        { cache: "no-store" },
      );
      const payload = (await response.json()) as ApiResponse;

      if (!response.ok || !payload.page) {
        throw new Error(payload.error || "load_failed");
      }

      setDraft(payload.page);
    } catch {
      setIsError(true);
      setMessage(copy.loadError);
    } finally {
      setIsLoading(false);
    }
  }

  function updateRoot(field: "title" | "intro", value: string) {
    setDraft((current) =>
      current ? { ...current, [field]: value } : current,
    );
  }

  function updateSection(
    sectionIndex: number,
    field: "title" | "intro",
    value: string,
  ) {
    setDraft((current) => {
      if (!current) return current;
      const sections = [...current.sections];
      sections[sectionIndex] = { ...sections[sectionIndex], [field]: value };
      return { ...current, sections };
    });
  }

  function updateItem(
    sectionIndex: number,
    itemIndex: number,
    field: "title" | "text" | "meta",
    value: string,
  ) {
    setDraft((current) => {
      if (!current) return current;
      const sections = [...current.sections];
      const items = [...sections[sectionIndex].items];
      items[itemIndex] = { ...items[itemIndex], [field]: value };
      sections[sectionIndex] = { ...sections[sectionIndex], items };
      return { ...current, sections };
    });
  }

  async function saveChanges() {
    if (!draft) return;

    const parsed = editableContentPageSchema.safeParse(draft);
    if (!parsed.success) {
      setIsError(true);
      setMessage(copy.invalid);
      return;
    }

    setIsSaving(true);
    setMessage(null);
    setIsError(false);

    try {
      const response = await fetch("/api/admin/content-pages", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pathname, ...parsed.data }),
      });
      const payload = (await response.json()) as ApiResponse;

      if (!response.ok || !payload.page) {
        if (response.status === 409) throw new Error("revision_conflict");
        throw new Error(payload.error || "save_failed");
      }

      setDraft(payload.page);
      setMessage(copy.saved);
      router.refresh();
    } catch (error) {
      const reason = error instanceof Error ? error.message : "save_failed";
      setIsError(true);
      setMessage(reason === "revision_conflict" ? copy.conflict : copy.saveError);
    } finally {
      setIsSaving(false);
    }
  }

  const inputClassName =
    "w-full rounded-[8px] border border-slate-300 bg-white px-3 py-2 text-sm text-slate-950 outline-none transition focus:border-cyan-600 focus:ring-2 focus:ring-cyan-100";

  if (!isOpen) {
    return (
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-cyan-800">
            {copy.admin}
          </p>
          <p className="mt-1 text-sm text-slate-600">{copy.description}</p>
        </div>
        <button
          type="button"
          onClick={openEditor}
          className="inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-[8px] bg-slate-950 px-4 text-sm font-semibold text-white transition hover:bg-cyan-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-600 focus-visible:ring-offset-2"
        >
          <Pencil className="size-4" aria-hidden="true" />
          {copy.edit}
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-cyan-800">
            {copy.admin}
          </p>
          <p className="mt-1 text-sm text-slate-600">{copy.description}</p>
        </div>
        <button
          type="button"
          onClick={() => setIsOpen(false)}
          className="inline-flex size-10 items-center justify-center rounded-[8px] border border-slate-300 bg-white text-slate-700 transition hover:bg-slate-100"
          aria-label={copy.cancel}
        >
          <X className="size-4" aria-hidden="true" />
        </button>
      </div>

      {isLoading ? (
        <div className="flex items-center gap-2 text-sm text-slate-600">
          <LoaderCircle className="size-4 animate-spin" aria-hidden="true" />
          {copy.loading}
        </div>
      ) : null}

      {message ? (
        <p
          className={`flex items-center gap-2 rounded-[8px] px-3 py-2 text-sm ${
            isError
              ? "bg-red-50 text-red-800"
              : "bg-emerald-50 text-emerald-800"
          }`}
        >
          {isError ? (
            <AlertCircle className="size-4 shrink-0" aria-hidden="true" />
          ) : (
            <CheckCircle2 className="size-4 shrink-0" aria-hidden="true" />
          )}
          {message}
        </p>
      ) : null}

      {draft ? (
        <div className="space-y-5">
          <div className="grid gap-4 md:grid-cols-2">
            <label className="space-y-1.5 text-sm font-semibold text-slate-800">
              <span>{copy.title}</span>
              <input
                className={inputClassName}
                value={draft.title}
                onChange={(event) => updateRoot("title", event.target.value)}
              />
            </label>
            <label className="space-y-1.5 text-sm font-semibold text-slate-800">
              <span>{copy.intro}</span>
              <textarea
                className={`${inputClassName} min-h-24 resize-y`}
                value={draft.intro}
                onChange={(event) => updateRoot("intro", event.target.value)}
              />
            </label>
          </div>

          <div className="space-y-3">
            {draft.sections.map((section, sectionIndex) => (
              <details
                key={section.key}
                className="group rounded-[8px] border border-slate-200 bg-white"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-4 py-3 text-sm font-semibold text-slate-950">
                  <span>
                    {section.title || `${copy.section} ${sectionIndex + 1}`}
                  </span>
                  <ChevronDown
                    className="size-4 transition group-open:rotate-180"
                    aria-hidden="true"
                  />
                </summary>
                <div className="space-y-4 border-t border-slate-200 p-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <label className="space-y-1.5 text-sm font-semibold text-slate-800">
                      <span>{copy.sectionTitle}</span>
                      <input
                        className={inputClassName}
                        value={section.title}
                        onChange={(event) =>
                          updateSection(
                            sectionIndex,
                            "title",
                            event.target.value,
                          )
                        }
                      />
                    </label>
                    <label className="space-y-1.5 text-sm font-semibold text-slate-800">
                      <span>{copy.sectionIntro}</span>
                      <textarea
                        className={`${inputClassName} min-h-20 resize-y`}
                        value={section.intro}
                        onChange={(event) =>
                          updateSection(
                            sectionIndex,
                            "intro",
                            event.target.value,
                          )
                        }
                      />
                    </label>
                  </div>

                  {section.items.map((item, itemIndex) => (
                    <fieldset
                      key={item.key}
                      className="space-y-3 rounded-[8px] border border-slate-200 bg-slate-50 p-4"
                    >
                      <legend className="px-1 text-xs font-bold uppercase tracking-[0.12em] text-slate-500">
                        {copy.item} {itemIndex + 1}
                      </legend>
                      <label className="block space-y-1.5 text-sm font-semibold text-slate-800">
                        <span>{copy.itemTitle}</span>
                        <input
                          className={inputClassName}
                          value={item.title}
                          onChange={(event) =>
                            updateItem(
                              sectionIndex,
                              itemIndex,
                              "title",
                              event.target.value,
                            )
                          }
                        />
                      </label>
                      <label className="block space-y-1.5 text-sm font-semibold text-slate-800">
                        <span>{copy.itemText}</span>
                        <textarea
                          className={`${inputClassName} min-h-28 resize-y`}
                          value={item.text}
                          onChange={(event) =>
                            updateItem(
                              sectionIndex,
                              itemIndex,
                              "text",
                              event.target.value,
                            )
                          }
                        />
                      </label>
                      <label className="block space-y-1.5 text-sm font-semibold text-slate-800">
                        <span>{copy.itemMeta}</span>
                        <textarea
                          className={`${inputClassName} min-h-20 resize-y`}
                          value={item.meta}
                          onChange={(event) =>
                            updateItem(
                              sectionIndex,
                              itemIndex,
                              "meta",
                              event.target.value,
                            )
                          }
                        />
                      </label>
                    </fieldset>
                  ))}
                </div>
              </details>
            ))}
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={saveChanges}
              disabled={isSaving}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-[8px] bg-slate-950 px-4 text-sm font-semibold text-white transition hover:bg-cyan-800 disabled:cursor-wait disabled:opacity-60"
            >
              {isSaving ? (
                <LoaderCircle
                  className="size-4 animate-spin"
                  aria-hidden="true"
                />
              ) : (
                <Save className="size-4" aria-hidden="true" />
              )}
              {copy.save}
            </button>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-[8px] border border-slate-300 bg-white px-4 text-sm font-semibold text-slate-800 transition hover:bg-slate-100"
            >
              <X className="size-4" aria-hidden="true" />
              {copy.cancel}
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

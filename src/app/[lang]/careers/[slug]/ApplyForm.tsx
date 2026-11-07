"use client";

import { useActionState, useState } from "react";
import { CheckCircle2, FileText, UploadCloud } from "lucide-react";
import { ArrowSubmit } from "@/components/ui/ArrowButton";
import { DisplayHeading } from "@/components/ui/DisplayHeading";
import { NumberBadge } from "@/components/ui/BigNumber";
import { Field, Input, Textarea } from "@/components/ui/Field";
import type { Dictionary } from "@/i18n/dictionaries";
import { submitApplication, type ApplyState } from "@/lib/apply";
import { cn } from "@/lib/utils";

const initialState: ApplyState = { status: "idle" };

function GroupTitle({ index, children }: { index: number; children: React.ReactNode }) {
  return (
    <legend className="mb-5 flex items-center gap-3 text-lg font-bold text-ink">
      <NumberBadge size="sm">{index}</NumberBadge>
      {children}
    </legend>
  );
}

export function ApplyForm({
  jobId,
  dict,
}: {
  jobId: string;
  dict: Dictionary["careersPage"];
}) {
  const [state, action, pending] = useActionState(
    submitApplication,
    initialState,
  );
  const [fileName, setFileName] = useState("");

  if (state.status === "success") {
    return (
      <div className="py-6 text-center">
        <span className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-soft">
          <CheckCircle2 className="h-10 w-10 text-success" strokeWidth={2} />
        </span>
        <DisplayHeading as="h3" title={dict.successTitle} size="md" className="mt-6" />
        <p className="mx-auto mt-4 max-w-sm leading-relaxed text-ink-soft">
          {dict.successBody}
        </p>
        {state.reference ? (
          <p className="mx-auto mt-6 inline-flex flex-wrap items-center justify-center gap-2 rounded-panel bg-surface px-5 py-3 text-sm text-ink-soft">
            {dict.successReference}
            <span className="font-mono text-md font-semibold text-ink">{state.reference}</span>
          </p>
        ) : null}
      </div>
    );
  }

  const errorMessage =
    state.status === "error"
      ? state.errorCode === "APPLICATION_ALREADY_SUBMITTED"
        ? dict.errorAlreadyApplied
        : state.errorCode === "APPLICATION_CV_INVALID"
          ? dict.errorCvInvalid
          : state.errorCode === "JOB_NOT_OPEN" ||
              state.errorCode === "JOB_NOT_FOUND"
            ? dict.errorClosed
            : dict.errorGeneric
      : null;

  return (
    <form action={action} className="flex flex-col gap-10">
      <input type="hidden" name="jobId" value={jobId} />

      <fieldset>
        <GroupTitle index={1}>{dict.formDetails}</GroupTitle>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field id="apply-name" label={dict.fullName}>
            <Input
              id="apply-name"
              name="fullName"
              required
              minLength={2}
              maxLength={120}
              autoComplete="name"
            />
          </Field>
          <Field id="apply-email" label={dict.email}>
            <Input
              id="apply-email"
              name="email"
              type="email"
              required
              autoComplete="email"
            />
          </Field>
          <Field id="apply-phone" label={dict.phone}>
            <Input
              id="apply-phone"
              name="phone"
              type="tel"
              maxLength={30}
              autoComplete="tel"
            />
          </Field>
          <Field id="apply-linkedin" label={dict.linkedin}>
            <Input
              id="apply-linkedin"
              name="linkedinUrl"
              type="url"
              maxLength={255}
              placeholder="https://linkedin.com/in/…"
            />
          </Field>
        </div>
      </fieldset>

      <fieldset>
        <GroupTitle index={2}>{dict.formCv}</GroupTitle>
        <div
          className={cn(
            "relative flex flex-col items-center justify-center gap-3 rounded-panel border-2 border-dashed px-6 py-10 text-center transition focus-within:border-brand focus-within:ring-4 focus-within:ring-brand/10 hover:border-brand",
            fileName ? "border-success bg-green-soft" : "border-border-strong bg-surface",
          )}
        >
          <input
            id="apply-cv"
            name="cv"
            type="file"
            required
            aria-label={dict.cv}
            aria-describedby="apply-cv-hint"
            accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            onChange={(event) => setFileName(event.target.files?.[0]?.name ?? "")}
            className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
          />
          {fileName ? (
            <>
              <FileText className="h-9 w-9 text-success" strokeWidth={1.75} />
              <p className="text-sm text-ink-soft">{dict.cvSelected}</p>
              <p className="max-w-full truncate font-semibold text-ink">{fileName}</p>
            </>
          ) : (
            <>
              <UploadCloud className="h-9 w-9 text-brand" strokeWidth={1.75} />
              <p className="text-md text-ink-soft">
                <span className="font-bold text-ink underline underline-offset-4">
                  {dict.cvChoose}
                </span>{" "}
                {dict.cvDrop}
              </p>
            </>
          )}
          <p id="apply-cv-hint" className="text-xs text-muted">
            {dict.cvHint}
          </p>
        </div>
      </fieldset>

      <fieldset>
        <GroupTitle index={3}>{dict.coverLetter}</GroupTitle>
        <Textarea
          id="apply-cover"
          name="coverLetter"
          rows={5}
          maxLength={5000}
          aria-label={dict.coverLetter}
          placeholder={dict.coverLetterHint}
        />
      </fieldset>

      {errorMessage ? (
        <p role="alert" className="rounded-xl bg-danger/10 px-4 py-3 text-sm font-medium text-danger">
          {errorMessage}
        </p>
      ) : null}

      <ArrowSubmit type="submit" disabled={pending} className="w-full">
        {pending ? dict.submitting : dict.submit}
      </ArrowSubmit>
    </form>
  );
}

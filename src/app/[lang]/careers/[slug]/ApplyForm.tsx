"use client";

import { useActionState } from "react";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Field, Input, Textarea } from "@/components/ui/Field";
import type { Dictionary } from "@/i18n/dictionaries";
import { submitApplication, type ApplyState } from "@/lib/apply";

const initialState: ApplyState = { status: "idle" };

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

  if (state.status === "success") {
    return (
      <div className="mt-6 rounded-2xl bg-surface p-6 text-center">
        <CheckCircle2 className="mx-auto h-10 w-10 text-success" />
        <h3 className="mt-3 text-lg font-bold text-ink">{dict.successTitle}</h3>
        <p className="mt-2 text-sm leading-relaxed text-ink-soft">
          {dict.successBody}
        </p>
        {state.reference ? (
          <p className="mt-3 text-sm text-ink-soft">
            {dict.successReference}:{" "}
            <span className="font-mono font-semibold text-ink">
              {state.reference}
            </span>
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
    <form action={action} className="mt-6 flex flex-col gap-4">
      <input type="hidden" name="jobId" value={jobId} />
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
      <Field id="apply-cover" label={dict.coverLetter}>
        <Textarea
          id="apply-cover"
          name="coverLetter"
          rows={5}
          maxLength={5000}
          placeholder={dict.coverLetterHint}
        />
      </Field>
      <Field id="apply-cv" label={dict.cv} hint={dict.cvHint}>
        <input
          id="apply-cv"
          name="cv"
          type="file"
          required
          accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          className="block w-full text-sm text-ink-soft file:mr-4 file:cursor-pointer file:rounded-full file:border-0 file:bg-brand-soft file:px-4 file:py-2.5 file:text-sm file:font-semibold file:text-brand"
        />
      </Field>

      {errorMessage ? (
        <p className="rounded-xl bg-danger/10 px-4 py-3 text-sm font-medium text-danger">
          {errorMessage}
        </p>
      ) : null}

      <Button
        type="submit"
        size="lg"
        disabled={pending}
        className="w-full sm:w-fit"
      >
        {pending ? dict.submitting : dict.submit}
      </Button>
    </form>
  );
}

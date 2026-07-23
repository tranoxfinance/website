"use server";

const API_URL = process.env.TRANOX_API_URL;

export interface ApplyState {
  status: "idle" | "success" | "error";
  reference?: string;
  errorCode?: string;
}

export async function submitApplication(
  _prevState: ApplyState,
  formData: FormData,
): Promise<ApplyState> {
  const jobId = String(formData.get("jobId") ?? "");
  if (!API_URL || !jobId) {
    return { status: "error", errorCode: "GENERIC" };
  }
  const body = new FormData();
  body.set("fullName", String(formData.get("fullName") ?? ""));
  body.set("email", String(formData.get("email") ?? ""));
  const phone = String(formData.get("phone") ?? "").trim();
  if (phone) body.set("phone", phone);
  const linkedinUrl = String(formData.get("linkedinUrl") ?? "").trim();
  if (linkedinUrl) body.set("linkedinUrl", linkedinUrl);
  const coverLetter = String(formData.get("coverLetter") ?? "").trim();
  if (coverLetter) body.set("coverLetter", coverLetter);
  const cv = formData.get("cv");
  if (!(cv instanceof File) || cv.size === 0) {
    return { status: "error", errorCode: "APPLICATION_CV_INVALID" };
  }
  body.set("cv", cv);

  try {
    const res = await fetch(`${API_URL}/public/careers/${jobId}/apply`, {
      method: "POST",
      body,
      cache: "no-store",
    });
    if (!res.ok) {
      let errorCode = "GENERIC";
      try {
        const payload = (await res.json()) as { error_code?: string };
        if (payload.error_code) errorCode = payload.error_code;
      } catch {}
      return { status: "error", errorCode };
    }
    const payload = (await res.json()) as { reference: string };
    return { status: "success", reference: payload.reference };
  } catch {
    return { status: "error", errorCode: "GENERIC" };
  }
}

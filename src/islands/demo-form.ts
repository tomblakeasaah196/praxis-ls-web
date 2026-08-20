/**
 * The demo form (guide §4). Six fields, validated, and ONE named seam where a
 * destination will eventually be wired.
 *
 * ┌────────────────────────────────────────────────────────────────────────┐
 * │ THE SEAM IS `submitDemoRequest` AND IT IS THE ONLY ONE.                 │
 * │ The brief leaves the destination open — inbox, CRM, calendar tool — so  │
 * │ everything about collecting and validating the request is finished, and │
 * │ the single function that would post it is unimplemented on purpose.     │
 * │ Wiring it up is one function body plus one constant. Nothing else on    │
 * │ this page needs to change. See HANDOFF.md § OPEN.                       │
 * └────────────────────────────────────────────────────────────────────────┘
 *
 * Validation notes, both of which are the guide's calls rather than mine:
 *
 *  - A free email provider is NOTED, never BLOCKED. "Reject free providers
 *    politely, don't block" — a DG whose company mail is on Gmail is still a
 *    DG, and a form that argues with them is a form that loses them.
 *  - Only two fields can actually fail: an empty required field and an address
 *    with no @. Anything stricter rejects real addresses, and the cost of a
 *    typo reaching a human inbox is far lower than the cost of turning away a
 *    buyer over an apostrophe.
 */

/**
 * Where a demo request goes. OPEN — no destination has been chosen (brief §6).
 * When one is: put the URL here and implement submitDemoRequest below.
 */
const DEMO_FORM_ENDPOINT: string | null = null;

export interface DemoRequest {
  name: string;
  email: string;
  company: string;
  country: string;
  role: string;
  context: string;
  /** The language of the page it was submitted from. The confirmation mail
   *  follows the page's language, not the recipient's guess (guide §4). */
  locale: string;
}

export class DemoFormNotWiredError extends Error {
  constructor() {
    super("No demo form destination is configured.");
    this.name = "DemoFormNotWiredError";
  }
}

/**
 * THE SEAM. Post a demo request to wherever demo requests go.
 *
 * Implement by setting DEMO_FORM_ENDPOINT and replacing the throw with the
 * call. Keep the signature: the form reads the thrown error to decide what to
 * tell the reader, and a resolved promise means "the request is somewhere a
 * human will see it" — nothing weaker.
 */
export async function submitDemoRequest(request: DemoRequest): Promise<void> {
  if (DEMO_FORM_ENDPOINT === null) throw new DemoFormNotWiredError();

  const response = await fetch(DEMO_FORM_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(request),
  });
  if (!response.ok) throw new Error(`Demo request failed with HTTP ${response.status}`);
}

const FREE_EMAIL_HOSTS = new Set([
  "gmail.com",
  "googlemail.com",
  "yahoo.com",
  "yahoo.fr",
  "hotmail.com",
  "hotmail.fr",
  "outlook.com",
  "live.com",
  "icloud.com",
  "aol.com",
  "protonmail.com",
  "proton.me",
  "yandex.com",
]);

function isFreeProvider(email: string): boolean {
  const host = email.split("@")[1]?.toLowerCase().trim();
  return host !== undefined && FREE_EMAIL_HOSTS.has(host);
}

function setFieldError(field: HTMLElement, message: string | null): void {
  const wrapper = field.closest("[data-field]");
  const error = wrapper?.querySelector<HTMLElement>("[data-field-error]");
  if (!error) return;
  error.textContent = message ?? "";
  error.hidden = message === null;
  field.setAttribute("aria-invalid", message === null ? "false" : "true");
}

/**
 * Prefill the country from the browser's region subtag, per guide §4 —
 * "default from Accept-Language region, editable".
 *
 * A static build never sees the Accept-Language header, so the equivalent
 * signal is navigator.language, and Intl.DisplayNames turns `fr-CM` into
 * "Cameroun" without this repository shipping a country list it would then own.
 * If the tag carries no region — plain "fr" — the field is simply left empty
 * rather than guessed at.
 */
function prefillCountry(input: HTMLInputElement, pageLocale: string): void {
  if (input.value.trim() !== "") return;
  try {
    for (const tag of navigator.languages ?? [navigator.language]) {
      const region = new Intl.Locale(tag).region;
      if (!region) continue;
      const name = new Intl.DisplayNames([pageLocale], { type: "region" }).of(region);
      if (name && name !== region) {
        input.value = name;
        return;
      }
    }
  } catch {
    /* Intl.Locale or DisplayNames unavailable, or the tag is malformed. The
       field stays empty and editable, which is the correct fallback for a
       prefill. */
  }
}

export function mountDemoForm(root: ParentNode = document): void {
  const form = root.querySelector<HTMLFormElement>("[data-demo-form]");
  if (!form) return;

  const status = form.querySelector<HTMLElement>("[data-form-status]");
  const submit = form.querySelector<HTMLButtonElement>("[data-form-submit]");
  const emailNotice = form.querySelector<HTMLElement>("[data-email-notice]");
  const country = form.querySelector<HTMLInputElement>("#demo-country");
  const email = form.querySelector<HTMLInputElement>("#demo-email");
  const locale = document.documentElement.lang || "en";

  /* The form is a real <form> with real constraints, so it already works
     without this file. Turning off the browser's own bubbles is only safe
     ONCE the scripted messages are in place — hence here and not in the
     markup. */
  form.setAttribute("novalidate", "");

  if (country) prefillCountry(country, locale);

  if (email && emailNotice) {
    email.addEventListener("blur", () => {
      emailNotice.hidden = !isFreeProvider(email.value);
    });
  }

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (!status || !submit) return;

    const fields = [
      ...form.querySelectorAll<HTMLInputElement | HTMLSelectElement>("[data-validate]"),
    ];
    let firstInvalid: HTMLElement | null = null;

    for (const field of fields) {
      const value = field.value.trim();
      let message: string | null = null;
      if (field.required && value === "") message = form.dataset.errorRequired ?? "Required";
      else if (field.type === "email" && value !== "" && !/^[^\s@]+@[^\s@]+$/.test(value)) {
        message = form.dataset.errorEmail ?? "Invalid email";
      }
      setFieldError(field, message);
      if (message && !firstInvalid) firstInvalid = field;
    }

    if (firstInvalid) {
      status.dataset.state = "error";
      status.textContent = form.dataset.errorSummary ?? "";
      firstInvalid.focus();
      return;
    }

    const data = new FormData(form);
    const request: DemoRequest = {
      name: String(data.get("name") ?? ""),
      email: String(data.get("email") ?? ""),
      company: String(data.get("company") ?? ""),
      country: String(data.get("country") ?? ""),
      role: String(data.get("role") ?? ""),
      context: String(data.get("context") ?? ""),
      locale,
    };

    submit.disabled = true;
    const label = submit.textContent;
    submit.textContent = form.dataset.submitting ?? label;
    status.dataset.state = "pending";
    status.textContent = "";

    try {
      await submitDemoRequest(request);
      status.dataset.state = "success";
      status.textContent = form.dataset.success ?? "";
      form.reset();
      if (country) prefillCountry(country, locale);
    } catch (error) {
      status.dataset.state = "error";
      status.textContent =
        error instanceof DemoFormNotWiredError
          ? (form.dataset.errorNotWired ?? "")
          : (form.dataset.errorSummary ?? "");
    } finally {
      submit.disabled = false;
      if (label !== null) submit.textContent = label;
    }
  });
}

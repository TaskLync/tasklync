"use client";

import { useRef, useState } from "react";

import type { ContactType } from "@/types/contact";

import {
  contactTitles,
  fieldConfigs,
  isTextareaField,
  labelToFieldName,
} from "@/lib/contact/config";

import { useToast } from "@/components/ui/Toast";

export default function ContactForm({
  type,
}: {
  type: ContactType;
}) {
  const { show } = useToast();
  const formRef = useRef<HTMLFormElement>(null);

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [agreeLegal, setAgreeLegal] = useState(false);
  const [agreeAccuracy, setAgreeAccuracy] = useState(false);

  const fields = fieldConfigs[type];
  const canSubmit = agreeLegal && agreeAccuracy && !loading;

  function resetForm() {
    formRef.current?.reset();
    setAgreeLegal(false);
    setAgreeAccuracy(false);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!canSubmit) return;

    setLoading(true);

    try {
      const formData = new FormData(e.currentTarget);

      const payload = {
        type,
        fields: Object.fromEntries(formData.entries()),
      };

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      resetForm();

      if (res.status === 429) {
        show({
          message: "Too many requests. Your form is blocked for the next 24 hours and you cannot submit again.",
          variant: "error",
        });
        return;
      }

      if (!res.ok || !data.success) {
        show({
          message: data.error ?? "Something went wrong. Please try again.",
          variant: "error",
        });
        return;
      }

      show({
        message: "We have received your request and will respond shortly.",
        variant: "success",
      });
      setSubmitted(true);

    } catch {
      resetForm();
      show({
        message: "Network error. Please check your connection and try again.",
        variant: "error",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="border border-[rgba(31,111,95,0.12)] rounded-2xl min-h-[520px] p-8">
      {submitted ? (
        <div className="h-full flex items-center justify-center">
          <div className="text-center max-w-sm">
            <div
              className="text-[#1F6F5F] font-semibold text-[18px] mb-2"
              style={{ fontFamily: "var(--font-clash)" }}
            >
              Message received
            </div>
            <p
              className="text-[rgba(13,31,28,0.6)] text-[14px] leading-[1.7]"
              style={{ fontFamily: "var(--font-body)" }}
            >
              We will get back to you within the response time shown.
            </p>
          </div>
        </div>
      ) : (
        <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
          <div
            className="text-[#0D1F1C] font-semibold text-[15px] mb-2"
            style={{ fontFamily: "var(--font-clash)" }}
          >
            {contactTitles[type]}
          </div>

          {fields.map((field) => {
            const isTextarea = isTextareaField(field.label);
            const fieldName = labelToFieldName(field.label);
            const isRequired = field.required !== false;

            return (
              <div key={field.label}>
                <label className="block text-[#0D1F1C] text-[13px] font-medium mb-1.5 cursor-pointer">
                  {field.label}
                </label>

                {isTextarea ? (
                  <textarea
                    name={fieldName}
                    required={isRequired}
                    rows={4}
                    placeholder={field.placeholder}
                    className="w-full rounded-xl border border-[rgba(31,111,95,0.2)] bg-[#F7F7F5] px-4 py-3 cursor-text"
                  />
                ) : (
                  <input
                    name={fieldName}
                    type={field.label.toLowerCase().includes("email") ? "email" : "text"}
                    required={isRequired}
                    placeholder={field.placeholder}
                    className="w-full h-11 rounded-xl border border-[rgba(31,111,95,0.2)] bg-[#F7F7F5] px-4 cursor-text"
                  />
                )}
              </div>
            );
          })}

          <div className="space-y-3 pt-2">
            <label className="flex gap-3 items-start text-[12.5px] text-[rgba(13,31,28,0.7)] cursor-pointer">
              <input
                type="checkbox"
                checked={agreeLegal}
                onChange={(e) => setAgreeLegal(e.target.checked)}
                className="cursor-pointer mt-0.5"
              />
              <span>
                I agree to the{" "}
                <a href="/privacy" className="text-[#1F6F5F] underline">Privacy Policy</a>{" "}
                and{" "}
                <a href="/terms" className="text-[#1F6F5F] underline">Terms of Service</a>
              </span>
            </label>

            <label className="flex gap-3 items-start text-[12.5px] text-[rgba(13,31,28,0.7)] cursor-pointer">
              <input
                type="checkbox"
                checked={agreeAccuracy}
                onChange={(e) => setAgreeAccuracy(e.target.checked)}
                className="cursor-pointer mt-0.5"
              />
              <span>I confirm all information provided is accurate and truthful</span>
            </label>
          </div>

          <button
            type="submit"
            disabled={!canSubmit}
            className="w-full h-12 rounded-xl bg-[#1F6F5F] text-white disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition-opacity hover:opacity-90"
          >
            {loading ? "Sending..." : "Send message"}
          </button>
        </form>
      )}
    </div>
  );
}
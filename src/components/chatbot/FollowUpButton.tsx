"use client";

import { QuickQuestion } from "./QuickQuestion";

// Thin semantic wrapper: same visual language as QuickQuestion, used for
// contextual follow-ups shown after an assistant response.
export function FollowUpButton({ label, onClick }: { label: string; onClick: () => void }) {
  return <QuickQuestion label={label} onClick={onClick} compact />;
}

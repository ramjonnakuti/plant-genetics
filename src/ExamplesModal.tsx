import { useEffect, useMemo, useRef } from "react";
import { createPortal } from "react-dom";
import { simpleExampleGroupsForModal } from "./plantProfiles";
import "./App.css";

type ExamplesPayload = {
  groups: { variety: string; names: string[] }[];
};

export function ExamplesModal({
  open,
  onClose,
  onPickName,
}: {
  open: boolean;
  onClose: () => void;
  onPickName: (name: string) => Promise<void>;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);

  const payload: ExamplesPayload = useMemo(() => {
    const groups = simpleExampleGroupsForModal();
    return { groups };
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return createPortal(
    <div className="examples-modal-root">
      <button
        type="button"
        className="examples-modal-backdrop"
        aria-label="Close examples"
        onClick={onClose}
      />
      <div
        className="examples-modal-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="examples-dialog-title"
      >
        <header className="examples-modal-header">
          <h2 id="examples-dialog-title" className="examples-heading">
            Examples
          </h2>
          <button
            ref={closeRef}
            type="button"
            className="examples-modal-close"
            onClick={onClose}
            aria-label="Close"
          >
            ×
          </button>
        </header>
        <div className="examples-modal-body">
          <p className="examples-note">
            Tap a name to look it up—great for a <strong>live demo</strong>. These are everyday plant names; then tap{" "}
            <strong>Go</strong> on the main screen.
          </p>
          {payload.groups.map((g) => (
            <div key={g.variety} className="examples-variety-block examples-variety-block--browse">
              <h3 className="examples-variety-title">{g.variety}</h3>
              <div className="suggest-chips">
                {g.names.map((n) => (
                  <button
                    key={`${g.variety}-${n}`}
                    type="button"
                    className="suggest-chip"
                    onClick={async () => {
                      await onPickName(n);
                      onClose();
                    }}
                  >
                    {n}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>,
    document.body,
  );
}

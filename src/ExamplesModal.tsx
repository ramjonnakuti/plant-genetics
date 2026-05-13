import {
  FormEvent,
  useDeferredValue,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { examplesGroupedByVariety } from "./plantProfiles";
import {
  loadExpandedExampleGroups,
  type ExamplesSearchHit,
  type ExpandedExamplesPayload,
  type LoadProgressInfo,
} from "./worldPlantExamples";
import "./App.css";

function filterHits(
  q: string,
  index: ExamplesSearchHit[],
): ExamplesSearchHit[] {
  const nq = q.trim().toLowerCase();
  if (nq.length < 2) return [];
  const out: ExamplesSearchHit[] = [];
  for (const h of index) {
    const nameMatch = h.name.toLowerCase().includes(nq);
    const typeMatch = h.variety.toLowerCase().includes(nq);
    if (nameMatch || typeMatch) {
      out.push(h);
    }
  }
  return out;
}

function hitsToGroups(hits: ExamplesSearchHit[]): { variety: string; names: string[] }[] {
  const m = new Map<string, string[]>();
  for (const h of hits) {
    const list = m.get(h.variety) ?? [];
    list.push(h.name);
    m.set(h.variety, list);
  }
  return [...m.entries()]
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([variety, names]) => ({
      variety,
      names: [...new Set(names)].sort((a, b) => a.localeCompare(b)),
    }));
}

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
  const filterInputRef = useRef<HTMLInputElement>(null);
  const [filter, setFilter] = useState("");
  const [payload, setPayload] = useState<ExpandedExamplesPayload | null>(null);
  const [loadError, setLoadError] = useState(false);
  const [loadProgress, setLoadProgress] = useState<LoadProgressInfo | null>(null);
  const deferredFilter = useDeferredValue(filter);

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

  useEffect(() => {
    if (!open) {
      setFilter("");
      return;
    }
    const ac = new AbortController();
    setPayload(null);
    setLoadError(false);
    setLoadProgress({ count: 0, phase: "Connecting…" });
    loadExpandedExampleGroups(ac.signal, (info) => {
      if (!ac.signal.aborted) setLoadProgress(info);
    })
      .then((data) => {
        if (!ac.signal.aborted) {
          setPayload(data);
          setLoadProgress(null);
        }
      })
      .catch(() => {
        if (ac.signal.aborted) return;
        setLoadError(true);
        setLoadProgress(null);
        const fallback = examplesGroupedByVariety();
        setPayload({
          groups: fallback,
          searchIndex: fallback.flatMap((g) =>
            g.names.map((name) => ({ name, variety: g.variety })),
          ),
        });
      });
    return () => ac.abort();
  }, [open]);

  const loading = !payload;

  const displayGroups = useMemo(() => {
    if (!payload) return [];
    const q = deferredFilter.trim();
    if (q.length < 2) return [];
    return hitsToGroups(filterHits(q, payload.searchIndex));
  }, [payload, deferredFilter]);

  if (!open) return null;

  const totalNames = payload?.searchIndex.length ?? 0;
  const isSearchMode = deferredFilter.trim().length >= 2;

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
            We walk many Wikipedia plant categories to the last page the API gives—
            <strong>no skipping</strong> for “list of” or disambiguation titles (still
            mainspace pages only). Scroll to see <strong>everything we loaded</strong>.
            Only limits: Wikipedia’s own data, and a very large API page budget so the
            app cannot loop forever. New species and pages not in these categories are
            still outside this list.
            {loading
              ? ""
              : ` Here: about ${totalNames.toLocaleString()} names.`}
            {loadError ? " (Could not reach Wikipedia—showing app list only.)" : ""}{" "}
            Optional: use the filter with 2+ letters to narrow by name or type (e.g.{" "}
            <em>tree</em>, <em>herb</em>).
          </p>
          <form
            className="examples-filter-form"
            onSubmit={(e: FormEvent) => e.preventDefault()}
          >
            <label className="examples-filter-label" htmlFor="examples-filter-input">
              Filter (optional)
            </label>
            <input
              ref={filterInputRef}
              id="examples-filter-input"
              className="examples-filter-input"
              type="search"
              autoComplete="off"
              placeholder="e.g. rose, oak, cactus, tree, house"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              disabled={loading}
              aria-describedby="examples-type-help"
            />
          </form>
          <p className="examples-filter-hint" id="examples-type-help">
            {loading
              ? "Loading—then scroll to browse every name we fetched."
              : filter.trim().length >= 2
                ? "Filter is on—showing matches only. Clear the box to see the full list again."
                : "Browse the full list below. Add 2+ letters here to filter by plant name or type (e.g. tree)."}
          </p>
          {filter.trim().length >= 2 && (
            <p className="examples-filter-hint" role="status">
              Showing every name that matches—no result cap.
            </p>
          )}
          {filter !== deferredFilter && isSearchMode && (
            <p className="examples-filter-hint" aria-live="polite">
              Updating results…
            </p>
          )}
          {loading && loadProgress && (
            <p className="examples-load-progress" aria-live="polite">
              <span className="examples-load-count">
                {loadProgress.count.toLocaleString()} names so far
              </span>
              <span className="examples-load-phase">{loadProgress.phase}</span>
            </p>
          )}
          {!loading && isSearchMode && displayGroups.length === 0 && (
            <p className="examples-filter-hint" role="status">
              No names match that filter.
            </p>
          )}
          {!loading &&
            payload &&
            !isSearchMode &&
            payload.groups.map((g) => (
              <div
                key={g.variety}
                className="examples-variety-block examples-variety-block--browse"
              >
                <h3 className="examples-variety-title">
                  {g.variety}{" "}
                  <span className="examples-variety-count">
                    ({g.names.length.toLocaleString()})
                  </span>
                </h3>
                <div className="suggest-chips">
                  {g.names.map((n) => (
                    <button
                      key={`browse-${g.variety}-${n}`}
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
          {!loading &&
            isSearchMode &&
            displayGroups.map((g) => (
              <div key={`search-${g.variety}`} className="examples-variety-block">
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

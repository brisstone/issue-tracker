import { Button } from "../view/Button/Button";

interface PaginationProps {
  page: number;
  total: number;
  pageSize: number;
  totalPages: number;
  onPrev: () => void;
  onNext: () => void;
}

export function Pagination({
  page,
  total,
  pageSize,
  totalPages,
  onPrev,
  onNext,
}: PaginationProps) {
  if (total === 0) return null;

  const canGoPrev = page > 1;
  const canGoNext = page < totalPages;

  const start = total === 0 ? 0 : (page - 1) * pageSize + 1;
  const end = Math.min(page * pageSize, total);

  return (
    <div className="mt-4 flex flex-col items-center justify-between gap-2 border-t border-slate-200 pt-3 text-xs text-slate-600 md:flex-row">
      <span>
        Showing <span className="font-semibold">{start}</span>–
        <span className="font-semibold">{end}</span> of{" "}
        <span className="font-semibold">{total}</span> issues
      </span>

      <div className="flex items-center gap-2">
        <Button
          variant="secondary"
          type="button"
          disabled={!canGoPrev}
          onClick={onPrev}
        >
          Previous
        </Button>

        <span>
          Page <span className="font-semibold">{page}</span> of{" "}
          <span className="font-semibold">{totalPages}</span>
        </span>

        <Button
          variant="secondary"
          type="button"
          disabled={!canGoNext}
          onClick={onNext}
        >
          Next
        </Button>
      </div>
    </div>
  );
}

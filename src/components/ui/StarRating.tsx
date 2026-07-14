const STAR_PATH =
  'M10 1.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L10 14.9l-5.2 2.7 1-5.8L1.5 7.7l5.9-.9L10 1.5z';

const STAR_COUNT = 5;

export type StarRatingProps = {
  rating: number;
  className?: string;
  starClassName?: string;
  label?: string;
};

export const StarRating = ({
  rating,
  className = '',
  starClassName = 'h-4 w-4',
  label,
}: StarRatingProps) => {
  const clampedRating = Math.min(STAR_COUNT, Math.max(0, rating));

  return (
    <span
      className={`inline-flex text-primary ${className}`}
      role="img"
      aria-label={label}
    >
      {Array.from({ length: STAR_COUNT }, (_, index) => {
        const fill = Math.min(1, Math.max(0, clampedRating - index));

        return (
          <span
            key={index}
            className={`relative inline-block ${starClassName}`}
          >
            <svg
              viewBox="0 0 20 20"
              className={`${starClassName} fill-current text-foreground/15`}
              aria-hidden
            >
              <path d={STAR_PATH} />
            </svg>
            {fill > 0 ? (
              <svg
                viewBox="0 0 20 20"
                className={`absolute inset-0 ${starClassName} fill-current`}
                style={{ clipPath: `inset(0 ${(1 - fill) * 100}% 0 0)` }}
                aria-hidden
              >
                <path d={STAR_PATH} />
              </svg>
            ) : null}
          </span>
        );
      })}
    </span>
  );
};

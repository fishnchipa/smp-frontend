type SpinnerProps = {
  bg?: string;
  spinner?: string;
};

export default function Spinner({
  bg = "black",
  spinner = "white",
}: SpinnerProps) {
  return (
    <svg
      className="animate-spin h-5 w-5 text-white"
      viewBox="0 0 24 24"
      fill="none"
    >
      <circle cx={12} cy={12} r={10} stroke={bg} strokeWidth={4}></circle>
      <path
        fill={spinner}
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
  );
}


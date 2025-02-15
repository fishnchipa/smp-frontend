
export default function Pulse({num}: {num: number}) {
  const themes = ["blue", "green", "purple"];
  const theme = themes[num % 3];

  if (theme === "green") {
    return (
      <span className="relative flex h-3 w-3">
        <span className="group-hover:animate-ping absolute inline-flex h-full w-full rounded-full bg-soft-aqua opacity-75"></span>
        <span className="relative inline-flex rounded-full h-3 w-3 bg-aqua"></span>
      </span>
    )
  } else if (theme === "purple") {
    return (
      <span className="relative flex h-3 w-3">
        <span className="group-hover:animate-ping absolute inline-flex h-full w-full rounded-full bg-soft-violet opacity-75"></span>
        <span className="relative inline-flex rounded-full h-3 w-3 bg-violet"></span>
      </span>
    )
  } else if (theme === "blue") {
    return (
      <span className="relative flex h-3 w-3">
        <span className="group-hover:animate-ping absolute inline-flex h-full w-full rounded-full bg-soft-ocean opacity-75"></span>
        <span className="relative inline-flex rounded-full h-3 w-3 bg-ocean"></span>
      </span>
    )
  }

}

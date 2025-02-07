import { DifficultyType } from "@/lib/schema/QuestionSchema"

type DifficultyProps = {
  status: DifficultyType 
}

export default function Difficulty({ status }: DifficultyProps) {
  switch (status) {
    case "EASY":
      return (
        <span className="text-easy">Easy</span>  
      )
    case "MEDIUM":
      return (
        <span className="text-medium">Medium</span>  
      )
    case "HARD":
      return (
        <span className="text-hard">Hard</span>
    )
  }
}

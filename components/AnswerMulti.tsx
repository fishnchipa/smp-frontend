import { useForm } from "@/hooks/useForm";
import { MultiAnswerType } from "@/lib/schema/QuestionSchema"
import { CircleCheck } from "lucide-react";

type AnswerMultiProps = {
  data: MultiAnswerType,
  index: number
}

export default function AnswerMulti({data, index}: AnswerMultiProps) {
  const {errors, submission, setFormData} = useForm();
  return (
    <div>
      <div 
        className="w-full mb-2" 
        dangerouslySetInnerHTML={{__html: data.value.question}}
      >
      </div> 
      <div className="flex flex-col gap-y-2">
        {data.value.choice.map((choice, key) => (
          <div key={key} className="flex gap-x-2 items-center">
            <input 
              type="radio" 
              name={index.toString()} 
              onChange={() => {
                const value = key.toString()
                setFormData(prev => {
                  return {
                    ...prev,
                    [index.toString()]: value
                  }
                })
              }}
              className="bg-light-aqua checked:bg-aqua checked:hover:bg-aqua checked:active:bg-aqua checked:focus:bg-aqua focus:bg-aqua focus:outline-none focus:ring-0 "
             />

            <span>{choice}</span>
          </div>
        ))}
        {errors[index.toString()] && <span className="text-red-500">Incorrect Answer</span>}
        {submission && !errors[index.toString()] && (<CircleCheck className="text-emerald-400" />)}
      </div>
    </div> 
  )
}

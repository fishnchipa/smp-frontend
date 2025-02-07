import { FormContext } from "@/providers/FormProvider";
import { useContext } from "react";

export function useForm() {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('useForm must be used within a FormProvider');
  }
  return context;
}

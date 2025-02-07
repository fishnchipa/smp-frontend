"use client"

import { createContext, useState } from "react";

type FormContextType = {
  formData: { [key: string]: string };
  setFormData: React.Dispatch<React.SetStateAction<{ [key: string]: string }>>;
  errors: { [key: string]: boolean }
  setErrors: React.Dispatch<React.SetStateAction<{ [key: string]: boolean }>>;
  submission: boolean,
  setSubmission: React.Dispatch<React.SetStateAction<boolean>>
};

export const FormContext = createContext<FormContextType | undefined>(undefined);

type FormProviderProps = {
  children: React.ReactNode;
};

export default function FormProvider({ children }: FormProviderProps) {
  const [formData, setFormData] = useState<{ [key: string]: string }>({});
  const [errors, setErrors] = useState<{ [key: string]: boolean }>({});
  const [submission, setSubmission] = useState(false);

  return (
    <FormContext.Provider 
      value={{ 
        formData, 
        setFormData, 
        errors, 
        setErrors,
        submission,
        setSubmission
      }}
    >
      {children}
    </FormContext.Provider>
  );
}

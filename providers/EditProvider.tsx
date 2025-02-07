
"use client"

import { ContentCreationType } from "@/lib/schema/ContentSchema";
import { DifficultyType, ModuleType, TagType } from "@/lib/schema/QuestionSchema";
import { SolutionType } from "@/lib/schema/SolutionSchema";
import React, { createContext, useState } from "react";

export type OptionState = "TEXT" | "LIST" | "IMAGE" | "INPUT";

export type InputState = "RESPONSE_FREE" | "RESPONSE_MULTIPLE";

export type SolutionState = "MATH" | "TEXT" | "IMAGE";

type EditContextType = {
  option: OptionState
  setOption: React.Dispatch<React.SetStateAction<OptionState>>,
  input: InputState,
  setInput: React.Dispatch<React.SetStateAction<InputState>>
  content: ContentCreationType[],
  setContent: React.Dispatch<React.SetStateAction<ContentCreationType[]>>,
  tags: Map<number, TagType>,
  addTag: (tag: TagType) => void,
  removeTag: (key: number) => void,
  difficulty: DifficultyType,
  setDifficulty: React.Dispatch<React.SetStateAction<DifficultyType>>,
  module: ModuleType,
  setModule: React.Dispatch<React.SetStateAction<ModuleType>>,
  setTitle: React.Dispatch<React.SetStateAction<string>>,
  title: string,
  submitting: boolean,
  setSubmitting: React.Dispatch<React.SetStateAction<boolean>> 
  solution: SolutionType[],
  solutionState: SolutionState,
  setSolutionState: React.Dispatch<React.SetStateAction<SolutionState>>
  setSolution: React.Dispatch<React.SetStateAction<SolutionType[]>>

};

export const EditContext = createContext<EditContextType | undefined>(undefined);

type EditProviderProps = {
  children: React.ReactNode;
};

export default function EditProvider({ children }: EditProviderProps) {
  const [option, setOption] = useState<OptionState>("TEXT");
  const [input, setInput] = useState<InputState>("RESPONSE_FREE");
  const [content, setContent] = useState<ContentCreationType[]>([]);
  const [difficulty, setDifficulty] = useState<DifficultyType>("EASY");
  const [module, setModule] = useState<ModuleType>("MECHANICS");
  const [tags, setTagState] = useState<Map<number, TagType>>(new Map<number, TagType>);
  const [title, setTitle] = useState("Question Title");
  const [submitting, setSubmitting] = useState(false);
  const [solution, setSolution] = useState<SolutionType[]>([]);
  const [solutionState, setSolutionState] = useState<SolutionState>("TEXT");

  const addTag = (tag: TagType) => {
    setTagState((prevTags) => {
      const newTags = new Map(prevTags); 
      newTags.set(tag.id, tag); 
    return newTags; 
    });
  }

  const removeTag = (key: number) => {
    setTagState((prevTags) => {
        const newTags = new Map(prevTags);
        newTags.delete(key);
      return newTags;
    });
  };


  return (
    <EditContext.Provider 
      value={{ 
        solutionState,
        setSolutionState,
        option,
        setOption,
        input,
        setInput,
        content,
        setContent,
        tags,
        title,
        setTitle,
        addTag,
        removeTag,
        difficulty,
        setDifficulty,
        module,
        setModule,
        submitting,
        setSubmitting,
        setSolution,
        solution
      }}
    >
      {children}
    </EditContext.Provider>
  );
}

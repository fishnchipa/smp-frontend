
import { EditContext } from "@/providers/EditProvider";
import { useContext } from "react";

export function useEdit() {
  const context = useContext(EditContext);
  if (!context) {
    throw new Error('useEdit must be used within a EditProvider');
  }
  return context;
}

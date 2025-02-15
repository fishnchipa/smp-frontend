
import Wrapper from "./Wrapper";
import EditProvider from "@/providers/EditProvider";

export default function Home() {

  return (
    <EditProvider>
      <Wrapper />
    </EditProvider>
  )
}

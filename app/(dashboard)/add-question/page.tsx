
import Composition from "@/components/Composition";
import Wrapper from "./Wrapper";
import EditProvider from "@/providers/EditProvider";

export default function Home() {

  return (
    <Composition>
      <EditProvider>
        <Wrapper />
      </EditProvider>
    </Composition>
  )
}

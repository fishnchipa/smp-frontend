import CompositionWrapper from "@/components/CompositionWrapper";
import { getCollectionList } from "@/lib/data/collection";
import { getUser } from "@/lib/data/user";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Solve My Physics",
  description: "Solve my physics dashboard",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const data = await getUser();
  const sets = await getCollectionList();
  return (
    <CompositionWrapper data={data} sets={sets}>
      {children}
    </CompositionWrapper>
  );
}


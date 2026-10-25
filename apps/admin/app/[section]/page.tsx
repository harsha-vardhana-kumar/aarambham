export const dynamicParams = false;
import { notFound } from "next/navigation";
import { adminSections } from "@aarambham/core";
import { AdminWorkspace } from "../../components/admin-workspace";
export function generateStaticParams() {
  return adminSections.map(([section]) => ({ section }));
}
export default async function AdminPage({
  params,
}: {
  params: Promise<{ section: string }>;
}) {
  const { section } = await params;
  if (!adminSections.some(([s]) => s === section)) notFound();
  return <AdminWorkspace section={section} />;
}

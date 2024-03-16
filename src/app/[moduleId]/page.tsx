import ExamStartModule from "@/src/components/examStartModule";

export default function ModulePage({
  params,
}: {
  params: { moduleId: string };
}) {
  return <ExamStartModule moduleId={params.moduleId} />;
}

export function generateStaticParams() {
  return [{ id: "11-13" }];
}

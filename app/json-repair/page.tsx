import { ToolPageShell } from "@/components/tools/tool-page-shell";
import { RepairWorkspace } from "@/features/json-repair/repair-workspace";
import { JsonLd } from "@/components/seo/json-ld";
import { toolBySlug } from "@/config/tools";
import { buildToolMetadata } from "@/lib/seo/metadata";
import { softwareApplicationSchema, faqSchema, breadcrumbSchema } from "@/lib/seo/schema";
import { siteConfig } from "@/config/site";

const tool = toolBySlug("json-repair")!;

export const metadata = buildToolMetadata(tool);

export default function JsonRepairPage() {
  return (
    <>
      <JsonLd data={softwareApplicationSchema(tool)} />
      <JsonLd data={faqSchema(tool.faqs)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: siteConfig.url },
          { name: tool.name, url: `${siteConfig.url}/${tool.slug}` },
        ])}
      />
      <ToolPageShell tool={tool}>
        <RepairWorkspace sample={tool.sampleInput} />
      </ToolPageShell>
    </>
  );
}

import { ToolPageShell } from "@/components/tools/tool-page-shell";
import { DocGeneratorWorkspace } from "@/features/json-doc-generator/doc-generator-workspace";
import { ProGate } from "@/components/pro/pro-gate";
import { JsonLd } from "@/components/seo/json-ld";
import { toolBySlug } from "@/config/tools";
import { buildToolMetadata } from "@/lib/seo/metadata";
import { softwareApplicationSchema, faqSchema, breadcrumbSchema } from "@/lib/seo/schema";
import { siteConfig } from "@/config/site";

const tool = toolBySlug("json-doc-generator")!;

export const metadata = buildToolMetadata(tool);

export default function Page() {
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
        <ProGate tool={tool}>
          <DocGeneratorWorkspace sample={tool.sampleInput} />
        </ProGate>
      </ToolPageShell>
    </>
  );
}
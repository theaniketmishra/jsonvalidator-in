import { ToolPageShell } from "@/components/tools/tool-page-shell";
import { TypeScriptWorkspace } from "@/features/json-to-typescript/typescript-workspace";
import { JsonLd } from "@/components/seo/json-ld";
import { toolBySlug } from "@/config/tools";
import { buildToolMetadata } from "@/lib/seo/metadata";
import { softwareApplicationSchema, faqSchema, breadcrumbSchema } from "@/lib/seo/schema";
import { siteConfig } from "@/config/site";

const tool = toolBySlug("json-to-typescript")!;

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
        <TypeScriptWorkspace sample={tool.sampleInput} />
      </ToolPageShell>
    </>
  );
}

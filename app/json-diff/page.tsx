import { ToolPageShell } from "@/components/tools/tool-page-shell";
import { DiffWorkspace } from "@/features/json-diff/diff-workspace";
import { JsonLd } from "@/components/seo/json-ld";
import { toolBySlug } from "@/config/tools";
import { buildToolMetadata } from "@/lib/seo/metadata";
import { softwareApplicationSchema, faqSchema, breadcrumbSchema } from "@/lib/seo/schema";
import { siteConfig } from "@/config/site";

const tool = toolBySlug("json-diff")!;

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
        <DiffWorkspace sampleA={tool.sampleInput} sampleB={"{\n  \"id\": 1024,\n  \"name\": \"Asha Verma\",\n  \"isActive\": false,\n  \"roles\": [\"admin\"],\n  \"address\": { \"city\": \"Mumbai\", \"pincode\": \"400001\" }\n}"} />
      </ToolPageShell>
    </>
  );
}

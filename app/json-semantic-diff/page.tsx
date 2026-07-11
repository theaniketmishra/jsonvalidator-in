import { ToolPageShell } from "@/components/tools/tool-page-shell";
import { SemanticDiffWorkspace } from "@/features/json-semantic-diff/semantic-diff-workspace";
import { ProGate } from "@/components/pro/pro-gate";
import { JsonLd } from "@/components/seo/json-ld";
import { toolBySlug } from "@/config/tools";
import { buildToolMetadata } from "@/lib/seo/metadata";
import { softwareApplicationSchema, faqSchema, breadcrumbSchema } from "@/lib/seo/schema";
import { siteConfig } from "@/config/site";

const tool = toolBySlug("json-semantic-diff")!;

const SAMPLE_AFTER = `{
  "id": 1024,
  "fullName": "Asha Verma",
  "isActive": "true",
  "roles": ["admin"],
  "email": "asha@example.com"
}`;

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
        <ProGate requiredPlan={tool.proTier ?? "starter"} featureName={tool.name}>
          <SemanticDiffWorkspace sampleA={tool.sampleInput} sampleB={SAMPLE_AFTER} />
        </ProGate>
      </ToolPageShell>
    </>
  );
}

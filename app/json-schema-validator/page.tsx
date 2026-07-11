import { ToolPageShell } from "@/components/tools/tool-page-shell";
import { SchemaValidatorWorkspace } from "@/features/json-schema-validator/schema-validator-page-workspace";
import { JsonLd } from "@/components/seo/json-ld";
import { toolBySlug } from "@/config/tools";
import { buildToolMetadata } from "@/lib/seo/metadata";
import { softwareApplicationSchema, faqSchema, breadcrumbSchema } from "@/lib/seo/schema";
import { siteConfig } from "@/config/site";

const tool = toolBySlug("json-schema-validator")!;

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
        <SchemaValidatorWorkspace sample={tool.sampleInput} sampleSchema={"{\n  \"type\": \"object\",\n  \"properties\": {\n    \"id\": { \"type\": \"integer\" },\n    \"name\": { \"type\": \"string\" }\n  },\n  \"required\": [\"id\", \"name\"]\n}"} />
      </ToolPageShell>
    </>
  );
}

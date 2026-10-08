type JsonLdProps = {
  data: Record<string, unknown> | readonly unknown[] | object;
};

export const JsonLd = ({ data }: JsonLdProps) => (
  <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
);

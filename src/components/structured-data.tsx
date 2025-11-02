import type { StructuredData as StructuredDataType } from '@/lib/structured-data'

interface StructuredDataProps {
  data: StructuredDataType | StructuredDataType[]
}

export function StructuredData({ data }: StructuredDataProps) {
  const schemas = Array.isArray(data) ? data : [data]

  return (
    <>
      {schemas.map((schema) => {
        const key = `${schema['@type']}-${schema['@context']}`
        return (
          <script key={key} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
        )
      })}
    </>
  )
}

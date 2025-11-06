export async function GET(_request: Request) {
  try {
    const response = await fetch(`https://ipapi.co/json/?access_key=${process.env.IPAPI_TOKEN}`, {
      next: { revalidate: 86400 },
    })

    if (!response.ok) throw new Error('Failed to fetch')

    const data = await response.json()

    return Response.json(data, {
      headers: {
        'Cache-Control': 'public, max-age=86400, s-maxage=86400',
      },
    })
  } catch {
    return Response.json(
      {
        latitude: null,
        longitude: null,
      },
      { status: 200 },
    )
  }
}

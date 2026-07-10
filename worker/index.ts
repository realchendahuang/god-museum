interface Env {
  PAGES_ORIGIN: string
}

export default {
  async fetch(request, env): Promise<Response> {
    const url = new URL(request.url)
    const path = url.pathname

    if (path === '/god-museum') {
      return Response.redirect(`${url.origin}/god-museum/`, 308)
    }

    if (!path.startsWith('/god-museum/')) {
      return fetch(request)
    }

    const targetUrl = new URL(path + url.search, env.PAGES_ORIGIN)

    try {
      return await fetch(new Request(targetUrl, request))
    } catch (error) {
      console.error(JSON.stringify({
        message: 'God-Museum origin fetch failed',
        path,
        error: error instanceof Error ? error.message : String(error)
      }))

      return new Response('God-Museum is temporarily unavailable.', {
        status: 502,
        headers: {
          'content-type': 'text/plain; charset=utf-8'
        }
      })
    }
  }
} satisfies ExportedHandler<Env>

declare module '*.module.css' {
  const classes: Record<string, string>
  export default classes
}

declare module '*.svg' {
  const src: string
  export default src
}

interface ImportMeta {
  env: {
    VITE_ANTHROPIC_API_KEY?: string
    [key: string]: string | undefined
  }
}

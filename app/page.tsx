"use client"

import dynamic from 'next/dynamic'

// Use dynamic import with SSR disabled to prevent hydration mismatch
const App = dynamic(() => import('../src/App'), {
  ssr: false
})

export default function Page() {
  return <App />
}

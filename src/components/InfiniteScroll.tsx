import { useEffect, useRef } from 'react'

interface InfiniteScrollProps {
  onIntersect: () => void
  active: boolean
}

export default function InfiniteScroll({ onIntersect, active }: InfiniteScrollProps) {
  const observerRef = useRef<IntersectionObserver | null>(null)
  const sentinelRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!sentinelRef.current) return
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && active) {
        onIntersect()
      }
    }, { rootMargin: '200px' })

    observer.observe(sentinelRef.current)
    observerRef.current = observer

    return () => {
      observer.disconnect()
    }
  }, [active, onIntersect])

  return <div ref={sentinelRef} style={{ height: 1, width: '100%' }} />
}

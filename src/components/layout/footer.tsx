'use client'

import Link from 'next/link'

export function Footer() {
  return (
    <footer className="bg-bg-secondary border-t border-bg-dark py-12 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-bold mb-4">Kupuri Audio</h3>
            <p className="text-text-secondary text-sm">
              Premium audio equipment rental for content creators in Mexico City.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Product</h4>
            <ul className="space-y-2 text-sm text-text-secondary">
              <li><Link href="/equipment" className="hover:text-primary">Equipment</Link></li>
              <li><Link href="/categories" className="hover:text-primary">Categories</Link></li>
              <li><Link href="/pricing" className="hover:text-primary">Pricing</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-text-secondary">
              <li><Link href="/about" className="hover:text-primary">About</Link></li>
              <li><Link href="/contact" className="hover:text-primary">Contact</Link></li>
              <li><Link href="/faq" className="hover:text-primary">FAQ</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-text-secondary">
              <li><Link href="/privacy" className="hover:text-primary">Privacy</Link></li>
              <li><Link href="/terms" className="hover:text-primary">Terms</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-bg-dark pt-8 text-center text-text-secondary text-sm">
          <p>&copy; 2026 Kupuri Audio. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

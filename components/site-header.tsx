"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"

export function SiteHeader() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div
        className="text-white px-4 py-3 text-center text-sm"
        style={{
          backgroundImage:
            'url("https://cdn.prod.website-files.com/6768f29a6d5da42209173f20/6768f29b6d5da422091774b0_Rectangle%20(20).svg")',
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="mx-auto max-w-7xl">
          Announcing our $20.8M Series A to build the future of customer intelligence.{" "}
          <Link href="#" className="font-medium underline underline-offset-2">
            Read more!
          </Link>
        </div>
      </div>
      <div className="bg-black">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <nav className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <Link href="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded bg-[#6366F1]" />
                <span className="text-white text-lg font-medium">Zofi</span>
              </Link>
            </div>

            <div className="hidden md:flex md:items-center md:space-x-4">
              <NavItem href="#" label="Home" />
              <NavItem href="#" label="Product Demo" />
              <NavItem href="#" label="Blog" />
            </div>

            <div className="flex items-center space-x-4">
              <Button variant="ghost" className="text-white">
                Sign In
              </Button>
              <Button className="bg-gradient-to-r from-[#6366F1] to-[#EC4899] text-white hover:opacity-90">
                Book a Demo
              </Button>
            </div>
          </nav>
        </div>
      </div>
    </header>
  )
}

function NavItem({ href, label }: { href: string; label: string }) {
  return (
    <Button variant="ghost" className="text-white" asChild>
      <Link href={href}>{label}</Link>
    </Button>
  )
}


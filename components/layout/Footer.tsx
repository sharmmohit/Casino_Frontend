import Link from "next/link"

const footerSections = {
  Product: ["Marketplace", "Pricing", "Integrations", "Changelog"],
  Company: ["About", "Blog", "Careers", "Contact"],
  Legal: ["Privacy", "Terms", "Security", "Status"],
}

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black/50">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-linear-to-r from-white to-gray-400 rounded-lg flex items-center justify-center">
                <span className="text-black text-xs font-bold">AD</span>
              </div>
              <span className="text-lg font-bold">
                Agents<span className="text-white/60">Desk</span>
              </span>
            </Link>
            <p className="text-sm text-white/40 max-w-sm mb-6">
              The AI Agent Marketplace. Deploy voice, calling, restaurant, and appointment agents in minutes.
            </p>
            <div className="flex gap-3">
              {["𝕏", "in", "gh", "▶"].map((social, i) => (
                <button
                  key={i}
                  className="w-8 h-8 rounded-lg border border-white/10 hover:border-white/30 transition-colors"
                >
                  {social}
                </button>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          {Object.entries(footerSections).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-white/60 mb-4">
                {title}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm text-white/40 hover:text-white/60 transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-white/40 font-mono">
            © 2025 AgentsDesk, Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-xs text-white/40 font-mono">All systems operational</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
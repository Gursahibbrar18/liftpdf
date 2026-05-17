import Link from "next/link";
import { Zap } from "lucide-react";
import { CATEGORY_META, getToolsByCategory } from "@/lib/tools";

export function Footer() {
  return (
    <footer className="bg-slate-50 border-t border-border mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">
                Lift<span className="text-primary">PDF</span>
              </span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              Fast, free PDF tools that work entirely in your browser. No
              sign-up. No watermarks.
            </p>
          </div>

          {/* Tool categories — show 4 categories in footer */}
          {(["edit", "organize", "convert", "layout"] as const).map((cat) => {
            const meta = CATEGORY_META[cat];
            const tools = getToolsByCategory(cat).filter((t) => !t.comingSoon).slice(0, 6);
            return (
              <div key={cat}>
                <h3 className={`text-xs font-semibold uppercase tracking-wider mb-3 ${meta.color}`}>
                  {meta.label}
                </h3>
                <ul className="space-y-2">
                  {tools.map((tool) => (
                    <li key={tool.slug}>
                      <Link
                        href={`/${tool.slug}`}
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {tool.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        <div className="border-t border-border mt-10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} LiftPDF. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {["Privacy Policy", "Terms of Service", "Contact"].map((label) => (
              <Link
                key={label}
                href={`/${label.toLowerCase().replace(/ /g, "-")}`}
                className="text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

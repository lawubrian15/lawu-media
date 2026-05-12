"use client";

import Link from "next/link";
import { Instagram, Twitter, Linkedin, Facebook } from "lucide-react";
import { navLinks, companyInfo } from "@/lib/data";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24">
        {/* Mobile: Stacked layout */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Company Column */}
          <div className="col-span-2 md:col-span-1">
            <h3 className="text-xs sm:text-sm font-semibold text-text-primary uppercase tracking-wider mb-4">
              Company
            </h3>
            <ul className="space-y-2 sm:space-y-3">
              {navLinks.footer.company.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-text-secondary hover:text-text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Column */}
          <div className="col-span-2 md:col-span-1">
            <h3 className="text-xs sm:text-sm font-semibold text-text-primary uppercase tracking-wider mb-4">
              Services
            </h3>
            <ul className="space-y-2 sm:space-y-3">
              {navLinks.footer.services.slice(0, 4).map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-text-secondary hover:text-text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Expertise Column */}
          <div className="hidden md:block">
            <h3 className="text-xs sm:text-sm font-semibold text-text-primary uppercase tracking-wider mb-4">
              Expertise
            </h3>
            <ul className="space-y-2 sm:space-y-3">
              {navLinks.footer.expertise.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-text-secondary hover:text-text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Headquarters Column */}
          <div className="col-span-2 md:col-span-1 mt-4 md:mt-0">
            <h3 className="text-xs sm:text-sm font-semibold text-text-primary uppercase tracking-wider mb-4">
              Headquarters
            </h3>
            <address className="not-italic text-sm text-text-secondary leading-relaxed">
              {companyInfo.address}
            </address>

            {/* Social Links */}
            <div className="mt-6">
              <h4 className="text-xs sm:text-sm font-semibold text-text-primary uppercase tracking-wider mb-3">
                Social
              </h4>
              <div className="flex gap-4">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-text-secondary hover:text-accent transition-colors p-1"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-text-secondary hover:text-accent transition-colors p-1"
                  aria-label="Twitter"
                >
                  <Twitter className="w-5 h-5" />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-text-secondary hover:text-accent transition-colors p-1"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-text-secondary hover:text-accent transition-colors p-1"
                  aria-label="Facebook"
                >
                  <Facebook className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 sm:mt-16 pt-6 sm:pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-lg sm:text-xl tracking-tight">
              <span className="font-bold text-text-primary">Lawu</span>
              <span className="font-light text-accent">Media</span>
            </span>
          </div>

          <p className="text-xs sm:text-sm text-text-muted text-center">
            {currentYear} Lawu Media. All Rights Reserved.
          </p>

          <div className="flex gap-4 sm:gap-6 text-xs sm:text-sm text-text-muted">
            <Link href="#" className="hover:text-text-primary transition-colors">
              Terms
            </Link>
            <Link href="#" className="hover:text-text-primary transition-colors">
              Privacy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

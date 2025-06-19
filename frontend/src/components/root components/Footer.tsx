import React from "react";
import Link from "next/link";
import {
  Github,
  Twitter,
  Linkedin,
  Instagram,
  Mail,
  Send,
  Code,
  Users,
  BookOpen,
  Shield,
  Heart,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface FooterLinkProps {
  href: string;
  children: React.ReactNode;
}

const FooterLink: React.FC<FooterLinkProps> = ({ href, children }) => (
  <Link
    href={href}
    className="text-[var(--primary-10)] hover:text-[var(--primary-12)] transition-colors"
  >
    {children}
  </Link>
);

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-b from-[var(--primary-2)] to-[var(--primary-1)] border-t border-[var(--primary-6)] pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-10">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <div className="flex items-center mb-4">
              {/* <div className="h-8 w-8 rounded-md bg-gradient-to-br from-[var(--primary-9)] to-[var(--primary-11)] flex items-center justify-center mr-3"></div> */}
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[var(--primary-9)] to-[var(--primary-11)]">
                HackVerse
              </span>
            </div>
            <p className="text-[var(--primary-11)] mb-6 max-w-md">
              Empowering innovation through collaborative hackathons. Build
              projects, form teams, and showcase your skills on the ultimate
              hackathon platform.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://github.com/adithya-adee/hackverse"
                aria-label="GitHub"
                className="text-[var(--primary-9)] hover:text-[var(--primary-11)] transition-colors"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="https://x.com/AdithyaA593326"
                aria-label="Twitter"
                className="text-[var(--primary-9)] hover:text-[var(--primary-11)] transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </a>
              {/* <a
                href="https://linkedin.com"
                aria-label="LinkedIn"
                className="text-[var(--primary-9)] hover:text-[var(--primary-11)] transition-colors"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="https://instagram.com"
                aria-label="Instagram"
                className="text-[var(--primary-9)] hover:text-[var(--primary-11)] transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a> */}
            </div>
          </div>

          {/* Links Column 1 */}
          <div>
            <h3 className="text-sm font-semibold text-[var(--primary-12)] tracking-wider uppercase mb-4">
              Platform
            </h3>
            <ul className="space-y-2">
              <li>
                <FooterLink href="/events">Hackathons</FooterLink>
              </li>
              {/* <li>
                <FooterLink href="/projects">Projects</FooterLink>
              </li> */}
              <li>
                <FooterLink href="/dashboard">Profile</FooterLink>
              </li>
              {/* <li>
                <FooterLink href="/submissions">Submissions</FooterLink>
              </li> */}
              <li>
                <FooterLink href="/host-hackathon/step1">
                  Host Hackathon
                </FooterLink>
              </li>
            </ul>
          </div>

          {/* Links Column 2 */}
          <div>
            <h3 className="text-sm font-semibold text-[var(--primary-12)] tracking-wider uppercase mb-4">
              Company
            </h3>
            <ul className="space-y-2">
              <li>
                <FooterLink href="/about">About</FooterLink>
              </li>
              {/* <li>
                <FooterLink href="/team">Our Team</FooterLink>
              </li>
              <li>
                <FooterLink href="/careers">Careers</FooterLink>
              </li>
              <li>
                <FooterLink href="/blog">Blog</FooterLink>
              </li> */}
              <li>
                <FooterLink href="/contact">Contact</FooterLink>
              </li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div>
            <h3 className="text-sm font-semibold text-[var(--primary-12)] tracking-wider uppercase mb-4">
              Subscribe to our newsletter
            </h3>
            <p className="text-[var(--primary-11)] text-sm mb-4">
              Stay updated with the latest hackathons and features
            </p>
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="relative flex-grow text-sm">
                {/* <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[var(--primary-8)]" />
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="pl-10 bg-[var(--primary-3)] border-[var(--primary-5)] focus:border-[var(--primary-9)] text-[var(--primary-12)]"
                /> */}
                Not yet implemented
              </div>
              {/* <Button className="bg-[var(--primary-9)] hover:bg-[var(--primary-10)] text-white">
                <Send className="h-4 w-4 mr-2" />
                <span>Subscribe</span>
              </Button> */}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-6 border-t border-[var(--primary-5)] mt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-[var(--primary-10)] text-sm mb-4 md:mb-0">
              © {currentYear} HackVerse. All rights reserved.
            </div>
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-[var(--primary-10)]">
              <FooterLink href="/terms">Terms of Service</FooterLink>
              <FooterLink href="/privacy">Privacy Policy</FooterLink>
              <FooterLink href="/cookies">Cookie Policy</FooterLink>
              <div className="flex items-center text-[var(--primary-10)]">
                <span>Made with</span>
                <Heart className="h-4 w-4 mx-1 text-red-500 fill-red-500" />
                <span>by HackVerse Team</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

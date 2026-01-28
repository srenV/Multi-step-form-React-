/**
 * @file Footer.jsx
 * @description Footer component displaying social links, challenge attribution, and legal links.
 *
 * Key Functionality:
 * - Displays social media links (GitHub, LinkedIn)
 * - Shows Frontend Mentor challenge attribution with link
 * - Provides legal links (Impressum, Privacy Policy)
 * - Responsive layout: Column on mobile, row on desktop
 * - Links to external sites open in new tabs with security attributes
 *
 * Accessibility Features:
 * - role="contentinfo" identifies footer as page footer
 * - Semantic <nav> elements for link groups with descriptive aria-labels
 * - aria-labels on external links indicate they open in new windows
 * - Proper rel="noopener noreferrer" prevents security vulnerabilities
 */

import React from "react";

export const Footer = () => {
  return (
    <footer
      className="flex justify-between p-2 px-2  text-xs md:text-lg font-semibold absolute md:relative top-0 w-full mx-auto"
      role="contentinfo"
      aria-label="Footer information"
    >
      <nav
        className="flex md:gap-5 md:flex-row flex-col"
        aria-label="Social links"
      >
        <a href="https://github.com/srenV" aria-label="Visit my GitHub profile">
          GitHub
        </a>
        <a
          href="https://www.linkedin.com/in/soren-timo-voigt/"
          aria-label="Visit my LinkedIn profile"
        >
          LinkedIn
        </a>
      </nav>
      <div>
        <span className="flex gap-2">
          <span className="hidden md:block">Challenge from </span>
          <a
            href="https://www.frontendmentor.io/challenges/multistep-form-YVAnSdqQBJ"
            className="text-blue-400"
            aria-label="Frontend Mentor challenge: Multi-step form"
          >
            {" "}
            FrontendMentor
          </a>
        </span>
      </div>
      <nav
        className="flex md:gap-5 md:flex-row flex-col"
        aria-label="Legal links"
      >
        <a
          href="https://srenv.vercel.app/impressum"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Impressum (opens in new window)"
        >
          Impressum
        </a>
        <a
          className="text-nowrap"
          href="https://srenv.vercel.app/legal"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Privacy Policy (opens in new window)"
        >
          Privacy Policy
        </a>
      </nav>
    </footer>
  );
};

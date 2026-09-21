/* ==========================================================================
   MAR - CONTACT
   --------------------------------------------------------------------------
   The last room of the website. Replace the placeholders with your real
   details. To remove a line entirely, delete it from the list.
   ========================================================================== */

export interface ContactLink {
  /** Printed label, for example 'Email' or 'LinkedIn'. */
  label: string;
  /** What the visitor sees, for example 'you@example.com' or '@yourhandle'. */
  display: string;
  /** Where it goes. Use 'mailto:' for email. Leave '' to print it unlinked. */
  href: string;
  /** Set to true for links that leave the website. */
  external?: boolean;
}

export const contact = {
  /** The line at the top of the contact page. Say it in your own words. */
  headline: 'Replace this with how you would like to be approached.',

  /** One short paragraph under the headline. */
  body: 'Replace this paragraph with what you are open to: conversations, collaborations, questions about a project, or nothing in particular. Say what is true.',

  /** Where you are. Delete the line if you would rather not say. */
  location: 'Replace with your location',

  /** Whether you are currently available. Delete if you do not want to say. */
  availability: 'Replace with your availability, or delete this line',

  links: [
    { label: 'Email', display: 'replace@example.com', href: 'mailto:replace@example.com' },
    {
      label: 'LinkedIn',
      display: 'Replace with your profile name',
      href: 'https://www.linkedin.com/',
      external: true,
    },
    {
      label: 'Instagram',
      display: '@replace',
      href: 'https://www.instagram.com/',
      external: true,
    },
  ] satisfies ContactLink[],

  /** The last line on the page, under the rule. */
  closing: 'Replace this with a closing line, or delete it.',
} as const;

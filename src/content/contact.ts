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
  headline: 'For projects, collaborations, or just to say hello.',

  /** One short paragraph under the headline. */
  body: 'Open to conversations about new work, studio projects and anything in between. Email is best, or reach out on LinkedIn.',

  /** Where you are. Delete the line if you would rather not say. */
  location: 'Bangalore, India',

  /** Whether you are currently available. Delete if you do not want to say. */
  availability: 'Open to new projects',

  links: [
    {
      label: 'Email',
      display: 'mayargujjar@gmail.com',
      href: 'mailto:mayargujjar@gmail.com',
      external: false,
    },
    {
      label: 'Phone',
      display: '+91 96205 31965',
      href: 'tel:+919620531965',
      external: false,
    },
    {
      /* No profile URL was supplied, so this prints as plain text (href
         '') rather than link to a guessed address. Add the real URL to
         `href` once it is known. */
      label: 'LinkedIn',
      display: 'Maya GR',
      href: '',
      external: false,
    },
  ] satisfies ContactLink[],

  /** The last line on the page, under the rule. */
  closing: 'I like good stories, strong images and things with a little character.',
} as const;

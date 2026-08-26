import type { ProjectLink } from './projects';

/**
 * Condensed versions of the engineering write-ups kept in each project's repository.
 * The repo holds the full account; these exist so a reader who lands on the portfolio
 * gets the reasoning without leaving for GitHub.
 */

export type Block =
  | { kind: 'para'; text: string }
  | { kind: 'code'; code: string }
  | { kind: 'list'; items: string[] }
  /** Two readings of the same thing that disagreed — the shape most of these bugs took. */
  | { kind: 'compare'; caption?: string; rows: { label: string; value: string }[] }
  | { kind: 'callout'; text: string };

export interface CaseStudySection {
  heading: string;
  blocks: Block[];
}

export interface CaseStudy {
  slug: string;
  /** Matches a `Project.id`, so the card and the study stay associated. */
  projectId: string;
  project: string;
  title: string;
  lede: string;
  stack: string[];
  sections: CaseStudySection[];
  /** The generalisable point, shown as the closing statement. */
  takeaway: string;
  links: ProjectLink[];
}

const inboxCopilotLinks: ProjectLink[] = [
  { label: 'View live demo', href: 'https://inbox-copilot-five.vercel.app' },
  { label: 'View source', href: 'https://github.com/elyasnoui/inbox-copilot' },
];

export const caseStudies: CaseStudy[] = [
  {
    slug: 'model-reliability',
    projectId: 'inbox-copilot',
    project: 'Inbox Copilot',
    title: 'Making a language model’s output safe to show a user',
    lede:
      'A scheduling assistant proposes meeting times and explains each one in a sentence rendered straight to the screen. Getting that trustworthy took four rounds — and the fixes that worked mostly removed work from the model rather than asking it more precisely.',
    stack: ['Azure OpenAI', 'C#', 'Prompt design', 'Structured outputs'],
    sections: [
      {
        heading: 'It narrated its own reasoning',
        blocks: [
          {
            kind: 'para',
            text: 'The rationale field is displayed verbatim. Live output read: “Fits Priya’s preference for afternoons only if needed? Actually this is the soonest open weekday slot…” The slot was valid; the model was thinking out loud into the UI.',
          },
          {
            kind: 'para',
            text: 'The first fix was a list of prohibitions — don’t question yourself, don’t revise mid-sentence. It made things worse, producing clipped, malformed text that repeated itself. Replacing the prohibitions with a positive specification and a worked good/bad example fixed it. Telling a model what to produce beats enumerating what to avoid; a list of “don’ts” leaves it guessing at the shape of a “do”.',
          },
        ],
      },
      {
        heading: 'Right rule, wrong arithmetic',
        blocks: [
          {
            kind: 'para',
            text: 'From a thread where an attendee wrote “I’m out Thursday”, the assistant proposed Thursday — and called it Wednesday.',
          },
          {
            kind: 'compare',
            rows: [
              { label: 'Rendered heading', value: 'Thu, Aug 27, 9:00 AM' },
              { label: 'Model’s rationale', value: '“Wednesday morning … fits Sam’s Wed availability”' },
            ],
          },
          {
            kind: 'para',
            text: 'The cause was in the prompt. Timestamps were rendered as bare dates, so the model had to derive a day-of-week before it could apply any constraint in the thread — and every real scheduling constraint is phrased in weekdays. It believed Aug 27 was a Wednesday, and reasoned correctly from there to a wrong answer.',
          },
          { kind: 'code', code: 'Before:  2026-08-27 09:00 +00:00\nAfter:   Thursday 2026-08-27 09:00 +00:00' },
          {
            kind: 'para',
            text: 'This had surfaced before and been treated as a symptom — a validator’s comment already recorded the model proposing a Saturday and calling it Friday. The output was being checked; the cause, that nothing ever told the model what day anything was, went unaddressed.',
          },
        ],
      },
      {
        heading: 'The same fact, computed twice, disagreeing',
        blocks: [
          {
            kind: 'para',
            text: 'With weekdays supplied, one failure remained — and it was the most instructive.',
          },
          {
            kind: 'compare',
            rows: [
              { label: 'Rendered heading', value: 'Fri, Aug 28' },
              { label: 'Model’s rationale', value: '“Thursday morning is still within the requested window”' },
            ],
          },
          {
            kind: 'para',
            text: 'The heading is derived from the slot’s timestamp by application code and is always right. Giving the model weekday-labelled input didn’t stop it re-deriving the weekday when writing a new sentence about a slot it had just produced — a fresh arithmetic step, and one bad roll contradicts the line directly above it.',
          },
          {
            kind: 'para',
            text: 'The fix was to delete the redundancy rather than defend it. The rationale is now forbidden from naming a day or date at all: the interface already shows it, deterministically, immediately above. Restating it created a second chance to be wrong with no upside.',
          },
        ],
      },
      {
        heading: 'What holds regardless',
        blocks: [
          {
            kind: 'list',
            items: [
              'Give the model facts rather than making it derive them. Anything computable in code should arrive already computed.',
              'Never ask for the same fact twice. Two independent derivations will eventually disagree in front of a user, and the disagreement reads worse than either value alone.',
              'Validate output against ground truth anyway. Proposed slots are re-checked server-side against the real calendar — three of these four failures produced output that satisfied the prompt as written.',
            ],
          },
          {
            kind: 'para',
            text: 'Each fix is pinned by a test asserting the rule survives in the prompt, with the failing output quoted in the test comment — so an edit that quietly drops a rule fails loudly and explains why the rule existed.',
          },
        ],
      },
    ],
    takeaway:
      'A prompt is a request, not a guarantee. Treat model output as untrusted input and check it against something that cannot be argued with.',
    links: inboxCopilotLinks,
  },

  {
    slug: 'production-only-bugs',
    projectId: 'inbox-copilot',
    project: 'Inbox Copilot',
    title: 'Two failures that didn’t exist locally',
    lede:
      'One showed an error for a bug invisible on a developer machine. The other showed success for an application that was down. Both are the same lesson: the environment is part of the system.',
    stack: ['Next.js', 'React', 'Azure App Service', 'Vercel'],
    sections: [
      {
        heading: 'A hydration mismatch production could produce and localhost could not',
        blocks: [
          {
            kind: 'para',
            text: 'The deployed frontend threw a hydration mismatch on every load. Nothing reproduced locally — not in dev, and not in a real production build served locally either.',
          },
          {
            kind: 'para',
            text: 'The first cause was genuine: a timestamp formatter read the current time internally while being called from a component that both server-renders and hydrates, so each side compared against its own clock. Fixed by computing the time once on the server and passing it down.',
          },
          {
            kind: 'para',
            text: 'After deploying, the error was still there. The console showed two different bundle hashes in one log, which made the reading ambiguous — stale error, or live one? Rather than accept it, I opened a genuinely fresh tab. Still failing. Accepting the ambiguous signal would have meant declaring victory on a half-fixed bug.',
          },
          {
            kind: 'para',
            text: 'The real cause was that every date-formatting call omitted an explicit time zone, so each used its runtime’s ambient zone — UTC on the server, the visitor’s zone in the browser. The same applied to the day-boundary arithmetic, where the date getters are equally zone-dependent.',
          },
          {
            kind: 'callout',
            text: 'The bug required a server and a browser in different time zones to exist at all. A local production build proved nothing, because both were the same machine.',
          },
          {
            kind: 'para',
            text: 'Confirming the fix needed the same care: pinning to UTC shifted displayed times by exactly two hours locally, which proved the change was taking effect and revealed the machine’s own offset. Response headers were checked to rule out edge caching before concluding anything.',
          },
        ],
      },
      {
        heading: 'A deployment that reported success while the app returned 500s',
        blocks: [
          {
            kind: 'para',
            text: 'A deploy completed cleanly and every AI endpoint began failing. An API key had been truncated from 84 characters to 40 by a command that set six application settings at once. Nothing errored — the setting was accepted, just wrong.',
          },
          {
            kind: 'para',
            text: 'Diagnosing it without putting a live credential on screen meant comparing lengths only, which was sufficient to prove corruption while exposing nothing. The fix read the value directly into a variable and set it in isolation, removing the truncation path rather than retrying the command that caused it.',
          },
          {
            kind: 'para',
            text: 'The verification script then lied too. It polled a configuration endpoint that reported healthy — because the old container was still serving traffic mid-rolling-restart. Log timestamps settled it: the check ran 45 seconds before the new container was ready. It had tested the previous deployment and reported on the new one.',
          },
        ],
      },
      {
        heading: 'What changed',
        blocks: [
          {
            kind: 'para',
            text: 'The deploy pipeline now ends with a smoke test that doesn’t trust the deploy step. It polls until healthy, then asserts on the running application’s own view of its configuration — that it came up in the right mode, and that it can actually reach Azure OpenAI.',
          },
          {
            kind: 'code', code: 'mode=$(curl -s "$url/api/mode")\ncase "$mode" in *\'"copilotConfigured":true\'*) ;; *) exit 1 ;; esac' },
        ],
      },
    ],
    takeaway:
      'A green status is a claim, not evidence — deploy tooling reports on the upload, not the running system. And a bug that only appears in production is telling you about the environment.',
    links: inboxCopilotLinks,
  },

  {
    slug: 'credential-free-deployment',
    projectId: 'inbox-copilot',
    project: 'Inbox Copilot',
    title: 'Deploying without storing a credential',
    lede:
      'The API deploys to Azure from GitHub Actions with no secret stored anywhere. Three failed runs got it there, two of which fail with errors pointing nowhere near the cause.',
    stack: ['GitHub Actions', 'Azure App Service', 'OIDC', 'ASP.NET Core'],
    sections: [
      {
        heading: 'Why credential-free',
        blocks: [
          {
            kind: 'para',
            text: 'The usual App Service deploy uses a publish profile — a long-lived credential pasted into GitHub. That route was closed: SCM basic auth is disabled by default on current Azure. It could have been re-enabled with one command, but re-enabling a security default to take the easier path is the wrong instinct.',
          },
          {
            kind: 'para',
            text: 'Instead GitHub mints a short-lived token per run asserting which repository and environment it came from, and Azure holds a trust for exactly that assertion. The identity can redeploy one web app and do nothing else. Nothing long-lived exists, so nothing can leak — which is also why the setup script is safe to publish.',
          },
        ],
      },
      {
        heading: 'A package rejected for its path separators',
        blocks: [
          {
            kind: 'para',
            text: 'The first deploy failed with an opaque HTTP 400. The archive had been built on Windows, where PowerShell records nested paths with a backslash; the ZIP specification mandates a forward slash and the Linux host rejected it. Seven entries, all backslash, none forward.',
          },
          {
            kind: 'para',
            text: 'The interim fix normalised the separators. The actual fix was to stop producing the artifact on Windows — CI now packages on Linux, where it is correct by construction. That removes the failure class instead of working around it.',
          },
        ],
      },
      {
        heading: 'A subject that was correct by every guide',
        blocks: [
          {
            kind: 'para',
            text: 'Authentication then failed with AADSTS700213. The federated credential registered in Azure was the name-based form shown in essentially every tutorial, and checked in isolation it was entirely correct — right repository, right environment, right issuer, right audience.',
          },
          {
            kind: 'compare',
            caption: 'What was registered, against what GitHub actually sent',
            rows: [
              { label: 'Registered', value: 'repo:owner/repo:environment:production' },
              { label: 'Presented', value: 'repo:owner@61194632/repo@1343315363:environment:production' },
            ],
          },
          {
            kind: 'para',
            text: 'GitHub now issues immutable subject claims carrying the numeric owner and repository IDs, binding the trust permanently to that repository — a rename cannot carry it elsewhere, and a later repository reusing the name cannot inherit it.',
          },
          {
            kind: 'callout',
            text: 'Verifying both ends of a trust relationship against each other beats verifying each end against expectation.',
          },
        ],
      },
      {
        heading: 'The pipeline’s security properties',
        blocks: [
          {
            kind: 'list',
            items: [
              'No stored credential — federated identity, short-lived tokens only.',
              'The deploy identity holds one role on one web app, not Contributor on a subscription.',
              'Pull requests never deploy, so a fork cannot ship code.',
              'Only master can deploy — the credential is scoped to an environment, not a branch, so without this check a manual run from any branch would ship it.',
              'The default workflow token is read-only, so a compromised build step cannot push commits.',
            ],
          },
        ],
      },
    ],
    takeaway:
      'Configuration that looks correct in isolation is not verified. Check it against what the other side actually sends.',
    links: inboxCopilotLinks,
  },
];

export const caseStudiesByProject = (projectId: string) =>
  caseStudies.filter((study) => study.projectId === projectId);

export const caseStudyBySlug = (slug: string) =>
  caseStudies.find((study) => study.slug === slug);

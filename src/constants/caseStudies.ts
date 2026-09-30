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
  /**
   * How the project card offers this study. Most of these are accounts of
   * something going wrong, which is what the card says by default — set this
   * where that would misdescribe the piece.
   */
  teaser?: string;
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

  {
    slug: 'break-identity',
    projectId: 'tessera',
    project: 'Tessera',
    title: 'The same five breaks, filed under two names',
    lede:
      'A reconciliation break has to survive a rerun — otherwise every note and assignment made on it vanishes the next morning. That means its identity has to be stable. Two call sites each computed that identity a different way, and the result was one queue holding the same disagreements twice.',
    stack: ['C#', 'EF Core', 'Blazor Server', 'SQLite', 'SQL Server'],
    sections: [
      {
        heading: 'Identity has to survive the run that found it',
        blocks: [
          {
            kind: 'para',
            text: 'A reconciliation runs every morning, and most of yesterday’s breaks are still there. If a rerun minted a fresh identity for each one, every note and assignment made yesterday would be orphaned and the queue would be useless by the second day. So a break’s identity is a hash of the reconciliation’s name, the matching key, and the kind of disagreement — computed the same way on every run, so the same disagreement always resolves to the same row.',
          },
          {
            kind: 'para',
            text: 'That only works if “the reconciliation’s name” means one specific string, consistently. The step that runs the match declares exactly that: a required parameter documented as “break identities are derived from it”. One value, one place it is supposed to live.',
          },
        ],
      },
      {
        heading: 'Two callers, two readings of the same rule',
        blocks: [
          {
            kind: 'para',
            text: 'The service that runs a reconciliation and updates the queue took the name as an argument rather than reading the step’s own parameter. Nothing enforced that a caller’s argument matched what the pipeline had actually declared — it was just another string, supplied wherever the service was called from.',
          },
          {
            kind: 'compare',
            caption: 'The same pipeline, three answers to “what is this reconciliation called”',
            rows: [
              { label: 'The step’s own declared name', value: '"Trades vs settlements"' },
              { label: 'Designer, clicking Reconcile', value: '_draft.Name → "Trades against settlements"' },
              { label: 'Command line, no flag given', value: 'definition.Name → "Trades against settlements"' },
            ],
          },
          {
            kind: 'para',
            text: 'The pipeline’s own display name and the reconcile step’s configured name were never the same string — a wholly ordinary thing for a person to type, since nothing suggested they needed to match. Every call path that used the pipeline’s display name produced an identity space the step itself had never claimed.',
          },
        ],
      },
      {
        heading: 'What that looked like in the queue',
        blocks: [
          {
            kind: 'para',
            text: 'Running the same reconciliation from the designer and from the command line — an entirely normal thing to do while building and testing it — filed the same five disagreements under both names. Ten rows, five real breaks:',
          },
          {
            kind: 'compare',
            caption: 'Two identities, same underlying disagreements',
            rows: [
              { label: '"Trades vs settlements" · TR-0003', value: 'Value difference · Resolved, 2 history entries' },
              { label: '"Trades against settlements" · TR-0003', value: 'Value difference · Open, no history' },
            ],
          },
          {
            kind: 'para',
            text: 'A break resolved through one path stayed open in the other, because to the queue they were not the same break — they hashed differently. The bug was invisible with a single caller, because a lone caller cannot disagree with itself. It took a second one, computing the same fact a second way, for the fork to become visible at all.',
          },
        ],
      },
      {
        heading: 'The fix removes the choice rather than validating it',
        blocks: [
          {
            kind: 'para',
            text: 'The tempting fix is to check the argument against the step’s parameter and reject a mismatch. That still leaves two sources of truth and a check that has to run every time. The actual fix was to stop taking the name as an argument at all: the service now reads it directly from the reconcile step inside the definition. There is no longer a second place to type it, so there is nothing left to disagree.',
          },
          {
            kind: 'callout',
            text: 'A value with only one legitimate source should have exactly one line of code that produces it — not a contract that every caller is trusted to honour.',
          },
        ],
      },
      {
        heading: 'What holds regardless',
        blocks: [
          {
            kind: 'list',
            items: [
              'A stable identity needs exactly one computation, not several that are supposed to agree. The moment a second caller is free to supply its own answer, you have two systems that happen to match until they don’t.',
              'A bug with one caller and a bug with two callers can be the same bug. The first only looks correct because there is nothing yet for it to disagree with.',
              'Prefer deriving a fact from something already authoritative over asking every caller to pass it in correctly. Removing the parameter is a smaller surface than documenting how to use it.',
            ],
          },
        ],
      },
    ],
    takeaway:
      'Two independent computations of the same fact will eventually disagree, whether the computation is a model inferring a weekday or two code paths agreeing on a name. The fix is never a check that catches the disagreement — it is removing the second computation.',
    links: [],
  },

  {
    slug: 'documents-as-evidence',
    projectId: 'venuecompliant',
    project: 'VenueCompliant',
    title: 'Documents that have to survive being questioned',
    lede:
      'The paid product generates the four written procedures Martyn’s Law requires. Those documents are a venue’s evidence that it did what the Act asks, so the problem was never producing good prose — it was producing prose that can be traced, reproduced and recalled. That decided nearly every architectural choice, including a refusal to put a language model anywhere near it.',
    stack: ['TypeScript', 'Next.js', 'Postgres', 'PDF & DOCX generation'],
    teaser:
      'An engineering write-up on what the documents have to survive, and how that decided the architecture.',
    sections: [
      {
        heading: 'The output is evidence, not content',
        blocks: [
          {
            kind: 'para',
            text: 'A standard-tier premises has to put four procedures in writing — evacuation, invacuation, lockdown and communication — and make sure its staff can actually carry them out. The person who signs them is the responsible person under the Act, and it is their name on it, not ours. If anyone ever asks why their lockdown procedure says what it says, “the tool generated it” is not an answer they can give.',
          },
          {
            kind: 'para',
            text: 'So every block in the library carries the source it came from, and a block without one fails to load rather than logging a warning. The citation travels with the sentence instead of sitting in a bibliography that somebody has to reconcile against the text later.',
          },
          {
            kind: 'code',
            code: 'id: EVAC-OVERNIGHT-01\napplies_when:\n  all: [overnight_accommodation]\nrequires_vars: [assembly_point]\nsource: "Terrorism (Protection of Premises) Act 2025, s.5(3)(a); …"\nversion: 1',
          },
        ],
      },
      {
        heading: 'Fifteen venue types is not fifteen libraries',
        blocks: [
          {
            kind: 'para',
            text: 'The checker recognises fifteen kinds of venue, from nightclubs to village halls to places of worship. The obvious way to generate their documents is to write fifteen sets of procedures — which is fifteen libraries to keep in step every time the guidance moves, and it encodes the wrong idea about what separates them in the first place.',
          },
          {
            kind: 'compare',
            caption: 'What actually differs between a church’s evacuation procedure and a hotel’s',
            rows: [
              { label: 'Not', value: 'church-ness or hotel-ness — the visible axis, and the wrong one' },
              { label: 'But', value: 'overnight_accommodation · volunteer_staff · limited_mobility_occupants' },
            ],
          },
          {
            kind: 'para',
            text: 'Blocks declare the attributes they apply under and a venue receives the ones that match its profile. Ten attribute keys cover all fifteen types, and venue type survives only as a default profile the customer can correct — because a church hall that hosts a sleepover genuinely needs the overnight block, and no amount of routing by venue type would ever have handed it one.',
          },
          {
            kind: 'para',
            text: 'The questionnaire then falls out of the same declarations. Each block names the variables its text needs, and the questions asked are the union of those across the blocks that actually apply. It is not possible to ask a venue for an assembly point it will never be shown, or to render a document around a variable nobody was asked for.',
          },
          {
            kind: 'para',
            text: 'The safety net is a snapshot of the composed output for each of the fifteen types. Editing one block shows exactly which venue types it moved — including the ones that were not being thought about, which is the entire reason a shared library is safe to have.',
          },
        ],
      },
      {
        heading: 'No model in the part where one would be most impressive',
        blocks: [
          {
            kind: 'para',
            text: 'Generation is deterministic: the same answers produce identical output. Nothing in the engine reads the clock — the generation timestamp is a parameter — nothing is random, and nothing depends on object key order.',
          },
          {
            kind: 'para',
            text: 'Two things follow from that. A trust running twenty-five schools gets twenty-five consistent documents rather than twenty-five subtly different ones. And any customer’s exact document can be reproduced from their stored answers months after it was issued, which is what makes it evidence rather than a file they happen to hold.',
          },
          {
            kind: 'para',
            text: 'Which rules out generating the prose with a language model — the one part of this product where reaching for one would be most tempting, and would demo best. These documents tell people what to do during a terrorist attack. Every sentence that reaches a customer has been written and reviewed by a human, because output nobody can reproduce is output nobody can stand behind when asked where a particular instruction came from.',
          },
          {
            kind: 'callout',
            text: 'There is a language model in the product — it drafts replies to inbound enquiries, internally, for a person to read before anything is sent. The question was never whether to use one. It was where the boundary goes, and on which side of it a human sits.',
          },
        ],
      },
      {
        heading: 'Which is what makes a recall possible',
        blocks: [
          {
            kind: 'para',
            text: 'Every generated document stores a manifest of the blocks that produced it and the version each one was at. A daily sweep compares those manifests against the current library and flags any organisation holding a document that has fallen behind.',
          },
          {
            kind: 'para',
            text: 'It was built for the ordinary case — guidance moves, a block is rewritten, its version is bumped. It is also what stands behind the promise to reissue documents free of charge when that happens. Nobody has to remember who bought what, because the documents remember what they were made of.',
          },
          {
            kind: 'para',
            text: 'A recall mechanism that has never fired is a belief rather than a capability, so the test is to bump a block version in a test environment and watch the right organisation get flagged. Reading the sweep and finding it convincing is a different act from seeing it name somebody.',
          },
        ],
      },
      {
        heading: 'What holds regardless',
        blocks: [
          {
            kind: 'list',
            items: [
              'Work out what the output has to survive before choosing how to produce it. Here it had to survive being questioned years later, which disqualified the fastest way to build almost every part of it.',
              'Find the axis the variation genuinely runs along. Fifteen venue types was the visible dimension; ten attributes covered the same ground in a library small enough to keep correct.',
              'Derive rather than maintain alongside. The questions asked, the contents of a document and the list of customers affected by a change are all computed from the blocks — none of them is a second list somebody has to remember to update.',
              'Decide where a model’s output is allowed to reach a person unreviewed. That is a boundary you draw once, deliberately, not a question you answer per feature.',
            ],
          },
        ],
      },
    ],
    takeaway:
      'Determinism here is not a performance concern, it is an evidentiary one. If you cannot reproduce exactly what you gave somebody, you cannot defend it — which disqualifies anything that makes the output unreproducible, however good that output is.',
    links: [{ label: 'Visit the site', href: 'https://venuecompliant.com' }],
  },
];

export const caseStudiesByProject = (projectId: string) =>
  caseStudies.filter((study) => study.projectId === projectId);

export const caseStudyBySlug = (slug: string) =>
  caseStudies.find((study) => study.slug === slug);

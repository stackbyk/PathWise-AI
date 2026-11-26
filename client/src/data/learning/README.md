# Learning resource content

`learningResources.js` exports the structured paths used by Recommendations. The eight detailed cybersecurity paths are in `cybersecurityPaths.js`; other existing career skills use the starter outlines in `learningResources.js`. Shared provider links and access requirements live in `resourceCatalog.js`. All components render the same `SkillLearningPath` shape from `types.d.ts`.

## Add a skill

1. Add verified, free-only provider entries to `resourceCatalog.js`. Include the title, HTTPS URL, provider or channel, access/account requirements, and a short `why` for courses/videos. Prefer provider course landing pages or real channel pages over guessed deep links.
2. Add a `createPlan` entry to `cybersecurityPaths.js` (or a dedicated domain module and merge it into `learningResources`). Supply five ordered learning steps, at least one official doc, two video collections, two free courses, a hands-on lab, a free article/book, and three project definitions ordered Beginner/Intermediate/Advanced. Projects must use free local tools or explicitly free tiers.
3. Add the exact skill name to the appropriate existing `careerSkills` list only if the product's assessment already emits that name. Resource curation does not change assessment keys or scores.
4. Run `npm run typecheck:recommendations`, `npm run check:links`, `node --test client/tests/recommendations.test.mjs`, `npm run lint`, and `npm run build` from the repository root.

`createPlan` generates stable IDs from step/project titles. Keep an existing item's ID stable when editing wording after release; changing an ID creates a new checklist item. Use an explicit ID override if you rename a released step or project.

## Persistence and score compatibility

Checklist data uses `pathwiseLearningProgress_v1:<encoded-user-id>:<skill-slug>`. The account identity comes from the existing AuthContext; signed-out use has a separate `guest` namespace. Each change rereads the latest stored checklist, merges only that item, and never writes to assessment or roadmap keys. There is no database or API migration.

The original assessment score thresholds and the `< 75` improvement threshold are retained. Missing skill keys are explicitly distinguished from scored keys. The existing roadmap tracks whole skills and has no individual learning-step field, so a checked learning step never silently marks an entire roadmap skill complete or awards XP.

## Resource validation

`check-resource-links.mjs` deduplicates every rendered resource URL and performs HEAD requests with GET fallback. Network failures are retried. The report is written to `client/resource-link-report.json`. A provider 401/403/429 is labeled REVIEW and is never counted as an automated pass. Failed URLs produce a nonzero exit status. Recheck periodically: free access, quotas and account requirements can change.

`client/resource-replacements.json` records outdated, uncertain or blocked URLs replaced during curation. The resource site may offer paid products, but only its explicitly free material is included. Local VM projects require the learner's existing hardware.

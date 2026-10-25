# Future AWS migration — ap-south-1, Mumbai

Planning only. No AWS accounts, resources, credentials, CLI calls, provisioning templates or deployment workflows are created by this milestone.

1. Obtain client approval and verify publication credentials, logo, content rights, privacy/editorial policies and the availability of the chosen services/features in Mumbai at implementation time.
2. Select and test an identity provider. Implement server authorization, session handling and protected portal routes before entering real newsroom data.
3. Implement PostgreSQL repository adapters and reviewed migrations. Plan RDS PostgreSQL networking, encryption, backups, point-in-time recovery, connection pooling, least-privilege application roles and migration rollback.
4. Implement a private S3 media adapter with short-lived access, upload validation, malware checks, rights workflow, lifecycle/versioning and a deliberate public-media strategy. Keep original scans immutable with provenance.
5. Evaluate Amplify support for the selected Next.js runtime/version, monorepo roots, server rendering, workspace fonts, caching and image handling. Select an alternative compute plan only after compatibility/cost review.
6. Move server secrets into Secrets Manager. Add narrowly scoped workload identities; no long-lived keys in the repository or browser.
7. Export validated content and assets from any demonstration backend introduced later. M1 has no backend data to migrate; local browser drafts are disposable demonstration material.
8. Test restore, rollback, permissions, editorial transitions, scheduled jobs, media rights, OCR provenance and observability in an isolated staging environment.
9. Approve costs, region, retention, monitoring and DNS cutover. Back up/export before cutover, maintain a documented rollback path, and change indexing only after public-launch approval.

Ownership decisions pending: actual production domains, IAM/account boundaries, retention periods, permitted publishers, security incident contacts, data recovery objectives and budget. This document is not an instruction to deploy.

import { defineConfig } from 'astro/config';
const repository = process.env.GITHUB_REPOSITORY;
const [owner, repo] = repository?.split('/') ?? [];
export default defineConfig({
  site: process.env.SITE_URL || (owner ? `https://${owner}.github.io` : 'http://localhost:4321'),
  base: process.env.BASE_PATH || (repo && repo.toLowerCase() !== `${owner}.github.io`.toLowerCase() ? `/${repo}` : '/'),
  trailingSlash: 'always',
});

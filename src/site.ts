export const site = {
  title: 'lilika · 学习手记',
  author: 'lilika',
  description: 'lilika的学习领地，记录知识、项目与灵感。',
  github: 'https://github.com/sunlitsoul1',
  projects: [] as { name: string; description: string; url: string; tags: string[] }[],
};
export const url = (path = '') => `${import.meta.env.BASE_URL.replace(/\/$/, '')}/${path.replace(/^\//, '')}`;
export const dateLabel = (date: Date) => date.toISOString().slice(0, 10);

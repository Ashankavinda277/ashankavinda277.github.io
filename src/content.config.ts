import { defineCollection, z } from 'astro:content';

const projectsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    technologies: z.array(z.string()),
    image: z.string().optional(),
    githubUrl: z.string().optional(),
    liveUrl: z.string().optional(),
    featured: z.boolean().default(false),
    category: z.string().default('Full-Stack'),
    order: z.number().optional(),
  }),
});

const experienceCollection = defineCollection({
  type: 'content',
  schema: z.object({
    role: z.string(),
    company: z.string(),
    period: z.string(),
    description: z.string(),
  }),
});

const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    tags: z.array(z.string()).default([]),
  }),
});

export const collections = {
  projects: projectsCollection,
  experience: experienceCollection,
  blog: blogCollection,
};

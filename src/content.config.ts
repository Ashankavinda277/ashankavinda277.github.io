import { defineCollection, z } from 'astro:content';

const projectsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    shortDescription: z.string().optional(),
    technologies: z.array(z.string()),
    category: z.string().default('Full-Stack'),
    image: z.string().optional(),
    github: z.string().optional(),
    demo: z.string().optional(),
    featured: z.boolean().default(false),
    year: z.union([z.string(), z.number()]).default('2024'),
    order: z.number().default(99),
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
    readTime: z.string().default('5 min read'),
    tags: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
    author: z.string().default('Ashan Kavinda'),
    mediumUrl: z.string().default('https://medium.com/@ashankavinda'),
    image: z.string().optional(),
    icon: z.string().optional(),
  }),
});

export const collections = {
  projects: projectsCollection,
  experience: experienceCollection,
  blog: blogCollection,
};

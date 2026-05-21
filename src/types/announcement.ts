import { z } from 'astro/zod';

export const announcementSchema = z.object({
	id: z.string(),
	version: z.number().int().positive().default(1),
	variant: z.enum(['info', 'success', 'warning', 'promo']).default('info'),
	eyebrow: z.string().optional(),
	message: z.string(),
	cta: z
		.object({
			text: z.string(),
			href: z.string(),
		})
		.optional(),
	expiresAt: z.iso.datetime().optional(),
	icon: z.boolean().default(true),
	dismissible: z.boolean().default(true),
});

export type Announcement = z.infer<typeof announcementSchema>;

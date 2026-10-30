import type { ImageMetadata } from 'astro';
import img1 from '@root/assets/images/company-images/values-images/values-image1.webp';
import img2 from '@root/assets/images/company-images/values-images/values-image2.webp';
import img3 from '@root/assets/images/company-images/values-images/values-image3.webp';
import img4 from '@root/assets/images/company-images/values-images/values-image4.webp';
import img5 from '@root/assets/images/company-images/values-images/values-image5.webp';
import img6 from '@root/assets/images/company-images/values-images/values-image6.webp';

export interface CompanyValue {
	image: ImageMetadata;
	title: string;
	description: string;
	mark: { icon: string; accent: string };
}

export const companyValues: CompanyValue[] = [
	{
		image: img1,
		title: 'Results-driven',
		description:
			'We focus on delivering practical outcomes, ensuring every IoT solution provides measurable value for our clients.',
		mark: { icon: 'tabler:target-arrow', accent: 'var(--color-accent-brand)' },
	},
	{
		image: img2,
		title: 'Customer focus',
		description:
			'Our customers are at the core of our business; we tailor our IoT solutions to meet their unique needs and exceed expectations.',
		mark: { icon: 'tabler:heart-handshake', accent: 'var(--color-accent-cyan)' },
	},
	{
		image: img3,
		title: 'Growth and self-improvement',
		description: 'We embrace continuous learning and innovation to stay at the forefront of IoT technology.',
		mark: { icon: 'tabler:plant-2', accent: 'var(--color-accent-onprem)' },
	},
	{
		image: img4,
		title: 'Expertise',
		description:
			'Our commitment to excellence and integrity ensures that we deliver reliable, high-quality products.',
		mark: { icon: 'tabler:award', accent: 'var(--color-accent-amber)' },
	},
	{
		image: img5,
		title: 'Teamwork',
		description:
			'Collaboration drives our success, as we harness the strengths of our team to deliver IoT innovations.',
		mark: { icon: 'tabler:users-group', accent: 'var(--color-accent-violet)' },
	},
	{
		image: img6,
		title: 'Volunteering',
		description:
			'We actively support our community through impactful initiatives, demonstrating our dedication to creating positive change.',
		mark: { icon: 'tabler:heart', accent: 'var(--color-accent-red)' },
	},
];

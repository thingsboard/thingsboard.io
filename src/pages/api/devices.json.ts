import type { APIRoute } from 'astro';
import allDevices from '../../data/devices.json';

export const GET: APIRoute = async ({ url }) => {
	const lang = url.searchParams.get('lang') || 'en';

	const devices = allDevices
		.filter((device) => device.id.startsWith(`${lang}/`))
		.map((device) => ({
			id: device.id,
			title: device.title,
			vendor: device.vendor,
			imageSrc: `/src/assets/devices/${device.deviceImageFileName}`,
			hardwareType: device.hardwareType,
			connectivity: device.connectivity,
			industry: device.industry,
			useCase: device.useCase,
		}));

	return new Response(JSON.stringify(devices), {
		headers: {
			'Content-Type': 'application/json',
		},
	});
};

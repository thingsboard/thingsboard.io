// Ring geometry for the mobile "just circles" crop of use-case application icons.
// Each node SVG is a circle+icon with timeline connectors that extend outside the
// ring; on mobile we clip to the ring via a circular viewport.
// Values are fractions of the icon box, measured from the ring against the SVG's
// root width/height: cx (of width), cy (of height), r (radius of width), aspect
// (height/width). The ring is the 186.5 x 186.5 `<rect rx="93.25">` (a closed stroke
// `<path>` in a few icons), not the small timeline-dot `<circle>`s. Keyed by the
// data desktopImage path. Add an entry with every new application icon:
// ApplicationsSection fails the build for an icon without one.
export interface RingGeometry {
	cx: number;
	cy: number;
	r: number;
	aspect: number;
}

export const ICON_RING_GEOMETRY: Record<string, RingGeometry> = {
	'/src/assets/images/usecases/air-quality/cities-1.svg': { cx: 0.6159, cy: 0.6932, r: 0.3821, aspect: 1.252 },
	'/src/assets/images/usecases/air-quality/development-1.svg': { cx: 0.6159, cy: 0.6932, r: 0.3821, aspect: 1.252 },
	'/src/assets/images/usecases/air-quality/education-1.svg': { cx: 0.6088, cy: 0.3036, r: 0.3588, aspect: 1.1756 },
	'/src/assets/images/usecases/air-quality/industrial-1.svg': { cx: 0.6088, cy: 0.3036, r: 0.3588, aspect: 1.1756 },
	'/src/assets/images/usecases/air-quality/logistics-1.svg': { cx: 0.6159, cy: 0.6932, r: 0.3821, aspect: 1.252 },
	'/src/assets/images/usecases/environment-monitoring/agriculture-1.svg': {
		cx: 0.6092,
		cy: 0.6932,
		r: 0.3611,
		aspect: 1.1801,
	},
	'/src/assets/images/usecases/environment-monitoring/education-1.svg': {
		cx: 0.6088,
		cy: 0.3036,
		r: 0.3588,
		aspect: 1.1756,
	},
	'/src/assets/images/usecases/environment-monitoring/laboratory-1.svg': {
		cx: 0.6088,
		cy: 0.3036,
		r: 0.3588,
		aspect: 1.1756,
	},
	'/src/assets/images/usecases/environment-monitoring/smart-cities-1.svg': {
		cx: 0.6149,
		cy: 0.6932,
		r: 0.379,
		aspect: 1.2419,
	},
	'/src/assets/images/usecases/environment-monitoring/warehouse-1.svg': {
		cx: 0.6092,
		cy: 0.6932,
		r: 0.3611,
		aspect: 1.1801,
	},
	'/src/assets/images/usecases/fleet-tracking/construction-1.svg': { cx: 0.6159, cy: 0.6932, r: 0.3821, aspect: 1.252 },
	'/src/assets/images/usecases/fleet-tracking/dumpsites-1.svg': { cx: 0.6092, cy: 0.3036, r: 0.3611, aspect: 1.1801 },
	'/src/assets/images/usecases/fleet-tracking/forest-1.svg': { cx: 0.4984, cy: 0.4988, r: 0.3072, aspect: 1.3987 },
	'/src/assets/images/usecases/fleet-tracking/infrastructure-1.svg': {
		cx: 0.6092,
		cy: 0.3036,
		r: 0.3611,
		aspect: 1.1801,
	},
	'/src/assets/images/usecases/fleet-tracking/mining-1.svg': { cx: 0.6159, cy: 0.6932, r: 0.3821, aspect: 1.252 },
	'/src/assets/images/usecases/health-care/factories-1.svg': { cx: 0.584, cy: 0.3339, r: 0.3597, aspect: 1.229 },
	'/src/assets/images/usecases/health-care/hospital-1.svg': { cx: 0.6129, cy: 0.663, r: 0.38, aspect: 1.2984 },
	'/src/assets/images/usecases/health-care/prison-1.svg': { cx: 0.6015, cy: 0.663, r: 0.3611, aspect: 1.2337 },
	'/src/assets/images/usecases/health-care/rehabilitation-center-1.svg': {
		cx: 0.5996,
		cy: 0.663,
		r: 0.3602,
		aspect: 1.2337,
	},
	'/src/assets/images/usecases/health-care/sport-complex-1.svg': { cx: 0.584, cy: 0.3339, r: 0.3597, aspect: 1.229 },
	'/src/assets/images/usecases/scada/chemical-1.svg': { cx: 0.584, cy: 0.3339, r: 0.3597, aspect: 1.229 },
	'/src/assets/images/usecases/scada-drilling-system/automation.svg': {
		cx: 0.6159,
		cy: 0.6926,
		r: 0.3831,
		aspect: 1.2561,
	},
	'/src/assets/images/usecases/scada-drilling-system/construction.svg': {
		cx: 0.6159,
		cy: 0.6926,
		r: 0.3831,
		aspect: 1.2561,
	},
	'/src/assets/images/usecases/scada-drilling-system/logistics.svg': {
		cx: 0.6159,
		cy: 0.3042,
		r: 0.3831,
		aspect: 1.2561,
	},
	'/src/assets/images/usecases/scada-drilling-system/mining.svg': { cx: 0.6159, cy: 0.6926, r: 0.3831, aspect: 1.2561 },
	'/src/assets/images/usecases/scada-drilling-system/water.svg': { cx: 0.6159, cy: 0.3042, r: 0.3831, aspect: 1.2561 },
	'/src/assets/images/usecases/scada/energy-1.svg': { cx: 0.6015, cy: 0.663, r: 0.3611, aspect: 1.2337 },
	'/src/assets/images/usecases/scada-energy-management/data-centers.svg': {
		cx: 0.6159,
		cy: 0.3036,
		r: 0.3821,
		aspect: 1.252,
	},
	'/src/assets/images/usecases/scada-energy-management/indust.svg': {
		cx: 0.6159,
		cy: 0.6932,
		r: 0.3821,
		aspect: 1.252,
	},
	'/src/assets/images/usecases/scada-energy-management/renewable.svg': {
		cx: 0.6159,
		cy: 0.6932,
		r: 0.3821,
		aspect: 1.252,
	},
	'/src/assets/images/usecases/scada-energy-management/smart.svg': { cx: 0.6159, cy: 0.3036, r: 0.3821, aspect: 1.252 },
	'/src/assets/images/usecases/scada-energy-management/utilites.svg': {
		cx: 0.6159,
		cy: 0.6932,
		r: 0.3821,
		aspect: 1.252,
	},
	'/src/assets/images/usecases/scada/food-1.svg': { cx: 0.5996, cy: 0.663, r: 0.3602, aspect: 1.2337 },
	'/src/assets/images/usecases/scada/oil-1.svg': { cx: 0.584, cy: 0.3307, r: 0.3597, aspect: 1.229 },
	'/src/assets/images/usecases/scada/water-1.svg': { cx: 0.6129, cy: 0.663, r: 0.38, aspect: 1.2984 },
	'/src/assets/images/usecases/smart-energy/buildings-1.svg': { cx: 0.6088, cy: 0.3036, r: 0.3588, aspect: 1.1756 },
	'/src/assets/images/usecases/smart-energy/data-centers-1.svg': { cx: 0.6088, cy: 0.3036, r: 0.3588, aspect: 1.1756 },
	'/src/assets/images/usecases/smart-energy/education-1.svg': { cx: 0.6092, cy: 0.6932, r: 0.3611, aspect: 1.1801 },
	'/src/assets/images/usecases/smart-energy/factory-1.svg': { cx: 0.6159, cy: 0.6932, r: 0.3821, aspect: 1.252 },
	'/src/assets/images/usecases/smart-energy/malls-1.svg': { cx: 0.6159, cy: 0.6932, r: 0.3821, aspect: 1.252 },
	'/src/assets/images/usecases/smart-farming/grain-1.svg': { cx: 0.6159, cy: 0.6932, r: 0.3821, aspect: 1.252 },
	'/src/assets/images/usecases/smart-farming/logistics-1.svg': { cx: 0.6088, cy: 0.3036, r: 0.3588, aspect: 1.1756 },
	'/src/assets/images/usecases/smart-farming/orchards-1.svg': { cx: 0.6088, cy: 0.3036, r: 0.3588, aspect: 1.1756 },
	'/src/assets/images/usecases/smart-farming/sheep-1.svg': { cx: 0.6159, cy: 0.6932, r: 0.3821, aspect: 1.252 },
	'/src/assets/images/usecases/smart-irrigation/agriculture-1.svg': {
		cx: 0.6159,
		cy: 0.6932,
		r: 0.3821,
		aspect: 1.252,
	},
	'/src/assets/images/usecases/smart-irrigation/fields-1.svg': { cx: 0.6088, cy: 0.3036, r: 0.3588, aspect: 1.1756 },
	'/src/assets/images/usecases/smart-irrigation/greenhouse-1.svg': {
		cx: 0.6088,
		cy: 0.3036,
		r: 0.3588,
		aspect: 1.1756,
	},
	'/src/assets/images/usecases/smart-irrigation/parks-1.svg': { cx: 0.6159, cy: 0.6932, r: 0.3821, aspect: 1.252 },
	'/src/assets/images/usecases/smart-irrigation/research-1.svg': { cx: 0.6159, cy: 0.6932, r: 0.3821, aspect: 1.252 },
	'/src/assets/images/usecases/smart-metering/complex-1.svg': { cx: 0.6088, cy: 0.3036, r: 0.3588, aspect: 1.1756 },
	'/src/assets/images/usecases/smart-metering/facilities-1.svg': { cx: 0.6159, cy: 0.6932, r: 0.3821, aspect: 1.252 },
	'/src/assets/images/usecases/smart-metering/industrial-1.svg': { cx: 0.6088, cy: 0.3036, r: 0.3588, aspect: 1.1756 },
	'/src/assets/images/usecases/smart-metering/institutions-1.svg': { cx: 0.6159, cy: 0.6932, r: 0.3821, aspect: 1.252 },
	'/src/assets/images/usecases/smart-metering/utilities-1.svg': { cx: 0.6159, cy: 0.6932, r: 0.3821, aspect: 1.252 },
	'/src/assets/images/usecases/smart-office/hospitality-1.svg': { cx: 0.6088, cy: 0.3036, r: 0.3588, aspect: 1.1756 },
	'/src/assets/images/usecases/smart-office/manufacturing-1.svg': { cx: 0.6088, cy: 0.3036, r: 0.3588, aspect: 1.1756 },
	'/src/assets/images/usecases/smart-retail/cafeterias-1.svg': { cx: 0.6088, cy: 0.3036, r: 0.3588, aspect: 1.1756 },
	'/src/assets/images/usecases/smart-retail/court-1.svg': { cx: 0.6092, cy: 0.6932, r: 0.3611, aspect: 1.1801 },
	'/src/assets/images/usecases/smart-retail/fuel-1.svg': { cx: 0.6088, cy: 0.3036, r: 0.3588, aspect: 1.1756 },
	'/src/assets/images/usecases/smart-retail/logistics-1.svg': { cx: 0.6149, cy: 0.6932, r: 0.379, aspect: 1.2419 },
	'/src/assets/images/usecases/smart-retail/pharmacy-1.svg': { cx: 0.6159, cy: 0.6932, r: 0.3821, aspect: 1.252 },
	'/src/assets/images/usecases/tank-level-monitoring/gas-1.svg': { cx: 0.6159, cy: 0.6932, r: 0.3821, aspect: 1.252 },
	'/src/assets/images/usecases/tank-level-monitoring/manufacturing-1.svg': {
		cx: 0.6159,
		cy: 0.3036,
		r: 0.3821,
		aspect: 1.252,
	},
	'/src/assets/images/usecases/waste-monitoring/municipal-1.svg': { cx: 0.6159, cy: 0.6932, r: 0.3821, aspect: 1.252 },
	'/src/assets/images/usecases/waste-monitoring/stadium-1.svg': { cx: 0.6092, cy: 0.6932, r: 0.3611, aspect: 1.1801 },
	'/src/assets/images/usecases/waste-monitoring/transportation-1.svg': {
		cx: 0.6159,
		cy: 0.3036,
		r: 0.3821,
		aspect: 1.252,
	},
	'/src/assets/images/usecases/water-metering/industrial-1.svg': { cx: 0.6088, cy: 0.3036, r: 0.3588, aspect: 1.1756 },
	'/src/assets/images/usecases/water-metering/irrigation-1.svg': { cx: 0.4984, cy: 0.4988, r: 0.3072, aspect: 1.3987 },
	'/src/assets/images/usecases/water-metering/smart-building-1.svg': {
		cx: 0.6159,
		cy: 0.6932,
		r: 0.3821,
		aspect: 1.252,
	},
};

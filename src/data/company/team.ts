const base = '/images/company/thingsboard-team-photos';
const placeholder = `${base}/kasharix.webp`;

export interface TeamMember {
	src: string;
	title: string;
	description: string;
}

export interface TeamCluster {
	/** Optional sub-team heading shown above the row. */
	label?: string;
	members: TeamMember[];
}

export interface TeamTab {
	label: string;
	clusters: TeamCluster[];
}

export const teamTabs: TeamTab[] = [
	{
		label: 'Leadership',
		clusters: [
			{
				members: [
					{ src: `${base}/leadership/andrii-shvaika.webp`, title: 'Andrii Shvaika', description: 'CEO, Co-Founder' },
					{ src: `${base}/leadership/igor-kulikov.webp`, title: 'Ihor Kulikov', description: 'CTO, Co-Founder' },
					{ src: `${base}/leadership/vitaliy-paromskiy.webp`, title: 'Vitalii Paromskiy', description: 'Solutions Architect' },
					{ src: `${base}/leadership/volodymyr-babak.webp`, title: 'Volodymyr Babak', description: 'Director of Cloud Services' },
					{ src: `${base}/leadership/alex-doan.webp`, title: 'Alex Doan', description: 'Head of Customer Success' },
					{ src: `${base}/leadership/artur-ishkhanishvili.webp`, title: 'Artur Ishkhanishvili', description: 'Head of Sales' },
					{ src: `${base}/leadership/oksana-kovalska.webp`, title: 'Oksana Kovalska', description: 'HR Director' },
				],
			},
		],
	},
	{
		label: 'Product',
		clusters: [
			{
				label: 'Platform',
				members: [
					{ src: `${base}/product-team/viacheslav-klimov.webp`, title: 'Viacheslav Klimov', description: 'Java Team Lead' },
					{ src: `${base}/product-team/vlad-prykhodko.webp`, title: 'Vladyslav Prykhodko', description: 'Frontend Engineer' },
					{ src: `${base}/product-team/maryna-shulzhenko.webp`, title: 'Maryna Shulzhenko', description: 'QA Team Lead' },
					{ src: `${base}/product-team/dmytro-shvaika.webp`, title: 'Dmytro Shvaika', description: 'Java Engineer' },
					{ src: `${base}/product-team/dmytro-skarzhynets.webp`, title: 'Dmytro Skarzhynets', description: 'Java Engineer' },
					{ src: `${base}/product-team/nickolay-kulikov.webp`, title: 'Mykola Kulikov', description: 'Java Engineer' },
					{ src: `${base}/product-team/iryna-matveieva.webp`, title: 'Iryna Matveieva', description: 'Java Engineer' },
					{ src: placeholder, title: 'Oleksandra Matviienko', description: 'Java Engineer' },
					{ src: placeholder, title: 'Andrii Proshenko', description: 'Java Engineer' },
					{ src: `${base}/product-team/ruslan-vasylkiv.webp`, title: 'Ruslan Vasylkiv', description: 'Frontend Engineer' },
					{ src: `${base}/product-team/sergii-tarnavskiy.webp`, title: 'Serhii Tarnavskiy', description: 'Frontend Engineer' },
					{ src: placeholder, title: 'Maksym Tsymbarov', description: 'Frontend Engineer' },
					{ src: `${base}/product-team/glib-petrukh.webp`, title: 'Hlib Petrukh', description: 'QA Engineer' },
					{ src: placeholder, title: 'Daria Priadkina', description: 'QA Engineer' },
					{ src: `${base}/product-team/serhii-titenko.webp`, title: 'Serhii Titenko', description: 'Technical Writer' },
					{ src: placeholder, title: 'Vladyslav Pelishenko', description: 'Data Analyst' },
				],
			},
			{
				label: 'Gateway',
				members: [
					{ src: `${base}/gateway/vitalii-bidochka.webp`, title: 'Vitalii Bidochka', description: 'Python Engineer' },
					{ src: `${base}/gateway/vadym-yakymuk.webp`, title: 'Vadym Yakymuk', description: 'QA Engineer' },
					{ src: placeholder, title: 'Oleksandr Prus', description: 'Python Engineer' },
				],
			},
			{
				label: 'Trendz',
				members: [
					{ src: `${base}/leadership/vitaliy-paromskiy.webp`, title: 'Vitalii Paromskiy', description: 'Solutions Architect' },
					{ src: `${base}/trendz/iryna-kheroim.webp`, title: 'Iryna Kheroim', description: 'Project Manager' },
					{ src: `${base}/trendz/anatolii-davydko.webp`, title: 'Anatolii Davydko', description: 'Java Engineer' },
					{ src: placeholder, title: 'Roman Kostenko', description: 'Java Engineer' },
					{ src: placeholder, title: 'Maksym Mezentsev', description: 'Frontend Engineer' },
				],
			},
			{
				label: 'Edge',
				members: [
					{ src: `${base}/leadership/volodymyr-babak.webp`, title: 'Volodymyr Babak', description: 'Director of Cloud Services' },
					{ src: `${base}/edge/andrii-landiak.webp`, title: 'Andrii Landiak', description: 'Java Engineer' },
					{ src: `${base}/solutions-team/nikita-mazurenko.webp`, title: 'Nikita Mazurenko', description: 'Java Engineer' },
				],
			},
			{
				label: 'TBMQ',
				members: [
					{ src: `${base}/tbmq/dmytro-landiak.webp`, title: 'Dmytro Landiak', description: 'Java Engineer' },
					{ src: `${base}/product-team/dmytro-shvaika.webp`, title: 'Dmytro Shvaika', description: 'Java Engineer' },
					{ src: placeholder, title: 'Artem Babak', description: 'Frontend Engineer' },
				],
			},
			{
				label: 'Design',
				members: [
					{ src: placeholder, title: 'Oleksii Lapenko', description: 'Lead UI/UX Designer' },
					{ src: placeholder, title: 'Vladyslav Honcharenko', description: 'UI/UX Designer' },
					{ src: placeholder, title: 'Mariia Ananieva', description: 'Graphic Designer' },
				],
			},
		],
	},
	{
		label: 'Solutions',
		clusters: [
			{
				members: [
					{ src: `${base}/leadership/vitaliy-paromskiy.webp`, title: 'Vitalii Paromskiy', description: 'Solutions Architect' },
					{ src: `${base}/leadership/artur-ishkhanishvili.webp`, title: 'Artur Ishkhanishvili', description: 'Head of Sales' },
					{ src: `${base}/solutions-team/nizar-ali.webp`, title: 'Nizar Ali', description: 'Unit Lead' },
					{ src: `${base}/solutions-team/andrii-zaiko.webp`, title: 'Andrii Zaiko', description: 'Project Manager' },
				],
			},
			{
				members: [
					{ src: `${base}/solutions-team/olexandr-mykolaichuk.webp`, title: 'Oleksandr Mykolaichuk', description: 'Java Engineer' },
					{ src: placeholder, title: 'Ivan Bondarenko', description: 'Java Engineer' },
					{ src: `${base}/solutions-team/andrii-tkachenko.webp`, title: 'Andrii Tkachenko', description: 'Java Engineer' },
					{ src: `${base}/solutions-team/artemii-molyboha.webp`, title: 'Artemii Molyboha', description: 'Java Engineer' },
					{ src: `${base}/solutions-team/vlad-myrhorodskyi.webp`, title: 'Vladyslav Myrhorodskyi', description: 'Java Engineer' },
				],
			},
			{
				members: [
					{ src: `${base}/solutions-team/valeriia-koriavikova.webp`, title: 'Valeriia Koriavikova', description: 'Frontend Engineer' },
					{ src: `${base}/solutions-team/dmytro-khylko.webp`, title: "Dmytro Khyl'ko", description: 'Frontend Engineer' },
					{ src: `${base}/solutions-team/dmytro-pinkevych.webp`, title: 'Dmytro Pinkevych', description: 'Frontend Engineer' },
					{ src: `${base}/solutions-team/oleksandr-mykytenko.webp`, title: 'Oleksandr Mykytenko', description: 'Frontend Engineer' },
					{ src: `${base}/product-team/kateryna-chantsova.webp`, title: 'Kateryna Chantsova', description: 'Frontend Engineer' },
					{ src: `${base}/product-team/yevhen-kalytka.webp`, title: 'Yevhenii Kalytka', description: 'Frontend Engineer' },
					{ src: `${base}/solutions-team/vlad-symonenko.webp`, title: 'Vladyslav Symonenko', description: 'UI/UX Designer' },
					{ src: placeholder, title: 'Anastasiia Stadnyk', description: 'QA Engineer' },
				],
			},
		],
	},
	{
		label: 'Support',
		clusters: [
			{
				members: [
					{ src: `${base}/support-team/artem-murenko.webp`, title: 'Artem Murenko', description: 'Head of Support' },
					{ src: `${base}/support-team/mykhailo-bondar.webp`, title: 'Mykhailo Bondar', description: 'Support Technical Lead' },
					{ src: `${base}/support-team/eugen-palchenko.webp`, title: 'Yevhen Palchenko', description: 'Technical Support Engineer' },
					{ src: placeholder, title: 'Mykhailo Kornieiev', description: 'Technical Support Engineer' },
					{ src: `${base}/support-team/oleksii-mahurin.webp`, title: 'Oleksii Mahurin', description: 'Technical Support Engineer' },
					{ src: `${base}/support-team/illia-tsybulenko-sihov.webp`, title: 'Illia Tsybulenko-Sihov', description: 'Technical Support Engineer' },
					{ src: placeholder, title: 'Sofiia Bondarenko', description: 'Technical Support Engineer' },
				],
			},
		],
	},
	{
		label: 'Private Cloud',
		clusters: [
			{
				label: 'Leads & Account Managers',
				members: [
					{ src: `${base}/leadership/volodymyr-babak.webp`, title: 'Volodymyr Babak', description: 'Director of Cloud Services' },
					{ src: `${base}/product-team/serhii-matviienko.webp`, title: 'Serhii Matviienko', description: 'Director of Cloud Engineering' },
					{ src: `${base}/support-team/daniela-dodonova.webp`, title: 'Daniela Dodonova', description: 'Account Manager (Cloud)' },
					{ src: placeholder, title: 'Varvara Mamliuk', description: 'Account Manager (Cloud)' },
				],
			},
			{
				label: 'Customer Reliability Engineers',
				members: [
					{ src: `${base}/support-team/andrii-ponomariov.webp`, title: 'Andrii Ponomarov', description: 'TechOps/SRE' },
					{ src: `${base}/support-team/oleksii-kuripko.webp`, title: 'Oleksii Kuripko', description: 'TechOps/SRE' },
					{ src: placeholder, title: 'Dmytro Artamonov', description: 'TechOps/SRE' },
					{ src: placeholder, title: 'Danylo Bosenko', description: 'TechOps/SRE' },
					{ src: placeholder, title: 'Vladyslav Haidysh', description: 'TechOps/SRE' },
				],
			},
		],
	},
	{
		label: 'Go-to-Market',
		clusters: [
			{
				label: 'Sales',
				members: [
					{ src: `${base}/leadership/artur-ishkhanishvili.webp`, title: 'Artur Ishkhanishvili', description: 'Head of Sales' },
					{ src: `${base}/sales-marketing/anastasiia-antoniuk.webp`, title: 'Anastasiia Antoniuk', description: 'Account/Sales Manager' },
				],
			},
			{
				label: 'Partnerships',
				members: [
					{ src: placeholder, title: 'Pavlo Pankratov', description: 'Partnership Manager' },
					{ src: placeholder, title: 'Valentyna Voshchana', description: 'Partnership Manager' },
				],
			},
			{
				label: 'Customer Success',
				members: [
					{ src: `${base}/leadership/alex-doan.webp`, title: 'Alex Doan', description: 'Head of Customer Success' },
					{ src: `${base}/sales-marketing/alla-sidnenko.webp`, title: 'Alla Sidnenko', description: 'Customer Success Manager' },
					{ src: `${base}/support-team/sofiia-sakharova.webp`, title: 'Sofiia Sakharova', description: 'Technical Support Engineer' },
				],
			},
			{
				label: 'Marketing',
				members: [
					{ src: placeholder, title: 'Mariia Kovalyk', description: 'Product Marketing Specialist' },
				],
			},
		],
	},
	{
		label: 'Operations',
		clusters: [
			{
				label: 'People',
				members: [
					{ src: `${base}/leadership/oksana-kovalska.webp`, title: 'Oksana Kovalska', description: 'HR Director' },
					{ src: placeholder, title: 'Yevheniia Dzhanhoian', description: 'People Operations Specialist' },
					{ src: placeholder, title: 'Anna Ashykhmina', description: 'IT Recruiter' },
					{ src: placeholder, title: 'Antonina Matiushko', description: 'IT Recruiter' },
					{ src: placeholder, title: 'Olha Tsybulia', description: 'IT Recruiter' },
				],
			},
			{
				label: 'Finance & Legal',
				members: [
					{ src: placeholder, title: 'Katia Goldin', description: 'CFO' },
					{ src: `${base}/operation-team/nataliia-avramenko.webp`, title: 'Nataliia Avramenko', description: 'Financial Controller' },
					{ src: placeholder, title: 'Kateryna Doroshko', description: 'Accountant' },
					{ src: placeholder, title: 'Andrii Doan', description: 'Lawyer' },
				],
			},
			{
				label: 'Office & IMS',
				members: [
					{ src: `${base}/operation-team/anastasiia-orlata.webp`, title: 'Anastasiia Orlata', description: 'Office Manager' },
					{ src: placeholder, title: 'Oleh Reutskyi', description: 'IMS Manager' },
				],
			},
		],
	},
];

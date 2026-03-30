const base = '/images/company/thingsboard-team-photos';
const placeholder = `${base}/kasharix.webp`;

export interface TeamMember {
	src: string;
	alt: string;
	title: string;
	description: string;
}

export interface TeamCluster {
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
					{ src: `${base}/leadership/andrii-shvaika.webp`, alt: 'Andrii Shvaika', title: 'Andrii Shvaika', description: 'CEO, Co-founder' },
					{ src: `${base}/leadership/igor-kulikov.webp`, alt: 'Igor Kulikov', title: 'Igor Kulikov', description: 'CTO, Co-founder' },
					{ src: `${base}/leadership/vitaliy-paromskiy.webp`, alt: 'Vitaliy Paromskiy', title: 'Vitaliy Paromskiy', description: 'Chief solutions officer' },
					{ src: `${base}/leadership/volodymyr-babak.webp`, alt: 'Volodymyr Babak', title: 'Volodymyr Babak', description: 'VP EDGE' },
					{ src: `${base}/leadership/alex-doan.webp`, alt: 'Alex Doan', title: 'Alex Doan', description: 'VP Sales & Marketing' },
					{ src: `${base}/leadership/artur-ishkhanishvili.webp`, alt: 'Artur Ishkhanishvili', title: 'Artur Ishkhanishvili', description: 'VP Business Development' },
					{ src: `${base}/leadership/yevheniia-havrysh.webp`, alt: 'Yevheniia Havrysh', title: 'Yevheniia Havrysh', description: 'VP Growth' },
					{ src: `${base}/leadership/oksana-kovalska.webp`, alt: 'Oksana Kovalska', title: 'Oksana Kovalska', description: 'HR Director' },
				],
			},
		],
	},
	{
		label: 'Product',
		clusters: [
			{
				members: [
					{ src: `${base}/product-team/serhii-matviienko.webp`, alt: 'Serhii Matviienko', title: 'Serhii Matviienko', description: 'Site Reliability Engineer' },
					{ src: `${base}/leadership/yevheniia-havrysh.webp`, alt: 'Yevheniia Havrysh', title: 'Yevheniia Havrysh', description: 'VP Growth' },
					{ src: `${base}/product-team/viacheslav-klimov.webp`, alt: 'Viacheslav Klimov', title: 'Viacheslav Klimov', description: 'Java Team Lead' },
					{ src: `${base}/product-team/vlad-prykhodko.webp`, alt: 'Vlad Prykhodko', title: 'Vlad Prykhodko', description: 'Frontend Team Lead' },
					{ src: `${base}/product-team/maryna-shulzhenko.webp`, alt: 'Maryna Shulzhenko', title: 'Maryna Shulzhenko', description: 'QA Team Lead' },
					{ src: `${base}/product-team/dmytro-shvaika.webp`, alt: 'Dmytro Shvaika', title: 'Dmytro Shvaika', description: 'Java Engineer' },
					{ src: `${base}/product-team/daria-shevchenko.webp`, alt: 'Daria Shevchenko', title: 'Daria Shevchenko', description: 'Java Engineer' },
					{ src: `${base}/product-team/dmytro-skarzhynets.webp`, alt: 'Dmytro Skarzhynets', title: 'Dmytro Skarzhynets', description: 'Java Engineer' },
					{ src: `${base}/product-team/artem-dzhereleiko.webp`, alt: 'Artem Dzhereleiko', title: 'Artem Dzhereleiko', description: 'Frontend Engineer' },
					{ src: `${base}/product-team/ruslan-vasylkiv.webp`, alt: 'Ruslan Vasylkiv', title: 'Ruslan Vasylkiv', description: 'Frontend Engineer' },
					{ src: `${base}/product-team/sergii-tarnavskiy.webp`, alt: 'Sergii Tarnavskiy', title: 'Sergii Tarnavskiy', description: 'Frontend Engineer' },
					{ src: `${base}/product-team/kateryna-chantsova.webp`, alt: 'Kateryna Chantsova', title: 'Kateryna Chantsova', description: 'Frontend Engineer' },
					{ src: `${base}/product-team/yevhen-kalytka.webp`, alt: 'Yevhen Kalytka', title: 'Yevhen Kalytka', description: 'Frontend Engineer' },
					{ src: `${base}/product-team/oleg-khalkov.webp`, alt: 'Oleg Khalkov', title: 'Oleg Khalkov', description: 'QA Engineer' },
					{ src: `${base}/product-team/glib-petrukh.webp`, alt: 'Glib Petrukh', title: 'Glib Petrukh', description: 'QA Engineer' },
					{ src: `${base}/product-team/dmytro-zolotarenko.webp`, alt: 'Dmytro Zolotarenko', title: 'Dmytro Zolotarenko', description: 'Frontend Engineer' },
					{ src: `${base}/product-team/nickolay-kulikov.webp`, alt: 'Nickolay Kulikov', title: 'Nickolay Kulikov', description: 'Java Engineer' },
					{ src: `${base}/product-team/iryna-matveieva.webp`, alt: 'Iryna Matveieva', title: 'Iryna Matveieva', description: 'Java Engineer' },
					{ src: `${base}/product-team/serhii-titenko.webp`, alt: 'Serhii Titenko', title: 'Serhii Titenko', description: 'Technical Writer' },
					{ src: `${base}/product-team/yana-semeniak.webp`, alt: 'Yana Semeniak', title: 'Yana Semeniak', description: 'UI/UX Designer' },
					{ src: `${base}/product-team/oleksii-zolotukhin.webp`, alt: 'Oleksii Zolotukhin', title: 'Oleksii Zolotukhin', description: 'UI/UX Designer' },
				],
			},
		],
	},
	{
		label: 'Solutions',
		clusters: [
			{
				members: [
					{ src: `${base}/leadership/vitaliy-paromskiy.webp`, alt: 'Vitaliy Paromskiy', title: 'Vitaliy Paromskiy', description: 'Chief solutions officer' },
					{ src: `${base}/leadership/artur-ishkhanishvili.webp`, alt: 'Artur Ishkhanishvili', title: 'Artur Ishkhanishvili', description: 'VP Business Development' },
					{ src: `${base}/solutions-team/nizar-ali.webp`, alt: 'Nizar Ali', title: 'Nizar Ali', description: 'Unit Lead' },
					{ src: `${base}/solutions-team/andrii-zaiko.webp`, alt: 'Andrii Zaiko', title: 'Andrii Zaiko', description: 'Project Manager' },
				],
			},
			{
				members: [
					{ src: `${base}/solutions-team/serhii-skoryi.webp`, alt: 'Serhii Skoryi', title: 'Serhii Skoryi', description: 'Java Engineer' },
					{ src: `${base}/solutions-team/andrii-ivanov.webp`, alt: 'Andrii Ivanov', title: 'Andrii Ivanov', description: 'Java Engineer' },
					{ src: `${base}/solutions-team/olexandr-mykolaichuk.webp`, alt: 'Olexandr Mykolaichuk', title: 'Olexandr Mykolaichuk', description: 'Java Engineer' },
					{ src: placeholder, alt: 'Ivan Bondarenko', title: 'Ivan Bondarenko', description: 'Java Engineer' },
					{ src: `${base}/solutions-team/andrii-tkachenko.webp`, alt: 'Andrii Tkachenko', title: 'Andrii Tkachenko', description: 'Java Engineer' },
					{ src: `${base}/solutions-team/artemii-molyboha.webp`, alt: 'Artemii Molyboha', title: 'Artemii Molyboha', description: 'Java Engineer' },
					{ src: `${base}/solutions-team/vlad-myrhorodskyi.webp`, alt: 'Vlad Myrhorodskyi', title: 'Vlad Myrhorodskyi', description: 'Java Engineer' },
					{ src: `${base}/solutions-team/nikita-mazurenko.webp`, alt: 'Nikita Mazurenko', title: 'Nikita Mazurenko', description: 'Java Engineer' },
				],
			},
			{
				members: [
					{ src: `${base}/solutions-team/valeriia-koriavikova.webp`, alt: 'Valeriia Koriavikova', title: 'Valeriia Koriavikova', description: 'Frontend Engineer' },
					{ src: `${base}/solutions-team/dmytro-khylko.webp`, alt: 'Dmytro Khylko', title: 'Dmytro Khylko', description: 'Frontend Engineer' },
					{ src: `${base}/solutions-team/dmytro-pinkevych.webp`, alt: 'Dmytro Pinkevych', title: 'Dmytro Pinkevych', description: 'Frontend Engineer' },
					{ src: `${base}/solutions-team/oleksandr-mykytenko.webp`, alt: 'Oleksandr Mykytenko', title: 'Oleksandr Mykytenko', description: 'Frontend Engineer' },
					{ src: `${base}/solutions-team/oleh-kolesnyk.webp`, alt: 'Oleh Kolesnyk', title: 'Oleh Kolesnyk', description: 'Frontend Engineer' },
					{ src: `${base}/solutions-team/vlad-symonenko.webp`, alt: 'Vlad Symonenko', title: 'Vlad Symonenko', description: 'UI/UX Designer' },
				],
			},
		],
	},
	{
		label: 'Support',
		clusters: [
			{
				members: [
					{ src: `${base}/support-team/artem-murenko.webp`, alt: 'Artem Murenko', title: 'Artem Murenko', description: 'Support Team Lead' },
					{ src: `${base}/support-team/anna-shaforost.webp`, alt: 'Anna Shaforost', title: 'Anna Shaforost', description: 'Cloud Solutions Engineer' },
					{ src: `${base}/support-team/mykhailo-bondar.webp`, alt: 'Mykhailo Bondar', title: 'Mykhailo Bondar', description: 'Cloud Solutions Engineer' },
					{ src: `${base}/support-team/andrii-ponomariov.webp`, alt: 'Andrii Ponomariov', title: 'Andrii Ponomariov', description: 'Cloud Solutions Engineer' },
					{ src: `${base}/support-team/sofiia-sakharova.webp`, alt: 'Sofiia Sakharova', title: 'Sofiia Sakharova', description: 'Technical Support Engineer' },
					{ src: `${base}/support-team/eugen-palchenko.webp`, alt: 'Eugen Palchenko', title: 'Eugen Palchenko', description: 'Technical Support Engineer' },
					{ src: placeholder, alt: 'Mykhailo Kornieiev', title: 'Mykhailo Kornieiev', description: 'Technical Support Engineer' },
					{ src: placeholder, alt: 'Denys Sumin', title: 'Denys Sumin', description: 'Technical Support Engineer' },
					{ src: `${base}/support-team/oleksii-kuripko.webp`, alt: 'Oleksii Kuripko', title: 'Oleksii Kuripko', description: 'Technical Support Engineer' },
					{ src: `${base}/support-team/oleksii-mahurin.webp`, alt: 'Oleksii Mahurin', title: 'Oleksii Mahurin', description: 'Technical Support Engineer' },
				],
			},
			{
				members: [
					{ src: `${base}/support-team/daniela-dodonova.webp`, alt: 'Daniela Dodonova', title: 'Daniela Dodonova', description: 'Account manager' },
					{ src: `${base}/support-team/illia-tsybulenko-sihov.webp`, alt: 'Illia Tsybulenko-Sihov', title: 'Illia Tsybulenko-Sihov', description: 'Technical Support Engineer' },
				],
			},
		],
	},
	{
		label: 'Gateway',
		clusters: [
			{
				members: [
					{ src: `${base}/gateway/vitalii-bidochka.webp`, alt: 'Vitalii Bidochka', title: 'Vitalii Bidochka', description: 'Python Engineer' },
					{ src: `${base}/gateway/vadym-yakymuk.webp`, alt: 'Vadym Yakymuk', title: 'Vadym Yakymuk', description: 'QA Engineer' },
				],
			},
		],
	},
	{
		label: 'Trendz',
		clusters: [
			{
				members: [
					{ src: `${base}/leadership/vitaliy-paromskiy.webp`, alt: 'Vitaliy Paromskiy', title: 'Vitaliy Paromskiy', description: 'Chief solutions officer' },
					{ src: `${base}/trendz/iryna-kheroim.webp`, alt: 'Iryna Kheroim', title: 'Iryna Kheroim', description: 'Project Manager' },
					{ src: `${base}/trendz/anatolii-davydko.webp`, alt: 'Anatolii Davydko', title: 'Anatolii Davydko', description: 'Java Engineer' },
					{ src: `${base}/trendz/yuliia-klochai.webp`, alt: 'Yuliia Klochai', title: 'Yuliia Klochai', description: 'Frontend Engineer' },
				],
			},
		],
	},
	{
		label: 'EDGE',
		clusters: [
			{
				members: [
					{ src: `${base}/leadership/volodymyr-babak.webp`, alt: 'Volodymyr Babak', title: 'Volodymyr Babak', description: 'VP EDGE' },
					{ src: `${base}/edge/andrii-landiak.webp`, alt: 'Andrii Landiak', title: 'Andrii Landiak', description: 'Java Engineer' },
					{ src: `${base}/edge/yevheniia-mala.webp`, alt: 'Yevheniia Mala', title: 'Yevheniia Mala', description: 'Technical Writer' },
				],
			},
		],
	},
	{
		label: 'TBMQ',
		clusters: [
			{
				members: [
					{ src: `${base}/tbmq/dmytro-landiak.webp`, alt: 'Dmytro Landiak', title: 'Dmytro Landiak', description: 'Java Engineer' },
					{ src: `${base}/product-team/dmytro-shvaika.webp`, alt: 'Dmytro Shvaika', title: 'Dmytro Shvaika', description: 'Java Engineer' },
					{ src: placeholder, alt: 'Artem Babak', title: 'Artem Babak', description: 'Frontend Engineer' },
				],
			},
		],
	},
	{
		label: 'Sales',
		clusters: [
			{
				members: [
					{ src: `${base}/leadership/alex-doan.webp`, alt: 'Alex Doan', title: 'Alex Doan', description: 'VP Sales & Marketing' },
					{ src: `${base}/leadership/artur-ishkhanishvili.webp`, alt: 'Artur Ishkhanishvili', title: 'Artur Ishkhanishvili', description: 'Business Development Executive' },
					{ src: `${base}/sales-marketing/alla-sidnenko.webp`, alt: 'Alla Sidnenko', title: 'Alla Sidnenko', description: 'Customer Success Manager' },
					{ src: `${base}/sales-marketing/anastasiia-antoniuk.webp`, alt: 'Anastasiia Antoniuk', title: 'Anastasiia Antoniuk', description: 'Sales Manager' },
					{ src: `${base}/sales-marketing/maksym-shcherbytskyi.webp`, alt: 'Maksym Shcherbytskyi', title: 'Maksym Shcherbytskyi', description: 'Business Development Manager' },
				],
			},
		],
	},
	{
		label: 'Operations',
		clusters: [
			{
				members: [
					{ src: `${base}/leadership/oksana-kovalska.webp`, alt: 'Oksana Kovalska', title: 'Oksana Kovalska', description: 'HR Director' },
					{ src: `${base}/operation-team/valeriia-kalchenko.webp`, alt: 'Valeriia Kalchenko', title: 'Valeriia Kalchenko', description: 'Sourcer/HR Manager' },
					{ src: `${base}/operation-team/nataliia-avramenko.webp`, alt: 'Nataliia Avramenko', title: 'Nataliia Avramenko', description: 'Sr Accountant' },
					{ src: `${base}/operation-team/albina-kukharchuk.webp`, alt: 'Albina Kukharchuk', title: 'Albina Kukharchuk', description: 'Accountant' },
					{ src: placeholder, alt: 'Katia Goldin', title: 'Katia Goldin', description: 'CFO' },
					{ src: `${base}/operation-team/anastasiia-orlata.webp`, alt: 'Anastasiia Orlata', title: 'Anastasiia Orlata', description: 'Office manager' },
					{ src: placeholder, alt: 'Andrii Doan', title: 'Andrii Doan', description: 'Lawyer' },
				],
			},
		],
	},
];
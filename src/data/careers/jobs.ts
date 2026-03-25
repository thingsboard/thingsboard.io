export interface JobSection {
	title: string;
	items: string[];
}

export interface Job {
	slug: string;
	position: string;
	tag: string;
	location: string;
	dateString: string;
	intro: string;
	sections: JobSection[];
}

export const jobs: Job[] = [
	{
		slug: 'middle-java-developer',
		position: 'Middle Java Developer',
		tag: '',
		location: 'Kyiv, Ukraine',
		dateString: '',
		intro: 'ThingsBoard Inc. (Open-Source IoT platform) is looking for a Middle Java developer to join our team on a full-time basis in the Kyiv office.\n\nThingsBoard, Inc. is a US corporation founded in 2016 with RnD center in Kyiv, Ukraine. We are the main contributor and maintainer of ThingsBoard open-source IoT Platform. We deliver and constantly improve scalable, robust and affordable IoT Platform that dramatically reduces time-to-market for life-changing IoT solutions. We also help companies to deliver great IoT products based on ThingsBoard.',
		sections: [
			{
				title: 'Requirements',
				items: [
					'2+ years of hands-on experience in various Java technologies and frameworks',
					'Working knowledge of software development practices and technologies',
					'Experience in Spring (Core, Boot, MVC, Security, Data)',
					'Experience with relational database systems (PostgreSQL, MySQL)',
					'Experience with NoSQL (MongoDB, Redis)',
					'Experience with message brokers (Kafka)',
					'Experience with Docker/Kubernetes',
					'Experience with multithreading',
					'Deep understanding of OOP',
					'Knowledge in Git and Linux',
				],
			},
			{
				title: 'Nice to have',
				items: [
					'Experience with cloud services: AWS, GCE, or Azure',
					'Technical education',
				],
			},
			{
				title: 'Responsibilities',
				items: [
					'Design and development of the new features and APIs',
					'Writing clean and reusable code',
					'Support the existing functionality and improve it',
					'Deep dive into Java performance improvements during heavy load testing',
				],
			},
			{
				title: 'We offer',
				items: [
					'Working on an open-source IoT platform that has thousands of installations all over the world and 16000+ stars on GitHub',
					'Full-time office work with flexible work hours',
					'Modern cutting-edge development stack',
					'A high-professional team without bureaucracy and management overhead',
					'Career growth opportunities and regular salary review',
					'Medical insurance',
					'Free English classes',
					'Comfortable office and fridge with free beverages',
					'Team-buildings and corporate events',
				],
			},
		],
	},
];
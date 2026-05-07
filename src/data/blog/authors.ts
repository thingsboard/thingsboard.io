export interface BlogAuthor {
	slug: string;
	name: string;
	role?: string;
	avatar: string;
	bio?: string;
}

export const BLOG_AUTHORS: BlogAuthor[] = [
	{
		slug: 'alex-doan',
		name: 'PR Team',
		avatar: 'https://secure.gravatar.com/avatar/fb8c4c6319f9a7c6ed932120cd37b992?s=96&d=mm&r=g',
	},
	{
		slug: 'anastasia-antoniuk',
		name: 'Anastasia Antoniuk',
		avatar: 'https://secure.gravatar.com/avatar/9896ae08f45e7f4eecd95b3fc656aac0?s=96&d=mm&r=g',
	},
	{
		slug: 'andrew-shvaika',
		name: 'Andrew Shvaika',
		avatar: 'https://secure.gravatar.com/avatar/1e5a609c8d5b265cd9317f43bf4df549?s=96&d=mm&r=g',
	},
	{
		slug: 'andrii-ponomarov',
		name: 'Andrii Ponomarov',
		avatar: 'https://secure.gravatar.com/avatar/9ea83101d28d30686970a93101e02206?s=96&d=mm&r=g',
	},
	{
		slug: 'andrii-zaiko',
		name: 'Andrii Zaiko',
		avatar: 'https://secure.gravatar.com/avatar/8c93ebf5d98723e594698da091a09cc7?s=96&d=mm&r=g',
	},
	{
		slug: 'daria-shevchenko',
		name: 'Daria Shevchenko',
		avatar: 'https://secure.gravatar.com/avatar/05aa5260c531cba2ef9fceb6c68f249a?s=96&d=mm&r=g',
	},
	{
		slug: 'dlandiak',
		name: 'Dima Landiak',
		avatar: 'https://secure.gravatar.com/avatar/b79cef1565d16ade3779b0cf9495e7ec?s=96&d=mm&r=g',
	},
	{
		slug: 'dmytro-shvaika',
		name: 'Dmytro Shvaika',
		avatar: 'https://secure.gravatar.com/avatar/3cf9c662bfe484e5d580ba302e42640d?s=96&d=mm&r=g',
	},
	{
		slug: 'iryna-kheroim',
		name: 'Iryna Kheroim',
		avatar: 'https://secure.gravatar.com/avatar/ec3d9b1cdee046b41716a9bfa62d057a?s=96&d=mm&r=g',
	},
	{
		slug: 'iryna-matveieva',
		name: 'Iryna Matveieva',
		avatar: 'https://secure.gravatar.com/avatar/c6569a7824a5532b5b4ac920a163c417?s=96&d=mm&r=g',
	},
	{
		slug: 'marichka-kovalyk',
		name: 'Vitaliy Paromskiy',
		avatar: 'https://secure.gravatar.com/avatar/8bcf288df8a8c14bfe1b0af972e21ddd?s=96&d=mm&r=g',
	},
	{
		slug: 'mariia-naida',
		name: 'Mariia Naida',
		avatar: 'https://secure.gravatar.com/avatar/a3943357abe98fde87650378eb223cbe?s=96&d=mm&r=g',
	},
	{
		slug: 'mariia-shelaieva',
		name: 'Mariia Shelaieva',
		avatar: 'https://secure.gravatar.com/avatar/761940dbae49ac60ca0667d911508aed?s=96&d=mm&r=g',
	},
	{
		slug: 'maryna',
		name: 'Maryna Zakharchenko',
		avatar: 'https://secure.gravatar.com/avatar/dc90b5503779dccb8df48e2e964a3e83?s=96&d=mm&r=g',
	},
	{
		slug: 'valeriia-koriavikova',
		name: 'Valeriia Koriavikova',
		avatar: 'https://secure.gravatar.com/avatar/04b9ee24b1df742aff5297aa3236cf20?s=96&d=mm&r=g',
	},
	{
		slug: 'volodymyr-babak',
		name: 'Volodymyr Babak',
		avatar: 'https://secure.gravatar.com/avatar/c889a7d068f425853a41a6acaf6e6728?s=96&d=mm&r=g',
	},
	{
		slug: 'yevheniia-havrysh',
		name: 'Yevheniia Havrysh',
		avatar: 'https://secure.gravatar.com/avatar/c58a7f724eb8aa3a3295035a341cfdb2?s=96&d=mm&r=g',
	},
	{
		slug: 'yevheniia-mala',
		name: 'Yevheniia Mala',
		avatar: 'https://secure.gravatar.com/avatar/4ba8ba9be5d2d031da35478d32d21530?s=96&d=mm&r=g',
	},
];

export function getAuthor(slug: string): BlogAuthor | undefined {
	return BLOG_AUTHORS.find((a) => a.slug === slug);
}

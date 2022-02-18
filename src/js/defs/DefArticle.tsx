export default interface DefArticle {
	id: number;
	title?: string;
	category?: string;
	link?: string;
	image?: string;
	[key: string]: any;
}
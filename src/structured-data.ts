import type { ImageMetadata } from 'astro';
import FallbackImage from './assets/foster/millau-viaduct.jpg';
import {
	SITE_AUTHOR,
	SITE_AUTHOR_DESCRIPTION,
	SITE_DESCRIPTION,
	SITE_LANGUAGE,
	SITE_TITLE,
	withBase,
} from './consts';

export type JsonLdNode = Record<string, unknown>;

function dateString(date: Date): string {
	return date.toISOString().slice(0, 10);
}

function personId(site: URL): string {
	return `${internalUrl('/about/', site)}#person`;
}

export function internalUrl(path: string, site: URL): string {
	return new URL(withBase(path), site).href;
}

export function coverUrl(image: ImageMetadata | undefined, site: URL): string {
	return new URL((image ?? FallbackImage).src, site).href;
}

export function websiteSchema(site: URL): JsonLdNode {
	const url = internalUrl('/', site);
	return {
		'@type': 'WebSite',
		'@id': `${url}#website`,
		url,
		name: SITE_TITLE,
		description: SITE_DESCRIPTION,
		inLanguage: SITE_LANGUAGE,
		publisher: { '@id': personId(site) },
	};
}

export function personSchema(site: URL): JsonLdNode {
	const url = internalUrl('/about/', site);
	return {
		'@type': 'Person',
		'@id': personId(site),
		name: SITE_AUTHOR,
		url,
		description: SITE_AUTHOR_DESCRIPTION,
	};
}

interface WebPageOptions {
	site: URL;
	url: string;
	name: string;
	description: string;
	type?: string;
	mainEntity?: JsonLdNode;
}

export function webPageSchema(options: WebPageOptions): JsonLdNode {
	const { site, url, name, description, type = 'WebPage', mainEntity } = options;
	return {
		'@type': type,
		'@id': `${url}#webpage`,
		url,
		name,
		description,
		inLanguage: SITE_LANGUAGE,
		isPartOf: { '@id': `${internalUrl('/', site)}#website` },
		...(mainEntity && { mainEntity }),
	};
}

export function blogSchema(site: URL, postUrls: string[]): JsonLdNode {
	const url = internalUrl('/blog/', site);
	return {
		'@type': 'Blog',
		'@id': `${url}#blog`,
		url,
		name: SITE_TITLE,
		description: SITE_DESCRIPTION,
		inLanguage: SITE_LANGUAGE,
		author: { '@id': personId(site) },
		publisher: { '@id': personId(site) },
		blogPost: postUrls,
	};
}

interface BlogPostingOptions {
	site: URL;
	url: string;
	title: string;
	description: string;
	image: string;
	pubDate: Date;
	updatedDate?: Date;
}

export function blogPostingSchema(options: BlogPostingOptions): JsonLdNode {
	const { site, url, title, description, image, pubDate, updatedDate } = options;
	const schema: JsonLdNode = {
		'@type': 'BlogPosting',
		'@id': `${url}#article`,
		url,
		headline: title,
		description,
		image,
		datePublished: dateString(pubDate),
		author: { '@id': personId(site) },
		publisher: { '@id': personId(site) },
		mainEntityOfPage: { '@id': `${url}#webpage` },
		isPartOf: { '@id': `${internalUrl('/blog/', site)}#blog` },
		inLanguage: SITE_LANGUAGE,
		articleSection: 'Arquitectura',
	};
	if (updatedDate) schema.dateModified = dateString(updatedDate);
	return schema;
}

interface BreadcrumbOptions {
	site: URL;
	postUrl: string;
	postTitle: string;
}

export function breadcrumbSchema(options: BreadcrumbOptions): JsonLdNode {
	const { site, postUrl, postTitle } = options;
	return {
		'@type': 'BreadcrumbList',
		'@id': `${postUrl}#breadcrumb`,
		itemListElement: [
			{ '@type': 'ListItem', position: 1, name: 'Inicio', item: internalUrl('/', site) },
			{ '@type': 'ListItem', position: 2, name: 'Blog', item: internalUrl('/blog/', site) },
			{ '@type': 'ListItem', position: 3, name: postTitle },
		],
	};
}

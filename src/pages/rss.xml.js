import { getCollection } from 'astro:content';
import rss from '@astrojs/rss';
import { SITE_DESCRIPTION, SITE_TITLE, withBase } from '../consts';

export async function GET(context) {
	const posts = await getCollection('blog');
	const sortedPosts = posts.sort(
		(a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf(),
	);
	const site = new URL(withBase('/'), context.site);

	return rss({
		title: SITE_TITLE,
		description: SITE_DESCRIPTION,
		site,
		items: sortedPosts.map((post) => ({
			...post.data,
			link: `blog/${post.id}/`,
		})),
	});
}

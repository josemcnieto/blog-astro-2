// Datos globales del sitio. Se pueden importar desde cualquier archivo.

export const SITE_TITLE = 'El blog de Arquitectura';
export const SITE_DESCRIPTION =
	'Reflexiones y apuntes sobre arquitectura, ciudad y sostenibilidad';

/**
 * Añade la ruta base de GitHub Pages a una ruta interna.
 * Ejemplo: withBase('/blog/') -> '/blog-astro-2/blog/'
 */
const BASE = import.meta.env.BASE_URL.replace(/\/$/, '');

export function withBase(path: string): string {
	return `${BASE}${path.startsWith('/') ? path : `/${path}`}`;
}

/**
 * Devuelve la URL de la licencia Creative Commons indicada.
 * Ejemplo: 'CC BY-SA 4.0' -> 'https://creativecommons.org/licenses/by-sa/4.0/'
 */
export function licenseUrl(license: string): string {
	const match = license.match(/CC BY(?:-SA)? ([\d.]+)/);
	if (!match) return 'https://creativecommons.org/licenses/';
	const type = license.includes('BY-SA') ? 'by-sa' : 'by';
	return `https://creativecommons.org/licenses/${type}/${match[1]}/`;
}

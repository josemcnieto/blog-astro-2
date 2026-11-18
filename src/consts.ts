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

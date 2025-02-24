import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = ({ params }) => {
  // console.log("index: ", params);

  return {
		name: {
			thing1: `Hello`,
			thing2: 'World',
      link: `<a href="/about">About</a>`
		}
	};
	// error(404, 'Not found');
};
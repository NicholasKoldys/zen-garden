import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = ({ params }) => {
  // console.log("about: ", params);
  // error(404, 'Not found');
};
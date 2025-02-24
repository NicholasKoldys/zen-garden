import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async ({ params }) => {
	return {
		dataName: {
      title: params
    }
	};
};

export const prerender = true;
export const ssr = false;
// export const csr = true;
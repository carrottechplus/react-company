import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchGallery = async ({ queryKey }) => {
	const opt = queryKey[1];

	const baseURL = `https://www.flickr.com/services/rest/?format=json&nojsoncallback=1`;
	const key = '6c70577e2661042cd0ab587b17f6c944';
	const num = 50;
	// const myID = '198484213@N03';
	const method_interest = 'flickr.interestingness.getList';
	const method_search = 'flickr.photos.search';
	const method_user = 'flickr.people.getPhotos';

	let url = '';

	if (opt.type === 'interest') url = `${baseURL}&api_key=${key}&method=${method_interest}&per_page=${num}`;
	if (opt.type === 'search') url = `${baseURL}&api_key=${key}&method=${method_search}&per_page=${num}&tags=${opt.tags}`;
	if (opt.type === 'user') url = `${baseURL}&api_key=${key}&method=${method_user}&per_page=${num}&user_id=${opt.user}`;

	const response = await axios.get(url);
	return response.data.photos.photo;
};

export const useGalleryQuery = (opt) => {
	return useQuery(['flickrData', opt], fetchGallery, {
		refetchOnMount: false,
		refetchOnWindowFocus: false,
		cacheTime: 1000 * 60,
		staleTime: 1000 * 60,
	});
};

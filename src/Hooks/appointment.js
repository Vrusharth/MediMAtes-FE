import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";
import { navigate } from "../utils/navRef";
import { getDoctorDetails, getSerchedResult } from "../services/apointment";
import { getItem } from "../utils/asyncstorage";


export const useSearch = (query) => {
    return useInfiniteQuery({
        queryKey: ['search-result', query], // Include query in the key
        queryFn: ({ pageParam = 1 }) => getSerchedResult(pageParam, query),
        getNextPageParam: (lastPage) => {
            const nextPage = lastPage.page + 1;
            return nextPage <= lastPage.totalPages ? nextPage : undefined;
        },
    });
};

export const useDoctorDetail = (docid) => {
    return useQuery({
        queryKey: ['doctor-details', docid],
        queryFn: async () => {
            const response = await getDoctorDetails(docid);
            return response.data; // Extract the `data` property
        },
        enabled: !!docid, // Fetch only if postId exists
        staleTime: 5 * 60 * 1000, // Cache for 5 minutes
        onError: (error) => {
            console.error('Error fetching post data:', error);
        },
    });
};
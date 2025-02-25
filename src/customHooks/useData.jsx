import { useQuery } from '@tanstack/react-query';
import useAuth from './useAuth';
import useAxios from './useAxios';

const useData = () => {
    const { user } = useAuth();
    const axiosPublic = useAxios();

    const { data: userdata = {}, refetch } = useQuery({
        queryKey: ["user", user?.email],
        queryFn: async () => {
            if (!user?.email) {
                return {};
            }
            try {
                const res = await axiosPublic.get(`/users/${user.email}`);
                //console.log('User data fetched:', res.data);
                return res.data;
            } catch (error) {
                //console.error('Error fetching user data:', error);
                return {};
            }
        },
        enabled: !!user?.email, // Only run the query if the user email is available
    });
    return { userdata, refetch };
};

export default useData;
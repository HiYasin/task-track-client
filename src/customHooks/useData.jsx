import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import useAuth from './useAuth';
import useAxios from './useAxios';
import { useEffect, useState } from 'react';

const useData = () => {
    const { user, loading } = useAuth();
    const axiosPublic = useAxios();
    
    const { data: userdata = {}, refetch } = useQuery({
        queryKey: ["user", user.email],
        queryFn: async () => {
            const res = await axiosPublic.get(`/users/${user.email}`);
            return res.data;
        }
    });

    const [tasks, setTasks] = useState([]);

    return { userdata, refetch , tasks, setTasks };
};

export default useData;


const useTask = () => {
    // const { data: tasks = [], refetch } = useQuery({
    //     queryKey: ["tasks", user?.email],
    //     queryFn: async () => {
    //         const res = await axios.get(`/tasks/${user.email}`);
    //         return res.data;
    //     },
    // });
    const tasks = [5,6];
    return { tasks };
};

export default useTask;
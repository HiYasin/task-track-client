import TaskCard from "./TaskCard";

const TaskColumn = ({ heading, status, background, tasks }) => {

    return (
        <div className={`w-full ${background} p-4 rounded-lg border border-gray-200`}>
            <h2 className="text-lg font-bold text-center">{heading}</h2>
            <div className='flex flex-col mt-4'>
                {tasks.map((task) => {
                    if (task.category === status) {
                        return (
                            <TaskCard key={task.id} task={task} />
                        )
                    }
                })}
            </div>

        </div>
    );
};

export default TaskColumn;
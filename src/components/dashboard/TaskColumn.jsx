import { useDroppable } from "@dnd-kit/core";
import TaskCard from "./TaskCard";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";

const TaskColumn = ({ column, tasks }) => {

    const { setNodeRef } = useDroppable({
        id: column.id,
    });

    //console.log(tasks);
    //console.log(column);

    return (
        <div className={`w-full p-4 rounded-lg border border-gray-200`}>
            <h2 className="text-lg font-bold text-center">{column.title}</h2>
            <div ref={setNodeRef} className='flex flex-col gap-4 mt-4'>
                <SortableContext items={tasks} strategy={verticalListSortingStrategy}>
                    {tasks.map((task) =>
                        <TaskCard key={task.id} task={task} />
                    )}
                </SortableContext>
            </div>
        </div>
    );
};

export default TaskColumn;
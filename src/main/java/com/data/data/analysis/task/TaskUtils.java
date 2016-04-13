package com.data.data.analysis.task;

import com.data.data.analysis.task.TaskType.TaskType;

import java.util.List;

/**
 * Created by Kingsley on 2016/3/15.
 */
public enum TaskUtils {
    instance;

    public List<TaskNode> runnintTaskNodes;

    public List<TaskNode> finishedTaskNodes;

    /**
     * fetch the task you need and trigger running
     *
     * @param taskType
     */
    public void fetchTask(TaskType taskType) {

        //fetch the task which the taskStatus = 'run';

    }

    /**
     * //fetch the task which the taskStatus = 'run';
     *
     * @param taskType
     */
    public void runTask(TaskType taskType) {


        try {
            //invoke tasknode.execute()
        } catch (Exception e) {
            //save the exception to tasknode;
        }

    }

    /**
     * //fetch the task which the taskStatus = 'run';
     *
     * @param taskType
     */
    public void finishTask(TaskType taskType) {


    }
}

package com.data.data.analysis.task;

import com.data.data.analysis.task.TaskType.TaskType;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import java.util.Collections;
import java.util.Date;
import java.util.List;

/**
 * Created by Kingsley on 2016/3/8.
 */
public class Task {


    public static final Log LOG = LogFactory.getLog(Task.class);

    public List<Task> findTasks() {
        return Collections.EMPTY_LIST;
    }

    protected String name;
    protected Long userId;
    protected Date createTime;
    protected Date doneTime;


}

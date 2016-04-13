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
public class TaskNode {


    public static final Log LOG = LogFactory.getLog(TaskNode.class);

    public List<TaskNode> findTasks() {
        return Collections.EMPTY_LIST;
    }

    protected TaskType taskType;
    protected String name;
    protected String key;
    protected String info;
    protected Date createTime;
    protected Date doneTime;
    protected TaskNode preTask;
    protected TaskNode nextTask;
    protected TaskStatus taskStatus;
    protected String taskrundispatch;

    public TaskNode execute() {
        init();
        before();
        run();
        after();
        return this;
    }

    protected void init() {

    }


    protected void after() {

    }

    protected void run() {

    }

    protected void before() {

    }

    public TaskType getTaskType() {
        return taskType;
    }

    public void setTaskType(TaskType taskType) {
        this.taskType = taskType;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    public Date getDoneTime() {
        return doneTime;
    }

    public void setDoneTime(Date doneTime) {
        this.doneTime = doneTime;
    }

    public TaskNode getNextTask() {
        return nextTask;
    }

    public void setNextTask(TaskNode nextTask) {
        this.nextTask = nextTask;
    }

    public TaskNode getPreTask() {
        return preTask;
    }

    public void setPreTask(TaskNode preTask) {
        this.preTask = preTask;
    }

    public String getKey() {
        return key;
    }

    public void setKey(String key) {
        this.key = key;
    }

    public String getInfo() {
        return info;
    }

    public void setInfo(String info) {
        this.info = info;
    }

    public TaskStatus getTaskStatus() {
        return taskStatus;
    }

    public void setTaskStatus(TaskStatus taskStatus) {
        this.taskStatus = taskStatus;
    }

    public String getTaskrundispatch() {
        return taskrundispatch;
    }

    public void setTaskrundispatch(String taskrundispatch) {
        this.taskrundispatch = taskrundispatch;
    }
}

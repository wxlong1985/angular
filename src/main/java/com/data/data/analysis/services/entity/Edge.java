package com.data.data.analysis.services.entity;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

/**
 * Created by Kingsley on 2016/3/26.
 */

@Entity
@Table(name = "edge")
public class Edge extends com.framework.hibernate.util.Entity {
    @Id
    @GeneratedValue
    private Long id;
    /**
     * 对应edge.id
     */
    private Integer source;
    /**
     * 对应edge.id
     */
    private Integer target;
    /**
     * 流程编号
     */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "workflowId")
    private Flow flow;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Flow getFlow() {
        return flow;
    }

    public void setFlow(Flow flow) {
        this.flow = flow;
    }

    public Integer getSource() {
        return source;
    }

    public void setSource(Integer source) {
        this.source = source;
    }

    public Integer getTarget() {
        return target;
    }

    public void setTarget(Integer target) {
        this.target = target;
    }
}

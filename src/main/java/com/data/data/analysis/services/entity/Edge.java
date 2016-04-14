package com.data.data.analysis.services.entity;

import com.data.data.analysis.services.entity.enums.NodeType;

import javax.persistence.*;

/**
 * Created by Kingsley on 2016/3/26.
 */

@Entity
@Table(name = "edge")
public class Edge extends com.framework.hibernate.util.Entity {
    @Id
    @GeneratedValue
    private Long id;
    private Integer source;
    private Integer target;
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

package com.data.data.analysis.services.entity;

import com.data.data.analysis.services.entity.enums.NodeType;

import javax.persistence.*;

/**
 * Created by Kingsley on 2016/3/26.
 */

@Entity
@Table(name = "node")
public class Node extends com.framework.hibernate.util.Entity {
    @Id
    @GeneratedValue
    private Long nodeid;
    private Long id;
    private String remark;
    private Integer x;
    private Integer y;
    @Enumerated(EnumType.STRING)
    private NodeType nodetype;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="workflowId")
    private Flow flow;

    public Long getNodeid() {
        return nodeid;
    }

    public void setNodeid(Long nodeid) {
        this.nodeid = nodeid;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }

    public Integer getX() {
        return x;
    }

    public void setX(Integer x) {
        this.x = x;
    }

    public Integer getY() {
        return y;
    }

    public void setY(Integer y) {
        this.y = y;
    }

    public NodeType getNodetype() {
        return nodetype;
    }

    public void setNodetype(NodeType nodetype) {
        this.nodetype = nodetype;
    }

    public Flow getFlow() {
        return flow;
    }

    public void setFlow(Flow flow) {
        this.flow = flow;
    }
}

package com.data.data.analysis.services.entity;

import com.data.data.analysis.services.entity.enums.NodeType;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
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
@Table(name = "node")
public class Node extends com.framework.hibernate.util.Entity {
    @Id
    @GeneratedValue
    private Long nodeid;
    /**
     * 节点编号
     */
    private Long id;
    /**
     * 备注
     */
    private String remark;
    /**
     * x位置
     */
    private Integer x;
    /**
     * y位置
     */

    private Integer y;
    @Enumerated(EnumType.STRING)
    private NodeType nodetype;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "workflowId")
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

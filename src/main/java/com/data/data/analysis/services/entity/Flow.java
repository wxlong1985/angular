package com.data.data.analysis.services.entity;

import com.data.data.analysis.services.entity.enums.FlowStatus;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

/**
 * Created by Kingsley on 2016/3/26.
 */
@Entity
@Table(name = "flow")
public class Flow extends com.framework.hibernate.util.Entity {

    @Id
    @GeneratedValue
    private Long id;
    private String flowNam;
    @Temporal(TemporalType.TIMESTAMP)
    private Date createTime;
    private Long userid;
    @Enumerated(EnumType.STRING)
    private FlowStatus status;
    private String info;
    private String html;
    @OneToMany(mappedBy = "flow")
    private List<Node> nodes;
    @OneToMany(mappedBy = "flow")
    private List<Edge> edges;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFlowNam() {
        return flowNam;
    }

    public void setFlowNam(String flowNam) {
        this.flowNam = flowNam;
    }

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    public Long getUserid() {
        return userid;
    }

    public void setUserid(Long userid) {
        this.userid = userid;
    }

    public FlowStatus getStatus() {
        return status;
    }

    public void setStatus(FlowStatus status) {
        this.status = status;
    }

    public String getInfo() {
        return info;
    }

    public void setInfo(String info) {
        this.info = info;
    }

    public String getHtml() {
        return html;
    }

    public void setHtml(String html) {
        this.html = html;
    }

    public List<Node> getNodes() {
        return nodes;
    }

    public void setNodes(List<Node> nodes) {
        this.nodes = nodes;
    }

    public List<Edge> getEdges() {
        return edges;
    }

    public void setEdges(List<Edge> edges) {
        this.edges = edges;
    }
}

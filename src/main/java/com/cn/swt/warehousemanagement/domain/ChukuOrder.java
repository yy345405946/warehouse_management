package com.cn.swt.warehousemanagement.domain;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;

@Data
@Entity
@Table(name = "chuku_order")
public class ChukuOrder implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name="input_order_id")
    private int inputOrderId;

    @Column(name="number")
    private int number;

    @Column(name="chuku_date")
    @JsonFormat(timezone = "GMT+8", pattern = "yyyy-MM-dd")
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date chukuDate;

    @Column(name="price")
    private Float price;

    @Column(name="profile")
    private BigDecimal profile;

    @Column(name="rebase")
    private BigDecimal rebase;

    @Column(name="memo")
    private String memo;

    @Column(name="created_date")
    @JsonIgnore
    private Date createdDate;

    @Column(name="created_by")
    @JsonIgnore
    private String createdBy;

    @Column(name="updated_date")
    @JsonIgnore
    private Date updatedDate;

    @Column(name="updated_by")
    @JsonIgnore
    private String updatedBy;
}

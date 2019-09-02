package com.cn.swt.warehousemanagement.domain;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.Date;

@Data
@Entity
@Table(name="ruku_order")
public class RukuOrder {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name="use_type")
    private String useType;

    private int category;

    @Column(insertable=false, updatable=false)
    private String categoryStr;

    private String vendor;

    private String name;

    private String unit;

    private Integer number;

    @Column(name="snum", insertable = false, updatable = false)
    private Integer snum;

    @Column(name="ruku_date")
    @JsonFormat(timezone = "GMT+8", pattern = "yyyy-MM-dd")
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date rukuDate;

    private BigDecimal cost;

    private BigDecimal debate;

    @Column(name="checkout_date")
    @JsonFormat(timezone = "GMT+8", pattern = "yyyy-MM-dd")
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date checkoutDate;

    private String memo;

    @Column(name="created_by")
    @JsonIgnore
    private String createdBy;

    @Column(name="created_date")
    @JsonIgnore
    private Date createdDate;

    @Column(name="updated_by")
    @JsonIgnore
    private String updatedBy;

    @Column(name="updated_date")
    @JsonIgnore
    private Date updatedDate;
}

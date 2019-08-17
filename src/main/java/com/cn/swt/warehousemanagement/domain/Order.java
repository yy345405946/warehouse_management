package com.cn.swt.warehousemanagement.domain;

import lombok.Data;

import java.math.BigDecimal;
import java.util.Date;

@Data
public class Order {

    private String useType;

    private String category;

    private String vendor;

    private String name;

    private String unit;

    private Integer rukuNumber;

    private Date rukuDate;

    private BigDecimal cost;

    private BigDecimal debate;

    private Date checkoutDate;

    private int chukuNumber;

    private Date chukuDate;

    private Float price;

    private BigDecimal profile;

}

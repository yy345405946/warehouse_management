package com.cn.swt.warehousemanagement.domain;

import lombok.Data;

import java.math.BigDecimal;
import java.util.Date;

@Data
public class Consumerable {
    private Date chukuDate;
    private String name;
    private int num;
    private BigDecimal totalPrice;
    private BigDecimal cost;
    private BigDecimal totalCost;
    private BigDecimal profile;
    private BigDecimal nonCost;
}

package com.cn.swt.warehousemanagement.domain;

import lombok.Data;

@Data
public class TotalReport {
    private String date;
    private float price;
    private float cost;
    private float profile;
    private float inProfilePercent;
    private int ySum;
    private int inYSumPercent;
}

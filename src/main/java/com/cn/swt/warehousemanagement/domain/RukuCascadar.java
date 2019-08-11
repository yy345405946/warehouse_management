package com.cn.swt.warehousemanagement.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RukuCascadar {

    private String value;
    private String label;
    private List<RukuCascadar> children;

}

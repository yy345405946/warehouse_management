package com.cn.swt.warehousemanagement.repository;

import com.cn.swt.warehousemanagement.domain.Category;
import com.cn.swt.warehousemanagement.domain.ChukuOrder;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CategoryRepository extends JpaRepository<Category, Integer> {

}

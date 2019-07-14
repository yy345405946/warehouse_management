package com.cn.swt.warehousemanagement.repository;

import com.cn.swt.warehousemanagement.domain.ChukuOrder;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ChukuOrderRepository extends JpaRepository<ChukuOrder, Integer> {

    List<ChukuOrder> findByInputOrderId(Integer inputOrderId);

}

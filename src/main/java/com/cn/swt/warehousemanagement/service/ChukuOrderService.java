package com.cn.swt.warehousemanagement.service;

import com.cn.swt.warehousemanagement.domain.ChukuOrder;
import com.cn.swt.warehousemanagement.repository.ChukuOrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ChukuOrderService {

    @Autowired
    private ChukuOrderRepository chukuOrderRepository;

    @Autowired
    private RukuOrderService rukuOrderService;

    public ChukuOrder save(ChukuOrder chukuOrder){
        return chukuOrderRepository.save(chukuOrder);
    }

    public void deleteById(Integer id){
        chukuOrderRepository.deleteById(id);
    }

    public List<ChukuOrder> findAll(){
        return chukuOrderRepository.findAllByOrderByChukuDateAsc();
    }

    public List<ChukuOrder> findByInputOrderId(Integer inputOrderId){
        return chukuOrderRepository.findByInputOrderIdOrderByChukuDateAsc(inputOrderId);
    }

}

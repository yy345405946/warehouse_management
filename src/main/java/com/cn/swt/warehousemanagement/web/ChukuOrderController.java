package com.cn.swt.warehousemanagement.web;

import com.cn.swt.warehousemanagement.domain.ChukuOrder;
import com.cn.swt.warehousemanagement.service.ChukuOrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/chukuOrder")
public class ChukuOrderController {

    @Autowired
    private ChukuOrderService chukuOrderService;

    @RequestMapping(value = "/save")
    public ChukuOrder save(@RequestBody ChukuOrder chukuOrder){
        return chukuOrderService.save(chukuOrder);
    }

    @DeleteMapping(value = "/deleteById")
    public String deleteById(@RequestParam Integer id){
        chukuOrderService.deleteById(id);
        return "success";
    }

    @GetMapping(value = "/findAll")
    public List<ChukuOrder> findAll(){
        return chukuOrderService.findAll();
    }

    @GetMapping(value = "/findByInputOrderId")
    public List<ChukuOrder> findByInputOrderId(@RequestParam Integer inputOrderId) {
        return chukuOrderService.findByInputOrderId(inputOrderId);
    }
}

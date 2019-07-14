package com.cn.swt.warehousemanagement.web;

import com.cn.swt.warehousemanagement.domain.RukuOrder;
import com.cn.swt.warehousemanagement.service.RukuOrderService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/rukuOrder")
public class RukuOrderController {

    @Autowired
    private RukuOrderService rukuOrderService;

    @PutMapping(value = "/save")
    public RukuOrder save(@RequestBody RukuOrder rukuOrder){
        log.info(rukuOrder.toString());
        return rukuOrderService.save(rukuOrder);
    }

    @DeleteMapping(value = "/deleteById")
    public String deleteById(@RequestParam Integer id){
        rukuOrderService.deleteById(id);
        return "success";
    }

    @GetMapping(value = "/findAll")
    public List<RukuOrder> findAll(){
        return rukuOrderService.findAll();
    }

    @GetMapping(value = "/find")
    public List<RukuOrder> findByParams(@RequestParam(required = false) String keyWords, @RequestParam(required = false) String startDate, @RequestParam(required = false) String endDate){
        if(StringUtils.isEmpty(keyWords) && StringUtils.isEmpty(startDate) && StringUtils.isEmpty(endDate)){
            return findAll();
        }
        return rukuOrderService.find(keyWords, startDate, endDate);
    }
}

package com.cn.swt.warehousemanagement.service;

import com.cn.swt.warehousemanagement.domain.RukuOrder;
import com.cn.swt.warehousemanagement.repository.RukuOrderRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.util.List;

@Slf4j
@Service
public class RukuOrderService {

    @Autowired
    private RukuOrderRepository rukuOrderRepository;

    public RukuOrder save(RukuOrder rukuOrder){
        return rukuOrderRepository.save(rukuOrder);
    }

    public void deleteById(Integer id){
        rukuOrderRepository.deleteById(id);
    }

    public List<RukuOrder> findAll(){
        return rukuOrderRepository.findAll();
    }

    public List<RukuOrder> find(String keywords, String startDate, String endDate){
        if(!StringUtils.isEmpty(keywords) && StringUtils.isEmpty(startDate)){
            return rukuOrderRepository.findByKeyWords(keywords);
        }
        if(StringUtils.isEmpty(keywords) && !StringUtils.isEmpty(startDate)){
            return rukuOrderRepository.findByDate(startDate, endDate);
        }
        if(!StringUtils.isEmpty(keywords) && !StringUtils.isEmpty(startDate)){
            return rukuOrderRepository.findByParams(keywords, startDate, endDate);
        }
        return rukuOrderRepository.findAll();
    }

}

package com.cn.swt.warehousemanagement.service;

import com.cn.swt.warehousemanagement.domain.RukuCascadar;
import com.cn.swt.warehousemanagement.domain.RukuOrder;
import com.cn.swt.warehousemanagement.repository.RukuOrderRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;
import org.springframework.util.StringUtils;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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

    public List<RukuCascadar> findForChuku(){
        List<RukuOrder> rukuOrders = rukuOrderRepository.findForChuku();
        List<RukuCascadar> cascadars = new ArrayList<>();
        Map<String, Object> rukuOrderMap = new HashMap<>();
        if(rukuOrders == null || rukuOrders.size() == 0){
            return cascadars;
        }
        for(RukuOrder rukuOrder : rukuOrders){
            String useType = rukuOrder.getUseType();
            Map<String, Object> useTypeMap = (Map<String, Object>)rukuOrderMap.get(useType);
            if(useTypeMap == null){
                useTypeMap = new HashMap<>();
                rukuOrderMap.put(useType, useTypeMap);
            }
            String category = String.valueOf(rukuOrder.getCategoryStr());
            Map<String, Object> categoryMap = (Map<String, Object>)useTypeMap.get(category);
            if(categoryMap == null){
                categoryMap = new HashMap<>();
                useTypeMap.put(category, categoryMap);
            }
            String vendor = rukuOrder.getVendor();
            Map<String, Object> vendorMap = (Map<String, Object>)categoryMap.get(vendor);
            if(vendorMap == null){
                vendorMap = new HashMap<>();
                categoryMap.put(vendor, vendorMap);
            }
            String name = rukuOrder.getName();
            Map<String, Object> nameMap = (Map<String, Object>)vendorMap.get(name);
            if(nameMap == null){
                nameMap = new HashMap<>();
                vendorMap.put(name, nameMap);
            }
            String unit = rukuOrder.getUnit();
            List<String> unitList = (List<String>)nameMap.get(unit);
            if(unitList == null){
                unitList = new ArrayList<>();
                nameMap.put(unit, unitList);
            }
        }
        for(Map.Entry<String, Object> useTypeEntry : rukuOrderMap.entrySet()){
            RukuCascadar useTypeCascadar = new RukuCascadar(
                    useTypeEntry.getKey(),
                    useTypeEntry.getKey(),
                    new ArrayList<>()
            );
            cascadars.add(useTypeCascadar);

            for(Map.Entry<String, Object> categoryEntry : ((Map<String, Object>)useTypeEntry.getValue()).entrySet()){
                RukuCascadar categoryCascadar = new RukuCascadar(
                    categoryEntry.getKey(),
                    categoryEntry.getKey(),
                    new ArrayList<>()
                );
                useTypeCascadar.getChildren().add(categoryCascadar);

                for(Map.Entry<String, Object> vendorEntry : ((Map<String, Object>)categoryEntry.getValue()).entrySet()){
                    RukuCascadar vendorCascadar = new RukuCascadar(
                            vendorEntry.getKey(),
                            vendorEntry.getKey(),
                            new ArrayList<>()
                    );
                    categoryCascadar.getChildren().add(vendorCascadar);

                    for(Map.Entry<String, Object> nameEntry : ((Map<String, Object>)vendorEntry.getValue()).entrySet()){
                        RukuCascadar nameCascadar = new RukuCascadar(
                                nameEntry.getKey(),
                                nameEntry.getKey(),
                                new ArrayList<>()
                        );
                        vendorCascadar.getChildren().add(nameCascadar);

                        for(Map.Entry<String, Object> unitEntry : ((Map<String, Object>)nameEntry.getValue()).entrySet()){
                            RukuCascadar unitCascadar = new RukuCascadar(
                                unitEntry.getKey(), unitEntry.getKey(), null
                            );
                            nameCascadar.getChildren().add(unitCascadar);
                        }
                    }
                }
            }
        }
        return cascadars;
    }

    public RukuOrder findRukuByParams(String useType, String category, String vendor, String name, String unit){
        List<RukuOrder> rukuOrders = rukuOrderRepository.findOrder(useType, category, vendor, name, unit);
        if(CollectionUtils.isEmpty(rukuOrders)){
            return null;
        }
        return rukuOrders.get(0);
    }

}

package com.cn.swt.warehousemanagement.service;

import com.cn.swt.warehousemanagement.domain.Category;
import com.cn.swt.warehousemanagement.domain.ChukuOrder;
import com.cn.swt.warehousemanagement.repository.CategoryRepository;
import com.cn.swt.warehousemanagement.repository.ChukuOrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    public Category save(Category category){
        return categoryRepository.save(category);
    }

    public void deleteById(Integer id){
        categoryRepository.deleteById(id);
    }

    public List<Category> findAll(){
        return categoryRepository.findAll();
    }

}

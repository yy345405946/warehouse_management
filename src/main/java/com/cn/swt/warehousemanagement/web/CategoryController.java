package com.cn.swt.warehousemanagement.web;

import com.cn.swt.warehousemanagement.domain.Category;
import com.cn.swt.warehousemanagement.domain.ChukuOrder;
import com.cn.swt.warehousemanagement.service.CategoryService;
import com.cn.swt.warehousemanagement.service.ChukuOrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/category")
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    @RequestMapping(value = "/save")
    public Category save(@RequestBody Category category){
        return categoryService.save(category);
    }

    @DeleteMapping(value = "/deleteById")
    public String deleteById(@RequestParam Integer id){
        categoryService.deleteById(id);
        return "success";
    }

    @GetMapping(value = "/findAll")
    public List<Category> findAll(){
        return categoryService.findAll();
    }

}

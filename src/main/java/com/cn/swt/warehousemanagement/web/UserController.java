package com.cn.swt.warehousemanagement.web;

import com.cn.swt.warehousemanagement.domain.User;
import com.cn.swt.warehousemanagement.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService userService;

    @PutMapping(value="/save")
    public String save(@RequestBody User user){
        return userService.save(user)? "success" : "failed";
    }

    @GetMapping(value = "/findAll")
    public List<User> findAll(){
        return userService.findAll();
    }

}

package com.cn.swt.warehousemanagement.service;

import com.cn.swt.warehousemanagement.domain.User;
import com.cn.swt.warehousemanagement.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public boolean save(User user){
        User savedUser = userRepository.save(user);
        if(savedUser != null){
            return true;
        }else{
            return false;
        }
    }

    public List<User> findAll(){
        return userRepository.findAll();
    }

}

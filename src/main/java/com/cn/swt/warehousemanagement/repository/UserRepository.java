package com.cn.swt.warehousemanagement.repository;

import com.cn.swt.warehousemanagement.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Integer> {

}

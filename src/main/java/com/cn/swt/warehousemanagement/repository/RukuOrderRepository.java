package com.cn.swt.warehousemanagement.repository;

import com.cn.swt.warehousemanagement.domain.RukuOrder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface RukuOrderRepository extends JpaRepository<RukuOrder, Integer> {

    @Query(value="select t.id,t.use_type,t.categroy,t.vendor,t.name,t.unit,t.number,t.ruku_date,t.cost,t.debate,t.checkout_date,t.memo,t.created_by,t.created_date,t.updated_by,t.updated_date,if(t.number - if(t.cnum is null, 0, t.cnum)<0,0,t.number - if(t.cnum is null, 0, t.cnum)) snum from (select r.*, (select sum(number) from chuku_order where input_order_id=r.id) cnum from ruku_order r) t", nativeQuery = true)
    public List<RukuOrder> findAll();

    @Query(value = "select t.* from (select CONCAT(use_type,' ',categroy,' ',vendor,' ',name,' ', unit,' ',number,' ',ruku_date,' ',cost,' ',if(debate is null, '',debate),' ',if(checkout_date is null,'',checkout_date),' ',if(memo is null,'',memo),' ') as keyWords, o.* from ruku_order o) t where t.keyWords like %:keyWords%", nativeQuery = true)
    public List<RukuOrder> findByKeyWords(@Param(value = "keyWords") String keyWords);

    @Query(value = "select * from (select CONCAT(use_type,' ',categroy,' ',vendor,' ',name,' ', unit,' ',number,' ',ruku_date,' ',cost,' ',if(debate is null, '',debate),' ',if(checkout_date is null,'',checkout_date),' ',if(memo is null,'',memo),' ') as keyWords, o.* from ruku_order o) t where ruku_date >= :startDate and ruku_date <= :endDate", nativeQuery = true)
    public List<RukuOrder> findByDate(@Param(value = "startDate") String startDate, @Param(value = "endDate") String endDate);

    @Query(value = "select * from (select CONCAT(use_type,' ',categroy,' ',vendor,' ',name,' ', unit,' ',number,' ',ruku_date,' ',cost,' ',if(debate is null, '',debate),' ',if(checkout_date is null,'',checkout_date),' ',if(memo is null,'',memo),' ') as keyWords, o.* from ruku_order o) t where keyWords like %:keyWords% and ruku_date >= :startDate and ruku_date <= :endDate", nativeQuery = true)
    public List<RukuOrder> findByParams(@Param(value = "keyWords") String keyWords, @Param(value = "startDate") String startDate, @Param(value = "endDate") String endDate);

}

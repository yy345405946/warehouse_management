package com.cn.swt.warehousemanagement.repository;

import com.cn.swt.warehousemanagement.domain.Order;
import com.cn.swt.warehousemanagement.domain.RukuOrder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public interface RukuOrderRepository extends JpaRepository<RukuOrder, Integer> {

    @Query(value="select t.id,t.use_type,t.category,t.vendor,t.name,t.unit,t.number,t.ruku_date,t.cost,t.debate,t.checkout_date,t.memo,t.created_by,t.created_date,t.updated_by,t.updated_date,if(t.number - if(t.cnum is null, 0, t.cnum)<0,0,t.number - if(t.cnum is null, 0, t.cnum)) snum from (select r.*, (select sum(number) from chuku_order where input_order_id=r.id) cnum from ruku_order r) t", nativeQuery = true)
    List<RukuOrder> findAll();

    @Query(value = "select t.* from (select CONCAT(use_type,' ',category,' ',vendor,' ',name,' ', unit,' ',number,' ',ruku_date,' ',cost,' ',if(debate is null, '',debate),' ',if(checkout_date is null,'',checkout_date),' ',if(memo is null,'',memo),' ') as keyWords, o.* from ruku_order o) t where t.keyWords like %:keyWords%", nativeQuery = true)
    List<RukuOrder> findByKeyWords(@Param(value = "keyWords") String keyWords);

    @Query(value = "select * from (select CONCAT(use_type,' ',category,' ',vendor,' ',name,' ', unit,' ',number,' ',ruku_date,' ',cost,' ',if(debate is null, '',debate),' ',if(checkout_date is null,'',checkout_date),' ',if(memo is null,'',memo),' ') as keyWords, o.* from ruku_order o) t where ruku_date >= :startDate and ruku_date <= :endDate", nativeQuery = true)
    List<RukuOrder> findByDate(@Param(value = "startDate") String startDate, @Param(value = "endDate") String endDate);

    @Query(value = "select * from (select CONCAT(use_type,' ',category,' ',vendor,' ',name,' ', unit,' ',number,' ',ruku_date,' ',cost,' ',if(debate is null, '',debate),' ',if(checkout_date is null,'',checkout_date),' ',if(memo is null,'',memo),' ') as keyWords, o.* from ruku_order o) t where keyWords like %:keyWords% and ruku_date >= :startDate and ruku_date <= :endDate", nativeQuery = true)
    List<RukuOrder> findByParams(@Param(value = "keyWords") String keyWords, @Param(value = "startDate") String startDate, @Param(value = "endDate") String endDate);

    @Query(value="select s.* from (select t.id,t.use_type,t.category,t.vendor,t.name,t.unit,t.number,t.ruku_date,t.cost,t.debate,t.checkout_date,t.memo,t.created_by,t.created_date,t.updated_by,t.updated_date,if(t.number - if(t.cnum is null, 0, t.cnum)<0,0,t.number - if(t.cnum is null, 0, t.cnum)) snum from (select r.*, (select sum(number) from chuku_order where input_order_id=r.id) cnum from ruku_order r) t) s where snum > 0 order by s.use_type,s.category,s.vendor,s.name,s.unit,s.ruku_date",nativeQuery = true)
    List<RukuOrder> findForChuku();

    @Query(value="select s.* from (select t.id,t.use_type,t.category,t.vendor,t.name,t.unit,t.number,t.ruku_date,t.cost,t.debate,t.checkout_date,t.memo,t.created_by,t.created_date,t.updated_by,t.updated_date,if(t.number - if(t.cnum is null, 0, t.cnum)<0,0,t.number - if(t.cnum is null, 0, t.cnum)) snum from (select r.*, (select sum(number) from chuku_order where input_order_id=r.id) cnum from ruku_order r) t) s where snum > 0 and s.use_type=:useType and s.category=:category and s.vendor=:vendor and s.name=:name and s.unit=:unit order by s.ruku_date", nativeQuery = true)
    List<RukuOrder> findOrder(@Param(value = "useType") String useType, @Param(value = "category") String category, @Param(value = "vendor") String vendor, @Param(value = "name") String name, @Param(value = "unit") String unit );

    @Query(value="select ruku.use_type, ruku.category, ruku.vendor, ruku.name, ruku.unit, ruku.number as ruku_number, ruku.ruku_date, ruku.cost, ruku.debate, ruku.checkout_date, chuku.number as chuku_number,chuku.chuku_date, chuku.price from ruku_order ruku, chuku_order chuku where ruku.id = chuku.input_order_id and ruku.checkout_date is not null", nativeQuery = true)
    ArrayList<Map<String, Object>> findAllForProfile();

    @Query(value = "select t.* from (select CONCAT(use_type,' ',category,' ',vendor,' ',name,' ', unit,' ',ruku_number,' ',ruku_date,' ',cost,' ',if(debate is null, '',debate),' ',if(checkout_date is null,'',checkout_date),' ',if(memo is null,'',memo),' ') as keyWords, o.* from (select ruku.use_type, ruku.category, ruku.vendor, ruku.name, ruku.unit, ruku.number as ruku_number, ruku.ruku_date, ruku.cost, ruku.debate, ruku.checkout_date, ruku.memo, chuku.number as chuku_number,chuku.chuku_date, chuku.price from ruku_order ruku, chuku_order chuku where ruku.id = chuku.input_order_id and ruku.checkout_date is not null) o) t where t.keyWords like %:keyWords%", nativeQuery = true)
    ArrayList<Map<String, Object>> findByKeyWordsForProfile(@Param(value = "keyWords") String keyWords);

    @Query(value = "select ruku.use_type, ruku.category, ruku.vendor, ruku.name, ruku.unit, ruku.number as ruku_number, ruku.ruku_date, ruku.cost, ruku.debate, ruku.checkout_date, chuku.number as chuku_number,chuku.chuku_date, chuku.price from ruku_order ruku, chuku_order chuku where ruku.id = chuku.input_order_id and ruku.checkout_date is not null and ruku_date >= :startDate and ruku_date <= :endDate", nativeQuery = true)
    ArrayList<Map<String, Object>> findByDateForProfile(@Param(value = "startDate") String startDate, @Param(value = "endDate") String endDate);

    @Query(value = "select * from (select CONCAT(use_type,' ',category,' ',vendor,' ',name,' ', unit,' ',ruku_number,' ',ruku_date,' ',cost,' ',if(debate is null, '',debate),' ',if(checkout_date is null,'',checkout_date),' ',if(memo is null,'',memo),' ') as keyWords, o.* from (select ruku.use_type, ruku.category, ruku.vendor, ruku.name, ruku.unit, ruku.number as ruku_number, ruku.ruku_date, ruku.cost, ruku.debate, ruku.checkout_date, ruku.memo, chuku.number as chuku_number,chuku.chuku_date, chuku.price from ruku_order ruku, chuku_order chuku where ruku.id = chuku.input_order_id and ruku.checkout_date is not null) o) t where keyWords like %:keyWords% and ruku_date >= :startDate and ruku_date <= :endDate", nativeQuery = true)
    ArrayList<Map<String, Object>> findByParamsForProfile(@Param(value = "keyWords") String keyWords, @Param(value = "startDate") String startDate, @Param(value = "endDate") String endDate);
}

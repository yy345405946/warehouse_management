package com.cn.swt.warehousemanagement.service;

import com.cn.swt.warehousemanagement.domain.ChukuOrder;
import com.cn.swt.warehousemanagement.domain.RukuOrder;
import com.cn.swt.warehousemanagement.repository.ChukuOrderRepository;
import com.cn.swt.warehousemanagement.repository.RukuOrderRepository;
import com.cn.swt.warehousemanagement.utils.DateUtils;
import com.cn.swt.warehousemanagement.utils.OrderConstants;
import lombok.extern.slf4j.Slf4j;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;
import org.springframework.util.StringUtils;

import java.io.InputStream;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Slf4j
@Service
public class UploaderService {

    @Autowired
    private RukuOrderRepository rukuOrderRepository;

    @Autowired
    private ChukuOrderRepository chukuOrderRepository;



    public String uploadOrderByExcel(InputStream inputStream, String fileName, int index) throws Exception{
        Workbook work = this.getWorkbook(inputStream, fileName);
        if(work == null){
            throw new Exception("请上传正确的文件");
        }

        String message = "";
        if(index == OrderConstants.RUKU_SHEET_INDEX){
            message = this.uploadRukuOrder(work.getSheetAt(OrderConstants.RUKU_SHEET_INDEX));
        }else if(index == OrderConstants.CHUKU_SHEET_INDEX){
            message = this.uploadChukuOrder(work.getSheetAt(OrderConstants.CHUKU_SHEET_INDEX));
        }
        work.close();

        return message;
    }

    public Workbook getWorkbook(InputStream inputStream, String fileName) throws Exception{
        Workbook workbook = null;
        String fileType = fileName.substring(fileName.lastIndexOf("."));
        if(".xls".equalsIgnoreCase(fileType)){
            workbook = new HSSFWorkbook(inputStream);
        }else if(".xlsx".equalsIgnoreCase(fileType)){
            workbook = new XSSFWorkbook(inputStream);
        }else{
            throw new Exception("请上传文件");
        }
        return workbook;
    }

    public String uploadRukuOrder(Sheet sheet){
        List<RukuOrder> rukuOrders = new ArrayList<>();

        if(sheet == null || sheet.getLastRowNum() < 1){
            return "入库单保存失败";
        }
        for (int i = 1; i <= sheet.getLastRowNum(); i++){
            Row row = sheet.getRow(i);
            if(row == null || row.getLastCellNum() < 1){
                continue;
            }
            RukuOrder rukuOrder = new RukuOrder();
            String useType = row.getCell(0) != null? row.getCell(0).getStringCellValue() : null;
            String category = row.getCell(1) != null? row.getCell(1).getStringCellValue() : null;

            rukuOrder.setUseType(row.getCell(0) != null? row.getCell(0).getStringCellValue() : null);
            if(!StringUtils.isEmpty(category)){
                rukuOrder.setCategory(Integer.parseInt(category));
            }
            rukuOrder.setVendor(row.getCell(2) != null? row.getCell(2).getStringCellValue() : null);
            rukuOrder.setName(row.getCell(3) != null? row.getCell(3).getStringCellValue() : null);
            rukuOrder.setCost(row.getCell(4) != null? new BigDecimal(row.getCell(4).getNumericCellValue()) : null);
            rukuOrder.setNumber(row.getCell(5) != null? (int)row.getCell(5).getNumericCellValue() : null);
            rukuOrder.setUnit(row.getCell(6) != null? row.getCell(6).getStringCellValue() : null);
            String rukuDateString = row.getCell(7).getStringCellValue();
            Date rukuDate = null;
            if(!StringUtils.isEmpty(rukuDateString)){
                rukuDate = DateUtils.parse(OrderConstants.DATE_FORMAT_STR, rukuDateString);
            }
            if(rukuDate != null){
                rukuOrder.setRukuDate(rukuDate);
            }
            rukuOrder.setDebate(row.getCell(8) != null? new BigDecimal(row.getCell(8).getNumericCellValue()) : null);
            String checkoutDateString = row.getCell(9).getStringCellValue();
            Date checkoutDate = null;
            if(!StringUtils.isEmpty(checkoutDateString)){
                checkoutDate = DateUtils.parse(OrderConstants.DATE_FORMAT_STR, checkoutDateString);
            }
            if(checkoutDate != null){
                rukuOrder.setCheckoutDate(checkoutDate);
            }
            rukuOrder.setMemo(row.getCell(10) != null? row.getCell(10).getStringCellValue() : null);

            rukuOrders.add(rukuOrder);
        }

        List<RukuOrder> rukuOrderList = rukuOrderRepository.saveAll(rukuOrders);
        if(!CollectionUtils.isEmpty(rukuOrderList)){
            return rukuOrderList.size() + "入库单保存成功";
        }else{
            return "入库单保存失败";
        }
    }

    public String uploadChukuOrder(Sheet sheet){
        List<ChukuOrder> chukuOrders = new ArrayList<>();

        if(sheet == null || sheet.getLastRowNum() < 1){
            return "出库单保存失败";
        }
        for(int i = 1; i <= sheet.getLastRowNum(); i++){
            Row row = sheet.getRow(i);
            if(row == null || row.getLastCellNum() < 1){
                continue;
            }
            ChukuOrder chukuOrder = new ChukuOrder();
            String useType = row.getCell(0) != null? row.getCell(0).getStringCellValue() : null;
            String category = row.getCell(1) != null? row.getCell(1).getStringCellValue() : null;
            String vendor = row.getCell(2) != null? row.getCell(2).getStringCellValue() : null;
            String name = row.getCell(3) != null? row.getCell(3).getStringCellValue() : null;
            String unit = row.getCell(4) != null? row.getCell(4).getStringCellValue() : null;
            List<RukuOrder> rukuOrders = rukuOrderRepository.findOrder(useType, category, vendor, name, unit);
            if(CollectionUtils.isEmpty(rukuOrders)){
                log.warn("出库失败 --> 他用/自用：{}, 商品归类：{}, 供应商：{}, 品名：{}, 单位：{}", useType, category, vendor, name, unit);
                continue;
            }
            chukuOrder.setInputOrderId(rukuOrders.get(0).getId());
            chukuOrder.setPrice(row.getCell(5) != null? (float)row.getCell(5).getNumericCellValue() : 0);
            String numberStr = row.getCell(6).getStringCellValue();
            if(!StringUtils.isEmpty(numberStr)){
                chukuOrder.setNumber(Integer.parseInt(numberStr));
            }
            String chukuDateStr = row.getCell(7).getStringCellValue();
            Date chukuDate = null;
            if(!StringUtils.isEmpty(chukuDateStr)){
                chukuDate = DateUtils.parse(OrderConstants.DATE_FORMAT_STR, chukuDateStr);
            }
            if(chukuDate != null){
                chukuOrder.setChukuDate(chukuDate);
            }
            chukuOrder.setMemo(row.getCell(8) != null? row.getCell(8).getStringCellValue() : null);

            chukuOrders.add(chukuOrder);
        }

        List<ChukuOrder> chukuOrderList = chukuOrderRepository.saveAll(chukuOrders);

        if(!CollectionUtils.isEmpty(chukuOrderList)){
            return chukuOrderList.size() + "出库单保存成功";
        }else{
            return "出库单保存失败";
        }
    }

}

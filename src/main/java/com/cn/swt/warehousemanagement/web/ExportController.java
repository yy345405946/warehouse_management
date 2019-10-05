package com.cn.swt.warehousemanagement.web;

import com.cn.swt.warehousemanagement.domain.Consumerable;
import com.cn.swt.warehousemanagement.domain.Order;
import com.cn.swt.warehousemanagement.domain.TotalReport;
import com.cn.swt.warehousemanagement.service.ExportService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.util.ArrayList;
import java.util.List;

@Slf4j
@RestController
@RequestMapping(value = "export")
public class ExportController {

    @Autowired
    private ExportService exportService;

    @PostMapping(value="/pdf")
    public void exportPDF(@RequestParam String renderedHtml, @RequestParam String cssStyle,
                          @RequestParam String fileName, HttpServletResponse response){
        exportService.exportHtmlToPDF(response, fileName, cssStyle, renderedHtml);
    }

    @GetMapping(value="profile")
    public List<Order> profile(@RequestParam(required = false) String keyWords,
                               @RequestParam(required = false) String startDate,
                               @RequestParam(required = false) String endDate){
        return exportService.profileDetails(keyWords, startDate, endDate);
    }

    @GetMapping(value="details")
    public List<Consumerable> details(@RequestParam(required = false) String useType,
                                                   @RequestParam(required = false) String startDate,
                                                   @RequestParam(required = false) String endDate){
        return exportService.consumerableDetails(useType, startDate, endDate);
    }

    @GetMapping(value="year")
    public List<TotalReport> year(@RequestParam(required = false) String useType){
        return exportService.consumerableYear(useType);
    }

    @GetMapping(value="month")
    public List<TotalReport> month(@RequestParam(required = false) String useType,
                                                   @RequestParam(required = false) String startDate,
                                                   @RequestParam(required = false) String endDate){
        return exportService.consumerableMonth(useType, startDate, endDate);
    }

}

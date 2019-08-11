package com.cn.swt.warehousemanagement.web;

import com.cn.swt.warehousemanagement.service.ExportService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletResponse;

@Slf4j
@RestController
@RequestMapping(value = "export")
public class ExportController {

    @Autowired
    private ExportService exportService;

    @PostMapping(value="/pdf")
    public void exportPDF(@RequestParam String renderedHtml, @RequestParam String cssStyle,
                          @RequestParam String fileName, HttpServletResponse response){
        renderedHtml = "aaaaa";
        cssStyle="";
        exportService.exportHtmlToPDF(response, fileName, cssStyle, renderedHtml);
    }

}

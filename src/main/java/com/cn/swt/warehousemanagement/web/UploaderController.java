package com.cn.swt.warehousemanagement.web;

import com.cn.swt.warehousemanagement.service.UploaderService;
import com.cn.swt.warehousemanagement.utils.OrderConstants;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import javax.servlet.http.HttpServletRequest;
import java.io.InputStream;

@RestController
@RequestMapping(value = "upload")
public class UploaderController {

    @Autowired
    private UploaderService uploaderService;

    @PostMapping(value = "/ruku")
    public String ruku(HttpServletRequest request) throws Exception{
        MultipartHttpServletRequest multipartHttpServletRequest = (MultipartHttpServletRequest)request;
        MultipartFile file = multipartHttpServletRequest.getFile("file");
        if(file.isEmpty()){
            return "文件不能为空";
        }
        InputStream inputStream = file.getInputStream();
        String message = uploaderService.uploadOrderByExcel(inputStream, file.getOriginalFilename(), OrderConstants.RUKU_SHEET_INDEX);
        inputStream.close();
        return message;
    }

    @PostMapping(value = "/chuku")
    public String chuku(HttpServletRequest request) throws Exception{
        MultipartHttpServletRequest multipartHttpServletRequest = (MultipartHttpServletRequest)request;
        MultipartFile file = multipartHttpServletRequest.getFile("file");
        if(file.isEmpty()){
            return "文件不能为空";
        }
        InputStream inputStream = file.getInputStream();
        String message = uploaderService.uploadOrderByExcel(inputStream, file.getOriginalFilename(), OrderConstants.CHUKU_SHEET_INDEX);
        inputStream.close();
        return message;
    }

}

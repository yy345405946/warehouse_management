package com.cn.swt.warehousemanagement.utils;

import lombok.extern.slf4j.Slf4j;
import org.springframework.util.StringUtils;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;

@Slf4j
public class DateUtils {

    public static Date parse(String pattern, String dateString){
        if(StringUtils.isEmpty(pattern) || StringUtils.isEmpty(dateString)){
            log.warn("Warning: {} parse date failed.", DateUtils.class.getName());
            return null;
        }

        SimpleDateFormat simpleDateFormat = new SimpleDateFormat(pattern, Locale.getDefault());
        try{
            return simpleDateFormat.parse(dateString);
        }catch (ParseException e){
            log.error("Error: {} parse date failed.", DateUtils.class.getName(), e);
        }
        return null;
    }

}

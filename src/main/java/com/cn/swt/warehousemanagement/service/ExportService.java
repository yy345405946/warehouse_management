package com.cn.swt.warehousemanagement.service;

import com.cn.swt.warehousemanagement.domain.Consumerable;
import com.cn.swt.warehousemanagement.domain.Order;
import com.cn.swt.warehousemanagement.domain.TotalReport;
import com.cn.swt.warehousemanagement.repository.RukuOrderRepository;
import com.openhtmltopdf.bidi.support.ICUBidiReorderer;
import com.openhtmltopdf.bidi.support.ICUBidiSplitter;
import com.openhtmltopdf.extend.FSObjectDrawer;
import com.openhtmltopdf.extend.FSSupplier;
import com.openhtmltopdf.extend.OutputDevice;
import com.openhtmltopdf.extend.OutputDeviceGraphicsDrawer;
import com.openhtmltopdf.outputdevice.helper.BaseRendererBuilder;
import com.openhtmltopdf.pdfboxout.PdfRendererBuilder;
import com.openhtmltopdf.render.DefaultObjectDrawerFactory;
import com.openhtmltopdf.render.RenderingContext;
import com.openhtmltopdf.svgsupport.BatikSVGDrawer;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.ResourceUtils;
import org.springframework.util.StringUtils;
import org.w3c.dom.Element;

import javax.servlet.http.HttpServletResponse;
import java.awt.*;
import java.awt.geom.Line2D;
import java.io.*;
import java.math.BigDecimal;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

@Slf4j
@Service
public class ExportService {

    @Autowired
    private RukuOrderRepository rukuOrderRepository;

    private final static SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd");

    public void exportHtmlToPDF(HttpServletResponse httpServletResponse, String fileName, String cssStyle, String renderedHtml){
        log.info("start export html to pdf");
        try{
            httpServletResponse.addHeader("Content-Disposition", "attachment;FileName="+fileName+".pdf");
            httpServletResponse.setContentType("application/pdf");
            httpServletResponse.setCharacterEncoding("UTF-8");
            OutputStream out = httpServletResponse.getOutputStream();
            StringBuffer html = new StringBuffer();
            html.append("<!DOCTYPE html>");
            html.append("<html xmlns=\"http://www.w3.org/1999/xhtml\">").append("<head>")
                    .append("<style type=\"text/css\">").append(cssStyle).append("</style>").append("</head>")
                    .append("<body>")
                    .append(renderedHtml).append("</body></html>");
            html.trimToSize();
            PdfRendererBuilder builder = new PdfRendererBuilder();
            builder.useFastMode();
            builder.useFont(new FSSupplier<InputStream>() {
                @Override
                public InputStream supply() {
                    try{
                        return new FileInputStream(ResourceUtils.getFile("classpath:public/font/simhei.ttf"));
                    }catch (FileNotFoundException e){
                        log.error("can't found font file", e);
                    }
                    return null;
                }
            }, "simhei" , 400, BaseRendererBuilder.FontStyle.NORMAL, true);
            builder.useUnicodeBidiSplitter(new ICUBidiSplitter.ICUBidiSplitterFactory());
            builder.useUnicodeBidiReorderer(new ICUBidiReorderer());
            builder.defaultTextDirection(BaseRendererBuilder.TextDirection.LTR);
            builder.useSVGDrawer(new BatikSVGDrawer());
            builder.useObjectDrawerFactory(buildObjectDrawerFactory());
            builder.withHtmlContent(html.toString(), ExportService.class.getResource("/").toString());
            builder.toStream(out);
            builder.run();
            out.flush();
            out.close();
        }catch (Exception e){
            log.error("exception happened when export html to pdf", e);
        }
    }

    private static DefaultObjectDrawerFactory buildObjectDrawerFactory(){
        DefaultObjectDrawerFactory objectDrawerFactory = new DefaultObjectDrawerFactory();
        objectDrawerFactory.registerDrawer("custom/binary-tree", new SampleObjectDrawerBinaryTree());
        return objectDrawerFactory;
    }

    private static void addFont(PdfRendererBuilder builder){
        File fontFile = null;
        try {
            fontFile = ResourceUtils.getFile("classpath:public/font/simhei.ttf");
        } catch (FileNotFoundException e) {
            log.error("can't find font file", e);
        }
        if(fontFile != null){
            builder.useFont(fontFile, "simhei");
        }
    }

    public static class SampleObjectDrawerBinaryTree implements FSObjectDrawer{
        int fanout;
        int angle;

        private void renderTree(Graphics2D gfx, double x, double y, double len, double angleDeg, int depth){
            double rad = angleDeg * Math.PI / 180f;
            double xTarget = x + Math.cos(rad) * len;
            double yTarget = y + Math.sin(rad) * len;
            gfx.setStroke(new BasicStroke(2f));
            gfx.setColor(new Color(255 / depth, 128, 128));
            gfx.draw(new Line2D.Double(x, y, xTarget, yTarget));

            if(depth > 1){
                double childAngle = angleDeg - (((fanout - 1) * angle) / 2f);
                for(int i = 0; i < fanout; i++){
                    renderTree(gfx, xTarget, yTarget, len * 0.95, childAngle, depth - 1);
                    childAngle += angle;
                }
            }
        }

        @Override
        public Map<Shape, String> drawObject(Element e, double x, double y, double width, double height, OutputDevice outputDevice, RenderingContext ctx, int dotsPerPixel){
            final int depth = Integer.parseInt(e.getAttribute("data-depth"));
            fanout = Integer.parseInt(e.getAttribute("data-fanout"));
            angle = Integer.parseInt(e.getAttribute("data-angle"));
            outputDevice.drawWithGraphics((float) x, (float) y, (float) width / dotsPerPixel, (float) height / dotsPerPixel, new OutputDeviceGraphicsDrawer() {

                public void render(Graphics2D graphics2D) {
                    double realWidth = width / dotsPerPixel;
                    double realHeight = height / dotsPerPixel;

                    renderTree(graphics2D, realWidth / 2f, realHeight, realHeight / depth, - 90, depth);
                }
            });
            return null;
        }
    }

    public List<Order> profileDetails(String keywords, String startDate, String endDate){
        ArrayList<Order> orders = new ArrayList<>();
        List<Map<String, Object>> dataList = new ArrayList<>();
        if(StringUtils.isEmpty(keywords) && StringUtils.isEmpty(startDate) && StringUtils.isEmpty(endDate)){
            dataList = rukuOrderRepository.findAllForProfile();
        }else if(!StringUtils.isEmpty(keywords) && StringUtils.isEmpty(startDate) && StringUtils.isEmpty(endDate)){
            dataList = rukuOrderRepository.findByKeyWordsForProfile(keywords);
        }else if(StringUtils.isEmpty(keywords) && !StringUtils.isEmpty(startDate) && !StringUtils.isEmpty(endDate)){
            dataList = rukuOrderRepository.findByDateForProfile(startDate, endDate);
        }else if(!StringUtils.isEmpty(keywords) && !StringUtils.isEmpty(startDate) && !StringUtils.isEmpty(endDate)){
            dataList = rukuOrderRepository.findByParamsForProfile(keywords, startDate, endDate);
        }
        for(Map<String, Object> dataMap : dataList){
            orders.add(parseOrder(dataMap));
        }
        return orders;
    }

    public List<Consumerable> consumerableDetails(String useType, String startDate, String endDate){
        List<Consumerable> consumerables = new ArrayList<>();
        List<Map<String, Object>> dataList = new ArrayList<>();
        if(StringUtils.isEmpty(useType) && StringUtils.isEmpty(startDate) && StringUtils.isEmpty(endDate)){
            dataList = rukuOrderRepository.findAllForConsumerable();
        }else if(!StringUtils.isEmpty(useType) && StringUtils.isEmpty(startDate) && StringUtils.isEmpty(endDate)){
            dataList = rukuOrderRepository.findByUseTypeForConsumerable(useType);
        }else if(StringUtils.isEmpty(useType) && !StringUtils.isEmpty(startDate) && !StringUtils.isEmpty(endDate)){
            dataList = rukuOrderRepository.findByDateForConsumerable(startDate, endDate);
        }else if(!StringUtils.isEmpty(useType) && !StringUtils.isEmpty(startDate) && !StringUtils.isEmpty(endDate)){
            dataList = rukuOrderRepository.findByParamsForConsumerable(useType, startDate, endDate);
        }
        for(Map<String, Object> dataMap : dataList){
            consumerables.add(parseConsumerable(dataMap));
        }
        return consumerables;
    }

    public List<TotalReport> consumerableMonth(String useType, String startDate, String endDate){
        List<TotalReport> totalReports = new ArrayList<>();
        List<Map<String, Object>> dataList = new ArrayList<>();
        if(!StringUtils.isEmpty(useType)){
            dataList = rukuOrderRepository.findAllByUseTypeForMonth("2019", useType);
        }else{
            dataList = rukuOrderRepository.findAllForMonth("2019");
        }
        for(Map<String, Object> dataMap : dataList){
            totalReports.add(parse(dataMap));
        }

        boolean isStat = true;
        float preProfile = 0;
        int preYSum = 0;
        for(TotalReport totalReport : totalReports){
            preProfile = totalReport.getProfile();
            preYSum = totalReport.getYSum();
            if(isStat){
                isStat = false;
            }else{
                totalReport.setInProfilePercent((totalReport.getProfile() - preProfile) / totalReport.getProfile());
                totalReport.setInYSumPercent((totalReport.getYSum() - preYSum)/ totalReport.getYSum());
            }
        }
        return totalReports;
    }

    public List<TotalReport> consumerableYear(String useType){
        List<TotalReport> totalReports = new ArrayList<>();
        List<Map<String, Object>> dataList = new ArrayList<>();
        if(!StringUtils.isEmpty(useType)){
            dataList = rukuOrderRepository.findAllByUseTypeForYear(useType);
        }else{
            dataList = rukuOrderRepository.findAllForYear();
        }

        for(Map<String, Object> dataMap : dataList){
            totalReports.add(parse(dataMap));
        }
        boolean isStat = true;
        float preProfile = 0;
        int preYSum = 0;
        for(TotalReport totalReport : totalReports){
            preProfile = totalReport.getProfile();
            preYSum = totalReport.getYSum();
            if(isStat){
                isStat = false;
            }else{
                totalReport.setInProfilePercent((totalReport.getProfile() - preProfile) / totalReport.getProfile());
                totalReport.setInYSumPercent((totalReport.getYSum() - preYSum)/ totalReport.getYSum());
            }
        }
        return totalReports;
    }

    private Order parseOrder(Map<String, Object> dataMap){
        Order order = new Order();
        String useType = dataMap.get("use_type") != null? String.valueOf(dataMap.get("use_type")) : null;
        String category = dataMap.get("category") != null? String.valueOf(dataMap.get("category")) : null;
        String vendor = dataMap.get("vendor") != null? String.valueOf(dataMap.get("vendor")) : null;
        String name = dataMap.get("name") != null? String.valueOf(dataMap.get("name")) : null;
        String unit = dataMap.get("unit") != null? String.valueOf(dataMap.get("unit")) : null;
        String rukuNumberStr = dataMap.get("ruku_number") != null? String.valueOf(dataMap.get("ruku_number")) : null;
        String rukuDateStr = dataMap.get("ruku_date") != null? String.valueOf(dataMap.get("ruku_date")) : null;
        String costStr = dataMap.get("cost") != null? String.valueOf(dataMap.get("cost")) : null;
        String debateStr = dataMap.get("debate") != null? String.valueOf(dataMap.get("debate")) : null;
        String checkoutDateStr = dataMap.get("checkout_date") != null? String.valueOf(dataMap.get("checkout_date")) : null;
        String chukuNumberStr = dataMap.get("chuku_number") != null? String.valueOf(dataMap.get("chuku_number")) : null;
        String chukuDateStr = dataMap.get("chuku_date") != null? String.valueOf(dataMap.get("chuku_date")) : null;
        String priceStr = dataMap.get("price") != null? String.valueOf(dataMap.get("price")) : null;
        Integer rukuNumberInt = null;
        if(rukuNumberStr != null){
            rukuNumberInt = Integer.parseInt(String.valueOf(rukuNumberStr));
        }
        Date rukuDate = null;
        if(rukuDateStr != null){
            try {
                rukuDate = simpleDateFormat.parse(rukuDateStr);
            } catch (ParseException e) {
                log.error("error in parse date: {}", rukuDateStr, e);
            }
        }
        BigDecimal cost = null;
        if(costStr != null){
            cost = new BigDecimal(costStr);
        }
        BigDecimal dedate = null;
        if(debateStr != null){
            dedate = new BigDecimal(debateStr);
        }
        Date checkoutDate = null;
        if(checkoutDateStr != null){
            try{
                checkoutDate = simpleDateFormat.parse(checkoutDateStr);
            }catch (ParseException e){
                log.error("error in parse date: {}", checkoutDateStr, e);
            }
        }
        Integer chukuNumber = null;
        if(chukuNumberStr != null){
            chukuNumber = Integer.parseInt(chukuNumberStr);
        }
        Date chukuDate = null;
        if(chukuDateStr != null){
            try{
                chukuDate = simpleDateFormat.parse(chukuDateStr);
            }catch (ParseException e){
                log.error("error in parse date: {}", chukuDateStr, e);
            }
        }
        Float price = null;
        if(priceStr != null){
            price = Float.valueOf(priceStr);
        }

        order.setUseType(useType);
        order.setCategory(category);
        order.setVendor(vendor);
        order.setName(name);
        order.setUnit(unit);
        if(rukuNumberInt != null){
            order.setRukuNumber(rukuNumberInt);
        }
        if(rukuDate != null){
            order.setRukuDate(rukuDate);
        }
        if(cost != null){
            order.setCost(cost);
        }
        if(dedate != null){
            order.setDebate(dedate);
        }
        if(checkoutDate != null){
            order.setCheckoutDate(checkoutDate);
        }
        if(chukuNumber != null){
            order.setChukuNumber(chukuNumber);
        }
        if(chukuDate != null){
            order.setChukuDate(chukuDate);
        }
        if(price != null){
            order.setPrice(price);
        }
        return order;
    }

    private Consumerable parseConsumerable(Map<String, Object> dataMap){
        Consumerable consumerable = new Consumerable();
        String name = dataMap.get("name") != null? String.valueOf(dataMap.get("name")) : null;
        String costStr = dataMap.get("cost") != null? String.valueOf(dataMap.get("cost")) : null;
        String chukuNumberStr = dataMap.get("chuku_number") != null? String.valueOf(dataMap.get("chuku_number")) : null;
        String chukuDateStr = dataMap.get("chuku_date") != null? String.valueOf(dataMap.get("chuku_date")) : null;
        String priceStr = dataMap.get("price") != null? String.valueOf(dataMap.get("price")) : null;
        BigDecimal cost = null;
        if(costStr != null){
            cost = new BigDecimal(costStr);
        }
        Integer chukuNumber = null;
        if(chukuNumberStr != null){
            chukuNumber = Integer.parseInt(chukuNumberStr);
        }
        Date chukuDate = null;
        if(chukuDateStr != null){
            try{
                chukuDate = simpleDateFormat.parse(chukuDateStr);
            }catch (ParseException e){
                log.error("error in parse date: {}", chukuDateStr, e);
            }
        }
        BigDecimal price = null;
        if(priceStr != null){
            price = new BigDecimal(priceStr);
        }

        if(chukuDate != null){
            consumerable.setChukuDate(chukuDate);
        }
        consumerable.setName(name);
        if(chukuNumber != null){
            consumerable.setNum(chukuNumber);
        }
        if(price != null && chukuNumber != null){
            consumerable.setTotalPrice(price.multiply(new BigDecimal(chukuNumber)));
        }
        if(cost != null){
            consumerable.setCost(cost);
        }
        if(cost != null && chukuNumber != null){
            consumerable.setTotalCost(cost.multiply(new BigDecimal(chukuNumber)));
        }
        if(consumerable.getTotalCost() != null && consumerable.getTotalPrice() != null){
            consumerable.setProfile(consumerable.getTotalPrice().subtract(consumerable.getTotalCost()));
        }
        return consumerable;
    }

    private TotalReport parse(Map<String, Object> dataMap){
        TotalReport report = new TotalReport();
        String ynum = dataMap.get("ynum") != null? String.valueOf(dataMap.get("ynum")) : null;
        String date = dataMap.get("date") != null? String.valueOf(dataMap.get("date")) : null;
        String price = dataMap.get("price") != null? String.valueOf(dataMap.get("price")) : null;
        String cost = dataMap.get("cost") != null? String.valueOf(dataMap.get("cost")) : null;

        if(ynum != null){
            report.setYSum(Integer.parseInt(ynum));
        }
        if(date != null){
            report.setDate(date);
        }
        if(price != null){
            report.setPrice(Float.valueOf(price));
        }
        if(cost != null){
            report.setCost(Float.valueOf(cost));
        }
        return report;
    }

}

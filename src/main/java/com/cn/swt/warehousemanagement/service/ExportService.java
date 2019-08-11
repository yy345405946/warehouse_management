package com.cn.swt.warehousemanagement.service;

import com.openhtmltopdf.bidi.support.ICUBidiReorderer;
import com.openhtmltopdf.bidi.support.ICUBidiSplitter;
import com.openhtmltopdf.extend.FSObjectDrawer;
import com.openhtmltopdf.extend.OutputDevice;
import com.openhtmltopdf.extend.OutputDeviceGraphicsDrawer;
import com.openhtmltopdf.outputdevice.helper.BaseRendererBuilder;
import com.openhtmltopdf.pdfboxout.PdfRendererBuilder;
import com.openhtmltopdf.render.DefaultObjectDrawerFactory;
import com.openhtmltopdf.render.RenderingContext;
import com.openhtmltopdf.svgsupport.BatikSVGDrawer;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.w3c.dom.Element;

import javax.servlet.http.HttpServletResponse;
import java.awt.*;
import java.awt.geom.Line2D;
import java.io.OutputStream;
import java.util.Map;

@Slf4j
@Service
public class ExportService {

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
                    .append("<body>").append(renderedHtml).append("</body></html");
            html.trimToSize();
            PdfRendererBuilder builder = new PdfRendererBuilder();
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

}

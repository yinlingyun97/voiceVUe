# 设置基础镜像
FROM harbor.dcos.guangzhou.unicom.local/zhyy/nginx:1.21.0
# 将dist文件中的内容复制到 /usr/share/nginx/html/ 这个目录下面
COPY ./dist  /usr/share/nginx/html/taskschedule
#用本地的 default.conf 配置来替换nginx镜像里的默认配置
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf

# 并行工作线程数
workers = 4
# 监听内网端口5000【按需要更改】
bind = '0.0.0.0:8000'
# 设置守护进程【关闭连接时，程序仍在运行】
daemon = True
# 设置超时时间120s，默认为30s。按自己的需求进行设置
timeout = 30
# 设置访问日志和错误信息日志路径
accesslog = './log/acess.log'
errorlog = './log/error.log'
proce_size=4
start_port=8089

for ((i=${start_port};i<$[ ${start_port} + ${proce_size} ];i++ ))
do
    echo "create slave $i"
    { nohup stdbuf -oL python ../slave.py $i 2>&3 | nohup cronolog /search/spider_log/rotation/%Y%m%d/%Y%m%d%H/slave.log_${i}.%Y%m%d%H.${HOST}.std ;} 3>&1 | nohup cronolog /search/spider_log/rotation/%Y%m%d/%Y%m%d%H/slave.log_${i}.%Y%m%d%H.${HOST}.err &
    echo $! 
done
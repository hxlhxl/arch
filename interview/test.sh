#!/bin/bash

# source /opt/python/venv/bin/activate

while ((1));do
	for seed in `seq 0 59`;do
		log_tag=`date +"%Y%m%d-%H-%M-%S"`
		# ./send_monitor.py ${seed} >> log/${log_tag}.log 2>>log/${log_tag}.err &
        echo 111 &
		#sleep 300
		sleep 60
	done
done
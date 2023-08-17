# Store workspace public IP to config file
IP_VAR="$(curl http://checkip.amazonaws.com/)"
CONFIG='{"localhost": "'"$IP_VAR"'"}'
echo $CONFIG > src/ipConfig.json
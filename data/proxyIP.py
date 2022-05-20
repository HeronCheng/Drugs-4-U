import requests
import re
 
 
response = requests.get("https://www.sslproxies.org/")
 
proxy_ips = re.findall('\d+\.\d+\.\d+\.\d+:\d+', response.text)  #「\d+」代表數字一個位數以上

valid_ips = []
for ip in proxy_ips:
    try:
        result = requests.get('https://ip.seeip.org/jsonip?',
			       proxies={'http': ip, 'https': ip},
			       timeout=5)
        print(result.json())
        valid_ips.append(ip)
    except:
        print(f"{ip} invalid")

with open('proxy_list.txt', 'w') as file:
    for ip in valid_ips:
        file.write(ip + '\n')
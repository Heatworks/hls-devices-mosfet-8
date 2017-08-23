# HLS Devices - Mosfet8
Code and setup instructions for the HSL Mosfet8 Board.

## Base Image
The following are the instructions for creating the base image for the Mosfet8 board, using a copy of this image will contain all the following edits. Begin with the default raspbian lite image.

- Ethernet: Add `dtoverlay=enc28j60,int_pin=25,speed=12000000` to `/boot/config.txt` as per [this](http://raspi.tv/2015/ethernet-on-pi-zero-how-to-put-an-ethernet-port-on-your-pi) tutorial. 
- Set Hostname to `hls-device-mosfet-8-unknown`.
- Enable `serial` (USART) hardware.

General updates, node, and npm.

```
sudo apt-get update
sudo apt-get install node npm git

sudo n 6.* 
sudo npm cache clean -f
sudo npm install -g n
sudo npm install -g node-red
```

### Node-Red

Begin by running node red, this generates the flow files. Copy the new flows from this file.

### Add this Repo

Clone this repo and setup environment variables in `/home/pi/profile`.

```
export NODE_RED_CRED_FILE=/home/pi/.node-red/flows_default_cred.json
export NODE_RED_FLOW_FILE=/home/pi/.node-red/flows_default.json
export NODE_RED_SETTINGS_FILE=/home/pi/.node-red/settings.js
```

### CronTab

Open crontab `crontab -e` and add this line `@reboot bash /home/pi/hls-devices-mosfet-8/startup.sh > /home/pi/startup.log 2>&1`.

### Create Log File

```
sudo touch node-red.log
sudo chown pi:pi /var/log/node-red.log 
```

## Setup

1. Connect via UART with username `pi` and password `hls-default`.
2. Change default password from `hls-default` to whatever you want. This can be done using `sudo raspi-config` and pressing enter.
3. Change host name from `hls-device-mosfet-8-unknown` to whatever you want. This can be done by running `sudo su && echo "hls-device-mosfet-8-c" > /etc/h 
ostname` echoing your desired hostname.
4. Reboot to see changes. (`reboot`)
5. Get latest setup script `cd /home/pi/hls-devices-mosfet-8/ && git pull`.
6. Run setup script `cd /home/pi/hls-devices-mosfet-8/ && bash setup.sh` and answer prompts.
7. Reboot to see changes. (`reboot`)

## Future

- Don't use default password. Consider using raspberry pi's default which leaves a reminder to change it each time one signs in.
- Include password and host name changes in the prompt setup script.
- Run setup through UART.
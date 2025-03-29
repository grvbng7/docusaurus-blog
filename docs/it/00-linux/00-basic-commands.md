---
sidebar_label : Linux Basic Commands 
---
# Important Commands and Command Combinations and Files in linux
_Best book to learn about basics of linux commands is :_
***THE LINUX COMMAND LINE (TLCL)***
## Some Important command combinations and concepts
1. list of directory  contents with their size and sort them in descending order
	```Bash
	du -sh ./* | sort -hr
	```
	for `du` command `-s`  is an very important flag  

2. **Make your pendrive bootable**   
Insert your USB drive and identify its device name. You can find it by running:

	```Bash
	lsblk
	```
	Unmount the USB drive if it's automatically mounted:  

	```Bash
	sudo umount /dev/sdX1  # Replace X with your USB drive letter
	# In my case  it was 'a'
	sudo umount /dev/sda1
	```
	use `dd` to copy the ISO image to the USB drive. Replace `/path/to/your.iso` with the path to your ISO file and `/dev/sdX` with the device name of your USB drive	
	```Bash
	sudo dd if=/path/to/your.iso of=/dev/sdX bs=4M status=progress
	```  

3. _Important Note_ : with flatpak no need to use sudo while working with flatpak unless you want to install app system-wide for all users  

4. ***NetworkManager Commands***
	```Bash
	nmcli radio wifi [ on | off ]
	nmcli device wifi list
	nmcli connection show
	```
	
5. why do we use `make` utility instead of  we can simply use bash installation script 
	1. **Automatic Dependency Management** : One of the main advantages of using `make` is **automatic dependency tracking**. `make` automatically rebuilds targets only when their dependencies have changed. For example, if you only modify a single `.c` file, `make` will only recompile that file and its dependencies, instead of recompiling everything. This can save a significant amount of time, especially in large projects.

	1. **Parallelization of Tasks** : `make` can automatically parallelize tasks, making use of multiple CPU cores. For example, `make -j` allows `make` to run multiple compilation steps concurrently, speeding up the build process, especially for large projects with many independent tasks.

## Important Commands  

### basic day to day commands 
* ls ( l t r a) 
* mv 
* cd 
* mkdir ( -p )
* rmdir 
* rm (  r f )
* cp
* touch 
* cat 
* vim 
* vimtutor
* nano
* cut
* tr
* grep
* find
* locate 
* updatedb
* awk
* sed
* ln ( -s ) 
* diff 
* vimdiff
* git
* sudo 
* su
* df -h  
* du -h
* free -h
* date
* exit 
* init 0 
* reboot 
* ps (-aux) (-fe)
* sort 
* unique
* head
* tail
* tailf or tailf
* passwd

### Admin commands 
* adduser
* groupadd
* groups
* cat /etc/os-release
* cat /etc/passwd
* cat /etc/group
* systemctl
* crontab
* ssh-keygen
* lsblk
* dd ( i used this to make my pendrive bootable ) 
* ssh-keygen
* make
* xmkmf

### Networking commands 
* ssh
* scp
* telnet
* nc -l -p \<port number>  _(nc stands for netcat )_
* ping
* nmap
* netstat ( -anlp )
* ifconfig
* python3 -m http.server  ( to create temporary server  in current directory ) 
* ufw → ( uncomplecated firewall ) 
* nmcli

### Bash specific 

* `echo {A..Z}` :  this will pring all letters from A to Z : this is known as `expantion`. There are also other expantions available in bash.
* ! \<history_command_number> : to execute command in history

## Important Files
* /etc/hosts
* /etc/services
* /etc/passwd
* /etc/.hushlogin
* /etc/vim/vimrc
* ~/.bashrc or /etc/bash_bashrc
* /etc/motd ( motd stands for message of the day ) 

# NTFS drive access issue from ubuntu

if you are not allowed to read or write in ntfs file system (i.e. in ntfs drive alloted for data storage which you access from both ubuntu as well as from windows in dual boot laptop ) while using ubuntu : 
give following commands : 
```
sudo apt-get purge ntfsprogs 
sudo apt-get purge ntfs-3g
sudo apt-get install ntfs-3g
```
Now , FIRST UNMOUNT THE DRIVE YOU WANT TO REPAIR
NOW REPAIR THE DRIVE USING FOLLOWING COMMANDS : 
***CAUTION***
THIS MAY REMOVE/DELETE YOUR PRECIOUS DATA, WHILE PERFORMING REPAIR OPERATION
SO PLEASE BACKUP YOUR IMPORTANT DATA BEFORE RUNNING THIS COMMAND
instead of **/dev/nvme0n1p4**  in below command you can put your drive name there. If you do not know the drive name you can use lsblk command to find it or you can simply use  `files` app > other locations on ubuntu to get the drive name
```
sudo ntfsfix /dev/nvme0n1p4 
```
#### if things mentioned above did not work :
1. boot into windows.
1. run command prompt as administrator.
1. run the command : 
```
chkdsk D: /f /r 
```
where  'D:' is your drive letter you want to fix.



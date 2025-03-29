# Linux System Cleaning

## 1. some of important commands : 
```
sudo apt autoclean
sudo apt autoremove
sudo apt autopurge
```
## 2. IMPORTANT
even after running above commands
execute the command
```
 sudo apt-get clean
```
## 3. Remove cache
```
rm -r ~/.cache/*
```
## 4. empty syslog file which may some times have size in GBs
```
sudo su
cat /dev/null > /var/log/syslog
```
(Remember : /var/log directory in linux stores the logs )
some newer os versions of linux stores logs in the form of journal ( ***/var/log/journal***) rather than traditional text based log files. To clear such journals you can use below commands : 
```
journalctl --vacuum-time=2d #Retain only the past two days:
journalctl --vacuum-size=50M #Retain only the past 50MB
```
---
 
vacuuming only removes archived journal files, not active ones. To get  rid of everything, you need to rotate the files first so that recent entries are moved to inactive files.
```
sudo journalctl --rotate
sudo journalctl --vacuum-time=1s
```
**CAUTION**
_DO NOT DELETE ANY DIRECTORIES OR FILES IN /VAR/ OR ANY OTHER FOLDER IF YOU DO NOT KNOW WHAT THEY DO AND IF IT IS SAFE TO DELETE THEM._

## 5. snap retains older versions of installed snaps.
this number can be 2 to 20. By default it is 3. by executing following command you can limit this upto 2.**
```
sudo snap set system refresh.retain=2
```
## 6. use 'remove-snaps.sh' file in this notes to remove older versions of snap
CAUTION : DONT FORGET TO CLOSE ALL SNAP APPS BEFORE DOING THIS.
run this script in sudo mode
you can check its content using vim or any other text editor
[remove-snaps.sh](https://beta.appflowy.cloud/api/file_storage/5149f5ba-5e9f-4617-b918-c0986cdea84a/v1/blob/78b0954e%2D4a43%2D4b3a%2Da95e%2D9a1678a8ffdd/4Qw160e4-NLYraXUF1-Bh1D9nHDhTo69czQRk2ZZuQA=.sh)
if you dont want to run this shell script use following method to remove older snap revisions manually :
CAUTION : DONT FORGET TO REMOVE ONLY DISABLED REVISIONS OF SNAP
```
snap list --all | grep disabled
#eg : snap remove firefox --revision=2
# where 2 is the disabled revision of firefox
# revision details can be found when you run snap list --all command
```
**CAUTION : core core18 core20 etc are different things and not the revision of same snaps.. so do not remove them.**


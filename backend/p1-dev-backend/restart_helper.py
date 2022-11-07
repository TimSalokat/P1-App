import os 
from time import sleep

def restart():
    os.system("git stash")
    os.system("git pull")
    # sleep(5)
    # os.system("python3 main.py")

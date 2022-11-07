import os 

def restart():
    os.system("git stash")
    os.system("git pull")
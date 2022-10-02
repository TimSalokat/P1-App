
with open("version.txt", "r") as file:
    current_version = int(file.read())
    file.close()

with open("version.txt", "w") as file:
    file.write(str(current_version + 1))
    file.close()
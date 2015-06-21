# Geogit

Add geolocation messages to your commits because it's fun to see where code comes from

## Here's what it looks like

![example](https://dl.dropboxusercontent.com/u/9224326/geogit/example.png)

## Get it

Geogit is a git hook that goes into your **.git/hooks/commit-msg** file for a specific project. To install

```
touch /myproject/.git/hooks/pre-commit
chmod +x /myproject/.git/hooks/pre-commit 
``` 

Then put the following content into **/myproject/.git/hooks/pre-commit**

```
#!/bin/sh

GEOGIT_MSG=$(curl -s geo-git.herokuapp.com/locate/geogit)

grep -qs "^$GEOGIT_MSG" "$1" || echo "-----------------\n$GEOGIT_MSG" >> "$1"
```

Done!
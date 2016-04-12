# dsServer - PreAlpha!
DIREKTSPEED Server a drop in replacment for: Apache, pm2, Nginx, Hipache, Any Discovery Backend, Mail, Proxy, Loadbalancers many more.

# Init with template
git config --global init.templatedir '~/.git-templates'
config git config init.templatedir '$PWD/.git-template'
git init

# Update Apps via docker 

cd /app && git pull && npm install 
# dsServer Roadmap:

- v 1.0.x Serie HTTP NODEJS App Server for Single and Multi vhost multi apps.
- v 1.1.x Serie HTTP Loadbalancing Support
- v 1.2.x Serie HTTP Loadbalancing with Cache Support.
- v 1.3.x Serie HTTPS Support
- v 1.4.x Serie Automated Clustering Support
- v 1.5.x Serie Monitoring/Stats Online Changes via backends.
- v 1.6.x Serie Remote Logging and Log Analyze
- v x.x.x Series Mail (SMTP), FTP, SSH, Firewall Managment, CD, CI, WebHosting Pannel, Costumer Managment. (DROP in REPLACMENT for Confixx/Plesk/Parralles hosts

foot notes current state:
Code multi instance able loadbalanced docker ssh server that allows to connecto to docker containers directly over ssh
Code ssh server multi key / pass try support.
Unify User Managment via Objects
Unify Vhosts via Objects
Unify db calls via objects
2 Types of Apps (http server apps) need require req res config 
Routing functions can be instanced before


# WebHosting Features:
## Auto Loadbalanced Docker Hosting via Swarm and ssh access directly to the containers
Is able to start a docker container if it reaches a mark of usage it starts additional docker containers with same specification and loadbalances between them
Own Network for containers or Container groups.
Firewall for Docker Containers
can assign docker packages totall ram disk cpu usage of the cluster (auto replacing failed nodes.)
DNS Service for own docker containers.

You can code your software stack and dsServer keeps it running on your cluster or cloud service.

## HTTP & FTP & SSH/SFTP Features:

- FTP (&Proxy) Service can be configured by users and groups to access local and remote locations (None SSH users flexibel db backend)(Proxying). has auto loadbalancing and failover features as also monitoring
- SSH (&Proxy) Service can be configured by users and groups to access remote locations as also local location (SSH Shells, Docker (nsenter) shells) has auto loadbalancing and failover features as also monitoring
- HTTP (&Proxy) Service can be configured in any think able way has auto loadbalancing and failover features as also monitoring
- MAIL Services can be configured in any think able way has auto loadbalancing and failover features as also monitoring is able to be used as backend for large mass mail sending via large clusters.
- Local and Remote Firewall mangment via ssh.
- DHCP Server
- DNS Server
- All Servers can use Flexible Distributed Cache backends Factory Default for big Production Setups is Couchbase Enterprise.


## Web & Cli Interface 
- Create Costumer
- Create recuring payment
- Create One Time Payment
- CRM
- ERP
- DOMAIN Registration
- Configure Limits per user and package
- All users get Runned in Own Isolated ENVIRONMENT and can run via Docker what ever they need
- You can Predefine Templates to use for example a PHP+NGINX Container for your Costumers with option to offer FTP+SSH access Directly To The Container as it Would be a VM.
- can use and bundle ips via internal Loadbalancing

Usage Example:


Provider Offers WebHosting Packages:
Costumer Orders Web packeges and gets Login Credentials for his domain and services(FTP, SSH , MAIL, SPAM, DOCKER, uvm)
The Manager will assign a new ip to the costumer or will use existing one and use user credentials to route him to the right services
all would be Running on Stratos Internal Infrastructure(Servers) the only software on the servers would be dsServer it would supply all Services.
In a Easy Manage able Fashion.

dsServer <--> dsServer <--> dsServer
1.1.1.x       2.2.2.x       3.3.3.x

you can now assign any ip of any of your servers to the costumer and the Server does the Routing as it is also a full blown Network Server.
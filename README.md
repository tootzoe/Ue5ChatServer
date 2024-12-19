# Ue5ChatServer
Ue5 demo send Chat message to each other via this websocket Server....

##### for Apache internet server

webroot folder :  public_html

Node.js base path:  Ue5Game 

both http and websocket are tcp protocal , so websocket tcp connection can be embedded inside http connection....

my node.js base URL:  https://tootzoe.com/Ue5Game/

so Don't create folder named Ue5Game inside public_html....
the request send to https://tootzoe.com/Ue5Game/ will be forward to node.js service.

based Ue5Game url node, we can create as many services as we want, such as :
https://tootzoe.com/Ue5Game/chat
https://tootzoe.com/Ue5Game/aduioservice
https://tootzoe.com/Ue5Game/imgaestorage
....


on Apache web server, setup Rewrite rule for forwarding http request to node.js....check the sample htaccess file.

after correctly setup .htaccess file and make sure the node.js app is working properly , 

we can check node.js app by open https://tootzoe.com/Ue5Game/{your service}  on browser, 

if it shows "ERR_HTTP2_PROTOCOL_ERROR" , that's correct, because we need to connect it with ws,wss protocal....

i have test this server with my UE demo : https://github.com/tootzoe/SocketIOgame

everything runs well....










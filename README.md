# Ue5ChatServer
Ue5 demo send Chat message to each other via this websocket Server....

##### for Apache internet server

webroot folder :  public_html

Node.js base path:  Ue5Game 

both http and websocket are tcp protocal , so websocket tcp connection can be embedded inside http connection....
once websocket connection estanbilshed, it maintains its connection itself(by ping/pong)


my node.js base URL:  https://tootzoe.com/Ue5Game/

so Don't create folder named Ue5Game inside public_html....
if some web host require folder named Ue5Game when you configure the node.js service, be sure rename folder named Ue5Game to Ue5Game2,
when you want to configure it again, rename it back to Ue5Game, otherwise .htaccess forward function dosen't work!!!!
the request send to https://tootzoe.com/Ue5Game/ will be forward to node.js service.

it seems some apache web server require our node.js app to be the form of module,
add ["type": "module"] into pacakge.json, and use .mjs as node script source file extension.
then the system deamon can import our node.js app as a module and runs this app as service.


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










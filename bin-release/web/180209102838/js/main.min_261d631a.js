var __reflect=this&&this.__reflect||function(e,t,r){e.__class__=t,r?r.push(t):r=[t],e.__types__=e.__types__?r.concat(e.__types__):r},__extends=this&&this.__extends||function(e,t){function r(){this.constructor=e}for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n]);r.prototype=t.prototype,e.prototype=new r},__awaiter=this&&this.__awaiter||function(e,t,r,n){return new(r||(r=Promise))(function(i,o){function s(e){try{c(n.next(e))}catch(t){o(t)}}function a(e){try{c(n["throw"](e))}catch(t){o(t)}}function c(e){e.done?i(e.value):new r(function(t){t(e.value)}).then(s,a)}c((n=n.apply(e,t||[])).next())})},__generator=this&&this.__generator||function(e,t){function r(e){return function(t){return n([e,t])}}function n(r){if(i)throw new TypeError("Generator is already executing.");for(;c;)try{if(i=1,o&&(s=o[2&r[0]?"return":r[0]?"throw":"next"])&&!(s=s.call(o,r[1])).done)return s;switch(o=0,s&&(r=[0,s.value]),r[0]){case 0:case 1:s=r;break;case 4:return c.label++,{value:r[1],done:!1};case 5:c.label++,o=r[1],r=[0];continue;case 7:r=c.ops.pop(),c.trys.pop();continue;default:if(s=c.trys,!(s=s.length>0&&s[s.length-1])&&(6===r[0]||2===r[0])){c=0;continue}if(3===r[0]&&(!s||r[1]>s[0]&&r[1]<s[3])){c.label=r[1];break}if(6===r[0]&&c.label<s[1]){c.label=s[1],s=r;break}if(s&&c.label<s[2]){c.label=s[2],c.ops.push(r);break}s[2]&&c.ops.pop(),c.trys.pop();continue}r=t.call(e,c)}catch(n){r=[6,n],o=0}finally{i=s=0}if(5&r[0])throw r[1];return{value:r[0]?r[1]:void 0,done:!0}}var i,o,s,a,c={label:0,sent:function(){if(1&s[0])throw s[1];return s[1]},trys:[],ops:[]};return a={next:r(0),"throw":r(1),"return":r(2)},"function"==typeof Symbol&&(a[Symbol.iterator]=function(){return this}),a},AssetAdapter=function(){function e(){}return e.prototype.getAsset=function(e,t,r){function n(n){t.call(r,n,e)}if(RES.hasRes(e)){var i=RES.getRes(e);i?n(i):RES.getResAsync(e,n,this)}else RES.getResByUrl(e,n,this,RES.ResourceItem.TYPE_IMAGE)},e}();__reflect(AssetAdapter.prototype,"AssetAdapter",["eui.IAssetAdapter"]);var LoadingUI=function(e){function t(){var t=e.call(this)||this;return t.createView(),t}return __extends(t,e),t.prototype.createView=function(){this.textField=new egret.TextField,this.addChild(this.textField),this.textField.y=300,this.textField.width=480,this.textField.height=100,this.textField.textAlign="center"},t.prototype.onProgress=function(e,t){this.textField.text="Loading..."+e+"/"+t},t}(egret.Sprite);__reflect(LoadingUI.prototype,"LoadingUI",["RES.PromiseTaskReporter"]);var Main=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return __extends(t,e),t.prototype.createChildren=function(){e.prototype.createChildren.call(this),egret.lifecycle.addLifecycleListener(function(e){}),egret.lifecycle.onPause=function(){egret.ticker.pause()},egret.lifecycle.onResume=function(){egret.ticker.resume()};var t=new AssetAdapter;egret.registerImplementation("eui.IAssetAdapter",t),egret.registerImplementation("eui.IThemeAdapter",new ThemeAdapter),this.runGame()["catch"](function(e){console.log(e)})},t.prototype.runGame=function(){return __awaiter(this,void 0,void 0,function(){var e,t;return __generator(this,function(r){switch(r.label){case 0:return[4,this.loadResource()];case 1:return r.sent(),this.createGameScene(),[4,RES.getResAsync("description_json")];case 2:return e=r.sent(),[4,platform.login()];case 3:return r.sent(),[4,platform.getUserInfo()];case 4:return t=r.sent(),console.log(t),[2]}})})},t.prototype.loadResource=function(){return __awaiter(this,void 0,void 0,function(){var e,t;return __generator(this,function(r){switch(r.label){case 0:return r.trys.push([0,4,,5]),e=new LoadingUI,this.stage.addChild(e),[4,RES.loadConfig("resource/default.res.json","resource/")];case 1:return r.sent(),[4,this.loadTheme()];case 2:return r.sent(),[4,RES.loadGroup("preload",0,e)];case 3:return r.sent(),this.stage.removeChild(e),[3,5];case 4:return t=r.sent(),console.error(t),[3,5];case 5:return[2]}})})},t.prototype.loadTheme=function(){var e=this;return new Promise(function(t,r){var n=new eui.Theme("resource/default.thm.json",e.stage);n.addEventListener(eui.UIEvent.COMPLETE,function(){t()},e)})},t.prototype.createGameScene=function(){this.addChild(SceneManger.getInstance())},t.prototype.createBitmapByName=function(e){var t=new egret.Bitmap,r=RES.getRes(e);return t.texture=r,t},t.prototype.startAnimation=function(e){var t=this,r=new egret.HtmlTextParser,n=e.map(function(e){return r.parse(e)}),i=this.textfield,o=-1,s=function(){o++,o>=n.length&&(o=0);var e=n[o];i.textFlow=e;var r=egret.Tween.get(i);r.to({alpha:1},200),r.wait(2e3),r.to({alpha:0},200),r.call(s,t)};s()},t.prototype.onButtonClick=function(e){var t=new eui.Panel;t.title="Title",t.horizontalCenter=0,t.verticalCenter=0,this.addChild(t)},t}(eui.UILayer);__reflect(Main.prototype,"Main");var DebugPlatform=function(){function e(){}return e.prototype.getUserInfo=function(){return __awaiter(this,void 0,void 0,function(){return __generator(this,function(e){return[2,{nickName:"username"}]})})},e.prototype.login=function(){return __awaiter(this,void 0,void 0,function(){return __generator(this,function(e){return[2]})})},e}();__reflect(DebugPlatform.prototype,"DebugPlatform",["Platform"]),window.platform||(window.platform=new DebugPlatform);var ThemeAdapter=function(){function e(){}return e.prototype.getTheme=function(e,t,r,n){function i(e){t.call(n,e)}function o(t){t.resItem.url==e&&(RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR,o,null),r.call(n))}"undefined"!=typeof generateEUI?egret.callLater(function(){t.call(n,generateEUI)},this):(RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR,o,null),RES.getResByUrl(e,i,this,RES.ResourceItem.TYPE_TEXT))},e}();__reflect(ThemeAdapter.prototype,"ThemeAdapter",["eui.IThemeAdapter"]);var GameScene=function(e){function t(){var t=e.call(this)||this;return t.maxScale=1,t.minScale=1,t.minDistance=240,t.maxDistance=400,t.anchorOffset=100,t.score=0,t.centerCount=0,t.arrayRatio=.556047197640118,t.cosRatio=.87397586206141,t.initSpeed=150,t.speed=0,t.power=600,t.jumpDistance=0,t.direction=1,t.leftOrigin={x:180,y:350},t.rightOrigin={x:580,y:350},t.blockSourceNames=[],t.blockArr=[],t.reBackBlockArr=[],t.isReadyJump=!1,t}return __extends(t,e),t.prototype.partAdded=function(t,r){e.prototype.partAdded.call(this,t,r)},t.prototype.childrenCreated=function(){e.prototype.childrenCreated.call(this),this.init(),this.reset()},t.prototype.init=function(){this.blockSourceNames=["block1_png","block2_png","block3_png"],this.pushVoice=RES.getRes("push_mp3"),this.jumpVoice=RES.getRes("jump_mp3"),this.blockPanel.touchEnabled=!0,this.blockPanel.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onKeyDown,this),this.blockPanel.addEventListener(egret.TouchEvent.TOUCH_END,this.onKeyUp,this),this.restart.addEventListener(egret.TouchEvent.TOUCH_TAP,this.restartHandler,this),this.player.anchorOffsetX=this.player.width/2,this.player.anchorOffsetY=this.player.height-20,egret.Ticker.getInstance().register(function(e){e/=1e3,this.isReadyJump&&(this.jumpDistance+=300*e)},this)},t.prototype.reset=function(){this.blockPanel.removeChildren(),this.blockArr=[];var e=this.createBlock();e.touchEnabled=!1,e.x=200,e.y=this.height/2+e.height,this.currentBlock=e,this.player.y=this.currentBlock.y,this.player.x=this.currentBlock.x,this.blockPanel.addChild(this.player),this.direction=1,this.blockPanel.addChild(this.scoreLabel),this.addBlock()},t.prototype.addBlock=function(){var e=this.createBlock(),t=this.minDistance+Math.random()*(this.maxDistance-this.minDistance);this.direction>0?(e.x=this.currentBlock.x+t,e.y=this.currentBlock.y-t*this.arrayRatio):(e.x=this.currentBlock.x-t,e.y=this.currentBlock.y-t*this.arrayRatio),this.lastBlock=this.currentBlock,this.currentBlock=e},t.prototype.onKeyDown=function(){this.pushSoundChannel=this.pushVoice.play(0,1),egret.Tween.get(this.player).to({scaleY:.5},3e3),this.isReadyJump=!0},t.prototype.onKeyUp=function(){var e=this;this.isReadyJump&&(this.targetPos||(this.targetPos=new egret.Point),this.blockPanel.touchEnabled=!1,this.pushSoundChannel.stop(),this.jumpVoice.play(0,1),egret.Tween.removeAllTweens(),this.blockPanel.addChild(this.player),this.isReadyJump=!1,this.targetPos.x=this.player.x+this.jumpDistance*this.direction,this.targetPos.y=this.player.y+this.jumpDistance*(this.currentBlock.y-this.player.y)/(this.currentBlock.x-this.player.x)*this.direction,egret.Tween.get(this).to({factor:1},500).call(function(){e.player.scaleY=1,e.speed=0,e.jumpDistance=0,e.judgeResult()}))},t.prototype.judgeResult=function(){var e=this;if(Math.pow(this.lastBlock.x-this.player.x,2)+Math.pow(this.lastBlock.y-this.player.y,2)>=5184)if(Math.pow(this.currentBlock.x-this.player.x,2)+Math.pow(this.currentBlock.y-this.player.y,2)<=5184){Math.pow(this.currentBlock.x-this.player.x,2)+Math.pow(this.currentBlock.y-this.player.y,2)<=100?(this.centerCount++,this.score+=2*this.centerCount):(this.centerCount=0,this.score++),this.scoreLabel.text=this.score.toString(),this.direction=Math.random()>.5?1:-1;var t,r;t=this.direction>0?this.leftOrigin.x:this.width-135,r=this.height/2+this.currentBlock.height;var n,i;n=this.player.x-(this.currentBlock.x-t),i=this.player.y-(this.currentBlock.y-r),egret.Tween.get(this.currentBlock).to({x:t,y:r},1e3),this.update(this.currentBlock.x-t,this.currentBlock.y-r),egret.Tween.get(this.player).to({x:n,y:i},1e3).call(function(){e.addBlock(),e.blockPanel.touchEnabled=!0}),console.log(this.currentBlock.x)}else console.log("游戏失败!"),this.overPanel.visible=!0,this.overScoreLabel.text=this.score.toString();else this.blockPanel.touchEnabled=!0},Object.defineProperty(t.prototype,"factor",{get:function(){return 0},set:function(e){this.player.x=(1-e)*(1-e)*this.player.x+2*e*(1-e)*(this.player.x+this.targetPos.x)/2+e*e*this.targetPos.x,this.player.y=(1-e)*(1-e)*this.player.y+2*e*(1-e)*(this.targetPos.y-300)+e*e*this.targetPos.y},enumerable:!0,configurable:!0}),t.prototype.createBlock=function(){var e=null;e=this.reBackBlockArr.length?this.reBackBlockArr.splice(0,1)[0]:new eui.Image;var t=Math.floor(Math.random()*this.blockSourceNames.length);e.source=this.blockSourceNames[t],this.blockPanel.addChild(e);var r=this.minScale;return e.scaleX=e.scaleY=r,e.anchorOffsetX=222,e.anchorOffsetY=78,this.blockArr.push(e),e},t.prototype.update=function(e,t){for(var r=0;r<this.blockArr.length;r++){var n=this.blockArr[r];if(n.x+135<=0&&n.y-78>=this.height)this.blockPanel.removeChild(n),this.blockArr.splice(r,1),this.reBackBlockArr.push(n);else{if(n==this.currentBlock)continue;egret.Tween.get(n).to({x:n.x-e,y:n.y-t},1e3)}}},t.prototype.restartHandler=function(){this.overPanel.visible=!1,this.score=0,this.scoreLabel.text=this.score.toString(),this.reset(),this.blockPanel.touchEnabled=!0},t}(eui.Component);__reflect(GameScene.prototype,"GameScene",["eui.UIComponent","egret.DisplayObject"]);var MenuScene=function(e){function t(){return e.call(this)||this}return __extends(t,e),t.prototype.partAdded=function(t,r){e.prototype.partAdded.call(this,t,r)},t.prototype.childrenCreated=function(){e.prototype.childrenCreated.call(this),this.init()},t.prototype.init=function(){this.startBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.tapHandler,this)},t.prototype.tapHandler=function(){SceneManger.getInstance().changeScene("gameScene")},t}(eui.Component);__reflect(MenuScene.prototype,"MenuScene",["eui.UIComponent","egret.DisplayObject"]);var SceneManger=function(e){function t(){var t=e.call(this)||this;return t.init(),t}return __extends(t,e),t.prototype.init=function(){this.menuScene=new MenuScene,this.gameScene=new GameScene,this.addChild(this.menuScene)},t.getInstance=function(){return t.instance||(t.instance=new t),t.instance},t.prototype.changeScene=function(e){this.removeChildren(),this.addChild(this[e])},t}(egret.Sprite);__reflect(SceneManger.prototype,"SceneManger");var Player=function(){function e(){this.jumpDistance=0,this.power=0,this.initSpeed=0,this.speed=0,this.isReadyJump=!1,this.direction=1,this.readyJumpAudio=null,this.readyJumpAudioId=-1,this.jumpAudio=null,this.jumpAudioId=-1}return e.prototype.readyJump=function(){this.speed=this.initSpeed,this.isReadyJump=!0},e.prototype.jumpTo=function(e,t,r){this.isReadyJump=!1},e}();__reflect(Player.prototype,"Player");
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var GameScene = (function (_super) {
    __extends(GameScene, _super);
    function GameScene() {
        var _this = _super.call(this) || this;
        // 基础数据
        _this.maxScale = 1;
        _this.minScale = 1;
        _this.minDistance = 240;
        _this.maxDistance = 400;
        _this.anchorOffset = 100;
        // 游戏中得分
        _this.score = 0;
        //连续中央位置次数
        _this.centerCount = 0;
        // tanθ角度值
        _this.arrayRatio = 0.556047197640118;
        // cos角度的值
        _this.cosRatio = 0.87397586206141;
        // 初始速度
        _this.initSpeed = 150;
        // 
        _this.speed = 0;
        // 
        _this.power = 600;
        // 跳的距离
        _this.jumpDistance = 0;
        // 下一个盒子方向(1靠右侧出现/-1靠左侧出现)
        _this.direction = 1;
        // 下一个盒子出现时,小人的落脚点重新规划
        // 左侧跳跃点
        _this.leftOrigin = { "x": 180, "y": 350 };
        // 右侧跳跃点
        _this.rightOrigin = { "x": 580, "y": 350 };
        // 所有方块资源的数组
        _this.blockSourceNames = [];
        // 所有方块的数组
        _this.blockArr = [];
        // 所有回收方块的数组
        _this.reBackBlockArr = [];
        // 判断是否是按下状态
        _this.isReadyJump = false;
        return _this;
    }
    GameScene.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    GameScene.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.init();
        this.reset();
    };
    GameScene.prototype.init = function () {
        this.blockSourceNames = ["block1_png", "block2_png", "block3_png"];
        // 初始化音频
        this.pushVoice = RES.getRes('push_mp3');
        this.jumpVoice = RES.getRes('jump_mp3');
        // 添加触摸事件
        this.blockPanel.touchEnabled = true;
        this.blockPanel.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onKeyDown, this);
        this.blockPanel.addEventListener(egret.TouchEvent.TOUCH_END, this.onKeyUp, this);
        // 绑定结束按钮
        this.restart.addEventListener(egret.TouchEvent.TOUCH_TAP, this.restartHandler, this);
        // 设置玩家的锚点
        // 设置锚点
        this.player.anchorOffsetX = this.player.width / 2;
        this.player.anchorOffsetY = this.player.height - 20;
        // 心跳计时器
        egret.Ticker.getInstance().register(function (dt) {
            dt /= 1000;
            if (this.isReadyJump) {
                this.jumpDistance += 300 * dt;
            }
        }, this);
    };
    // 重置游戏
    GameScene.prototype.reset = function () {
        // 清空舞台
        this.blockPanel.removeChildren();
        this.blockArr = [];
        // 添加一个方块
        var blockNode = this.createBlock();
        blockNode.touchEnabled = false;
        // 设置方块的起始位置
        blockNode.x = 200;
        blockNode.y = this.height / 2 + blockNode.height;
        this.currentBlock = blockNode;
        // 摆正小人的位置
        this.player.y = this.currentBlock.y;
        this.player.x = this.currentBlock.x;
        this.blockPanel.addChild(this.player);
        this.direction = 1;
        // 添加积分
        this.blockPanel.addChild(this.scoreLabel);
        // 添加下一个方块
        this.addBlock();
    };
    // 添加一个方块
    GameScene.prototype.addBlock = function () {
        // 随机一个方块
        var blockNode = this.createBlock();
        // 设置位置
        var distance = this.minDistance + Math.random() * (this.maxDistance - this.minDistance);
        if (this.direction > 0) {
            blockNode.x = this.currentBlock.x + distance;
            blockNode.y = this.currentBlock.y - distance * this.arrayRatio;
        }
        else {
            blockNode.x = this.currentBlock.x - distance;
            blockNode.y = this.currentBlock.y - distance * this.arrayRatio;
        }
        this.lastBlock = this.currentBlock;
        this.currentBlock = blockNode;
    };
    // 按下
    GameScene.prototype.onKeyDown = function () {
        // 播放按下的音频
        this.pushSoundChannel = this.pushVoice.play(0, 1);
        // 变形
        egret.Tween.get(this.player).to({
            scaleY: 0.5
        }, 3000);
        this.isReadyJump = true;
    };
    // 放开
    GameScene.prototype.onKeyUp = function () {
        var _this = this;
        // 判断是否是在按下状态
        if (!this.isReadyJump) {
            return;
        }
        // 声明落点坐标
        if (!this.targetPos) {
            this.targetPos = new egret.Point();
        }
        // 立刻让屏幕不可点,等小人落下后重新可点
        this.blockPanel.touchEnabled = false;
        // 停止播放按压音频,并且播放弹跳音频
        this.pushSoundChannel.stop();
        this.jumpVoice.play(0, 1);
        // 清楚所有动画
        egret.Tween.removeAllTweens();
        this.blockPanel.addChild(this.player);
        // 结束跳跃状态
        this.isReadyJump = false;
        // 落点坐标
        this.targetPos.x = this.player.x + this.jumpDistance * this.direction;
        // 根据落点重新计算斜率,确保小人往目标中心跳跃
        this.targetPos.y = this.player.y + this.jumpDistance * (this.currentBlock.y - this.player.y) / (this.currentBlock.x - this.player.x) * this.direction;
        // 执行跳跃动画
        egret.Tween.get(this).to({ factor: 1 }, 500).call(function () {
            _this.player.scaleY = 1;
            _this.speed = 0;
            _this.jumpDistance = 0;
            // 判断跳跃是否成功
            _this.judgeResult();
        });
        // 执行小人空翻动画
        // this.player.anchorOffsetY = this.player.height / 2;
        // egret.Tween.get(this.player).to({ rotation: this.direction > 0 ? 0 : 0 }, 200).call(() => {
        // 	this.player.rotation = 0
        // }).call(() => {
        // 	this.player.anchorOffsetY = this.player.height - 20;
        // });
    };
    GameScene.prototype.judgeResult = function () {
        var _this = this;
        if (Math.pow(this.lastBlock.x - this.player.x, 2) + Math.pow(this.lastBlock.y - this.player.y, 2) >= 72 * 72) {
            // 根据this.jumpDistance来判断跳跃是否成功
            if (Math.pow(this.currentBlock.x - this.player.x, 2) + Math.pow(this.currentBlock.y - this.player.y, 2) <= 72 * 72) {
                // 更新积分
                if (Math.pow(this.currentBlock.x - this.player.x, 2) + Math.pow(this.currentBlock.y - this.player.y, 2) <= 10 * 10) {
                    this.centerCount++;
                    this.score += 2 * this.centerCount;
                }
                else {
                    this.centerCount = 0;
                    this.score++;
                }
                this.scoreLabel.text = this.score.toString();
                // 随机下一个方块出现的位置
                this.direction = Math.random() > 0.5 ? 1 : -1;
                // 当前方块要移动到相应跳跃点
                var blockX, blockY;
                blockX = this.direction > 0 ? this.leftOrigin.x : this.width - 135;
                blockY = this.height / 2 + this.currentBlock.height;
                // 小人要移动到的点.
                var playerX, PlayerY;
                playerX = this.player.x - (this.currentBlock.x - blockX);
                PlayerY = this.player.y - (this.currentBlock.y - blockY);
                // x/y轴分别移动的距离
                egret.Tween.get(this.currentBlock).to({
                    x: blockX,
                    y: blockY
                }, 1000);
                // 更新页面
                this.update(this.currentBlock.x - blockX, this.currentBlock.y - blockY);
                // 更新小人的位置
                egret.Tween.get(this.player).to({
                    x: playerX,
                    y: PlayerY
                }, 1000).call(function () {
                    // 开始创建下一个方块
                    _this.addBlock();
                    // 让屏幕重新可点;
                    _this.blockPanel.touchEnabled = true;
                });
                // console.log('x' + x);
                console.log(this.currentBlock.x);
            }
            else {
                // 失败,弹出重新开始的panel
                console.log('游戏失败!');
                this.overPanel.visible = true;
                this.overScoreLabel.text = this.score.toString();
            }
        }
        else {
            // 让屏幕重新可点;
            this.blockPanel.touchEnabled = true;
        }
    };
    Object.defineProperty(GameScene.prototype, "factor", {
        //添加factor的set,get方法,注意用public  
        get: function () {
            return 0;
        },
        //计算方法参考 二次贝塞尔公式  
        set: function (value) {
            this.player.x = (1 - value) * (1 - value) * this.player.x + 2 * value * (1 - value) * (this.player.x + this.targetPos.x) / 2 + value * value * (this.targetPos.x);
            this.player.y = (1 - value) * (1 - value) * this.player.y + 2 * value * (1 - value) * (this.targetPos.y - 300) + value * value * (this.targetPos.y);
            // this.player.x = (1 - value) * (1 - value) * this.player.x + 2 * value * (1 - value) * (this.player.x + this.targetPos.x) / 2 + value * value * (this.currentBlock.x);
            // this.player.y = (1 - value) * (1 - value) * this.player.y + 2 * value * (1 - value) * (this.targetPos.y - 300) + value * value * (this.currentBlock.y);
        },
        enumerable: true,
        configurable: true
    });
    // 工厂方法,创建一个方块
    GameScene.prototype.createBlock = function () {
        var blockNode = null;
        if (this.reBackBlockArr.length) {
            // 回收池里面有,则直接取
            blockNode = this.reBackBlockArr.splice(0, 1)[0];
        }
        else {
            // 回收池里面没有,则重新创建
            blockNode = new eui.Image();
        }
        // 使用随机背景图
        var n = Math.floor(Math.random() * this.blockSourceNames.length);
        blockNode.source = this.blockSourceNames[n];
        this.blockPanel.addChild(blockNode);
        // 设置缩放
        var scale = this.minScale;
        blockNode.scaleX = blockNode.scaleY = scale;
        // 设置方块的锚点
        blockNode.anchorOffsetX = 222;
        blockNode.anchorOffsetY = 78;
        // 把新创建的block添加进入blockArr里
        this.blockArr.push(blockNode);
        return blockNode;
    };
    // 清理方法,用来判断方块是否已经超出屏幕,是的话则进入回收数组
    GameScene.prototype.update = function (x, y) {
        for (var i = 0; i < this.blockArr.length; i++) {
            var blockNode = this.blockArr[i];
            if (blockNode.x + 135 <= 0 && blockNode.y - 78 >= this.height) {
                // 方块超出屏幕,从显示列表中移除
                this.blockPanel.removeChild(blockNode);
                this.blockArr.splice(i, 1);
                // 添加到回收数组中
                this.reBackBlockArr.push(blockNode);
            }
            else {
                // 对不是当前的方块进行移位
                if (blockNode == this.currentBlock) {
                    continue;
                }
                // 没有超出屏幕的话,则移动
                egret.Tween.get(blockNode).to({
                    x: blockNode.x - x,
                    y: blockNode.y - y
                }, 1000);
            }
        }
    };
    // 重新一局
    GameScene.prototype.restartHandler = function () {
        // 隐藏结束场景
        this.overPanel.visible = false;
        // 置空积分
        this.score = 0;
        this.scoreLabel.text = this.score.toString();
        // 开始防止方块
        this.reset();
        // 游戏场景可点
        this.blockPanel.touchEnabled = true;
    };
    return GameScene;
}(eui.Component));
__reflect(GameScene.prototype, "GameScene", ["eui.UIComponent", "egret.DisplayObject"]);
var utils = require('./utils');
var vue = require('vue');
require('../css/index.css');
utils.jssdk();
var voice = new vue({
    el: '#voice',
    data: {
        time: 60,
        record: false,
        localId: '',
        serverId: ''
    },
    methods: {
        //开始录音
        startRecord: function(ev) {
            var that = this;
            ev.preventDefault();
            if (!that.record) {
                setInterval(function() {
                    that.time--
                }, 1000);
                wx.startRecord();
                that.record = true;
                //监听录音自动停止接口
                wx.onVoiceRecordEnd({
                    // 录音时间超过一分钟没有停止的时候会执行 complete 回调
                    complete: function(res) {
                        that.localId = res.localId;
                    }
                });
            } else {
                this.stopRecord();

            }

        },
        //停止录音
        stopRecord: function() {
            var that = this;
            wx.stopRecord({
                success: function(res) {
                    that.localId = res.localId;
                    that.record = false;
                }
            });
        },
        //播放语音
        playVoice: function() {
            var that = this;
            wx.playVoice({
                localId: that.localId // 需要播放的音频的本地ID，由stopRecord接口获得
            });
            // 监听语音播放完毕
            wx.onVoicePlayEnd({
                success: function(res) {
                    that.localId = res.localId; // 返回音频的本地ID
                }
            });
        },
        //暂停播放
        pauseVoice: function() {
            var that = this;
            wx.pauseVoice({
                localId: that.localId // 需要暂停的音频的本地ID，由stopRecord接口获得
            });
        },
        //停止播放
        stopVoice: function() {
            var that = this;
            wx.stopVoice({
                localId: that.localId // 需要停止的音频的本地ID，由stopRecord接口获得
            });
        },
        //上传语音
        uploadVoice: function() {
            wx.uploadVoice({
                localId: localId, // 需要上传的音频的本地ID，由stopRecord接口获得
                isShowProgressTips: 1, // 默认为1，显示进度提示
                success: function(res) {
                    serverId = res.serverId; // 返回音频的服务器端ID
                }
            });
        },
        //下载语音

    }
});

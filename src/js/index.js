var utils = require('./utils');
var vue = require('vue');
utils.jssdk();
var voice = new vue({
    el: '#voice',
    data: {},
    methods: {
        //开始录音
        startRecord: function() {
            wx.startRecord();
            //监听录音自动停止接口
            wx.onVoiceRecordEnd({
                // 录音时间超过一分钟没有停止的时候会执行 complete 回调
                complete: function(res) {
                    var localId = res.localId;
                }
            });
        },
        //停止录音
        stopRecord: function() {
            wx.stopRecord({
                success: function(res) {
                    var localId = res.localId;
                }
            });
        },
        //播放语音
        playVoice: function() {
            wx.playVoice({
                localId: '' // 需要播放的音频的本地ID，由stopRecord接口获得
            });
            // 监听语音播放完毕
            wx.onVoicePlayEnd({
                success: function(res) {
                    var localId = res.localId; // 返回音频的本地ID
                }
            });
        },
        //暂停播放
        pauseVoice: function() {
            wx.pauseVoice({
                localId: '' // 需要暂停的音频的本地ID，由stopRecord接口获得
            });
        },
        //停止播放
        stopVoice: function() {
            wx.stopVoice({
                localId: '' // 需要停止的音频的本地ID，由stopRecord接口获得
            });
        },
        //上传语音
        uploadVoice: function() {
            wx.uploadVoice({
                localId: '', // 需要上传的音频的本地ID，由stopRecord接口获得
                isShowProgressTips: 1, // 默认为1，显示进度提示
                success: function(res) {
                    var serverId = res.serverId; // 返回音频的服务器端ID
                }
            });
        },
        //下载语音

    }
});

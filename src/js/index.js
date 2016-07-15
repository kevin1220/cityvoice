var utils = require('./utils');
var async = require('async');
var vue = require('vue');
var user = JSON.parse(localStorage.getItem('user'));
var $ = null;
require('../css/index.css');
require.ensure(['jquery'], function() {
    $ = require('jquery');
    utils.jssdk($);
}, 'jquery');

var voice = new vue({
    el: '#voice',
    data: {
        user: user
    },
    methods: {
        //开始录音
        startRecord: function(ev) {
            ev.preventDefault();
            if (!user.record) {
                setInterval(function() {
                    user.time--
                }, 1000);
                wx.startRecord();
                user.record = true;
                //监听录音自动停止接口
                wx.onVoiceRecordEnd({
                    // 录音时间超过一分钟没有停止的时候会执行 complete 回调
                    complete: function(res) {
                        user.localId = res.localId;
                    }
                });
            } else {
                this.stopRecord();
            }

        },
        //停止录音
        stopRecord: function() {
            wx.stopRecord({
                success: function(res) {
                    user.localId = res.localId;
                    user.record = false;
                }
            });
        },
        //播放语音
        playVoice: function() {
            wx.playVoice({
                localId: user.localId // 需要播放的音频的本地ID，由stopRecord接口获得
            });
            // 监听语音播放完毕
            wx.onVoicePlayEnd({
                success: function(res) {
                    user.localId = res.localId; // 返回音频的本地ID
                }
            });
        },
        //暂停播放
        pauseVoice: function() {
            wx.pauseVoice({
                localId: user.localId // 需要暂停的音频的本地ID，由stopRecord接口获得
            });
        },
        //停止播放
        stopVoice: function() {
            wx.stopVoice({
                localId: user.localId // 需要停止的音频的本地ID，由stopRecord接口获得
            });
        },
        //上传语音
        uploadVoice: function() {
            async.waterfall([
                function(cb) {
                    wx.uploadVoice({
                        localId: user.localId, // 需要上传的音频的本地ID，由stopRecord接口获得
                        isShowProgressTips: 1, // 默认为1，显示进度提示
                        success: function(res) {
                            user.serverId = res.serverId; // 返回音频的服务器端ID
                            cb(null);
                        },
                        error: function(err) {
                            cb(new Error(err));
                        }
                    });
                },
                function(cb) {
                    $.ajax({
                        url: '/wechat/voice/save',
                        type: "POST",
                        data: user,
                        success: function(data) {
                            //do st.
                            console.log(656565);

                        },
                        error: function(err) {
                            cb(new Error(err));
                        }
                    });
                },
            ], function(err, result) {
                if (err) {
                    console.log(err);
                } else {
                    //do st.
                    console.log('上传到服务器成功');
                }
            });

        },
        //下载语音

    }
});

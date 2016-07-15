var MyTools = { 
    /**
     * 传入一个回调函数名,和参数，判断是否是函数，如果是，则回调
     * @param  {String} a 函数名
     * @param  {字符串,也可以是json字符串} b 回调函数的参数
     * @return {[type]}   [description]
     */
    execCB: function(a, err, b) {
        var params = b || {};
        if (MyTools.isfun(a)) {
            a.call(this, err, params);
        }
    },
    isfun: function(a) {
        if (typeof a === 'function') {
            return true;
        }
    },
    /**
     * 获取UUID
     * 测试：
     * // var a = 1 + Math.random();
        // // var b = (a * 0x10000) | 0;
        // var b = Math.floor(a* 0x10000);
        // var c = b.toString(8);
        // var d = c.substring(1);
        // console.log(a);
        // console.log(b);
        // console.log(c);
        // console.log(d);
        // console.log(guid3());
     * @return {[type]} [description]
     */
    guid: function() {
        function S4() {
            return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        }
        return (S4() + S4() + S4() + S4() + S4() + S4() + S4() + S4());
    },
    getVerifyCode: function() {
        return (((1 + Math.random()) * 0x10000) | 0).toString(8).substring(2);
    },
    showerr: function(err) {
        console.log("myerr333:"+err);
        if (typeof err === "object") {
            console.log("myerr:" + JSON.stringify(err));
        } else {
            console.log("myerr:" + err);
        }
    },
    jssdk:function() {
        require.ensure(['jquery'],function(){},'jquery');
        var $ = require('jquery');
        $.ajax({
            url: 'http://www.wit-orange.com/wechat/getconf?url=' + encodeURIComponent(location.href),
            success: function(config) {
                console.log(config.appid);
                console.log(config.timestamp);
                console.log(config.nonceStr);
                console.log(config.signature);
                console.log(config.jsApiList);
                wx.config({
                    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                    appId: config.appid, // 必填，公众号的唯一标识
                    timestamp: config.timestamp, // 必填，生成签名的时间戳
                    nonceStr: config.nonceStr, // 必填，生成签名的随机串
                    signature: config.signature, // 必填，签名，见附录1
                    jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage','startRecord','stopRecord','onVoiceRecordEnd','playVoice','pauseVoice','stopVoice','onVoicePlayEnd','uploadVoice','downloadVoice'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                });
            } 
        });
        //  
        wx.ready(function() {
            wx.onMenuShareTimeline({
                title: '融创中国高端精品代表作鉴赏', // 分享标题
                link: 'http://www.wit-orange.com/rcxmzs', // 分享链接
                imgUrl: 'http://www.wit-orange.com/rcxmzs/images/shareimg.jpg', // 分享图标
                success: function() {
                    // 用户确认分享后执行的回调函数
                    history.go(0);
                },
                cancel: function() {
                    // 用户取消分享后执行的回调函数
                    history.go(0);
                }
            });
            wx.onMenuShareAppMessage({
                title: '融创中国高端精品代表作鉴赏', // 分享标题
                desc: '融创中国高端精品代表作鉴赏', // 分享描述
                link: 'http://www.wit-orange.com/rcxmzs', // 分享链接
                imgUrl: 'http://www.wit-orange.com/rcxmzs/images/shareimg.jpg', // 分享图标
                type: '', // 分享类型,music、video或link，不填默认为link
                dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                success: function() {
                    // 用户确认分享后执行的回调函数
                    // $.ajax({
                    //     url: '/rcxmzs/submit',
                    //     type: 'GET',
                    //     success: function(data) {
                    //         history.go(0);
                    //     },
                    //     error: function(data) {
                    //        history.go(0);
                    //     }
                    // });
                    history.go(0);
                },
                cancel: function() {
                    // 用户取消分享后执行的回调函数
                }
            });

        });
    }
}
module.exports = MyTools;

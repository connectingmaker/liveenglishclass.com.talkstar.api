var dataList = "/member/memberListData";
var dataDelete = "/member/memberdeleteData";
var dataSave = "/member/membersaveData";


var dataIn = {
    ajax: {
        data: {
        }
        ,methods: {
            getData:function() {

            }
        }
        ,mounted:function() {
            this.getData();
        }
    }
}

var app = new Vue({
    el:"#app"
    ,mixins:[dataIn.ajax]
    ,data:{
        request:{
            url:"/member/memberList"
            ,data:{}
        }
    }
});
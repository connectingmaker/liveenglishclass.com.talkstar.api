var app = new Vue({
    el:"#app"
    ,data : {
        loading: false
        ,page : 1
        ,search_type : ""
        ,search_name : ""
        ,listData : {}
    }
    ,methods: {
        list: function() {
            var json = {
                page : this.page
                ,search_type : this.search_type
                ,search_name : this.search_name
            };

            var _this = this;
            _this.loading = true;
            common.loading.start("app");
            common.ajax.send('/admin/member/listJson', json);
            common.ajax.return = function(data) {
                _this.listData = data.list;
                _this.loading = false;
                common.loading.end("app");
                //console.log(data);
            }
        }
    }
    ,mounted: function() {
        this.list();
    }
});
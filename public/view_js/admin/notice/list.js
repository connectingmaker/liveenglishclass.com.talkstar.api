
var app = new Vue({
    el:"#app"
    ,data : {
        loading: false
        ,page : 1
        ,search_type : ""
        ,search_name : ""
        ,totalPage : 0
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
            common.ajax.send('/admin/notice/listJson', json);
            common.ajax.return = function(data) {
                console.log(data);
                _this.listData = data.list;
                _this.loading = false;
                _this.totalPage = data.total;
                common.loading.end("app");




                Vue.component('paginate', VuejsPaginate);
                //console.log(data);
            }
        }
        ,clickCallback: function(pageNum) {
            this.page = pageNum;
            this.list();
            //console.log(pageNum)
        }
        ,nextPage: function() {
            this.page = this.page + 1;
            this.list();
        }
        ,prevPage: function() {
            this.page = this.page - 1;
            this.list();
        }
    }
    ,mounted: function() {
        this.list();
    }
});


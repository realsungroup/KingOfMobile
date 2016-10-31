"use strict";
var $ = require("jquery");
var greeter_1 = require("./entities/greeter");
var greeter = new greeter_1.default("world!11");
var msg = greeter.greet();
var Greeters1 = (function () {
    function Greeters1(element) {
        this.element = element;
        this.element.innerHTML += "The time is: ";
        this.span = document.createElement('span');
        this.element.appendChild(this.span);
        this.span.innerText = new Date().toUTCString();
    }
    Greeters1.prototype.start = function () {
        var _this = this;
        this.timerToken = setInterval(function () { return _this.span.innerHTML = new Date().toUTCString(); }, 500);
    };
    Greeters1.prototype.stop = function () {
        clearTimeout(this.timerToken);
    };
    Greeters1.prototype.appendGrid = function (parentelement, gridid, columns, row, mini) {
        this.mini_grid = document.createElement('div');
        this.mini_grid.className = "mini-datagrid";
        this.mini_grid.id = gridid;
        parentelement.appendChild(this.mini_grid);
        mini.parse();
        var grid = mini.get(gridid);
        grid.setColumns(columns);
        grid.set({ "showPager": false, "data": row, "idField": "REC_ID" });
    };
    return Greeters1;
}());
window.onload = function () {
    var el = document.getElementById('content');
    var datagrids = document.getElementById('datagrids');
    var greeter = new Greeters1(el);
    greeter.start();
    var url = 'http:9//www.realsun.me:8003/rispweb/rispservice/apiSvrLogin.aspx?user=demo1&upass=123456&clienttype=mobile&apitoken=KingOfDinner123456789';
    url = "http://www.realsun.me:8003/rispweb/risphost/data/AjaxService.aspx?method=ShowHostTableDatas_Ajax&uiver=200&resid=491762412839&dynlogin=1&user=demo1&ucode=bTqoF2CcMCj7uIOBllZtDw==";
    mini.parse();
    var columns = [{ "field": "REC_ID", "header": "recid1" }, { "field": "fName", "header": "fName" }, { "field": "fDescription", "header": "fDescription" }];
    $.ajax({
        url: url,
        success: function (text) {
            if (text !== "") {
                var data = mini.decode(text);
                if (data.error == -1) {
                    alert(data.message);
                }
                var adata = [];
                adata = data.data;
                $.each(adata, function (i, item) {
                    var row = [];
                    row.push(item);
                    greeter.appendGrid(datagrids, "dynamicgrid" + i.toString(), columns, row, mini);
                });
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert(jqXHR.responseText);
        }
    });
};

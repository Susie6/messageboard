window.onload = function view() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            console.log(xhttp.responseText);
            var former = document.getElementById("former");
            var res = JSON.parse(xhttp.responseText);

            for (var i = 0; i < res.length; i++) {
                var id = (res[i])[0];
                var username = (res[i])[1];
                var message = (res[i])[2];
                var update_time = (res[i])[3];
                //显示留言
                var a = document.createElement("div");
                a.id = id;
                a.style.Color = '#fff';
                a.style.background = 'rgba(255,255,255,0.7)';
                a.style.width = '80%';
                a.style.outline = '#00FF00 dotted thick';
                a.innerHTML = '<p class=id>留言id：' + id + '</p>' + '<p class=user>用户名：' + username + '</p>' + '<p class=mess>留言：' + message + '</p>' + '<p class=time>留言时间：' + update_time + '</p><button onclick = "edit(' + id + ')">修改留言</button><button onclick = "cancel(' + id + ')">删除留言</button>';
                former.appendChild(a);

            }
        }
    }
    xhttp.open("POST", "onload.php");
    xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhttp.send();
}

function sendmessage() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            var res = JSON.parse(xhttp.responseText);
            if (res.errcode != 0) {
                var tip = document.getElementById("tip");
                tip.innerHTML = res.errmsg;
            } else {
                var tip = document.getElementById("tip");
                tip.innerHTML = res.errmsg;

                var id = res.data.id;
                var username = res.data.username;
                var update_time = res.data.update_time;
                //新建留言
                var add = document.getElementById("newmessage");
                var td = document.createElement("div");
                td.id = id;
                td.style.Color = '#fff';
                td.style.background = 'rgba(255,255,255,0.7)';
                td.style.width = '80%';
                td.style.outline = '#00FF00 dotted thick';

                td.innerHTML = '<p class=id>留言id：' + id + '</p>' + '<p class=user>用户名：' + username + '</p>' + '<p class=mess>留言：' + message + '</p>' + '<p class=time>留言时间：' + update_time +
                    '</p><button onclick = "edit(' + id + ')">修改留言</button><button onclick = "cancel(' + id + ')">删除留言</button>';

                add.appendChild(td);
            }

        }
    };
    xhttp.open("POST", "messageboard.php", true);
    xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    var message = document.getElementById("message").value;
    var arr = {
        message
    };
    JSON.stringify(arr);

    xhttp.send("message=" + message);
}

function edit(id) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            var res = JSON.parse(xhttp.responseText);
            //var id = res.data.id;
            if (res.errcode == 0) {

                //创建编辑文本框
                var box = document.createElement("textarea");
                box.id = "mes";
                box.rows = "3";
                box.style = "margin: 0px; width: 760px; height: 138px;";

                //创建按钮
                var create = document.createElement("div");
                create.id = "create";
                create.innerHTML = '<button id = "btn1" onclick = "update(' + id + ')">确认修改</button><button id = "btn2" onclick = "disappear(' + id + ')">取消修改</button>';

                //将新建的元素放进div里面
                var ins = document.getElementById(id);
                ins.appendChild(box);
                ins.appendChild(create);

            } else {
                var tip = document.getElementById("tip");
                tip.innerHTML = res.errmsg;
            }
        }
    }
    xhttp.open("POST", "judge.php");
    xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhttp.send("id=" + id);
}

function update(id) {
    var xhttp = new XMLHttpRequest();
    var message = document.getElementById("mes").value;
    xhttp.onreadystatechange = function () {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            var res = JSON.parse(xhttp.responseText);

            //更新留言
            if (res.errcode == 0) {
                var tip = document.getElementById("tip");
                tip.innerHTML = res.errmsg;

                var update_time = res.data.update_time;

                var change = document.getElementById(id);

                change.getElementsByClassName("mess").innerHTML = '留言' + message;
                change.getElementsByClassName("time").innerHTML = '留言时间：' + update_time;

            } else {
                var tip = document.getElementById("tip");
                tip.innerHTML = res.errmsg;
            }

            //把创建的修改框去掉
            var del1 = document.getElementById("mes");
            var del2 = document.getElementById("create");

            var parent = document.getElementById(id);
            //alert(parent);
            parent.removeChild(del1);
            parent.removeChild(del2);

        }
    }
    xhttp.open("POST", "edit.php");
    xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    var new_one = document.getElementById("mes").value;
    var arr = {
        new_one
    };
    JSON.stringify(arr);
    xhttp.send("message=" + new_one + "&id=" + id);
};

function disappear(id) {
    //删除编辑框及按钮
    var parent = document.getElementById(id);
    var del1 = document.getElementById("mes");
    var del2 = document.getElementById("create");

    parent.removeChild(del1);
    parent.removeChild(del2);

}

function cancel(id) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            var res = JSON.parse(xhttp.responseText);
            if (res.errcode = 0) {
                var del = document.getElementById(id);
                removeChild(del);
                var tip = document.getElementById("tip");
                tip.innerHTML = res.errmsg;
            }
            else{
                var tip = document.getElementById("tip");
                tip.innerHTML = res.errmsg;
            }
        }
    }
    xhttp.open("POST", "delete.php");
    xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhttp.send("id=" + id);
}
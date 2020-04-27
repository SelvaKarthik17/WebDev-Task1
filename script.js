    var game = document.getElementById("rs");
    game.innerHTML = null;
    var start = document.getElementById("st");
    var best = document.getElementsByClassName("besttime");
    var sdd = document.getElementById("sd");
    var dpp = document.getElementById("dp");
    var ss = 0;
    var scores = new Array(5);
    var ivl = 0;
    var idd = 0;

    function startnew() {
        var box = document.getElementsByClassName("grid-container");
        box[0].style.opacity = "1";
        var ele = document.getElementsByClassName("grid-item");
        for (b = 0; b < 20; b++) {
            ele[b].style.opacity = "0";
        }
        start.innerHTML = "Click to Start";
        start.className = null;

        start.onclick = function () {
            var cd = document.getElementById("countdown");
            cd.innerHTML = null;
            cd.style.opacity = 1;
            var x = 3;

            function count() {

                cd.innerHTML = x;
                --x;
                if (x === -1) {
                    cd.style.opacity = 0;
                    cd.innerHTML = null;
                    ele = document.getElementsByClassName("grid-item");
                    for (b = 0; b < 20; b++) {
                        ele[b].style.opacity = "1";
                    }
                    clearInterval(idd);
                    window.setTimeout(timer(), 3000);
                }
            }

            idd = setInterval(count, 1000);


            start.innerHTML = null;
            start.className = "ac";


        }

        function timer() {
            var box = document.getElementsByClassName("grid-container");
            box[0].style.opacity = "1";
            var time1 = new Date();
            var ms1 = time1.getTime();

            function timeCount() {
                var time2 = new Date();
                var ms2 = time2.getTime();
                var ms = ms2 - ms1;
                ss = ms / 1000;
                ms = ms % 1000;
                document.getElementById("time").innerHTML = ss;
            }

            ivl = window.setInterval(timeCount, 1);
        }
        var i = 0;
    }
    var num = document.getElementsByClassName("grid-item");

    function toArray(obj) {
        var array = [];
        for (var i = obj.length >>> 0; i--;) {
            array[i] = obj[i];
        }
        return array;
    }
    var numarr = toArray(num);
    var ar = new Array(20);
    for (k = 0; k < 20; k++) {
        ar[k] = numarr[k].innerHTML;
    }
    console.log(ar[0]);

    function shuffle(array) {
        var currentIndex = array.length,
            temporaryValue, randomIndex;
        while (0 !== currentIndex) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }
        return array;
    }

    var newx = shuffle(ar);
    console.log(newx[0]);

    for (u = 0; u < 20; u++) {
        document.getElementsByClassName("grid-item")[u].innerHTML = newx[u];
    }
    qwe = document.getElementsByClassName("grid-item");


    function play() {
        best.className = "btn";
        var flag = new Array(100);
        flag[0] = 0;

        var f2 = new Array(21);
        f2[0] = 0;

        var c = new Array(19);

        function include(arr, obj) {
            for (var i = 0; i < arr.length; i++) {
                if (arr[i] == obj) return true;
            }
        }

        function element(z) {
            if ((include(flag, num[z].innerHTML - 1) == true) && (c[z] != 1)) {
                flag.push(num[z].innerHTML);
                num[z].innerHTML = Number(newx[z]) + 20;
                if (num[z].innerHTML == 40) {
                    f2[1] = 21;
                    console.log("reached");
                    console.log(f2[1]);
                }
                c[z] = 1;
            } else if (include(f2, num[z].innerHTML) && (c[z] == 1)) {
                f2.push(Number(num[z].innerHTML) + 1);
                if (include(f2, 41)) {
                    ele = document.getElementsByClassName("grid-item");
                    for (b = 0; b < 20; b++) {
                        ele[b].style.opacity = "0";
                    }
                    sdd.innerHTML = "Your time is";
                    dpp.innerHTML = ss;
                    game.innerHTML = "reset";
                    game.className = "new";

                    if (localStorage.length == 0) {
                        localStorage.setItem("score1", ss);
                    } else if (localStorage.length == 1) {
                        localStorage.setItem("score2", ss);
                    } else if (localStorage.length == 2) {
                        localStorage.setItem("score3", ss);
                    } else if (localStorage.length == 3) {
                        localStorage.setItem("score4", ss);
                    } else if (localStorage.length == 4) {
                        localStorage.setItem("score5", ss);
                    } else if (localStorage.length == 5) {
                        scores[0] = parseFloat(localStorage.getItem("score1"));
                        scores[1] = parseFloat(localStorage.getItem("score2"));
                        scores[2] = parseFloat(localStorage.getItem("score3"));
                        scores[3] = parseFloat(localStorage.getItem("score4"));
                        scores[4] = parseFloat(localStorage.getItem("score5"));

                        function numberasc(a, b) {
                            return a - b;
                        }
                        scores.sort(numberasc);

                        if (ss < scores[4]) {
                            scores.push(ss);
                            scores.sort(numberasc);
                            localStorage.setItem("score1", scores[0]);
                            localStorage.setItem("score2", scores[1]);
                            localStorage.setItem("score3", scores[2]);
                            localStorage.setItem("score4", scores[3]);
                            localStorage.setItem("score5", scores[4]);
                        }
                    }

                    scores[0] = parseFloat(localStorage.getItem("score1"));
                    scores[1] = parseFloat(localStorage.getItem("score2"));
                    scores[2] = parseFloat(localStorage.getItem("score3"));
                    scores[3] = parseFloat(localStorage.getItem("score4"));
                    scores[4] = parseFloat(localStorage.getItem("score5"));

                    function numberasc(a, b) {
                        return a - b;
                    }
                    scores.sort(numberasc);
                    for (y = 0; y < 5; y++) {
                        if (scores[y] > 0) {
                            best[y].innerHTML = scores[y];
                        }

                    }
                    window.clearInterval(ivl);
                    game.onclick = function () {
                        game.innerHTML = null;
                        sdd.innerHTML = null;
                        dpp.innerHTML = null;

                        var newxx = shuffle(ar);
                        console.log(newxx[0]);
                        for (v = 0; v < 20; v++) {
                            document.getElementsByClassName("grid-item")[v].innerHTML = newxx[v];

                        }
                        startnew();
                        play();
                    }
                    console.log("stop");
                }
                console.log(f2);
                num[z].innerHTML = " ";
            }
        }

        for (let m = 0; m < 20; m++) {
            num[m].onclick = function () {
                console.log(m);
                element(m);
            }
        }



    }
    startnew();
    play();
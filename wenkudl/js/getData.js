(function() {

    let url1 = window.location.href;
    let reg = /wenku.baidu.com\/view\//;
    if (reg.test(url1)) {
        setTimeout(() => {
            // let container = document.getElementById('reader-container-1');
            //let container = document.getElementsByClassName('ie-fix');
            let countDom = document.getElementsByClassName('page-count')[0];
            let count = countDom.innerHTML.replace(/\//, '');

            // let container = document.getElementsByClassName('ie-fix');
            // console.log(container);
            // let container = $('.ie-fix');
            let result = '';
            for (let index = 1; index <= count; index++) {
                let id = 'pageNo-' + index;
                let byiddom = document.getElementById(id);
                console.log(byiddom);
                let ele_p = byiddom.getElementsByTagName('p');
                console.log(ele_p);
                let dom = document.getElementsByClassName('inner')[0];
                console.log(dom.scrollTop);
                let thisflag = 0;
                while (ele_p.length < 1 || thisflag >= 3) {

                    dom.scrollTop += 300;
                    let byiddom = document.getElementById(id);
                    let ele_p = byiddom.getElementsByTagName('p');
                    thisflag++;
                }
                for (let i = 0; i < ele_p.length; i++) {
                    let flag = addlf(ele_p[i]);
                    if (flag == 1) {} else if (flag == 2) {

                        result += '\n';
                    } else if (flag == 3) {
                        result += ele_p[i].innerHTML + '\n';
                    }
                    // 换行
                    else if (flag == 1) {
                        result += ele_p[i].innerHTML;
                    }

                }


            }


            console.log(result);
            return;
            let fileName = Date.now() + ".doc";
            var blob = new Blob(["\uFEFF" + result], { type: "text/doc;" });
            var downloadLink = document.createElement("a");
            if ("download" in downloadLink) {
                var url = URL.createObjectURL(blob);
                downloadLink.href = url;
                downloadLink.download = fileName;
                downloadLink.hidden = true;
                document.body.appendChild(downloadLink);
                downloadLink.click();
                document.body.removeChild(downloadLink);
            } else {
                if (navigator.msSaveBlob) {
                    //IE10+
                    navigator.msSaveBlob(blob, fileName);
                }
            }

        }, 2000);

    }

    function addlf(ele) {
        console.log(ele.innerHTML);
        let attr = ele.getAttribute('style');
        let str = ele.innerHTML;
        str = str.replace(/\s*/g, "");
        let reg2 = /;false/;
        let hh = reg2.test(attr);
        if (hh && (!str)) {
            return 2;
        } else if ((!hh) && (!str)) {
            return 1;
        } else if (hh && str) {
            return 3;
        } else if (!hh && str) {} {
            return 4;
        }
    }
})()

// style里面最后一个参数是false就要换行
//1 换行  2 删除 3 不换行

// 1. 全是ensp 没有false删除并且不换行
// 2. 全是ensp，有false 删除并且换行
// 3. str有值，有false 换行
// 4. str有值，没有false 不换行
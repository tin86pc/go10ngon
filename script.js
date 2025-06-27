console.log("web gõ 10 ngón")

const ndluyengo = document.getElementById('ndluyengo');
const batdau = document.getElementById('batdau');
const thoigian = document.getElementById('thoigian');


const b1 = document.getElementById('b1');
const b2 = document.getElementById('b2');
const b3 = document.getElementById('b3');
const b4 = document.getElementById('b4');
const b5 = document.getElementById('b5');
const b6 = document.getElementById('b6');
const b7 = document.getElementById('b7');

let vt = 0;
let stringndluyengo = "";
let dangchay = false;


let bai = 1;

let ndbai = [
    "Trong dam gi dep bang sen, La xanh bong trang lai chen nhi vang. Nhi vang bong trang la xanh, Gan bun ma chang hoi tanh mui bun.",
    "Em da nho Truong Sa Ca khi minh chua den Giua song, cat khong ngo Gap mau hoa muong bien. Nhung Da Thi, Len Dao Song Tu Tay song vo Nhung Son Ca, Sinh Ton Hoa bang vuong doi no. Nhung nha gian giu dao Neo ca nhip tim nguoi Muon gui vao muon gio Xin tung ngay song nguoi.",
    "Cha gui cho con chiec anh cai cau Cha vua bac xong qua dong song sau Xe lua sap qua, thu cha noi the, Con cho me xem cho xem hoi lau Nhung cai cau oi, yeu sao yeu ghe, Nhen qua chum nuoc bac cau to nho, Con sao sang song bac cau ngon gio. Con kien qua ngoi bac cau la tre.",
    "Con ong lam mat, yeu hoa Con ca boi, yeu nuoc con chim ca, yeu troi. Con nguoi muon song, con oi Phai yeu dong chi, yeu nguoi anh em. Mot ngoi sao chang sang dem Mot than lua chin, chang nen mua vang. Mot nguoi dau phai nhan gian Song chang, mot dom lua tan ma thoi Nui cao boi co dat boi Nui che dat thap nui ngoi o dau Muon dong song do bien sau Bien che song nho, bien dau nuoc con Tre gia yeu lay mang non Chat chiu nhu me yeu con thang ngay. Mai sau con lon hon thay Cac con om ca hai tay dat tron.",
    "O pho, nguoi ta chi trong duoc nhung loai cay be be. Nhung san nha cu cua Bum lai co mot cay oi. Ong noi ke, luc me mang bau no, ong da trong cay oi nay. Ong nghi hoi nho ba no vo cung thich oi nen chac chau minh cung se thich oi nhu ba no. Dung that, Bum thich cay oi lam. Hoi moi ba, bon tuoi, no da biet cung ong bat sau cho cay oi nen cay moi lon nhu bay gio. Ong da bam de cay co nhieu canh cao, thap, vung chai va sai qua. Huong oi chin toa khap san thom lung. Nhung buoi chieu mat, Bum va be ban tum tum duoi goc cay, chia nhau nhung trai oi chin. Ong noi bac chiec ghe dau ra san gan cay oi, ngoi do vua nghe dai vua nheo nheo mat nhin lu tre vui choi...Bum da xa can nha cu va cay oi ay ba nam roi. Vay ma khi nho lai, ki niem nhu vua moi day thoi."
];


window.onload = function () {
    bai = 1;
    document.getElementById('tenbai').textContent = `Bài ${bai}`;
    ndluyengo.value = removeVietnameseTones(ndbai[bai - 1]);
    b1.focus();



    batloa = window.localStorage.getItem('batloa');
    if (batloa == null || batloa == undefined) {
        batloa = "tat";
    }

    if (batloa == "bat") {
        document.getElementById("ImageLoa").src = "svg/bat loa.svg";
    }

    if (batloa == "tat") {
        document.getElementById("ImageLoa").src = "svg/tat loa.svg";
    }


    bai = window.localStorage.getItem('bai');
    if (bai == null) {
        bai = 1;
    } else {
        bai = parseInt(bai);
    }
    document.getElementById('tenbai').textContent = `Bài ${bai}`;
    ndluyengo.value = removeVietnameseTones(ndbai[bai - 1]);
}

document.getElementById('back').addEventListener('click', function () {
    if (bai > 1) {
        bai--;
        document.getElementById('tenbai').textContent = `Bài ${bai}`;
        ndluyengo.value = removeVietnameseTones(ndbai[bai - 1]);
        b1.focus();
    }
    window.localStorage.setItem('bai', bai);
})

document.getElementById('next').addEventListener('click', function () {
    if (bai < ndbai.length) {
        bai++;
        document.getElementById('tenbai').textContent = `Bài ${bai}`;
        ndluyengo.value = removeVietnameseTones(ndbai[bai - 1]);
        b1.focus();
    }
    window.localStorage.setItem('bai', bai);
})

batdau.addEventListener('click', function () {
    console.log('Bắt đầu gõ:',);
    vt = 0;
    tg = 0;
    tylesai = 0;
    sokytusai = 0;
    dangchay = true;
    b1.focus();

    stringndluyengo = ndluyengo.value.toString();

    thaydoi(vt);


});

ndluyengo.addEventListener('change', function () {
    console.log('Thay đổi giá trị:', ndluyengo.value);
    ndluyengo.value = removeVietnameseTones(ndluyengo.value);
    b1.focus();
});




document.addEventListener('keydown', function (event) {

    console.log('Phím vừa nhấn:', event.key);
    let nd = event.key.toString();

    if (stringndluyengo.length != 0) {
        b1.textContent = stringndluyengo.charAt(vt);

    }


    // gõ đúng
    if (b1.textContent == nd) {
        vt++

        thaydoi(vt);

    }
    // gõ sai
    else {

        if (nd != "Shift" && nd != "Control" && nd != "Alt" && nd != "CapsLock" && nd != "Meta" && nd != "Backspace" && nd != "Enter") {
            sokytusai++
            hientoat(nd);

            if (batloa == "bat") {
                let x = document.getElementById("myAudio");
                x.src = `audio/${chucai}.mp3`;
                x.play();
            }
        }
    }

    if (dangchay == true) {

        if (stringndluyengo.length == vt) {
            dangchay = false;
            alert(` Hoàn thành với Thời gian: ${tg} Tỷ lệ sai: ${tylesai.toFixed(2)}% Tốc độ: ${(vt / tg * 60).toFixed(0)} ký tự/phút`);
        }
    }





});


function thaydoi(vt) {
    b1.textContent = stringndluyengo.charAt(vt);
    b2.textContent = stringndluyengo.charAt(vt + 1);
    b3.textContent = stringndluyengo.charAt(vt + 2);
    b4.textContent = stringndluyengo.charAt(vt + 3);
    b5.textContent = stringndluyengo.charAt(vt + 4);
    b6.textContent = stringndluyengo.charAt(vt + 5);
    b7.textContent = stringndluyengo.charAt(vt + 6);

    let chucai = b1.textContent;

    if (chucai == " ") {
        chucai = "cach";
    }
    if (chucai == "") {
        chucai = "nghi";
    }
    if (chucai == ".") {
        chucai = "cham";
    }
    if (chucai == ",") {
        chucai = "phay";
    }

    document.getElementById("image").src = `img/${chucai.toLowerCase()}.png`;

    let trai = "QWERTASDFGZXCVB";
    let phai = "YUIOPHJKLNM";

    // QWERTASDFGZXCVBYUIOPHJKLNM


    if (!phai.includes(chucai) && !trai.includes(chucai)) {
        document.getElementById("image2").src = "img/trong.png";
    }
    if (phai.includes(chucai)) {
        document.getElementById("image2").src = "img/shift trai.png";
    }
    if (trai.includes(chucai)) {
        document.getElementById("image2").src = "img/shift phai.png";
    }

    if (batloa == "bat") {

        let x = document.getElementById("myAudio");
        x.src = `audio/${chucai}.mp3`;
        x.play();

    }
}


let batloa = "tat"

document.getElementById("batloa").addEventListener("click", function () {
    b1.focus();

    if (batloa == "tat") {
        document.getElementById("ImageLoa").src = "svg/bat loa.svg";
        batloa = "bat";
    } else {
        document.getElementById("ImageLoa").src = "svg/tat loa.svg";
        batloa = "tat";
    }
    window.localStorage.setItem('batloa', batloa);
});

document.getElementById("chuthuong").addEventListener("click", function () {
    ndluyengo.value = ndluyengo.value.toLowerCase();
    stringndluyengo = ndluyengo.value.toString();
    thaydoi(vt);
})

let tg = 0;
let tylesai = 0;
let sokytusai = 0;
setInterval(() => {
    if (dangchay == true) {
        tylesai = sokytusai / stringndluyengo.length * 100;
        tg++;
        thoigian.textContent = `Thời gian: ${tg} giây, Tỷ lệ sai: ${tylesai.toFixed(2)}% Tốc độ: ${(vt / tg * 60).toFixed(0)} ký tự/phút`;
    }

}, 1000);

function removeVietnameseTones(str) {
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
    str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
    str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
    str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
    str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
    str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
    str = str.replace(/Đ/g, "D");
    // Some system encode vietnamese combining accent as individual utf-8 characters
    // Một vài bộ encode coi các dấu mũ, dấu chữ như một kí tự riêng biệt nên thêm hai dòng này
    str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // ̀ ́ ̃ ̉ ̣  huyền, sắc, ngã, hỏi, nặng
    str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // ˆ ̆ ̛  Â, Ê, Ă, Ơ, Ư

    // Remove punctuations
    // Bỏ dấu câu, kí tự đặc biệt
    str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g, " ");
    // Bỏ ký tự xuống dòng
    str = str.replace(/\r?\n/g, " ");
    // Bỏ các khoảng trắng liền nhau
    str = str.replace(/ + /g, " ");
    str = str.trim();
    str = str.trimEnd();

    return str;
}


function hientoat(s) {
    // Get the snackbar DIV
    var x = document.getElementById("snackbar");
    x.textContent = `Gõ ${s} sai rồi `;

    // Add the "show" class to DIV
    x.className = "show";

    // After 3 seconds, remove the show class from DIV
    setTimeout(function () { x.className = x.className.replace("show", ""); }, 1000);
}

const isLowerCase = str => str === str.toLowerCase();
const isUpperCase = str => str === str.toUpperCase();

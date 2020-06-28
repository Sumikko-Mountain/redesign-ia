const uri = 'https://script.google.com/macros/s/AKfycbxyacpN8y4nxSAnU0Eji6E_rBRDFTY7YoWWFa0clY5ELRhskgpt/exec';//google App scriptの何か　たぶんspreadsheetからjsonを取得するためのライブラリ的なものの読み込み
const id = '1BpGnuwC4lZf9G2yFyiSrxbJuGO8gviV8mr-I2D3x4vA';//URLのid=にあったこれでどのシートかを指定
const sheet = 'group3-studio';//読み込むシート名
const sheet2 = 'group3-faculty';
const sheet3 = 'group3-news';
const endpoint = `${uri}?id=${id}&sheet=${sheet}`;
const endpoint2 = `${uri}?id=${id}&sheet=${sheet2}`;
const endpoint3 = `${uri}?id=${id}&sheet=${sheet3}`;
//jsonをHTMLにとってきて表示するのに必要な基本的な流れは①~⑤である

const renderFaculty = (json) => {
    //シート２枚目
    const faculties = json.records;
    faculties.forEach(faculty => {

        if (faculty['f-faculty-ja'] !== '') {

            //一人単位の最も外側
            const menberSec = document.createElement('section');
            menberSec.className = 'member';

            const facPhotoP = document.createElement('p');
            facPhotoP.className = 'faculty-photo-p';
            const facPhoto = document.createElement("img");
            facPhoto.className = 'faculty-img';
            facPhoto.src = faculty['faculty-photo'];
            facPhoto.alt = faculty['faculty-ja'];
            facPhotoP.appendChild(facPhoto);

            menberSec.appendChild(facPhotoP);


            const profileSec = document.createElement('section');
            profileSec.className = 'profile';


            const nameDiv = document.createElement('div');
            nameDiv.className = 'name';

            const facultyJa = document.createElement("h2");
            facultyJa.className = 'faculty-ja';
            facultyJa.textContent = faculty['f-faculty-ja'];
            nameDiv.appendChild(facultyJa);

            const facultyTitleJa = document.createElement("span");
            facultyTitleJa.className = 'studio-facultyTitle';
            facultyTitleJa.textContent = faculty['f-faculty-title-ja'];
            nameDiv.appendChild(facultyTitleJa);

            const facultyEn = document.createElement("p");
            facultyEn.className = 'faculty-en';
            facultyEn.textContent = faculty['f-faculty-en'];
            nameDiv.appendChild(facultyEn);

            profileSec.appendChild(nameDiv);


            const studioJa = document.createElement("p");
            studioJa.className = 'faculty-studio';
            studioJa.textContent = faculty['f-studio-ja'];
            profileSec.appendChild(studioJa);


            const majorJa = document.createElement("p");
            majorJa.className = 'faculty-major';
            majorJa.textContent = faculty['major-ja'];
            profileSec.appendChild(majorJa);




            if (faculty['f-link'] !== '') {
                const linkP = document.createElement('p');
                const linkSpan = document.createElement('span');




                const linkIconSpan = document.createElement('span');
                const linkIconA = document.createElement('a');
                linkIconA.className = 'sns-link';
                const linkIcon = document.createElement("img");
                linkIcon.className = 'sitelink-icon';
                linkIcon.src = "./img/icon/Site/LINK.png";
                linkIcon.alt = "website：" + faculty['f-link-title'];
                linkIconA.href = faculty['f-link'];
                linkIconA.target = "_blank";
                linkIconA.appendChild(linkIcon);
                linkIconSpan.appendChild(linkIconA);




                const fLink = document.createElement('a');
                fLink.className = 'faculty-link';


                fLink.textContent = faculty['f-link-title'];
                fLink.href = faculty['f-link'];
                fLink.target = "_blank";
                linkSpan.appendChild(fLink);

                linkP.appendChild(linkSpan);
                linkP.appendChild(linkIconSpan, linkIcon);
                profileSec.appendChild(linkP);
            }



            menberSec.appendChild(profileSec);


            document.getElementById('faculties').appendChild(menberSec);
        }

    });
    //document.getElementById('result-faculty').textContent = JSON.stringify(json, null, 2);//JavaScript のオブジェクトや値を JSON 文字列に変換させて、HTML上のresultというidがついたdivに付与？する。最後の引数は上限が10のスペーシング 変わってんのかわからない
}




const getData2 = async () => {
    try {
        const response = await fetch(endpoint2);
        if (response.ok) {
            let jsonResponse = await response.json();
            renderFaculty(jsonResponse);
        }
    }
    catch (error) {
        console.log(error);
    }
}

getData2();





let lottieObj = lottie.loadAnimation({
    container: document.getElementById('sampleAnime'), // 表示させたい要素を渡します
    renderer: 'svg', // 描画形式を指定
    loop: true, // trueにしたらループ、1回再生の場合はfalseで
    autoplay: true, // 自動再生、falseの場合は自分のタイミングで
    path: 'https://assets6.lottiefiles.com/packages/lf20_lp3wO4.json' // 再生させたいアニメーションのjsonのパスを指定します。リンクだといけるな…なんだそれ
});

/*---------topへ戻るボタン-------------*/
function getScrolled() {
    return (window.pageYOffset !== undefined) ? window.pageYOffset : document.documentElement.scrollTop;
}

//トップに戻るボタンの要素を取得
var topButton = document.getElementById('js-scroll-fadein');

//ボタンの表示・非表示
window.onscroll = function () {
    (getScrolled() > 500) ? topButton.classList.add('is-fadein') : topButton.classList.remove('is-fadein');
};

//トップに移動する関数
function scrollToTop() {
    var scrolled = getScrolled();
    window.scrollTo(0, Math.floor(scrolled / 2));
    if (scrolled > 0) {
        window.setTimeout(scrollToTop, 30);
    }
};

//イベント登録
topButton.onclick = function () {
    scrollToTop();
};

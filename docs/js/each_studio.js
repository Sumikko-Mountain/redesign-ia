const uri = 'https://script.google.com/macros/s/AKfycbxyacpN8y4nxSAnU0Eji6E_rBRDFTY7YoWWFa0clY5ELRhskgpt/exec';//google App scriptの何か　たぶんspreadsheetからjsonを取得するためのライブラリ的なものの読み込み
const id = '1BpGnuwC4lZf9G2yFyiSrxbJuGO8gviV8mr-I2D3x4vA';//URLのid=にあったこれでどのシートかを指定
const sheet = 'group3-studio';//読み込むシート名
const sheet2 = 'faculty';
const sheet3 = 'link';
const endpoint = `${uri}?id=${id}&sheet=${sheet}`;
const endpoint2 = `${uri}?id=${id}&sheet=${sheet2}`;
const endpoint3 = `${uri}?id=${id}&sheet=${sheet3}`;
var studioImageArray = new Array();
//jsonをHTMLにとってきて表示するのに必要な基本的な流れは①~⑤である
const renderStudio = (json) => {//シートごとに使い分ける
    const studios = json.records;

    //studios.pop();//配列の一番最後の要素を取り出すメソッド　ほんとは返り値があって const lastStudio =  studios.pop();とかするべきなんだけど、さいごが空ってわかってるのでOK　ここコメントアウトするとrecordにfacultyだけ反映される…
    studios.forEach(studio => {//forEachで各スタジオをグルグル回してる　配列が12個だとちょうどいいのに13個あるので、最後の要素を取ってあげればいい

        //シート１枚目
        if (studio['name-ja'] !== '') {


            const studioLeftSec_Pre = document.createElement('section');

            const studioTitleDiv = document.createElement('div');
            if (studio['core-ja'] == 'メディアアートコア・メディア創生') {
                studioTitleDiv.className = 'title-red';
            } else {
                studioTitleDiv.className = 'title-blue';
            }
            const studioTitleInnerDiv = document.createElement('div');
            studioTitleInnerDiv.className = 'inner-title';
            const studioTitleTextDiv = document.createElement('div');
            studioTitleTextDiv.className = 'titleText';



            //スタジオタイトル　とコアの表示
            const studioCoreJa = document.createElement("p");
            studioCoreJa.className = 'studio-core-top';
            studioCoreJa.textContent = studio['core-ja'];
            studioTitleTextDiv.appendChild(studioCoreJa);

            const studioTitleJa = document.createElement("p");
            studioTitleJa.className = 'studio-title-top';
            studioTitleJa.textContent = studio['name-ja'];
            studioTitleTextDiv.appendChild(studioTitleJa);



            studioTitleInnerDiv.appendChild(studioTitleTextDiv);


            //SNSアイコンを囲むdiv
            const studioSNSDiv = document.createElement('div');
            studioSNSDiv.className = 'studio-sns';


            //インスタ
            if (studio['insta-link'] !== '') {

                const linkIconP_insta = document.createElement('span');
                const linkOnIcon_insta = document.createElement('a');
                const snsIcon_insta = document.createElement("img");
                linkOnIcon_insta.className = 'sns-link';
                snsIcon_insta.className = 'sns-icon';
                snsIcon_insta.src = "../img/icon/instagram/glyph-logo_May2016.png";
                snsIcon_insta.alt = studio['name-ja'] + "_instagram";
                linkOnIcon_insta.href = studio['insta-link'];
                linkOnIcon_insta.target = "_blank";
                linkOnIcon_insta.appendChild(snsIcon_insta);
                linkIconP_insta.appendChild(linkOnIcon_insta);
                studioSNSDiv.appendChild(linkIconP_insta, snsIcon_insta);
            }
            //Twitter
            if (studio['twitter-link'] !== '') {
                const linkIconP_twitter = document.createElement('span');
                const linkOnIcon_twitter = document.createElement('a');
                const snsIcon_twitter = document.createElement("img");
                linkOnIcon_twitter.className = 'sns-link';
                snsIcon_twitter.className = 'sns-icon-twitter';
                snsIcon_twitter.src = "../img/icon/Twitter/Twitter_Logo_Blue_Resized.png";
                snsIcon_twitter.alt = studio['name-ja'] + "_twitter";
                linkOnIcon_twitter.href = studio['twitter-link'];
                linkOnIcon_twitter.target = "_blank";
                linkOnIcon_twitter.appendChild(snsIcon_twitter);
                linkIconP_twitter.appendChild(linkOnIcon_twitter);
                studioSNSDiv.appendChild(linkIconP_twitter, snsIcon_twitter);
            }
            //Studio Site
            if (studio['site-link'] !== '') {
                const linkIconP_site = document.createElement('span');
                const linkOnIcon_site = document.createElement('a');
                const snsIcon_site = document.createElement("img");
                linkOnIcon_site.className = 'sns-link';
                snsIcon_site.className = 'sns-icon';
                snsIcon_site.src = "../img/icon/Site/LINK_Bold.png";
                snsIcon_site.alt = studio['name-ja'] + "_web site link";
                linkOnIcon_site.href = studio['site-link'];
                linkOnIcon_site.target = "_blank";
                linkOnIcon_site.appendChild(snsIcon_site);
                linkIconP_site.appendChild(linkOnIcon_site);
                studioSNSDiv.appendChild(linkIconP_site, snsIcon_site);
            }

            studioTitleInnerDiv.appendChild(studioSNSDiv);

            studioTitleDiv.appendChild(studioTitleInnerDiv);



            //スタジオ説明
            const descriptionJa = document.createElement("p");
            descriptionJa.className = 'studio-description';
            descriptionJa.textContent = studio['description-ja'];
            studioLeftSec_Pre.appendChild(descriptionJa);


            //担当教員

            const facultyDiv = document.createElement('div');
            facultyDiv.className = 'faculty-div';
            /*見出し「担当教員」以外は一旦ひとつのdivに入れて回り込み処理をする*/
            const facultyContentsDiv = document.createElement('div');
            facultyContentsDiv.className = 'faculty-text-div';
            /*中でも写真以外は一旦ひとつのdivに入れて、その中では横並びにならないようにする*/
            const facultyTextDiv = document.createElement('div');
            facultyTextDiv.className = 'faculty-text-div';

            const teacherHead = document.createElement("h3");
            teacherHead.className = 'teacher';
            teacherHead.textContent = "担当教員";
            facultyDiv.appendChild(teacherHead);

            const facPhotoP = document.createElement('p');
            const facPhoto = document.createElement("img");
            facPhoto.className = 'studio-faculty-img';
            facPhoto.src = studio['faculty-photo'];
            facPhoto.alt = studio['faculty-ja'];
            facPhotoP.appendChild(facPhoto);
            facultyContentsDiv.appendChild(facPhotoP);

            const facultyJa = document.createElement("span");
            facultyJa.className = 'studio-faculty';
            facultyJa.textContent = studio['faculty-ja'];
            facultyTextDiv.appendChild(facultyJa);

            const facultyTitleJa = document.createElement("span");
            facultyTitleJa.className = 'studio-facultyTitle';
            facultyTitleJa.textContent = studio['faculty-title-ja'];
            facultyTextDiv.appendChild(facultyTitleJa);


            if (studio['f-link'] !== '') {
                const linkP = document.createElement('p');
                const linkSpan = document.createElement('span');

                const linkIconSpan = document.createElement('span');
                const linkIconA = document.createElement('a');
                linkIconA.className = 'sns-link';
                const linkIcon = document.createElement("img");
                linkIcon.className = 'faculty-sitelink-icon';
                linkIcon.src = "../img/icon/Site/LINK_Grey.png";
                linkIcon.alt = "website：" + studio['f-link-title'];
                linkIconA.href = studio['f-link'];
                linkIconA.target = "_blank";
                linkIconA.appendChild(linkIcon);
                linkIconSpan.appendChild(linkIconA);

                const fLink = document.createElement('a');
                fLink.className = 'faculty-link';

                fLink.textContent = studio['f-link-title'];
                fLink.href = studio['f-link'];
                fLink.target = "_blank";
                linkSpan.appendChild(fLink);

                linkP.appendChild(linkSpan);
                linkP.appendChild(linkIconSpan, linkIcon);
                facultyTextDiv.appendChild(linkP);
            }
            facultyContentsDiv.appendChild(facultyTextDiv);//文字だけの囲いを教員情報に追加
            facultyDiv.appendChild(facultyContentsDiv);//写真＋文字だけの囲い　という囲いを教員情報に追加

            studioLeftSec_Pre.appendChild(facultyDiv);


            //要素があれば差し込むというふうにするために変数を突くておく
            var target_editorial = document.getElementById("studioLeftSec_editorial");
            var target_equip = document.getElementById("studioLeftSec_equip");
            var target_ergonomics = document.getElementById("studioLeftSec_ergo");
            var target_interactive = document.getElementById("studioLeftSec_interactive");
            var target_interface = document.getElementById("studioLeftSec_interface");
            var target_interior = document.getElementById("studioLeftSec_interior");
            var target_kinemat = document.getElementById("studioLeftSec_kinemat");
            var target_network = document.getElementById("studioLeftSec_network");
            var target_software = document.getElementById("studioLeftSec_software");
            var target_spatial = document.getElementById("studioLeftSec_spatial");
            var target_transportation = document.getElementById("studioLeftSec_trans");
            var target_visual = document.getElementById("studioLeftSec_visual");

            if (studio['name-ja'] == 'エディティングスタジオ') {
                if (target_editorial) {//要素があれば

                    studioImageArray.push(studio['photo1'], studio['photo2']);

                    document.getElementById('topBar_editorial').appendChild(studioTitleDiv);
                    document.getElementById('studioLeftSec_editorial').appendChild(studioLeftSec_Pre);
                }
            }
            if (studio['name-ja'] == '製品・サービスデザインスタジオ') {
                if (target_equip) {//要素があれば

                    studioImageArray.push(studio['photo1'], studio['photo2'], studio['photo3'], studio['photo4']);

                    document.getElementById('topBar_equip').appendChild(studioTitleDiv);
                    document.getElementById('studioLeftSec_equip').appendChild(studioLeftSec_Pre);
                }
            }
            if (studio['name-ja'] == 'エルゴノミックデザインスタジオ') {
                if (target_ergonomics) {//要素があれば
                    studioImageArray.push(studio['photo1'], studio['photo2'], studio['photo3'], studio['photo4'], studio['photo5']);

                    document.getElementById('topBar_ergo').appendChild(studioTitleDiv);
                    document.getElementById('studioLeftSec_ergo').appendChild(studioLeftSec_Pre);
                }
            }
            if (studio['name-ja'] == 'インタラクティブアートスタジオ') {
                if (target_interactive) {//要素があれば
                    studioImageArray.push(studio['photo1'], studio['photo2']);

                    document.getElementById('topBar_interactive').appendChild(studioTitleDiv);
                    document.getElementById('studioLeftSec_interactive').appendChild(studioLeftSec_Pre);
                }
            }
            if (studio['name-ja'] == 'インタフェースデザインスタジオ') {
                if (target_interface) {//要素があれば
                    studioImageArray.push(studio['photo1'], studio['photo2']);

                    document.getElementById('topBar_interface').appendChild(studioTitleDiv);
                    document.getElementById('studioLeftSec_interface').appendChild(studioLeftSec_Pre);
                }
            }
            if (studio['name-ja'] == 'インテリアデザインスタジオ') {

                if (target_interior) {//要素があれば
                    studioImageArray.push(studio['photo1'], studio['photo2']);

                    document.getElementById('topBar_interior').appendChild(studioTitleDiv);
                    document.getElementById('studioLeftSec_interior').appendChild(studioLeftSec_Pre);
                }
            }
            if (studio['name-ja'] == '映像デザインスタジオ') {
                if (target_kinemat) {//要素があれば
                    studioImageArray.push(studio['photo1'], studio['photo2']);

                    document.getElementById('topBar_kinemat').appendChild(studioTitleDiv);
                    document.getElementById('studioLeftSec_kinemat').appendChild(studioLeftSec_Pre);
                }
            }
            if (studio['name-ja'] == 'ネットワークデザインスタジオ') {
                if (target_network) {//要素があれば
                    studioImageArray.push(studio['photo1'], studio['photo2'], studio['photo3']);

                    document.getElementById('topBar_network').appendChild(studioTitleDiv);
                    document.getElementById('studioLeftSec_network').appendChild(studioLeftSec_Pre);
                }
            }
            if (studio['name-ja'] == 'ソフトウェアデザインスタジオ') {
                if (target_software) {//要素があれば
                    studioImageArray.push(studio['photo1'], studio['photo2']);

                    document.getElementById('topBar_software').appendChild(studioTitleDiv);
                    document.getElementById('studioLeftSec_software').appendChild(studioLeftSec_Pre);
                }
            }
            if (studio['name-ja'] == '空間デザインスタジオ') {
                if (target_spatial) {//要素があれば
                    studioImageArray.push(studio['photo1'], studio['photo2']);

                    document.getElementById('topBar_spatial').appendChild(studioTitleDiv);
                    document.getElementById('studioLeftSec_spatial').appendChild(studioLeftSec_Pre);
                }
            }
            if (studio['name-ja'] == 'トランスポーテーションデザインスタジオ') {
                if (target_transportation) {//要素があれば
                    studioImageArray.push(studio['photo1'], studio['photo2']);

                    document.getElementById('topBar_trans').appendChild(studioTitleDiv);
                    document.getElementById('studioLeftSec_trans').appendChild(studioLeftSec_Pre);
                }
            }

            if (studio['name-ja'] == 'ヴィジュアルコミュニケーションデザインスタジオ') {
                if (target_visual) {//要素があれば
                    studioImageArray.push(studio['photo1'], studio['photo2'], studio['photo3'], studio['photo4']);

                    document.getElementById('topBar_visual').appendChild(studioTitleDiv);
                    document.getElementById('studioLeftSec_visual').appendChild(studioLeftSec_Pre);
                }
            }

            //念のためスライドショー以前にも画像を入れる
            console.log(studioImageArray);
            document.getElementById("studioShow-1").src = studioImageArray[0];
            document.getElementById("studioShow-1").src = studioImageArray[1];



        }
    });

    //document.getElementById('result-studio').textContent = JSON.stringify(json, null, 2);//JavaScript のオブジェクトや値を JSON 文字列に変換させて、HTML上のresultというidがついたdivに付与？する。最後の引数は上限が10のスペーシング 変わってんのかわからない
}




const getData = async () => {
    try {
        const response = await fetch(endpoint);
        if (response.ok) {
            let jsonResponse = await response.json();
            renderStudio(jsonResponse);
        }
    }
    catch (error) {
        console.log(error);
    }
}

getData();





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




/*----------------スタジオ画像のスライドショ--------------- ref:http://cya.sakura.ne.jp/java/sshow2.htm*/

var slideCount = -1;		// 現在表示している配列番号
var slideflag = 0;		// どっちを表示して、どっちを消すかのフラグ
function slideChange() {	// スライドショーメイン関数
    slideCount = (slideCount < studioImageArray.length - 1) ? slideCount + 1 : 0;		// 次の配列番号
    slideflag = (slideflag == 0) ? 1 : 0;						// 表示・非表示フラグ反転
    if (slideflag == 0) {
        document.getElementById("studioShow-1").src = studioImageArray[slideCount];		// 次の画像をセットする
        document.getElementById("studioShow-1").className = "fadein";		// フェードイン
        document.getElementById("studioShow-2").className = "fadeout";	// フェードアウト

    } else {
        document.getElementById("studioShow-2").src = studioImageArray[slideCount];		// 次の画像をセットする
        document.getElementById("studioShow-1").className = "fadeout";	// フェードアウト
        document.getElementById("studioShow-2").className = "fadein";		// フェードイン

    }


    setTimeout("slideChange()", 6000);					// 4秒周期に画像を更新する
}

slideChange();

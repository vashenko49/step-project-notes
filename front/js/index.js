import {Authorizatoin} from "./modules/Authorizatoin";
import {Services} from "./modules/Services";

$().ready(function () {

    $('#logout').click(function (e) {
        document.cookie="authorization=0; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
        window.location.reload();
    });

    $('.first-button').on('click', function () {
        $('.animated-icon1').toggleClass('open');
    });
    let authorization = new Authorizatoin();
    let idClient ;
    authorization.CheckCookie('authorization')
        .then(function (res,rej) {
            idClient = res;
            Services.getCard(res)
                .then(function (res, rej){
                    $('#board').append(res);
                })
        });



});
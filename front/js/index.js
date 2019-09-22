import {Authorizatoin} from "./modules/Authorizatoin";
import {Services} from "./modules/Services";

$().ready(function () {

    $('.first-button').on('click', function () {
        $('.animated-icon1').toggleClass('open');
    });
    let authorization = new Authorizatoin();
    let idClient;

    authorization.CheckCookie('authorization')
        .then(function (res,rej) {
            Services.getCard(res)
                .then(function (res, rej){
                    $('#board').append(res);
                    console.log(res);
                })
        });



});
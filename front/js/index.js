import {UsuallCard} from "./modules/UsuallCard";
import {Authorizatoin} from "./modules/Authorizatoin";

$().ready(function () {

    $('.first-button').on('click', function () {
        $('.animated-icon1').toggleClass('open');
    });
    let authorization = new Authorizatoin();
    let idClient = authorization.CheckCookie('authorization');

    console.log(idClient);
});
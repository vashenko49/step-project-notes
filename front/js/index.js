import {Authorizatoin} from "./modules/Authorizatoin";
import {Services} from "./modules/Services";
import {Card} from "./modules/Card";


$().ready(function () {

    $('#logout').click(Services.LogOut);
    let authorization = new Authorizatoin();
    let idClient;

    authorization.CheckCookie('authorization')
        .then(function (res,rej) {
            idClient = res;
            Services.getCard(res)
                .then(function (res, rej){
                    $('#board').append(res);
                })
        });

    $(document).on('click',".buttonCards", Card.eventOnButton);

});
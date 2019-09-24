import {Authorizatoin} from "./modules/Authorizatoin";
import {Services} from "./modules/Services";
import {Card} from "./modules/Card";
import {CreateList} from "./modules/CreateList"
import {UsuallCard} from "./modules/UsuallCard";
import {CheckBoxCard} from "./modules/CheckBoxCard";


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

    $(document).on('click',"#addNewItemList", CreateList.addItemList);
    $(document).on('click',"#removeItemList", CreateList.removeItemList);
    $(document).on('click',"#btnCreateListForm", CreateList.createListCard);


    $(document).on('click',".UsuallCard .more-information", UsuallCard.MoreUsualCard);
    //
    $(document).on('click',".CheckBoxCard .more-information", CheckBoxCard.MoreCheckBoxCard);
});
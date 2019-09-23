import {Authorizatoin} from "./modules/Authorizatoin";
import {Services} from "./modules/Services";
import {Card} from "./modules/Card";
<<<<<<< HEAD
import { CreateList } from "./modules/CreateList"
=======
import {UsuallCard} from "./modules/UsuallCard";
import {CheckBoxCard} from "./modules/CheckBoxCard";
>>>>>>> a3d21e050d6ab53592e1124375583a4421ad2e6b


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


<<<<<<< HEAD
    $(document).on('click',"#addNewItemList", CreateList.addItemList);
    $(document).on('click',"#removeItemList", CreateList.removeItemList);

=======
    $(document).on('click',".UsuallCard .remove-card", UsuallCard.RemoveUsualCard);
    $(document).on('click',".UsuallCard .change-card", UsuallCard.ChangeUsualCard);
    $(document).on('click',".UsuallCard .more-information", UsuallCard.MoreUsualCard);
    //
    $(document).on('click',".CheckBoxCard .remove-card", CheckBoxCard.RemoveCheckBoxCard);
    $(document).on('click',".CheckBoxCard .change-card", CheckBoxCard.ChangeCheckBoxCard);
    $(document).on('click',".CheckBoxCard .more-information", CheckBoxCard.MoreCheckBoxCard);
>>>>>>> a3d21e050d6ab53592e1124375583a4421ad2e6b
});
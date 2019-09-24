import {Card} from "./Card";

export class CheckBoxCard  extends Card{
    static RemoveCheckBoxCard(event){
        event.preventDefault();

        $.ajax({
            type: 'DELETE',
            url: `/api/list/${window.location.pathname.split('/')[2]}`
        }).done(function(res){
            window.location = '/';
        }).fail(function(err) {
            throw new Error(err);
        })
    }
    static MoreCheckBoxCard(){
        window.location.href = `list/${ $(this).parent().attr('id') }`;

    }
    static ChangeCheckBoxCard(event){
        console.log('check change');

    }
}
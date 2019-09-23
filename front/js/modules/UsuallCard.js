import {Card} from "./Card";

export class UsuallCard extends Card{

    static RemoveUsualCard(event){
        console.log('usual rem');
    }
    static MoreUsualCard(event){
        console.log('usual more');

    }
    static ChangeUsualCard(event){
        console.log('usual change');

    }
}
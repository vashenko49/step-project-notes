import {Card} from "./Card";

export class UsuallCard extends Card{
    constructor(title,is_img, text){
        super(title, is_img);
        this.text = text;
    }
}
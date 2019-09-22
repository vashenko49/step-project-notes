import {Card} from "./Card";

class UsuallCard extends Card{
    constructor(title,is_img, text){
        super(title, is_img);
        this.text = text;
    }
}
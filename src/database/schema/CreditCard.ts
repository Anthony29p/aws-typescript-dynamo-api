import { prop, getModelForClass, modelOptions } from '@typegoose/typegoose';
import { TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";

@modelOptions({ options: { allowMixed: 0 } })
export class CreditCard extends TimeStamps{

    @prop({ required: false, trim: true})
    card_number: string;

    @prop({ required: false, trim: true})
    cvv: string;

    @prop({ required: false, trim: true })
    expiration_month: string;

    @prop({ required: false, trim: true})
    expiration_year: string;

    @prop({ required: false, trim: true})
    email: string;
}

export const CreditCardModel = getModelForClass(CreditCard)
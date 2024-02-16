import { IColor } from '~/interfaces/IColor';
import { IMotive } from '~/interfaces/IMotive';

export interface IOrderDetails {
    color: IColor;
    motive?: IMotive;
}

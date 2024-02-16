import { IColor } from '~/interfaces/IColor';
import { IMotive } from '~/interfaces/IMotive';

export interface IDesign {
    colorObject: IColor | null;
    motiveObject: IMotive | null;
}

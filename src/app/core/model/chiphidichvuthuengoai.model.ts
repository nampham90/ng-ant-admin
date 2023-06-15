import { Nguonxe } from "./nguonxe.model";
import { Dichvuthuengoai } from "./tmt060_dichvuthuengoai.model";

export interface ChiPhiDVTN {
    id:string,
    soID:string,
    tangbonhaphang?: Nguonxe,
    sotiennhaphang?: number,
    htttnhaphang?: number,
    tentaixenhaphang?: string,
    biensoxenhaphang?: string,
    tangbotrahang?: Nguonxe,
    sotientrahang?: number,
    httttrahang?: number,
    tentaixetrahang?: string,
    biensoxetrahang?: string,
    dichvuxecau?:Dichvuthuengoai,
    sotienxecau?: number,
    htttxecau?: number,
    dichvubocxep?:Dichvuthuengoai,
    sotienbocxep?: number,
    htttbocxep?: number,
    status01?: string,
    status02?: string,
    status03?: string,
    status04?: string,
    status05?: string,

}
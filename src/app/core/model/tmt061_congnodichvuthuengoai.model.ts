import { Dichvuthuengoai } from "./tmt060_dichvuthuengoai.model";

export interface Congnodichvuthuengoai {
    id: string;
    soID: string,
    manhacungcap: Dichvuthuengoai,
    sotien: number;
    ngaylamviec:string;
    status01?: string | null,
    status02?: string | null,
    status03?: string | null,
    status04?: string | null,
    status05?: string | null
}
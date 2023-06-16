import { Dichvuthuengoai } from "./tmt060_dichvuthuengoai.model";

export interface Congnodichvuthuengoai {
    id: string;
    soID: string,
    manhacungcap: Dichvuthuengoai,
    sotien: number;
    ngaylamviec:string;
    stutas01?: string | null,
    stutas02?: string | null,
    stutas03?: string | null,
    stutas04?: string | null,
    stutas05?: string | null
}
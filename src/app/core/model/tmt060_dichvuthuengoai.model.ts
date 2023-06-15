import { TMT050NAME } from "./tmt050_name.model";

export interface Dichvuthuengoai {
    id: string;
    tennhacungcap: string,
    loaidichvu: TMT050NAME,
    sodienthoai: string;
    diachi:string;
    stutas01?: number | null,
    stutas02?: number | null,
    stutas03?: number | null,
    stutas04?: number | null,
    stutas05?: number | null
}
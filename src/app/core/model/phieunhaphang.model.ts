import { ChiPhiDVTN } from "./chiphidichvuthuengoai.model";

export interface Phieunhaphang {
    id?: string;
    soID?: string;
    stt?: number;
    idchuyen?: string | null;
    makh?: string;
    biensoxe?:string | null;
    tiencuoc?: number; // tiền cước
    cpdvtncd?: ChiPhiDVTN;
    ngaynhap?: Date;
    lotrinh?: number;
    tenhang?: string;
    diadiembochang?: string;
    soluong?: number;
    trongluong?: number;
    khoiluong?: number;
    donvitinh?: string,
    makho?: string,
    hinhthucthanhtoan?: string; // hinh thuc thanh toan
    ghichu?: string;
    trangthai?: number;
    iduser?: string;
    tennguoinhan?:string;
    sdtnguoinhan?:string;
    diachinguoinhan?:string;

    nguonxenhaphang?:string;
    sotiennhaphang?: number;
    htttnhaphang?: number; 
    tentaixenhaphang?: string;
    biensoxenhaphang?: string;

    nguonxetrahang?: string;
    sotientrahang?: number;
    httttrahang?: number;
    tentaixetrahang?: string;
    biensoxetrahang?: string;

    xecau?: string;
    sotienxecau?: number;
    htttxecau?: number;

    bocxep?: string;
    sotienbocxep?: number;
    htttbocxep?: number;

    status01?: number;
    status02?: number;
    status03?: number;
    status04?: number;
    status05?: number;
}
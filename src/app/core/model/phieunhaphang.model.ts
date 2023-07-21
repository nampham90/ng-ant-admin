import { ChiPhiDVTN } from "./chiphidichvuthuengoai.model";

export interface Phieunhaphang {
    id?: string;
    soID?: string;
    soODT?: string;
    soODN?: string;
    stt?: number;
    idchuyen?: string | null;
    idchuyenngoai?: string | null;
    makh?: string;
    biensoxe?:string | null;
    tiencuoc?: number; // tiền cước
    cpdvtncd?: ChiPhiDVTN;
    ngaynhapdudinh?: Date;
    ngaynhapthucte?: Date;
    ngayvanchuyen?: Date;
    ngaytrahang?: Date;
    lotrinh?: number;
    tenhang?: string;
    diadiembochang?: string;
    soluong?: number;
    soluongthucte?: number;
    trongluong?: number;
    khoiluong?: number;
    donvitinh?: string,
    makho?: string,
    hinhthucthanhtoan?: string; // hinh thuc thanh toan
    ghichu?: string;
    trangthai?: number;
    chiphidenhang?: number;
    lydodenhang?: string;
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
    status06?: number;
    status07?: number;
    status08?: number;
    status09?: number;
    status10?: number;
    strrsrv1?: string;
    strrsrv2?: string;
    strrsrv3?: string;
    strrsrv4?: string;
    strrsrv5?: string;
    strrsrv6?: string;
    strrsrv7?: string;
    strrsrv8?: string;
    strrsrv9?: string;
    strrsrv10?: string;
    nguoiphathanh?: string;
    soHDTTCN?: string;
}
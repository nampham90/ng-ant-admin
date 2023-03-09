export interface Chitietchuyenngoai {
    id?: string,
    stt: number,
    idchuyenngoai: Object, // mã chyến hàng
    nguonxe: string,
    thongtindonhang: string,
    diadiembochang: string,  // 
    tiencuoc:number,
    tiencuocxengoai: number,

    htttxengoai: string,
    idkhachhang: string,
    htttkhachhang: string,

    tennguoinhan: string,
    sdtnguoinhan: string,
    diachinguoinhan: string,

    status01?: number, // 
    status02?: number, 
    status03?: number, 
    status04?: number,
    status05?: number,
    ghichu?: string
}
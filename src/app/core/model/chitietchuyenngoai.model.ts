import { Chuyenngoai } from "./chuyenngoai.model";
import { Nguonxe } from "./nguonxe.model";
import { User } from "./user.model";

export interface Chitietchuyenngoai {
    id?: string,
    stt: number,
    soid?: string, // id của đơn hàng
    soodn?: string, // số hóa đơn tra cứu chuyến ngoài
    idchuyenngoai: Chuyenngoai | null, // id chuyên ngoài lưu trong db
    nguonxe: Nguonxe | null, // nguồn xe thue
    tenhang: string,
    soluong:number,
    trongluong:number,
    khoiluong:number,
    donvitinh:string,
    diadiembochang: string,  // 
    tiencuoc:number,
    tiencuocxengoai: number,
    htttxengoai: string,
    idkhachhang: string,
    htttkhachhang: string,
    tennguoinhan: string,
    sdtnguoinhan: string,
    diachinguoinhan: string,
    chiphidvtn: number,// tong chi phi dịch vụ thuê ngoài của đơn hàng. mặc định là o
    status01?: number, // 
    status02?: string, 
    status03?: number, 
    status04?: number,
    status05?: number,
    ghichu?: string
}
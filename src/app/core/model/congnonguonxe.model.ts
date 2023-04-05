export interface Congnonguonxe {
    id?: string,
    nguonxe: Object,
    iddonhang: any,  // ngày vận chuyển
    ngaynhap: Date,// ngày dự kiến giao hàng
    biensoxe: string, // biển số xe ngoài
    tentaixe: string, // tài xế
    sodienthoai: string,// điện thoại tài xế
    sotienno: number,
    status01?: number, // 0. chuyến đang hoat động. 1. chuyến đã kết thúc
    status02?: number, 
    status03?: number, 
    status04?: number,
    status05?: number,
    ghichu: string
}
export interface Chuyenngoai {
    id?: string,
    soodn: string,
    hinhthucthanhtoan: string,
    ngaynhap: string,
    ngayvanchuyen: string,  // ngày vận chuyển
    ngaydukiengiaohang: string,// ngày dự kiến giao hàng
    nguonxe: Object,
    biensoxe: string, // biển số xe ngoài
    sdtnguonxe: string, // so dien thoai nguon xe
    tentaixe: string, // tài xế
    sodienthoai: string,// điện thoại tài xế
    listID: [],
    status01?: number, // 0. chuyến đang hoat động. 1. chuyến đã kết thúc
    status02?: number, 
    status03?: number, 
    status04?: number,
    status05?: number,
    ghichu: string
}
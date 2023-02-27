export interface Chuyenngoai {
    id: string,
    ngaynhap: Date,
    ngayvanchuyen: Date,  // ngày vận chuyển
    ngaydukiengiaohang: Date,// ngày dự kiến giao hàng
    nguonxe: Object,
    biensoxe: string, // biển số xe ngoài
    sdtnguonxe: string, // so dien thoai nguon xe
    tentaixe: string, // tài xế
    sodienthoai: string,// điện thoại tài xế
    listdetail: [],
    status01?: Number, // 0. chuyến đang hoat động. 1. chuyến đã kết thúc
    status02?: Number, 
    status03?: Number, 
    status04?: Number,
    status05?: Number,
    ghichu: string
}
import { Phieunhaphang } from "./phieunhaphang.model";
import { User } from "./user.model";
import { Xe } from "./xe.model";

export interface Chuyen {
    id: string;
    soodt?: string;
    ngaydi: Date;
    ngayve:Date;
    tienxe: number; // tiền đưa trước
    biensoxe: Xe;
    idtai: User;
    idphu: User;
    changduong: string; // điểm khởi hành và điểm kết thúc
    trangthai?: number;
    tongchiphi?: number;
    tongcuoc?: number;
    dataListChild?: Phieunhaphang[];
}
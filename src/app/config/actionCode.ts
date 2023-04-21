import { Nguonxe } from '../core/model/nguonxe.model';

/*配置权限码*/
export const ActionCode = {
  /*标签页操作打开详情*/
  TabsDetail: 'default:feat:tabs:example-detail',
  /*查询表格 打开查看*/
  SearchTableDetail: 'default:page-demo:search-table:example-detail',

  /*ActionCode ql Account*/
  AccountAdd: 'default:system:account:add', // 
  AccountEdit: 'default:system:account:edit', // 
  AccountDel: 'default:system:account:del', // 

  /*ActionCode ql role*/
  RoleManagerAdd: 'default:system:role-manager:add', // 
  RoleManagerEdit: 'default:system:role-manager:edit', //
  RoleManagerDel: 'default:system:role-manager:del', // 
  RoleManagerSetRole: 'default:system:role-manager:set-role', // 

  /*ActionCode ql menu*/
  MenuAdd: 'default:system:menu:add', // 
  MenuEdit: 'default:system:menu:edit', // 
  MenuDel: 'default:system:menu:del', // 
  MenuAddLowLevel: 'default:system:menu:addlowlevel', // 

  /*ActionCode ql phong ban*/
  DeptAdd: 'default:system:dept:add', // 
  DeptEdit: 'default:system:dept:edit', //
  DeptDel: 'default:system:dept:del', // 
  DeptAddLowLevel: 'default:system:dept:addlowlevel', //

  /*ActionCode ql datasc*/
  DataScAdd: 'default:system:datasc:add',
  DataScEdit: 'default:system:datasc:edit',
  DataScDel: 'default:system:datasc:del',
  DataScDelAll: 'default:system:datasc:del',

  /* quản lý video hướng dẫn*/
  HuongdanAdd: 'default:system:huongdan:add', 
  HuongdanallDel: 'default:system:huongdan:allDel', 
  HuongdanUpdate: 'default:system:huongdan:update', 

  /* ActionCode ql Xe*/
  XeAdd: 'default:system:quanlyxe:add',
  XeEdit: 'default:system:quanlyxe:update',
  XeDel: 'default:system:quanlyxe:del',

   /* Actioncode ql Chuyen*/
  ChuyenAdd: 'default:chuyen:spch00101:add',
  ChuyenEdit: 'default:chuyen:spch00101:edit',
  ChuyenDel: 'default:chuyen:spch00101:del',
  ChuyenConfirmbochang: 'default:chuyen:spch00101:cbochang',
  ChuyenConfirmtrahang: 'default:chuyen:spch00101:ctrahang',
  ChuyenConfirmchiphi: 'default:chuyen:spch00101:cchiphi',
  ChuyenConfirmend: 'default:chuyen:spch00101:cend',

  // kê hoạch bọc hang
  AddProduct: 'default:chuyen:spch00201:add',
  DelAllProduct: 'default:chuyen:spch00201:delall',
  DelProduct: 'default:chuyen:spch00201:del',
  EditProduct: 'default:chuyen:spch00201:edit',
  SaveProduct: 'default:chuyen:spch00201:save',
  Confirm: 'default:chuyen:spch00201:confirm',
  Confirmbochang: 'default:chuyen:spch00201:cbochang',
  Confirmtrahang: 'default:chuyen:spch00201:ctrahang',

  // công nợ
  KhachhangEdit: 'default:khachhang:spkh00101:edit',
  KhachhangTattoan: 'default:khachhang:spkh00101:tattoan',

  // chi tiết công nợ
  CtcnTattoan: 'default:khachhang:spkh00201:tattoan',
  CtcnThantoanmotphan: 'default:khachhang:spkh00201:thanhtoanmotphan',
  CtcnThanhtoan: 'default:khachhang:spkh00201:thanhtoan',
  CtcnDuyetThanhtoan: 'default:khachhang:spkh00201:duyetthanhtoan',
  CtcnXuatPDF: 'default:khachhang:spkh00201:xuatpdf',

  // nguon xe
  Nguonxeadd: 'default:system:quanlynguonxe:add',
  Nguonxedel: 'default:system:quanlynguonxe:del',
  Nguonxeupdate: 'default:system:quanlynguonxe:update',
  Nguonxethemxe: 'default:system:quanlynguonxe.themxe',
  Nguonxethemtaixe: 'default:system:quanlynguonxe.themtaixe',

  // chuyến ngoài
  ChuyenngoaiAdd: 'default:chuyen:spch00251:add',
  ChuyenngoaiEdit: 'default:chuyen:spch00251:update',
  ChuyenngoaiDel: 'default:chuyen:spch00251:del',
  ConfirmChuyenngoai: 'default:chuyen:spch00251:confirm',

  // tim kiem chuyen ngoai
  TimkiemchuyenngoaiAdd : 'default:chuyen:spch00252:add',
  TimkiemchuyenngoaiDelete : 'default:chuyen:spch00252:delete',
  TimkiemchuyenngoaiUpdate : 'default:chuyen:spch00252:update',
  TimkiemchuyenngoaiExportPdf : 'default:chuyen:spch00252:exportpdf',
  // thu hồi biên lai
  Thohoibienlai: 'default:chuyen:spch00253:thuhoibienlai',

  // công nợ chuyến ngaoif
  Thanhtoan: 'default:chuyen:spch00254:thanhtoan',
  Xuatpdf: 'default:chuyen:spch00254:xuatpdf',

  // thanh toan chuyen ngoai
  Thanhtoanchuyenngoai : 'default:chuyen:spch00255:thanhtoan',
  Xuatpdfchuyenngoai : 'default:chuyen:spch00255:xuatpdf',

  // quan ly kho spin00901
  QuanlykhoUpdate: 'default:trongkho:spin00901:update',
  QuanlykhoAdd: 'default:trongkho:spin00901:add',
  QuanlykhoDel: 'default:trongkho:spin00901:del',
  QuanlykhoallDel: 'default:trongkho:spin00901:delall',

  // nhap hang spin00251
  Spin00251Add: 'default:trongkho:spin00251:add',
  Spin00251Delall: 'default:trongkho:spin00251:delall',
  Spin00251Confirm: 'default:trongkho:spin00251:confirm',
  Spin00251Update: 'default:trongkho:spin00251:update',
  Spin00251Del: 'default:trongkho:spin00251:del',
  Spin00251Copy: 'default:trongkho:spin00251:copy',

  // huy nhap hang spin00801
  Spin00801DeleteMany: 'default:trongkho:spin00801:deletemany',
  Spin00801Delete: 'default:trongkho:spin00801:delete',

  // spin00601 xuât hang
  Spin00601Xuathang: 'default:trongkho:spin00601:xuathang',
  Spin00601Xuatnhieudon: 'default:trongkho:spin00601:xuatnhieudon',
  Spin00601Xuatxengoai: 'default:trongkho:spin00601:xuatxengoai',

};

export const  dateFormat= 'yyyy/MM/dd';
export const  idTaixe = "636cf775974c56587047691e";
export const  idKhachhang = "632ebaf77e9ad9aeef4e3d27";

// đợn vi sở hưu
export const doanhnghiep = "HLXV"

export const  tinhthanhApi = "https://provinces.open-api.vn/api/?depth=2";

export const  Hinhthucthanhtoan = [
    { "value": "1", "lable": "Trực tiếp"},
    { "value": "2", "lable": "Ghi nợ"},
    { "value": "3", "lable": "Khi nhận hàng"}
];

export const Lotrinh = [
    {"0": "Hàng đi"},
    {"1": "Hàng về"},
]

// type notifi
export const System = 'system';
export const Notifi = 'notifi';
export const Vison = 'vison';

export const listTrangthaichuyen = [
    { "value": 0, "lable": "Lên kế hoạch bóc hàng"},
    { "value": 1, "lable": "Hoàn thành bóc hàng"},
    { "value": 2, "lable":"Hoàn thành trả hàng"},
    { "value": 3, "lable":"Tính chi phí"},
    { "value": 4, "lable":"Kết thúc chuyến hàng"},
    { "value": 5, "lable":"Hoàn thành chuyến hàng"},
]

export const lstchiphi = [
   {"idchuyen": "", "tenchiphi": "Tiền ăn", "sotien": 0, "ghichu": ""},
   {"idchuyen": "", "tenchiphi": "Tiền bãi", "sotien": 0, "ghichu": ""},
   {"idchuyen": "", "tenchiphi": "Tiền dầu", "sotien": 0, "ghichu": ""},
   {"idchuyen": "", "tenchiphi": "Sữa chữa", "sotien": 0, "ghichu": ""},
   {"idchuyen": "", "tenchiphi": "Cầu đường", "sotien": 0, "ghichu": ""},
   {"idchuyen": "", "tenchiphi": "Công an", "sotien": 0, "ghichu": ""},
   {"idchuyen": "", "tenchiphi": "Lương Tài", "sotien": 0, "ghichu": ""},
   {"idchuyen": "", "tenchiphi": "Lương Phụ", "sotien": 0, "ghichu": ""},
   {"idchuyen": "", "tenchiphi": "Chi phí khác", "sotien": 0, "ghichu": ""}
]

export const headerLayout = [
    {"field": "", "value": ""},
    {"field": "", "value": ""},
    {"field": "", "value": ""},
    {"field": "", "value": ""},
    {"field": "", "value": ""}
 ]

export const headerLayout2 = [
    {"field": "", "value": ""},
    {"field": "", "value": ""},
    {"field": "", "value": ""},
    {"field": "", "value": ""},
    {"field": "", "value": ""}
]

export const rootbase = '/default/';
export const mobilebase = '/mobile/';

//common
export const CommonAnt100Listtaichinh = "common/commonAnt100Listloinhanthang";
export const CommonAnt100Thongketaichinhnam = "common/commonAnt100Thongketaichinhnam";
export const CommonAnt100Tongchuyenhangtrongnam = "common/commonAnt100Tongchuyenhangtrongnam";
export const CommonAnt100Tongnoall = "common/commonAnt100Tongnoall";
export const CommonAnt100Listtopdoanhthu = "common/commonAnt100Listtopdoanhthu";
export const CommonAnt100Listtopchiphi = "common/commonAnt100Listtopchiphi";
export const CommonAnt100Listtoptongcuoctungxe = "common/commonAnt100Listtongcuoctungxe";
export const CommonAnt100GetODS = "common/commonAnt100GetODS";
export const CommonAnt100GetODT = "common/commonAnt100GetODT";
export const CommonAnt100GetODC = "common/commonAnt100getODC";
export const CommonAnt100GetHDTTXN = "common/commonAnt100getHDTTXN";

export const CommonAnt100Tongnoxengoai = 'common/commonAnt100Tongnoxengoai';

// tmt101. master
export const Tmt101Ant100Create = 'tmt101/tmt101Ant100Create';
export const Tmt101Ant100Update = 'tmt101/tmt101Ant100Update';
export const Tmt101Ant100Detail = 'tmt101/tmt101Ant100Detail';
export const Tmt101Ant100GetDetail = 'tmt101/tmt101Ant100GetDetail';
export const Tmt101Ant100Searchparam = 'tmt101/tmt101Ant100Searchparam';
export const Tmt101Ant100FindAll = 'tmt101/tmt101Ant100FindAll';


//role
export const Ant100SearchAllRole = "role/ant100SearchAllRole";
export const Ant100GetSearchAllRole = "role/ant100GetSearchAllRole";
export const Ant100GetDetailRole = "role/ant100GetDetailRole";
export const Ant100EditDetailRole = "role/ant100EditDetailRole";
export const Ant100AddDetailRole ="role/ant100AddDetailRole";
export const Ant100DelDetailRole ="role/ant100DelDetailRole";
export const Ant100GetPermissionRole ="role/ant100GetpermissionRole";
export const Ant100PutPermissionRole ="role/ant100PutpermissionRole";

//menu
export const Ant100SearchFatherMenu = "menu/ant100SearchFatherMenu";
export const Ant100AddMenu = "menu/ant100AddMenu";
export const Ant100EditMenu = "menu/ant100EditMenu";
export const Ant100DelMenu = "menu/ant100DelMenu"; 
export const Ant100PostDetailMenu = "menu/ant100PostDetailMenu";
export const Ant100ListMenu = "menu/ant100ListMenu";
export const Ant100ListMenuParams = "menu/ant100ListMenuParams";
export const Ant100PostUrlParams = "menu/ant100PostUrlParams";

//phong ban
export const Ant100addPhongban = "phongban/ant100addPhongban";
export const Ant100editPhongban = "phongban/ant100editPhongban";
export const Ant100delPhongban = "phongban/ant100delPhongban";
export const Ant100getAllPhongban = "phongban/Ant100getAllPhongban";
export const Ant100getIdPhongban = "phongban/ant100getIdPhongban";

//User account
export const Ant100findAllUser = "user/ant100SearchAllUser";
export const Ant100GetDetailUser = "user/ant100GetDetailUser";
export const Ant100EditDetailUser = "user/ant100EditDetailUser";
export const Ant100AddDetailUser ="user/ant100AddDetailUser";
export const Ant100CheckEmailUser = "user/ant100CheckEmailUser";
export const Ant100CheckNameUser = "user/ant100CheckNameUser";

// data SC
export const Ant100findAllDatasc = "screenpc/ant100SearchAllDatasc";
export const Ant100AddListDatasc = "screenpc/ant100AddListDatasc";
export const Ant100DelDatasc = "screenpc/ant100DelDatasc";
export const Ant100EditDatasc = "screenpc/ant100EditDatasc";

// nhật ký hệ thống
export const NhatkyhethongfindType = "nhatkyhethong/nhatkyhethongAnt100getAll"





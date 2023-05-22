
import { DOCUMENT } from '@angular/common';
import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, Input, Inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map, mergeMap, share, switchMap, takeUntil, tap } from 'rxjs/operators';

import { DestroyService } from '@core/services/common/destory.service';
import { TabService } from '@core/services/common/tab.service';
import { Menu } from '@core/services/types';
import { MenuStoreService } from '@store/common-store/menu-store.service';
import { SplitNavStoreService } from '@store/common-store/split-nav-store.service';
import { ThemeService } from '@store/common-store/theme.service';
import { UserInfoService } from '@store/common-store/userInfo.service';
import { fnStopMouseEvent } from '@utils/tools';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DestroyService]
})
export class NavBarComponent implements OnInit {
  // Đây là thanh điều hướng phía trên trong chế độ kết hợp
  @Input() isMixiHead = false;
  @Input() isMixiLeft = false;
  routerPath = this.router.url;
  themesMode: 'side' | 'top' | 'mixi' = 'side';
  themesOptions$ = this.themesService.getThemesMode();
  isNightTheme$ = this.themesService.getIsNightTheme();
  isCollapsed$ = this.themesService.getIsCollapsed();
  isOverMode$ = this.themesService.getIsOverMode();
  leftMenuArray$ = this.splitNavStoreService.getSplitLeftNavArrayStore();
  isOverMode = false;
  isCollapsed = false;
  isMixiMode = false;
  leftMenuArray: Menu[] = [];
  menus: Menu[] = [];
  copyMenus: Menu[] = [];
  authCodeArray: string[] = [];
  subTheme$: Observable<any>;

  constructor(
    private router: Router,
    private destroy$: DestroyService,
    private userInfoService: UserInfoService,
    private menuServices: MenuStoreService,
    private splitNavStoreService: SplitNavStoreService,
    private activatedRoute: ActivatedRoute,
    private tabService: TabService,
    private cdr: ChangeDetectorRef,
    private themesService: ThemeService,
    private titleServe: Title,
    @Inject(DOCUMENT) private doc: Document
  ) {
    this.initMenus();

    this.subTheme$ = this.isOverMode$.pipe(
      switchMap(res => {
        this.isOverMode = res;
        return this.themesOptions$;
      }),
      tap(options => {
        this.themesMode = options.mode;
        this.isMixiMode = this.themesMode === 'mixi';
      }),
      share(),
      takeUntil(this.destroy$)
    );

    // Lắng nghe nguồn dữ liệu của menu bên trái trong chế độ kết hợp
    this.subMixiModeSideMenu();
    //  Lắng nghe sự kiện gập menu
    this.subIsCollapsed();
    this.subAuth();
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        tap(() => {
          this.subTheme$.subscribe(() => {
            //  Chuyển đổi sang chế độ kết hợp, thiết lập nguồn dữ liệu của menu bên trái
            // Nếu đặt trong ngOnInit, sau khi làm mới trang và chuyển đổi định tuyến trong chế độ kết hợp, sẽ chạy ra khỏi Angular
            if (this.isMixiMode) {
              this.setMixModeLeftMenu();
            }
          });
          // @ts-ignore
          this.routerPath = this.activatedRoute.snapshot['_routerState'].url;
          this.clickMenuItem(this.menus);
          this.clickMenuItem(this.copyMenus);
          //  Nếu là menu đã gập và không phải là menu kiểu over, giải quyết lỗi hiển thị menu lơ lửng khi gập menu bên trái và chuyển tab
          if (this.isCollapsed && !this.isOverMode) {
            this.closeMenuOpen(this.menus);
          }

          // Nếu là chế độ menu phía trên và không phải là chế độ over, giải quyết lỗi hiển thị menu lơ lửng khi chuyển tab trong chế độ menu phía trên 
          if (this.themesMode === 'top' && !this.isOverMode) {
            this.closeMenu();
          }
        }),
        map(() => this.activatedRoute),
        map(route => {
          while (route.firstChild) {
            route = route.firstChild;
          }
          return route;
        }),
        filter(route => {
          return route.outlet === 'primary';
        }),
        mergeMap(route => {
          return route.data;
        }),
        takeUntil(this.destroy$)
      )
      .subscribe(routeData => {
        // Xem xem trang chi tiết có được mở trong tab mới hay không
        let isNewTabDetailPage = routeData['newTab'] === 'true';
        this.tabService.addTab(
          {
            title: routeData['title'],
            path: this.routerPath,
            relatedLink: routeData['relatedLink'] ? routeData['relatedLink'] : []
          },
          isNewTabDetailPage
        );
        this.tabService.findIndex(this.routerPath);
        this.titleServe.setTitle(`${routeData['title']} - Ant Design`);
        // Trong chế độ kết hợp, khi chuyển tab, cho phép menu bên trái thay đổi tương ứng
        this.setMixModeLeftMenu();
      });
  }

  initMenus(): void {
    this.menuServices
      .getMenuArrayStore()
      .pipe(takeUntil(this.destroy$))
      .subscribe(menusArray => {
        this.menus = menusArray;
        this.copyMenus = this.cloneMenuArray(this.menus);
        this.clickMenuItem(this.menus);
        this.clickMenuItem(this.copyMenus);
        this.cdr.markForCheck();
      });
  }

  //Thiết lập nguồn dữ liệu cho chế độ "tự động chia menu" khi chuyển sang chế độ kết hợp
  setMixModeLeftMenu(): void {
    this.menus.forEach(item => {
      if (item.selected) {
        this.splitNavStoreService.setSplitLeftNavArrayStore(item.children!);
      }
    });
  }

  // Sao chép mảng menu bằng cách sao chép sâu
  cloneMenuArray(sourceMenuArray: Menu[], target: Menu[] = []): Menu[] {
    sourceMenuArray.forEach(item => {
      const obj: Menu = { menuName: '', menuType: 'C', path: '', id: -1, fatherId: -1 };
      for (let i in item) {
        if (item.hasOwnProperty(i)) {
          // @ts-ignore
          if (Array.isArray(item[i])) {
            // @ts-ignore
            obj[i] = this.cloneMenuArray(item[i]);
          } else {
            // @ts-ignore
            obj[i] = item[i];
          }
        }
      }
      target.push({ ...obj });
    });
    return target;
  }

  //Khi nhấp vào menu cấp 1 trong chế độ kết hợp, đảm bảo rằng menu con đầu tiên của menu cấp 1 được chọn
  changTopNav(index: number): void {
    // Đối tượng menu cấp 1 hiện tại đang được chọn 
    const currentTopNav = this.menus[index];
    if (currentTopNav.children && currentTopNav.children.length > 0) {
      // Mảng điều hướng bên trái hiện tại
      /*Thêm phiên bản có quyền truy cập*/
      let currentLeftNavArray = currentTopNav.children;
      currentLeftNavArray = currentLeftNavArray.filter(item => {
        return this.authCodeArray.includes(item.code!);
      });
      if (currentLeftNavArray.length > 0 && !currentLeftNavArray[0].children) {
        this.router.navigateByUrl(currentLeftNavArray[0].path!);
      } else if (currentLeftNavArray.length > 0 && currentLeftNavArray[0].children) {
        this.router.navigateByUrl(currentLeftNavArray[0].children[0].path!);
      }
      this.splitNavStoreService.setSplitLeftNavArrayStore(currentLeftNavArray);
      /*Kết thúc phiên bản có quyền truy cập*/
      /*Phần chú thích là phiên bản không có quyền truy cập*/
      // const currentLeftNavArray = currentTopNav.children;
      // if (!currentLeftNavArray[0].children) {
      //   this.router.navigateByUrl(currentLeftNavArray[0].path!);
      //   this.splitNavStoreService.setSplitLeftNavArrayStore(currentLeftNavArray);
      // } else {
      //   this.router.navigateByUrl(currentLeftNavArray[0].children[0].path!);
      //   this.splitNavStoreService.setSplitLeftNavArrayStore(currentLeftNavArray);
      // }
    }
  }

  flatMenu(menus: Menu[], routePath: string): void {
    menus.forEach(item => {
      item.selected = false;
      item.open = false;
      if (routePath.includes(item.path) && !item.newLinkFlag) {
        item.selected = true;
        item.open = true;
      }
      if (!!item.children && item.children.length > 0) {
        this.flatMenu(item.children, routePath);
      }
    });
  }

  clickMenuItem(menus: Menu[]): void {
    if (!menus) {
      return;
    }
    const index = this.routerPath.indexOf('?') === -1 ? this.routerPath.length : this.routerPath.indexOf('?');
    const routePath = this.routerPath.substring(0, index);
    this.flatMenu(menus, routePath);
    this.cdr.markForCheck();
  }

  // Thay đổi trạng thái hiển thị của menu hiện tại
  changeOpen(currentMenu: Menu, allMenu: Menu[]): void {
    allMenu.forEach(item => {
      item.open = false;
    });
    currentMenu.open = true;
  }

  closeMenuOpen(menus: Menu[]): void {
    menus.forEach(menu => {
      menu.open = false;
      if (menu.children && menu.children.length > 0) {
        this.closeMenuOpen(menu.children);
      } else {
        return;
      }
    });
  }

  changeRoute(e: MouseEvent, menu: Menu): void {
    if (menu.newLinkFlag) {
      fnStopMouseEvent(e);
      window.open(menu.path, '_blank');
      return;
    }
    this.router.navigate([menu.path]);
  }

  // Lắng nghe sự kiện gập menu
  subIsCollapsed(): void {
    this.isCollapsed$.subscribe(isCollapsed => {
      this.isCollapsed = isCollapsed;
      // Mở rộng menu 
      if (!this.isCollapsed) {
        this.menus = this.cloneMenuArray(this.copyMenus);
        this.clickMenuItem(this.menus);
        //  Trong chế độ kết hợp, phải nhấp vào nguồn dữ liệu của menu bên trái một lần nữa, nếu không, các menu cấp 2 sẽ không mở ra khi chuyển từ trạng thái gập sang mở
        if (this.themesMode === 'mixi') {
          this.clickMenuItem(this.leftMenuArray);
        }
      } else {
        // Thu gọn menu
        this.copyMenus = this.cloneMenuArray(this.menus);
        this.closeMenuOpen(this.menus);
      }
      this.cdr.markForCheck();
    });
  }

  closeMenu(): void {
    this.clickMenuItem(this.menus);
    this.clickMenuItem(this.copyMenus);
    this.closeMenuOpen(this.menus);
  }

  subAuth(): void {
    this.userInfoService
      .getUserInfo()
      .pipe(takeUntil(this.destroy$))
      .subscribe(res => (this.authCodeArray = res.authCode));
  }

  //  Lắng nghe nguồn dữ liệu của menu bên trái trong chế độ kết hợp
  private subMixiModeSideMenu(): void {
    this.leftMenuArray$.pipe(takeUntil(this.destroy$)).subscribe(res => {
      this.leftMenuArray = res;
    });
  }

  ngOnInit(): void {
    // Khi ở chế độ menu phía trên, phải đóng trạng thái mở của menu
    this.subTheme$.subscribe(options => {
      if (options.mode === 'top' && !this.isOverMode) {
        this.closeMenu();
      }
    });
  }
}

/* eslint-disable prettier/prettier */
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { BaseHttpService } from '@services/base-http.service';
export interface DownLoadObj {
  downloadUrl: string;
}

@Injectable({
  providedIn: 'root'
})
export class DownloadService {
  constructor(public http: BaseHttpService) {}

  public fileStreamDownload(downloadDto: DownLoadObj): Observable<string> {
    return this.http.downZip('/file/download/document', downloadDto, { needSuccessInfo: false });
  }
}

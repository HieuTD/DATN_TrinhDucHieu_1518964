import { HttpClient } from "@angular/common/http";
import { Injectable, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { environment } from "../../../../../environments/environment";
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { Workbook } from 'exceljs';
import * as fs from 'file-saver';
import { DatePipe } from '@angular/common';
import { Observable } from "rxjs";
@Injectable({
  providedIn: 'root'
})
export class OrderService {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  public dataSource = new MatTableDataSource<HoaDonUser>();
  hoadon: HoaDonUser = new HoaDonUser()
  cthdViewModel: CTHDViewModel = new CTHDViewModel()
  constructor(public http: HttpClient,private datePipe: DatePipe) { }
  get():Observable<any> {
    // return this.http.get<any>(environment.URL_API + "hoadons")
    return this.http.get<any>("https://localhost:44391/api/" + "orders")
  }
  delete(id: number) {
    // return this.http.delete(`environment.URL_API + "hoadons"/${id}`)
    return this.http.delete(`"https://localhost:44391/api/" + "orders"/${id}`)
  }
  put(hd:any):Observable<any>{
    // return this.http.put<any>(environment.URL_API+"hoadons/suatrangthai/"+this.hoadon.id,hd)
    return this.http.put<any>("https://localhost:44391/api/"+"orders/updatestatus/"+this.hoadon.id,hd)
  }
  getMotHoaDonService(id:number):Observable<any>{
    // return this.http.get<any>(environment.URL_API + "hoadons/admindetailorder/"+id)
    return this.http.get<any>("https://localhost:44391/api/" + "orders/adminorderdetail/"+id)
  }
  getAllHoaDons() {
    this.get().subscribe(
      res => {
        this.dataSource.data = res as HoaDonUser[];
        console.log(this.dataSource.data);
      }
    )
  }
}
export class HoaDonUser{
  id: number = 0
  id_User: string
  ngayTao:string
  ghiChi: string //Ghi chú
  tongTien: number
  fullName: string
  daLayTien:string
  status:number
}
export class CTHDViewModel {
  idCTHD: number
  soLuong: number
  tenSanPham: string
  hinhAnh: string
  gia: number
  tenMau: string
  tenSize: string
  thanhTien: number
  id_HoaDon: number
}

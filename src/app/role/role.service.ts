import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { BaseService } from '../core/base.service';
import { LoggerService } from '../services/logger.service';

const routes ={
  roles: '',
  permission: '',
  rolePermission: '',
};

@Injectable({
  providedIn: 'root'
})

export class RoleService extends BaseService<any>{

  constructor(public override httpClient: HttpClient, private authService: AuthService) {
    super(httpClient);
  }

  getPermissions(roleId:number, merchantCode:string){
    return this.sendGet(`${routes.rolePermission}/${roleId}/permissions/${merchantCode}`);
  }

  getRolePermissions(roleId:number, merchantCode:string, pageNumber:number, pageSize:number){
    return this.sendGet( `${routes.rolePermission}/${roleId}/merchant/${merchantCode}`, {params: {pageNumber, pageSize}});
  }

  addRolePermissions(payload:{canAdd:string;candEdit:string; canRead:string; canDelete:string}, merchantCode:string){
    return this.sendPost( `${routes.rolePermission}/${merchantCode}`, payload);
  }
  updateRolePermissions(payload:{canAdd:string;candEdit:string; canRead:string; canDelete:string}, params:{id:number; merchantCode:string}){
    return this.sendPut( `${routes.rolePermission}/${params.id}/merchant/${params.merchantCode}`, payload);
  }

  activateRolePermission(data: {id:string, merchantCode:string}){
    return this.sendPut( `${routes.rolePermission}/activate/${data.id}/merchant/${data.merchantCode}`, data, );
  }

  deactivateRolePermission(data: {id:string, merchantCode:string}){
    return this.sendPut( `${routes.rolePermission}/deactivate/${data.id}/merchant/${data.merchantCode}`, data, );
  }


  addRole(data:any, params: {merchantCode:string;}){
    return this.sendPost( `${routes.roles}/${params.merchantCode}`, data);
  }

  update(data:any, params: {id:number; merchantCode:string}){
    return this.sendPut( `${routes.roles}/${params.id}/${params.merchantCode}`, data, );
  }

  activateStatus(data: {id:string, merchantCode:string}){
    return this.sendPut( `${routes.roles}/${data.id}/activate/${data.merchantCode}`, data, );
  }

  deactivateStatus(data: {id:string, merchantCode:string}){
    return this.sendPut( `${routes.roles}/${data.id}/deactivate/${data.merchantCode}`, data, );
  }

  getRolesbyMerchantCode(merchantCode:string, pageNumber = 1, pageSize = 20){
    return this.sendGet(`${routes.roles}/${merchantCode}`, {params: {
      pageNumber,
      pageSize
    }});
  }
  getAllRolesbyMerchantCode(merchantCode:string){
    return this.sendGet(`${routes.roles}/${merchantCode}`);
  }
  getUserRolePermissionbyMerchantCode(merchantCode:string){
    return this.sendGet(`${routes.rolePermission}/user/${merchantCode}`);
  }

  getUserRolesbyMerchantCode(merchantCode:string, userId:string){
    return this.sendGet(`${routes.roles}/user/${userId}/${merchantCode}`);
  }
}

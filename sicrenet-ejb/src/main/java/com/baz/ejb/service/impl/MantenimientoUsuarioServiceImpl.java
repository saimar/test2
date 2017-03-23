package com.baz.ejb.service.impl;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.inject.Named;

import com.baz.commons.util.ExcepcionSicrenet;
import com.baz.commons.vo.PaisVO;
import com.baz.commons.vo.RolesVO;
import com.baz.commons.vo.UsuarioPaisVO;
import com.baz.commons.vo.UsuariosVO;
import com.baz.dao.MantenimientoUsuarioDao;

import com.baz.ejb.service.MantenimientoUsuarioService;


@Stateless(name="mantenimientoUsuarioServiceImpl")
public class MantenimientoUsuarioServiceImpl implements MantenimientoUsuarioService, Serializable {
	
	
	
	@Inject 
	@Named("mantenimientoUsuarioDaoImpl")
	MantenimientoUsuarioDao mantenimientoUsuarioDao;
	
	private static final long serialVersionUID = 1L;
	private UsuarioPaisVO validaExiste ;

	@Override
	public List<UsuariosVO> getUsers() throws ExcepcionSicrenet{
		UsuariosVO users = new UsuariosVO();
		List<UsuariosVO> listUsers =new  ArrayList<UsuariosVO>();
		
		listUsers=mantenimientoUsuarioDao.getUsers();
		
		return listUsers;
	}

	
	public void agregaUser(UsuariosVO AgregarUsuarios, RolesVO rol, int bloqueo, String usuario, PaisVO pais, List<String> listaIdPais) throws ExcepcionSicrenet {
		mantenimientoUsuarioDao.agregaUsers(AgregarUsuarios, rol, bloqueo, usuario, pais, listaIdPais);
		
	}

	
	public void actualizaUser(UsuariosVO ActualizaUsuarios, RolesVO rol, int bloqueo, String usuario, PaisVO pais, List<String> listaIdPaisActualiza, int estatus) throws ExcepcionSicrenet {
		mantenimientoUsuarioDao.actualizaUsers(ActualizaUsuarios, rol, bloqueo, usuario, pais);
		
		
		for( int i = 0; i < listaIdPaisActualiza.size(); i++){
			validaExiste = 	mantenimientoUsuarioDao.ValidaExisteEditarMantoUP(ActualizaUsuarios, listaIdPaisActualiza.get(i));
		System.out.println("MantenimientoUserServiceImpl::::actualizaUsuarios:::EstatusExistePais::::" + validaExiste.getEstatus());

		if(validaExiste.getEstatus() == 0){
					mantenimientoUsuarioDao.EditarMantoUsuarioPaisInserta(2, ActualizaUsuarios, listaIdPaisActualiza.get(i), estatus);
				System.out.println("MantenimientoUserServiceImpl::::actualizaUsuarios:::EstatusExistePais::::noooo");
		
		}else{
			mantenimientoUsuarioDao.EditarMantoUsuarioPais(3, ActualizaUsuarios, listaIdPaisActualiza, estatus);
			System.out.println("MantenimientoUserServiceImpl::::actualizaUsuarios:::EstatusExistePais::::: siiiii");
		}
			
			}
		
		
		
	}


	
	public List<RolesVO> CargaRoles() throws ExcepcionSicrenet{
		List<RolesVO> listRoles =new  ArrayList<RolesVO>();
		
		listRoles=mantenimientoUsuarioDao.CargaRoles();
		
		return listRoles;
	}

	
	public UsuariosVO cargarUsuariosExisteAgregar(UsuariosVO existeAgregar) throws ExcepcionSicrenet {
		UsuariosVO users = new UsuariosVO();
		users=mantenimientoUsuarioDao.cargarUsuariosExisteAgregar(existeAgregar);
		return users;
	}

	
	public UsuariosVO cargarUsuariosExisteActualiza(UsuariosVO existeAgregar) throws ExcepcionSicrenet {
		UsuariosVO users = new UsuariosVO();
		users=mantenimientoUsuarioDao.cargarUsuariosExisteActualiza(existeAgregar);
		return users;
	}


	
	public List<PaisVO> CargaPais() throws ExcepcionSicrenet {
		List<PaisVO> listPaisVO=new  ArrayList<PaisVO>();
		
		listPaisVO=mantenimientoUsuarioDao.CargaPais();
		
		return listPaisVO;
	}


	@Override
	public List<UsuarioPaisVO> CargaUsuarioPais(int opcion, String numEmpleado, int estatus) throws ExcepcionSicrenet {
		List<UsuarioPaisVO> listUsuarioPaisVO=new  ArrayList<UsuarioPaisVO>();
		listUsuarioPaisVO=mantenimientoUsuarioDao.CargaUsuarioPais(opcion, numEmpleado, estatus);
		return listUsuarioPaisVO;
	}


	public UsuarioPaisVO getValidaExiste() {
		return validaExiste;
	}


	public void setValidaExiste(UsuarioPaisVO validaExiste) {
		this.validaExiste = validaExiste;
	}

	

	
	
	
	

	

	
	

	
	
	
}

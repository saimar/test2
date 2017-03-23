package com.baz.ejb.service;

import java.util.List;

import javax.ejb.Remote;

import com.baz.commons.util.ExcepcionSicrenet;
import com.baz.commons.vo.PaisVO;
import com.baz.commons.vo.RolesVO;
import com.baz.commons.vo.UsuarioPaisVO;
import com.baz.commons.vo.UsuariosVO;

@Remote
public interface MantenimientoUsuarioService {

	
	public List<UsuariosVO> getUsers()throws ExcepcionSicrenet;
	
	public void agregaUser(UsuariosVO AgregarUsuarios, RolesVO rol, int bloqueo, String usuario, PaisVO pais, List<String> listaIdPais) throws ExcepcionSicrenet;

	public void actualizaUser(UsuariosVO ActualizaUsuarios, RolesVO rol,int bloqueo, String usuario, PaisVO pais, List<String> listaIdPaisActualiza, int estatus) throws ExcepcionSicrenet;

//	public void eliminaUsers(String NumeroEmpleado) throws ExcepcionSicrenet;
	
	public List<RolesVO> CargaRoles() throws ExcepcionSicrenet;
	
	public UsuariosVO cargarUsuariosExisteAgregar(UsuariosVO existeAgregar) throws ExcepcionSicrenet;
	
	public UsuariosVO cargarUsuariosExisteActualiza(UsuariosVO existeAgregar) throws ExcepcionSicrenet;
	
	public List<PaisVO> CargaPais() throws ExcepcionSicrenet;

	public List<UsuarioPaisVO> CargaUsuarioPais(int opcion, String numEmpleado, int estatus) throws ExcepcionSicrenet;

	
}

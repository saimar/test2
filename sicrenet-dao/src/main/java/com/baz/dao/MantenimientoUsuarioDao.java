package com.baz.dao;

import java.util.List;

import javax.ejb.Remote;

import com.baz.commons.util.ExcepcionSicrenet;
import com.baz.commons.vo.PaisVO;
import com.baz.commons.vo.RolesVO;
import com.baz.commons.vo.UsuarioPaisVO;
import com.baz.commons.vo.UsuariosVO;

@Remote
public interface MantenimientoUsuarioDao {

	public List<UsuariosVO> getUsers() throws ExcepcionSicrenet;
	
	public UsuariosVO agregaUsers(UsuariosVO AgregarUsuarios, RolesVO rol, int bloqueo, String usuario, PaisVO pais, List<String> listaIdPais) throws ExcepcionSicrenet;	
	
	public UsuariosVO actualizaUsers(UsuariosVO ActualizaUsuarios, RolesVO rol, int bloqueo, String usuario, PaisVO pais) throws ExcepcionSicrenet;
	
	public void EditarMantoUsuarioPais(int opcion, UsuariosVO ActualizaUsuarios, List<String> listaIdPaisActualiza, int estatus) throws ExcepcionSicrenet;
	
	public void EditarMantoUsuarioPaisInserta(int opcion, UsuariosVO ActualizaUsuarios, String listaIdPaisActualiza, int estatus) throws ExcepcionSicrenet;
	
	public UsuarioPaisVO ValidaExisteEditarMantoUP(UsuariosVO ActualizaUsuarios,  String listaIdPaisActualiza) throws ExcepcionSicrenet; 

	public List<RolesVO> CargaRoles() throws ExcepcionSicrenet;

	public UsuariosVO cargarUsuariosExisteAgregar(UsuariosVO existeAgregar) throws ExcepcionSicrenet;
	
	public UsuariosVO cargarUsuariosExisteActualiza(UsuariosVO existeAgregar) throws ExcepcionSicrenet;
	
	public List<PaisVO> CargaPais() throws ExcepcionSicrenet;
	
	public List<UsuarioPaisVO> CargaUsuarioPais(int opcion, String numEmpleado, int estatus) throws ExcepcionSicrenet;

}

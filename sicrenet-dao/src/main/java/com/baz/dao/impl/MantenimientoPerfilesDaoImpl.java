package com.baz.dao.impl;

import static com.baz.dao.util.Conexion.getConnection;

import java.io.Serializable;
import java.math.BigDecimal;
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import javax.inject.Named;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.PersistenceContextType;
import javax.persistence.Query;

import com.baz.commons.domain.CatMantoMenuRol;
import com.baz.commons.domain.CatMantoMenuRolObj;
import com.baz.commons.domain.CatMenu;
import com.baz.commons.domain.CatPais;
import com.baz.commons.domain.CatPanelView;
import com.baz.commons.domain.CatRol;
import com.baz.dao.MantenimientoPerfilesDao;
import oracle.jdbc.OracleTypes;

//import oracle.jdbc.OracleTypes;

@Named("mantenimientoPerfileslDaoImpl")
public class MantenimientoPerfilesDaoImpl implements MantenimientoPerfilesDao, Serializable{

	private static final long serialVersionUID = 1L;
	@SuppressWarnings("null")

	@PersistenceContext(unitName = "seguridad", type = PersistenceContextType.EXTENDED)
    private EntityManager entityManager;
	
	@PersistenceContext(unitName = "panelGlobal", type = PersistenceContextType.EXTENDED)
    private EntityManager entityManagerTablero;
	 
	public List<CatRol> getPerfiles() {
		
		try{
			entityManager.getTransaction().begin();
			Connection connection = getConnection(entityManager);
			
			ResultSet rs = null;
			String sp = "{call SEGURIDAD.SP_MANTO_ROLES(?,?,?,?,?,?,?,?)}";
			CallableStatement callableStatement = connection.prepareCall(sp);
			callableStatement.setInt(1, 1);
			callableStatement.setString(2, null);
			callableStatement.setString(3, null);
			callableStatement.setString(4, null);
			callableStatement.setInt(5, 1);
			callableStatement.registerOutParameter(6,OracleTypes.CURSOR );
			callableStatement.registerOutParameter(7,OracleTypes.VARCHAR );
			callableStatement.registerOutParameter(8,OracleTypes.VARCHAR );
			callableStatement.execute();
			rs = (ResultSet) callableStatement.getObject(6);
			List<CatRol> listCatRol= new ArrayList<CatRol>(); 
			while (rs.next()) {
				System.out.println("Entra al while:::::");
				CatRol catRol = 
						new CatRol(rs.getInt("IDROL"), rs.getString("DESCRIPCION"));
				System.out.println("obtenerRoles::idRol:::"+rs.getInt("IDROL"));
				listCatRol.add(catRol);
			}
			entityManager.getTransaction().commit();
			return listCatRol;
			
		} catch (SQLException e) {
			
			e.printStackTrace();
		}
			return  null;
	}
	
	public void insertaPerfiles(String descripcion,List <Integer>idsMenusSeleccionados,List<Integer> idsObjetosSeleccionados){
		try{
			entityManager.getTransaction().begin();
			Connection connection = getConnection(entityManager);
			System.out.println("Llegó hasta la inserción.................!!!!!!!");
			ResultSet rs = null;
			String sp = "{call SEGURIDAD.SP_MANTO_ROLES(?,?,?,?,?,?,?,?)}";
			CallableStatement callableStatement = connection.prepareCall(sp);
			callableStatement.setInt(1, 2);
			callableStatement.setString(2, null);
			callableStatement.setString(3, descripcion);
			callableStatement.setString(4, "1");
			callableStatement.setInt(5, 1);
			callableStatement.registerOutParameter(6,OracleTypes.CURSOR );
			callableStatement.registerOutParameter(7,OracleTypes.VARCHAR );
			callableStatement.registerOutParameter(8,OracleTypes.VARCHAR );
			callableStatement.execute();
			
			rs = (ResultSet) callableStatement.getObject(6);
			while(rs.next()){			
				int idRol=rs.getInt("ID_ROL");			
				for(int i=0;i<idsMenusSeleccionados.size();i++){
					String sp2 = "{call SEGURIDAD.SP_MANTO_ROL(?,?,?,?,?,?,?)}";
					CallableStatement callableStatement2 = connection.prepareCall(sp2);
					callableStatement2.setInt(1,3);
					callableStatement2.setInt(2,idRol);
					callableStatement2.setInt(3,idsMenusSeleccionados.get(i));
					callableStatement2.setInt(4,1);
					callableStatement2.registerOutParameter(5,OracleTypes.CURSOR );
					callableStatement2.registerOutParameter(6,OracleTypes.VARCHAR );
					callableStatement2.registerOutParameter(7,OracleTypes.VARCHAR );
					callableStatement2.execute();
				}
				System.out.println("Objetos Seleccionados:"+idsObjetosSeleccionados.size());
				for(int i=0;i<idsObjetosSeleccionados.size();i++){
					String sp2 = "{call SEGURIDAD.SP_MANTO_ROL_OBJ(?,?,?,?,?,?,?,?)}";
					CallableStatement callableStatement2 = connection.prepareCall(sp2);
					callableStatement2.setInt(1,3);
					callableStatement2.setInt(2,idRol);
					callableStatement2.setInt(3,idsObjetosSeleccionados.get(i));
					callableStatement2.setInt(4,1);
					callableStatement2.setInt(5,1);
					callableStatement2.registerOutParameter(6,OracleTypes.CURSOR );
					callableStatement2.registerOutParameter(7,OracleTypes.VARCHAR );
					callableStatement2.registerOutParameter(8,OracleTypes.VARCHAR );
					callableStatement2.execute();
				}
			}		
			entityManager.getTransaction().commit();
		} catch (SQLException e) {
			
			e.printStackTrace();
		}
	}

	public void eliminaPerfil(BigDecimal id) {
		// TODO Auto-generated method stub
		try{
			entityManager.getTransaction().begin();
			Connection connection = getConnection(entityManager);
			System.out.println("Llegó hasta la eliminacion.................!!!!!!!");
			String sp = "{call SEGURIDAD.SP_MANTO_ROLES(?,?,?,?,?,?,?,?)}";
			CallableStatement callableStatement = connection.prepareCall(sp);
			callableStatement.setInt(1, 5);
			callableStatement.setString(2,""+id);
			callableStatement.setString(3, null);
			callableStatement.setString(4, "1");
			callableStatement.setInt(5, 0);
			callableStatement.registerOutParameter(6,OracleTypes.CURSOR );
			callableStatement.registerOutParameter(7,OracleTypes.VARCHAR );
			callableStatement.registerOutParameter(8,OracleTypes.VARCHAR );
			callableStatement.execute();		
			
			entityManager.getTransaction().commit();
		} catch (SQLException e) {
			
			e.printStackTrace();
		}
	}

	public void editarPerfil(String descripcion,BigDecimal id,List<CatMantoMenuRol> vistasSeleccionadas,List<CatMantoMenuRolObj> objetosSeleccionados) {
		// TODO Auto-generated method stub
		try{
			entityManager.getTransaction().begin();
			Connection connection = getConnection(entityManager);
			System.out.println("Llegó hasta la edicion.................!!!!!!!");
			String sp = "{call SEGURIDAD.SP_MANTO_ROLES(?,?,?,?,?,?,?,?)}";
			CallableStatement callableStatement = connection.prepareCall(sp);
			callableStatement.setInt(1, 4);
			callableStatement.setString(2,""+id);
			callableStatement.setString(3, descripcion);
			callableStatement.setString(4, "1");
			callableStatement.setInt(5, 1);
			callableStatement.registerOutParameter(6,OracleTypes.CURSOR );
			callableStatement.registerOutParameter(7,OracleTypes.VARCHAR );
			callableStatement.registerOutParameter(8,OracleTypes.VARCHAR );
			callableStatement.execute();
			
			for(int i=0;i<vistasSeleccionadas.size();i++){
				
				String sp2 = "{call SEGURIDAD.SP_MANTO_ROL(?,?,?,?,?,?,?)}";
				CallableStatement callableStatement2 = connection.prepareCall(sp2);
				callableStatement2.setInt(1,1);
				callableStatement2.setInt(2,vistasSeleccionadas.get(i).getIdrol().intValue());
				callableStatement2.setInt(3,vistasSeleccionadas.get(i).getIdmenu().intValue());
				callableStatement2.setInt(4,vistasSeleccionadas.get(i).getEstatus().intValue());
				callableStatement2.registerOutParameter(5,OracleTypes.CURSOR );
				callableStatement2.registerOutParameter(6,OracleTypes.VARCHAR );
				callableStatement2.registerOutParameter(7,OracleTypes.VARCHAR );
				callableStatement2.execute();
			}
			
			for(int i=0;i<objetosSeleccionados.size();i++){
				
				String sp2 = "{call SEGURIDAD.SP_MANTO_ROL_OBJ(?,?,?,?,?,?,?,?)}";
				CallableStatement callableStatement2 = connection.prepareCall(sp2);
				callableStatement2.setInt(1,1);
				callableStatement2.setInt(2,objetosSeleccionados.get(i).getIdrol().intValue());
				callableStatement2.setInt(3,objetosSeleccionados.get(i).getIdobjeto().intValue());
				callableStatement2.setInt(4,objetosSeleccionados.get(i).getEstatus().intValue());
				callableStatement2.setInt(5,1);
				callableStatement2.registerOutParameter(6,OracleTypes.CURSOR );
				callableStatement2.registerOutParameter(7,OracleTypes.VARCHAR );
				callableStatement2.registerOutParameter(8,OracleTypes.VARCHAR );
				callableStatement2.execute();
			}
			
			
			entityManager.getTransaction().commit();
		} catch (SQLException e) {
			
			e.printStackTrace();
		}
		
	}

	public List<CatMantoMenuRol> getMantoMenuRol(BigDecimal id) {
		
		try{
			entityManager.getTransaction().begin();
			Connection connection = getConnection(entityManager);
			
			ResultSet rs = null;
			String sp = "{call SEGURIDAD.SP_MANTO_ROLES(?,?,?,?,?,?,?,?)}";
			CallableStatement callableStatement = connection.prepareCall(sp);
			callableStatement.setInt(1, 3);
			callableStatement.setInt(2, id.intValue());
			callableStatement.setString(3, null);
			callableStatement.setString(4, null);
			callableStatement.setInt(5, 1);
			callableStatement.registerOutParameter(6,OracleTypes.CURSOR );
			callableStatement.registerOutParameter(7,OracleTypes.VARCHAR );
			callableStatement.registerOutParameter(8,OracleTypes.VARCHAR );
			callableStatement.execute();
			rs = (ResultSet) callableStatement.getObject(6);
			List<CatMantoMenuRol> listCatMantoMenuRol= new ArrayList<CatMantoMenuRol>(); 
			while (rs.next()) { 
				System.out.println("Entra al while de MantoMenuRol:::::");//+rs.getInt("IDROL")+rs.getInt("IDMENU")+rs.getString("DESCRIPCION"));
				CatMantoMenuRol catMantoMenuRol = new CatMantoMenuRol(rs.getInt("IDROL"),rs.getInt("IDMENU"),rs.getString("DESCRIPCION"),rs.getInt("ESTATUS"));
				
				System.out.println(""+catMantoMenuRol.getIdrol()+" "+catMantoMenuRol.getDescripcion());
				listCatMantoMenuRol.add(catMantoMenuRol);
				
			}
			entityManager.getTransaction().commit();
			return listCatMantoMenuRol;
			
		} catch (SQLException e) {
			
			e.printStackTrace();
		}
			return  null;
	}

	public List<CatMenu> getMenus() {
		
		List<CatMenu> listMenus= new ArrayList<CatMenu>();
		
		try{
			entityManager.getTransaction().begin();
			Connection connection = getConnection(entityManager);
			
			ResultSet rs = null;
			String sp = "{call SEGURIDAD.SP_MANTO_MENU(?,?,?,?,?,?,?,?,?,?,?)}";
			CallableStatement callableStatement = connection.prepareCall(sp);
			callableStatement.setInt(1, 1);
			callableStatement.setInt(2, 1);
			callableStatement.setInt(3, 1);
			callableStatement.setString(4, null);
			callableStatement.setString(5, null);
			callableStatement.setInt(6, 1);
			callableStatement.setString(7, null);
			callableStatement.setInt(8, 1);
			callableStatement.registerOutParameter(9,OracleTypes.CURSOR );
			callableStatement.registerOutParameter(10,OracleTypes.VARCHAR );
			callableStatement.registerOutParameter(11,OracleTypes.VARCHAR );
			callableStatement.execute();
			rs = (ResultSet) callableStatement.getObject(9);
			System.out.println("Entra al metodo de getMenus:::::");
			while (rs.next()) { 
				System.out.println("Entra al while de getMenus:::::");//+rs.getInt("IDROL")+rs.getInt("IDMENU")+rs.getString("DESCRIPCION"));
				CatMenu menu = new CatMenu(rs.getInt("IDMENU"),rs.getInt("IDPADRE"),rs.getString("DESCRIPCION"),"",1);
				
				System.out.println(""+menu.getDescripcion());
				listMenus.add(menu);
				
			}
			entityManager.getTransaction().commit();
			return listMenus;
			
		} catch (SQLException e) {
			
			e.printStackTrace();
		}
		
		return listMenus;
	}
	
public List<CatMantoMenuRolObj> getObjetos() {
		try{
			entityManagerTablero.getTransaction().begin();
			Connection connection = getConnection(entityManagerTablero);	
			ResultSet rs = null;
			String sp = "{call USRTABLERO.SP_CAT_EXTRACCION(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";
			CallableStatement callableStatement = connection.prepareCall(sp);
			callableStatement.setInt(1, 6);
			callableStatement.setInt(2, 1);
			callableStatement.setInt(3, 1);
			callableStatement.setInt(4, 1);
			callableStatement.setInt(5, 1);
			callableStatement.setInt(6, 1);
			callableStatement.setInt(7, 1);
			callableStatement.setInt(8, 1);
			callableStatement.setInt(9, 1);
			callableStatement.setInt(10, 1);
			callableStatement.setInt(11, 1);
			callableStatement.setString(12, null);
			callableStatement.setString(13, null);
			callableStatement.setString(14, null);
			callableStatement.setString(15, null);
			callableStatement.setString(16, null);
			callableStatement.registerOutParameter(17,OracleTypes.CURSOR);
			callableStatement.registerOutParameter(18,OracleTypes.NUMBER );
			callableStatement.registerOutParameter(19,OracleTypes.VARCHAR );
			callableStatement.registerOutParameter(20,OracleTypes.VARCHAR );
			callableStatement.execute();
			rs = (ResultSet) callableStatement.getObject(17);
			List<CatMantoMenuRolObj> listCatMantoMenuRolObj= new ArrayList<CatMantoMenuRolObj>(); 
			while (rs.next()) { 
				System.out.println("Entra al while de MantoMenuRolObj------------:::::");
				CatMantoMenuRolObj catMantoMenuRolObj = new CatMantoMenuRolObj(rs.getInt(1),rs.getString(2));
				
				System.out.println(""+catMantoMenuRolObj.getIdobjeto()+" "+catMantoMenuRolObj.getDescripcion());
				listCatMantoMenuRolObj.add(catMantoMenuRolObj);
			}
			entityManagerTablero.getTransaction().commit();
			return listCatMantoMenuRolObj;
			
		} catch (SQLException e) {
			
			e.printStackTrace();
		}
			return  null;
	}

public List<CatPais> getPaises() {
	// TODO Auto-generated method stub
	
//	try{
//		entityManager.getTransaction().begin();
//		Connection connection = getConnection(entityManager);	
//		ResultSet rs = null;
//		String sp = "{call SEGURIDAD.SP_CAT_PAIS(?,?,?,?,?,?,?,?,?)}";
//		CallableStatement callableStatement = connection.prepareCall(sp);
//		callableStatement.setInt(1, 1);
//		callableStatement.setInt(2, 1);
//		callableStatement.setString(3, "1");
//		callableStatement.setString(4, "1");
//		callableStatement.setString(5, "1");
//		callableStatement.setInt(6, 1);
//		callableStatement.registerOutParameter(7,OracleTypes.CURSOR);
//		callableStatement.registerOutParameter(8,OracleTypes.VARCHAR );
//		callableStatement.registerOutParameter(9,OracleTypes.VARCHAR );
//		callableStatement.execute();
//		rs = (ResultSet) callableStatement.getObject(7);
//		List<CatPais> listCatPais= new ArrayList<CatPais>(); 
//		while (rs.next()) { 
//			System.out.println("Entra al while de Paises------------:::::");
//			CatPais catPais = new CatPais(rs.getInt("ID_PAIS"));
//			
//			System.out.println(""+catPais.getNombre());
//			listCatPais.add(catPais);
//		}
//		entityManager.getTransaction().commit();
//		return listCatPais;
//		
//	} catch (SQLException e) {
//		
//		e.printStackTrace();
//	}
	
	return null;
}

public List<CatMantoMenuRolObj> getObjetosManto(int idRol) {
	try{
		entityManager.getTransaction().begin();
		Connection connection = getConnection(entityManager);	
		ResultSet rs = null;
		String sp = "{call SEGURIDAD.SP_MANTO_ROL_OBJ(?,?,?,?,?,?,?,?)}";
		CallableStatement callableStatement = connection.prepareCall(sp);
		callableStatement.setInt(1, 0);
		callableStatement.setInt(2, idRol);
		callableStatement.setInt(3, 1);
		callableStatement.setInt(4, 1);
		callableStatement.setInt(5, 1);
		callableStatement.registerOutParameter(6,OracleTypes.CURSOR);
		callableStatement.registerOutParameter(7,OracleTypes.VARCHAR );
		callableStatement.registerOutParameter(8,OracleTypes.VARCHAR );
		callableStatement.execute();
		rs = (ResultSet) callableStatement.getObject(6);
		List<CatMantoMenuRolObj> listCatMantoMenuRolObj= new ArrayList<CatMantoMenuRolObj>(); 
		while (rs.next()) { 
			System.out.println("Entra al while de MantoMenuRolObjManto------------:::::");
			CatMantoMenuRolObj catMantoMenuRolObj = new CatMantoMenuRolObj(rs.getInt(1),rs.getInt(3),rs.getString(4),rs.getInt(5));
			
			System.out.println(""+catMantoMenuRolObj.getIdobjeto()+" "+catMantoMenuRolObj.getIdrol().intValue()+" "+catMantoMenuRolObj.getDescripcion()+" "+catMantoMenuRolObj.getEstatus().intValue());
			listCatMantoMenuRolObj.add(catMantoMenuRolObj);
		}
		entityManager.getTransaction().commit();
		return listCatMantoMenuRolObj;
		
	} catch (SQLException e) {
		
		e.printStackTrace();
	}
		return  null;
}
	
	
}

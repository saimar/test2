package com.baz.dao.impl;

import static com.baz.dao.util.Conexion.getConnection;

import java.io.Serializable;
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

import javax.inject.Named;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.PersistenceContextType;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.baz.commons.util.ExcepcionSicrenet;
import com.baz.commons.vo.MenuVO;
import com.baz.dao.MantenimientoMenuDao;

import oracle.jdbc.OracleTypes;

@Named("mantenimientoMenuDaoImpl")
public class MantenimientoMenuDaoImpl implements MantenimientoMenuDao, Serializable {

	private static final long serialVersionUID = 1L;
	 private final Logger logger 
	    = LoggerFactory.getLogger(MantenimientoMenuDaoImpl.class);

	@PersistenceContext(unitName = "seguridad", type = PersistenceContextType.EXTENDED)
	private EntityManager entityManager;
	
	
	

public List<MenuVO> CargaListaMenu(int opcion, int idPadre, int idMenu, String usuario, int estatus) throws ExcepcionSicrenet {
	try {
		entityManager.getTransaction().begin();
		Connection connection = getConnection(entityManager);

		ResultSet rs = null;
		String sp = "{call SEGURIDAD.SP_MANTO_MENU(?,?,?,?,?,?,?,?,?,?,?)}";
		CallableStatement callableStatement = connection.prepareCall(sp);
		callableStatement.setInt(1, opcion);
		callableStatement.setInt(2, idPadre);
		callableStatement.setInt(3, idMenu);
		callableStatement.setString(4, null);
		callableStatement.setString(5, usuario);
		callableStatement.setInt(6, estatus);
		callableStatement.setString(7, null);
		callableStatement.setInt(8, 0);
		callableStatement.registerOutParameter(9, OracleTypes.CURSOR);
		callableStatement.registerOutParameter(10,OracleTypes.VARCHAR );
		callableStatement.registerOutParameter(11,OracleTypes.VARCHAR );

		callableStatement.execute();
		rs = (ResultSet) callableStatement.getObject(9);
		// List<CatPanelView> listCatPanelView = new
		// ArrayList<CatPanelView>();

		List<MenuVO> listMenuVOPadre = new ArrayList<MenuVO>(); 
		while (rs.next()) {
			System.out.println("Entra al while:::::");
			MenuVO menuVOPadre = new MenuVO(
					rs.getBigDecimal(1),
					rs.getInt(2),
					rs.getString(3),
					rs.getString(4),
					rs.getInt(5));
			listMenuVOPadre.add(menuVOPadre);
			
			System.out.println("obtenerIDROL:idMenuPadre:::"+rs.getBigDecimal(1));
		}
		
		
		entityManager.getTransaction().commit();
		return listMenuVOPadre;
	} catch (Exception e) {
		logger.warn("Sicrenet::MantenimientoMenuDaoImpl::" 
                + "CargaListaMenu::" + e.getMessage());
		  throw new ExcepcionSicrenet("ERROR!. Base de Datos");
	}
}


public MenuVO CargaMenu(int opcion, int idPadre, int idMenu, String usuario, int estatus) throws ExcepcionSicrenet {
	try {  MenuVO menuVOPadre = null;
		entityManager.getTransaction().begin();
		Connection connection = getConnection(entityManager);

		ResultSet rs = null;
		String sp = "{call SEGURIDAD.SP_MANTO_MENU(?,?,?,?,?,?,?,?,?,?,?)}";
		CallableStatement callableStatement = connection.prepareCall(sp);
		callableStatement.setInt(1, opcion);
		callableStatement.setInt(2, idPadre);
		callableStatement.setInt(3, idMenu);
		callableStatement.setString(4, null);
		callableStatement.setString(5, usuario);
		callableStatement.setInt(6, estatus);
		callableStatement.setString(7, null);
		callableStatement.setInt(8, 0);
		callableStatement.registerOutParameter(9, OracleTypes.CURSOR);
		callableStatement.registerOutParameter(10,OracleTypes.VARCHAR );
		callableStatement.registerOutParameter(11,OracleTypes.VARCHAR );

		callableStatement.execute();
		rs = (ResultSet) callableStatement.getObject(9);
		// List<CatPanelView> listCatPanelView = new
		// ArrayList<CatPanelView>();

		while (rs.next()) {
			System.out.println("Entra al while:::::");
			menuVOPadre = new MenuVO(
					rs.getBigDecimal(1),
					rs.getInt(2),
					rs.getString(3),
					rs.getString(4),
					rs.getInt(5));
			
			System.out.println("obtenerIDROL:idMenuPadre:::"+rs.getBigDecimal(1));
		}
		
		
		entityManager.getTransaction().commit();
		return  menuVOPadre;
	} catch (Exception e) {
		logger.warn("Sicrenet::MantenimientoMenuDaoImpl::" 
                + "CargaMenu::" + e.getMessage());
		  throw new ExcepcionSicrenet("ERROR!. Base de Datos");
	}


}

	
	

	
	public MenuVO agregaNuevoMenu(MenuVO agregarMenu, int idPadre, String usuarioAlta) throws ExcepcionSicrenet {
		try {
			entityManager.getTransaction().begin();
			Connection connection = getConnection(entityManager);

			String sp = "{call SEGURIDAD.SP_MANTO_MENU(?,?,?,?,?,?,?,?,?,?,?)}";
			CallableStatement callableStatement = connection.prepareCall(sp);
			callableStatement.setInt(1, 2);
			callableStatement.setInt(2, idPadre);
			callableStatement.setInt(3, 0 );
			callableStatement.setString(4, agregarMenu.getDescripcion());
			callableStatement.setString(5, usuarioAlta);
			callableStatement.setInt(6, 1);
			callableStatement.setString(7, agregarMenu.getUrl());
			callableStatement.setInt(8, agregarMenu.getPosicion());
			callableStatement.registerOutParameter(9, OracleTypes.CURSOR);
			callableStatement.registerOutParameter(10, OracleTypes.VARCHAR);
			callableStatement.registerOutParameter(11, OracleTypes.VARCHAR);
			
			
			System.out.println("MantenimientoDaoImpl::AgregaMenu:::idPadre:::" +idPadre);
			System.out.println("MantenimientoDaoImpl::AgregaMenu:::Descripcion:::" +agregarMenu.getDescripcion());
			System.out.println("MantenimientoDaoImpl::AgregaMenu:::usuarioAlta:::" +usuarioAlta);
			System.out.println("MantenimientoDaoImpl::AgregaMenu:::Url:::" +agregarMenu.getUrl());
			System.out.println("MantenimientoDaoImpl::AgregaMenu:::possicion:::" +agregarMenu.getPosicion());
			callableStatement.execute();

			
			entityManager.getTransaction().commit();
			
		System.out.println("Ingresado correctamenete");
		} catch (Exception e) {
			logger.warn("Sicrenet::MantenimientoMenuDaoImpl::" 
                    + "agregarNuevoMenu::" + e.getMessage());
			  throw new ExcepcionSicrenet("ERROR!. Base de Datos");
		}

		return null;
	}

	
	public MenuVO actualizaMenu(MenuVO actualizaMenu, String usuarioAlta) throws ExcepcionSicrenet {
		try {
			entityManager.getTransaction().begin();
			Connection connection = getConnection(entityManager);

			String sp = "{call SEGURIDAD.SP_MANTO_MENU(?,?,?,?,?,?,?,?,?,?,?)}";
			CallableStatement callableStatement = connection.prepareCall(sp);
			callableStatement.setInt(1, 4);
			callableStatement.setInt(2, actualizaMenu.getIdpadre());
			callableStatement.setInt(3, actualizaMenu.getIdmenu().intValue());
			callableStatement.setString(4, actualizaMenu.getDescripcion());
			callableStatement.setString(5, usuarioAlta);
			callableStatement.setInt(6, 1);
			callableStatement.setString(7, actualizaMenu.getUrl());
			callableStatement.setInt(8, actualizaMenu.getPosicion());
			callableStatement.registerOutParameter(9, OracleTypes.CURSOR);
			callableStatement.registerOutParameter(10, OracleTypes.VARCHAR);
			callableStatement.registerOutParameter(11, OracleTypes.VARCHAR);
			
			
			System.out.println("MantenimientoDaoImpl::ActualizaMenu:::idPadre:::" +actualizaMenu.getIdpadre());
			System.out.println("MantenimientoDaoImpl::ActualizaMenu:::Idmenu:::" + actualizaMenu.getIdmenu().intValue());
			System.out.println("MantenimientoDaoImpl::ActualizaMenu:::usuario:::" +usuarioAlta);
			System.out.println("MantenimientoDaoImpl::ActualizaMenu:::url:::" +actualizaMenu.getUrl());
			System.out.println("MantenimientoDaoImpl::ActualizaMenu:::posicion:::" +actualizaMenu.getPosicion());
			System.out.println("MantenimientoDaoImpl::ActualizaMenu:::Descripcion:::" +actualizaMenu.getDescripcion());
			callableStatement.execute();

			
			entityManager.getTransaction().commit();
			
		System.out.println("Actualizado correctamenete");
		} catch (Exception e) {
			logger.warn("Sicrenet::MantenimientoMenuDaoImpl::" 
                    + "actualizaMenu::" + e.getMessage());
              throw new ExcepcionSicrenet("ERROR!. Base de Datos");
		}

		return null;
	}
	
	public String eliminaMenu(int idMenu) throws ExcepcionSicrenet {
		try {
			entityManager.getTransaction().begin();
			Connection connection = getConnection(entityManager);

			String sp = "{call SEGURIDAD.SP_MANTO_MENU(?,?,?,?,?,?,?,?,?,?,?)}";
			CallableStatement callableStatement = connection.prepareCall(sp);
			callableStatement.setInt(1, 5);
			callableStatement.setInt(2, 0);
			callableStatement.setInt(3, idMenu );
			callableStatement.setString(4, null);
			callableStatement.setString(5, null);
			callableStatement.setInt(6, 0);
			callableStatement.setString(7, null);
			callableStatement.setInt(8, 0);
			callableStatement.registerOutParameter(9, OracleTypes.CURSOR);
			callableStatement.registerOutParameter(10, OracleTypes.VARCHAR);
			callableStatement.registerOutParameter(11, OracleTypes.VARCHAR);
			
			
			System.out.println("MantenimientoDaoImpl::EliminaaMenu:::idMenu:::" +idMenu);
			callableStatement.execute();

			
			entityManager.getTransaction().commit();
			
		System.out.println("Eliminado correctamenete");
		} catch (Exception e) {
			logger.warn("Sicrenet::MantenimientoMenuDaoImpl::" 
                    + "eliminaMenu::" + e.getMessage());
			  throw new ExcepcionSicrenet("ERROR!. Base de Datos");
		}

		return null;
	}


	public MenuVO cargarMenuValidateExiste(int opcion, String descripcion) throws ExcepcionSicrenet {
		try {  MenuVO menuVOPadre = null;
			entityManager.getTransaction().begin();
			Connection connection = getConnection(entityManager);

			ResultSet rs = null;
			String sp = "{call SEGURIDAD.SP_MANTO_MENU(?,?,?,?,?,?,?,?,?,?,?)}";
			CallableStatement callableStatement = connection.prepareCall(sp);
			callableStatement.setInt(1, opcion);
			callableStatement.setInt(2, 0);
			callableStatement.setInt(3, 0);
			callableStatement.setString(4, descripcion);
			callableStatement.setString(5, null);
			callableStatement.setInt(6, 1);
			callableStatement.setString(7, null);
			callableStatement.setInt(8, 0);
			callableStatement.registerOutParameter(9, OracleTypes.CURSOR);
			callableStatement.registerOutParameter(10,OracleTypes.VARCHAR );
			callableStatement.registerOutParameter(11,OracleTypes.VARCHAR );

			callableStatement.execute();
			rs = (ResultSet) callableStatement.getObject(9);
			
			while (rs.next()) {
				System.out.println("Entra al while:::::");
				menuVOPadre = new MenuVO(
						rs.getInt(1));
				
				System.out.println("obtenerESTATUS:ValidateExiste:::ESTATUS:::"+rs.getInt(1));
			}
			
			
			entityManager.getTransaction().commit();
			return  menuVOPadre;
		} catch (Exception e) {
			logger.warn("Sicrenet::MantenimientoMenuDaoImpl::" 
	                + "cargarMenuValidateExiste::" + e.getMessage());
			  throw new ExcepcionSicrenet("ERROR!. Base de Datos");
		}
	
	
}
	


public MenuVO cargarMenuPosicionMax(int opcion, int idPadre, int estatus) throws ExcepcionSicrenet{
			try {  MenuVO menuVOPadre = null;
			entityManager.getTransaction().begin();
			Connection connection = getConnection(entityManager);
			
			ResultSet rs = null;
			String sp = "{call SEGURIDAD.SP_MANTO_MENU(?,?,?,?,?,?,?,?,?,?,?)}";
			CallableStatement callableStatement = connection.prepareCall(sp);
			callableStatement.setInt(1, opcion);
			callableStatement.setInt(2, idPadre);
			callableStatement.setInt(3, 0);
			callableStatement.setString(4, null);
			callableStatement.setString(5, null);
			callableStatement.setInt(6, estatus);
			callableStatement.setString(7, null);
			callableStatement.setInt(8, 0);
			callableStatement.registerOutParameter(9, OracleTypes.CURSOR);
			callableStatement.registerOutParameter(10,OracleTypes.VARCHAR );
			callableStatement.registerOutParameter(11,OracleTypes.VARCHAR );
			
			callableStatement.execute();
			rs = (ResultSet) callableStatement.getObject(9);
			
			while (rs.next()) {
				System.out.println("Entra al while:::::");
				menuVOPadre = new MenuVO(
						rs.getInt(1));
				
				System.out.println("obtenerMAXIMO::::Maximo:::"+rs.getInt(1));
			}
			
			
			entityManager.getTransaction().commit();
			return  menuVOPadre;
			} catch (Exception e) {
			logger.warn("Sicrenet::MantenimientoMenuDaoImpl::" 
			        + "cargarMenuPosicionMax::" + e.getMessage());
			  throw new ExcepcionSicrenet("ERROR!. Base de Datos");
			}
			
			
			}

}




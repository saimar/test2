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
import javax.persistence.Query;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.baz.commons.domain.CatMenu;
import com.baz.commons.util.ExcepcionSicrenet;
import com.baz.commons.vo.MenuVO;
import com.baz.dao.MenuDao;

import oracle.jdbc.OracleTypes;

@Named("MenuDaoImpl")
public class MenuDaoImpl implements MenuDao, Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	@PersistenceContext(unitName = "seguridad", type = PersistenceContextType.EXTENDED)
    private EntityManager entityManager;
	
	 private final Logger logger 
	    = LoggerFactory.getLogger(MenuDaoImpl.class);

	
	public List<CatMenu> generaMenu(int idPadre, int estatus) {
//		 if(!entityManager.getTransaction().isActive())
//	         entityManager.getTransaction().begin();
		Query query = entityManager.createNamedQuery("CatMenu.findByIdpadreEstatus", CatMenu.class);
		query.setParameter("idpadre", idPadre);
		query.setParameter("estatus", estatus);
		CatMenu users = new CatMenu();
		List<CatMenu> listUsers =new  ArrayList<CatMenu>();
		listUsers = query.getResultList();
		
		return listUsers;
		
	}

	
	public List<MenuVO> generaMenus(int idPadre, String usuario) throws ExcepcionSicrenet {
		try {
			entityManager.getTransaction().begin();
			Connection connection = getConnection(entityManager);

			ResultSet rs = null;
			String sp = "{call SEGURIDAD.SP_MANTO_MENU(?,?,?,?,?,?,?,?,?,?,?)}";
			CallableStatement callableStatement = connection.prepareCall(sp);
			callableStatement.setInt(1, 6);
			callableStatement.setInt(2, idPadre);
			callableStatement.setInt(3, 0 );
			callableStatement.setString(4, null);
			callableStatement.setString(5, usuario);
			callableStatement.setInt(6, 0);
			callableStatement.setString(7, null);
			callableStatement.setInt(8, 0);
			callableStatement.registerOutParameter(9, OracleTypes.CURSOR);
			callableStatement.registerOutParameter(10, OracleTypes.VARCHAR);
			callableStatement.registerOutParameter(11, OracleTypes.VARCHAR);
			
			callableStatement.execute();
			rs = (ResultSet) callableStatement.getObject(9);
			// List<CatPanelView> listCatPanelView = new
			// ArrayList<CatPanelView>();

			List<MenuVO> listCatMenu = new ArrayList<MenuVO>(); 
			while (rs.next()) {
				System.out.println("Entra al while:::::");
				MenuVO CatMenu = new MenuVO(
						rs.getBigDecimal("IDMENU"),
						rs.getString("MENU"),
						rs.getBigDecimal("IDROL"),
						rs.getString("ROL"),
						rs.getInt("ESTATUS"),
						rs.getString("URL"));
				listCatMenu.add(CatMenu);
				
				System.out.println("ObtenerMenuRol:::IDMENU"+rs.getInt("IDMENU"));
			}
			
			
			entityManager.getTransaction().commit();
			return listCatMenu;
		}  catch (Exception e) {
			logger.warn("Sicrenet::MantenimientoUserDaoImpl::" 
	                + "CargaRoles::" + e.getMessage());
	        throw new ExcepcionSicrenet("Error en persistencia: " + e);
		}

		
	}
}

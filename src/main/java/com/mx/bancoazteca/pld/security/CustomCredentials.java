package com.mx.bancoazteca.pld.security;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
//import org.slf4j.Logger;
//import org.slf4j.LoggerFactory;
import org.springframework.security.core.CredentialsContainer;
import org.springframework.security.core.context.SecurityContextHolder;

public class CustomCredentials implements Serializable, CredentialsContainer {

	private static final long serialVersionUID = 1L;
	
	private static final Logger LOG = LoggerFactory.getLogger(CustomCredentials.class);

	private String rol;
	private Integer idProfile;
	private Integer timeOut;
	private List<ApplicationModule> modules;
	private LinkedHashMap<String, List<ApplicationModule>> childsModule;
	private List<ApplicationModule> treeModules= new ArrayList<ApplicationModule>();

	
	public List<ApplicationModule> getTreeModule() {
		return treeModules;
	}

	public void setTreeModule(List<ApplicationModule> treeModules) {
		this.treeModules = treeModules;
	}

	public CustomCredentials() {
		super();
	}

	public String getRol() {
		return rol;
	}

	public void setRol(String rol) {
		this.rol = rol;
	}

	public Integer getIdProfile() {
		return idProfile;
	}

	public void setIdProfile(Integer idProfile) {
		this.idProfile = idProfile;
	}

	public Integer getTimeOut() {
		return timeOut;
	}

	public void setTimeOut(Integer timeOut) {
		this.timeOut = timeOut;
	}

	public List<ApplicationModule> getModules() {
		return modules;
	}

	public void setModules(List<ApplicationModule> modules) {
		this.modules = modules;
	}

	public LinkedHashMap<String, List<ApplicationModule>> getChildsModule() {
		return childsModule;
	}

	/**
	 * METODO QUE RECUPERA LAS HERRAMIENTAS DE CIERTO MODULO CON LA SIGUIENTE
	 * ESTRUCTURA:
	 * 
	 * <nombreHerramienta, privilegio>
	 */
	public Map<String, Integer> getTools(String module) {
		HashMap<String, Integer> herramientas = null;

		//try {
			herramientas = new HashMap<String, Integer>();
			Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();

			if (principal instanceof CustomUser) {

				int numModules = this.modules.size();
				for (int indexM = 0; indexM < numModules; indexM++) {
					ApplicationModule appModule = this.modules.get(indexM);

					// SE BUSCA EL MODULO SOLICITADO
					if (appModule.getMapping().equals(module)) {

						// SE OBTIENEN LAS HERRAMIENTAS DEL MODULO PARA ENVIAR
						// COMO RESPUESTA
						List<ApplicationTool> tools = appModule.getTools();

						int numTools = tools.size();
						for (int indexT = 0; indexT < numTools; indexT++) {
							ApplicationTool tool = tools.get(indexT);

							// SE AGREGA LA HERRAMIENTA AL MAPA
							herramientas.put(tool.getTool(), tool.getPrivilege());
						}
					}
				}
			}
		/*} catch (Exception e) {
			LOG.error("Error al obtener las herramientas del module " + module, e);

			// SE ENVIA UN MAPA DE HERRAMIENTAS VACIA EN CASO DE QUE OCURRA
			// ALGUN ERROR
			herramientas = new HashMap<String, Integer>();
		}*/

		return herramientas;
	}

	/**
	 * SOBRECARGA
	 * 
	 * METODO QUE OBTIENE LOS MODULES HIJO DEL MODULO ESPECIFICADO EN BASE AL
	 * NOMBRE DEL MODULE PADRE
	 */
	public List<ApplicationModule> getDescendants(String parentModule) {
		List<ApplicationModule> descendants = null;

		//try {
			int idParentModule = -1;

			// SE BUSCA EL ID DEL parentModule
			int numModules = this.modules.size();
			for (int indexM = 0; indexM < numModules; indexM++) {
				ApplicationModule module = this.modules.get(indexM);

				if (module.getMapping().equals(parentModule)) {
					idParentModule = module.getIdModule();
					break;
				}
			}

			descendants = this.getDescendants(idParentModule);
		/*} catch (Exception e) {
			LOG.error("Error al obtener los hijoss del module " + parentModule, e);

			descendants = new ArrayList<ApplicationModule>();
		}*/

		return descendants;
	}

	/**
	 * SOBRECARGA
	 * 
	 * METODO QUE OBTIENE LOS MODULES HIJO DEL MODULO ESPECIFICADO EN BASE AL ID
	 * DEL MODULE PADRE
	 */
	public List<ApplicationModule> getDescendants(Integer idParentModule) {
		List<ApplicationModule> descendants = null;
		ApplicationModule descendant = null;

		//try {
			descendants = new ArrayList<ApplicationModule>();

			// SE BUSCA EL ID DEL parentModule
			int numModules = this.modules.size();
			for (int indexM = 0; indexM < numModules; indexM++) {
				ApplicationModule module = this.modules.get(indexM);

				if (module.getIdParent().equals(idParentModule)) {
					descendant = new ApplicationModule();

					descendant.setActive(module.getActive());
					descendant.setDescription(module.getDescription());
					descendant.setDirectory(module.getDirectory());
					descendant.setIdModule(module.getIdModule());
					descendant.setIdOrder(module.getIdOrder());
					descendant.setIdParent(idParentModule);
					descendant.setImage(module.getImage());
					descendant.setMapping(module.getMapping());

					descendants.add(descendant);
				}
			}
		/*} catch (Exception e) {
			LOG.error("Error al obtener los hijoss del module " + idParentModule, e);

			descendants = new ArrayList<ApplicationModule>();
		}*/

		return descendants;
	}

	/**
	 * METODO QUE INVOCA LA GENERACION DE LA LISTA DE MODULOS AGRUPADOS POR
	 * IDPARENT
	 */
	public void generateMapChildsModules() {
		//try {
			// SE EJECUTA EL METODO RECURSIVO PARA CONSTRUIR MAPA DE MENUS
			LOG.info("+++++++++++++++++");
			generateMapOfListModules(this.modules, 0);
			LOG.info("+++++++++++++++++");
		/*} catch (Exception e) {
			//e.printStackTrace();
			LOG.info("CustomCredentials :: generateTreeModules :: Error al generar el menu => {}",e.getMessage());
		}*/
	}

	/**
	 * METODO RECURSIVO QUE GENERA LISTA DE MODULOS AGRUPADOS POR IDPARENT
	 * 
	 * @param modules
	 * @param idParent
	 * @return
	 */
	private List<ApplicationModule> generateMapOfListModules(List<ApplicationModule> modules, int idParent) {
		
		if (this.childsModule == null) {
			this.childsModule = new LinkedHashMap<String, List<ApplicationModule>>();
		}

		List<ApplicationModule> childs = this.childsModule.get(idParent);		
		
		if (childs == null) {
			childs = new ArrayList<ApplicationModule>();
		}
		
//		try{
			int idParentN = 0;
			// BUSCA ALGUN HIJO
			for (ApplicationModule module : modules) {
				if (module.getIdParent() == idParent) {
					childs.add(module);
					idParentN = module.getIdModule();
					// SE AGREAGA EL ELEMENTO A LA LISTA
					this.childsModule.put(idParent + "", childs);
					generateMapOfListModules(modules, idParentN);
				}
			}
	
//		}catch(IllegalArgumentException e){
//			
//		}catch(IndexOutOfBoundsException e){
//			
//		}catch(ClassCastException e){
//			
//		}
		
		return childs;
	}
	
	
	public void generateTreeModules() {
		
		//try {
			treeModules = generateTree(this.modules, 0,1);	
		/*} catch (Exception e) {
			//e.printStackTrace();
			LOG.info("CustomCredentials :: generateTreeModules :: Error al generar el arbol de modulos => {}",e.getMessage());
		}*/
	}
	
	private List<ApplicationModule> generateTree(List<ApplicationModule> modules, int idParent,int level) {
		List<ApplicationModule> myChilds = new ArrayList<ApplicationModule>();
		try{
	    if(modules!=null)
		for (ApplicationModule module : modules) {
			if (module!=null && module.getIdParent() == idParent) {
				//System.out.println(module.getIdModule()+"|"+module.getIdParent()+"|"+module.getDescription().trim()+"|"+module.getMapping().trim());
				ApplicationModule am = module;
				List<ApplicationModule> t = generateTree( modules, module.getIdModule(), level+1);
				if(t!=null)
				if(t.size()>0){
					am.setChildren(t);
				}
				myChilds.add(am);
			}
		}
		}catch(IllegalArgumentException e){
			LOG.info("CustomCredentials :: generateTreeModules :: Error al generar el arbol de modulos => {}",e.getMessage());
		}catch(IndexOutOfBoundsException e){
			LOG.info("CustomCredentials :: generateTreeModules :: Error al generar el arbol de modulos => {}",e.getMessage());
		}catch(ClassCastException e){
			LOG.info("CustomCredentials :: generateTreeModules :: Error al generar el arbol de modulos => {}",e.getMessage());
		}
		
		return myChilds;
	}

	@Override
	public String toString() {
		return "PLDCredential [rol=" + rol + ", idProfile=" + idProfile + ", modules=" + modules + ", timeOut="
				+ timeOut + "]";
	}

	public void eraseCredentials() {
		this.rol = "";
		this.idProfile = 0;
		this.modules = new ArrayList<ApplicationModule>();
	}
}

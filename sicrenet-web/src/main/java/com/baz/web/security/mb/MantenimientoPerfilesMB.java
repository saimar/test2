package com.baz.web.security.mb;

import java.io.Serializable;
import java.math.BigDecimal;

import javax.annotation.PostConstruct;
import javax.ejb.EJB;
import javax.enterprise.context.RequestScoped;
import javax.faces.application.FacesMessage;
import javax.faces.bean.ManagedBean;
import javax.faces.bean.SessionScoped;
import javax.faces.component.UIComponent;
import javax.faces.component.html.HtmlOutputText;
import javax.faces.context.FacesContext;
import javax.faces.event.ActionEvent;
import javax.faces.validator.ValidatorException;
import javax.ws.rs.GET;

import org.primefaces.component.fieldset.Fieldset;
import org.primefaces.component.panel.Panel;
import org.primefaces.component.panelgrid.PanelGrid;
import org.primefaces.context.RequestContext;
import org.primefaces.model.CheckboxTreeNode;
import org.primefaces.model.DefaultTreeNode;
import org.primefaces.model.TreeNode;

import com.baz.commons.domain.CatMantoMenuRol;
import com.baz.commons.domain.CatMantoMenuRolObj;
import com.baz.commons.domain.CatMenu;
import com.baz.commons.domain.CatPais;
import com.baz.commons.domain.CatRol;
import com.baz.commons.domain.RelacionVistasArbol;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import com.baz.ejb.service.MantenimientoPerfilesService;

@ManagedBean(name="mantenimientoPerfilesMB")
@SessionScoped
public class MantenimientoPerfilesMB implements Serializable{
	
	
	@EJB
	MantenimientoPerfilesService mantenimientoPerfilesService;
	
	private List <CatRol> listaRoles;
	private String descripcion;
	private CatRol catRol;
	private BigDecimal idRol;
	private String descripcionInserta;
	private List<CatMantoMenuRol> listaMantoMenuRol;
	private List<String> descripcionMantoMenuRol;
	private List<String> descripcionesSeleccionadas;
	private List<String> descripcionMenus;
	private List<String> descripcionMenusSeleccionados;
	private List<String> descripcionObjetos;
	private List<String> descripcionObjetosSeleccionados;
	private List<String> descripcionObjetosManto;
	private List<String> descripcionObjetosSeleccionadosManto;
	private List<String> descripcionPaises;
	private List<String> descripcionPaisesSeleccionados;
	private List<CatMenu> menus;
	private List<CatMantoMenuRolObj> objetos;
	private List<CatMantoMenuRolObj> objetosManto;
	private List<CatPais> paises;
	private TreeNode menuVistas;
	private TreeNode[] menuVistasSeleccionadas;
	private TreeNode menuVistasManto;
	private TreeNode[] menuVistasSeleccionadasManto;
	//private TreeNode root;
	
	@PostConstruct
	    public void init() {
	        
			listaRoles=mantenimientoPerfilesService.getPerfiles();//this.getRoles();
			menus=mantenimientoPerfilesService.getMenus();
			obtenerDescripcionMenus(menus);
			objetos=mantenimientoPerfilesService.getObjetos();
			obtenerDescripcionObjetos(objetos);
			paises=mantenimientoPerfilesService.getPaises();
	       // obtenerDescripcionPaises(paises);
	        menuVistas = new CheckboxTreeNode("Raíz", null);
	        encontrarHijos(menuVistas,0);
	        System.out.println("Terminó");

	    }
	
	public MantenimientoPerfilesMB() {
		// TODO Auto-generated constructor stub	
	}
	
	//Métodos de control para  la informacion (Comunicacion con Servicios)
	
	 public void insertaPerfiles(TreeNode[] menuVistasSeleccionados,List<String> descripcionesObjetosSeleccionados){

		 System.out.println("Inserta");
		 if(descripcionInserta.equals(null)||descripcionInserta.equals("")||descripcionesObjetosSeleccionados.size()==0||menuVistasSeleccionados.length==0){
			 
			 System.out.println("Aquí va el mensaje de error");
			 
		 }else{
			 System.out.println(descripcionInserta+"Numero de items a insertar objetos--------"+descripcionesObjetosSeleccionados.size());
			 List<Integer> vistasAsignadas=new ArrayList<Integer>();
			 
			 for(TreeNode node : menuVistasSeleccionados) {  
				 System.out.println("Nodo: "+node.getData().toString());
				 if(!vistasAsignadas.contains(Integer.parseInt(node.getData().toString()))){
					 vistasAsignadas.add(Integer.parseInt(node.getData().toString()));
				 }
					 while(node.getParent()!=null ){
						 node=node.getParent();
						 if(!node.getData().toString().equals("Raíz")&&!vistasAsignadas.contains(Integer.parseInt(node.getData().toString()))){ 
							 vistasAsignadas.add(Integer.parseInt(node.getData().toString()));
							 System.out.println(node.getData().toString());	
						 }
					 }
	         }

			 mantenimientoPerfilesService.insertaPerfiles(descripcionInserta,vistasAsignadas,obtenerIdObjetosSeleccionados(descripcionesObjetosSeleccionados));
			// for(int i=0;i<vistasAsignadas.size();i++){
				// System.out.println(vistasAsignadas.get(i).getVista()+" : "+vistasAsignadas.get(i).getId()); 
			 //}
		 }
		 listaRoles=mantenimientoPerfilesService.getPerfiles();
		 setDescripcionInserta("");
		 setMenuVistasSeleccionadas(null);
		 menuVistas=null;
		 menuVistasSeleccionadas=null;
		 setDescripcionObjetosSeleccionados(null);

	 } 
	
	/*public void validate(FacesContext arg0, UIComponent arg1, Object arg2)
	         throws ValidatorException {
		System.out.println("Entro a la validacion....!");
	      if (((String)arg2).length()<1) {
	    	  System.out.println("Entro al if........!");
	    	  
	         throw new ValidatorException(new FacesMessage("El campo no debe ir vacío"));
	      }
		
	}*/
	
	public void cargaRol(){
		System.out.println("Entra al metodo de CargaRol.......!!!!!!");
		this.descripcion=catRol.getDescripcion();
		this.idRol=catRol.getIdrol();
		setDescripcionesSeleccionadas(null);
		setDescripcionMantoMenuRol(null);
		setMenuVistasManto(null);
		setMenuVistasSeleccionadasManto(null);
		
		objetosManto=mantenimientoPerfilesService.getObjetosManto(idRol.intValue());
		obtenerDescripcionObjetosManto(objetosManto);
		
		this.listaMantoMenuRol=mantenimientoPerfilesService.getMantoMenuRol(idRol);

		menuVistasManto = new CheckboxTreeNode("Raíz", null);
		//menuVistasSeleccionadasManto=new TreeNode[listaMantoMenuRol.size()];
        encontrarHijosManto(menuVistasManto,0);
		 //descripcionesSeleccionadas=estatusTemp;
		//descripcionMantoMenuRol=tempMantoMenuRol;
	}

	public void editarPerfil(TreeNode[] vistasSeleccionadas,List<String> objetosAsignados){

		System.out.println("Editar Perfil"+descripcion+idRol);
		System.out.println("avanzo");
		System.out.println("tamaño"+ vistasSeleccionadas.length+ " objetos: "+objetosAsignados.size());
		
		List<Integer> vistasAsignadas=new ArrayList<Integer>();
		 
		 for(TreeNode node : vistasSeleccionadas) {  
			 System.out.println("Nodo: "+node.getData().toString());
			 if(!vistasAsignadas.contains(Integer.parseInt(node.getData().toString()))){
				 vistasAsignadas.add(Integer.parseInt(node.getData().toString()));
			 } 
				 while(node.getParent()!=null ){
					 node=node.getParent();
					 if(!node.getData().toString().equals("Raíz")&&!vistasAsignadas.contains(Integer.parseInt(node.getData().toString()))){
						 
						 vistasAsignadas.add(Integer.parseInt(node.getData().toString()));
						 System.out.println(node.getData().toString());
						 
						 
					 }
					
				 }
         }
		
		mantenimientoPerfilesService.editaPerfil(descripcion,idRol,obtenerIdMenus(vistasAsignadas),obtenerIdObjetos(objetosAsignados));
		listaRoles=mantenimientoPerfilesService.getPerfiles();

	}
	 
	public void eliminarPerfil(BigDecimal rolId){
		
		System.out.println("Entra al metodo de eliminar");
		mantenimientoPerfilesService.eliminaPerfil(rolId);
		listaRoles=mantenimientoPerfilesService.getPerfiles();
		this.idRol=new BigDecimal(0);
	}
	
	
	public List<CatMantoMenuRol>obtenerIdMenus(List<Integer> vistasSeleccionadas){	
			
		System.out.println("total menus: "+vistasSeleccionadas.size());
		for(int j=0;j<listaMantoMenuRol.size();j++){
			System.out.println("Ediciones"+listaMantoMenuRol.get(j).getDescripcion());
			if(vistasSeleccionadas.contains(listaMantoMenuRol.get(j).getIdmenu().intValue())){
				listaMantoMenuRol.get(j).setEstatus(new BigDecimal(1));
			}else{
				listaMantoMenuRol.get(j).setEstatus(new BigDecimal(0));
			}
		}
		return listaMantoMenuRol;
	}
	
	public List<CatMantoMenuRolObj>obtenerIdObjetos(List<String> objetosAsignados){	
		
		System.out.println("total objetos: "+objetosAsignados.size());
		for(int j=0;j<objetosManto.size();j++){
			System.out.println("Ediciones"+objetosManto.get(j).getDescripcion());
			if(objetosAsignados.contains(objetosManto.get(j).getDescripcion())){
				objetosManto.get(j).setEstatus(new BigDecimal(1));
			}else{
				objetosManto.get(j).setEstatus(new BigDecimal(0));
			}
		}
		return objetosManto;
	}
	
	public void obtenerDescripcionMenus(List<CatMenu> listaMenus){
		descripcionMenus=new ArrayList<String>();
		for(int i=0;i<listaMenus.size();i++){
			descripcionMenus.add(listaMenus.get(i).getDescripcion());
		}
		
		System.out.println(descripcionMenus.get(0));
	}
	
	public List<Integer>obtenerIdMenusSeleccionados(List<String> menusSeleccionados){
		
		List<Integer> menusAsignados=new ArrayList<Integer>();
			for(int j=0;j<menus.size();j++){
				if(menusSeleccionados.contains(menus.get(j).getDescripcion())){
					menusAsignados.add(menus.get(j).getIdmenu().intValue());
				}
			}	
			System.out.println("Menus seleccionados"+ menusAsignados.size());
		return menusAsignados;
	}
	
	public void obtenerDescripcionObjetos(List<CatMantoMenuRolObj> objetos){
		descripcionObjetos= new ArrayList<String>();
		
		for(int i=0;i<objetos.size();i++){
			descripcionObjetos.add(objetos.get(i).getDescripcion());
			
		
		}
		System.out.println(descripcionObjetos.get(0));
	}
	
	public void obtenerDescripcionObjetosManto(List<CatMantoMenuRolObj> objetos){
		descripcionObjetosManto= new ArrayList<String>();
		descripcionObjetosSeleccionadosManto= new ArrayList<String>();
		
		for(int i=0;i<objetos.size();i++){
			descripcionObjetosManto.add(objetos.get(i).getDescripcion());
			if(objetos.get(i).getEstatus().intValue()==1){
				descripcionObjetosSeleccionadosManto.add(objetos.get(i).getDescripcion());
			}
		}
		System.out.println("Obtuvo: "+descripcionObjetosManto.get(0));
	}
	
	public List<Integer> obtenerIdObjetosSeleccionados(List<String> objetosSeleccionados){
		
		List<Integer> objetosAsignados=new ArrayList<Integer>();
		for(int j=0;j<objetos.size();j++){
			if(objetosSeleccionados.contains(objetos.get(j).getDescripcion())){
				objetosAsignados.add(objetos.get(j).getIdobjeto().intValue());
			}
		}		
	return objetosAsignados;
			
	}
	
	public void obtenerDescripcionPaises(List <CatPais> paises){
		descripcionPaises=new ArrayList<String>();
		for(int i=0;i<paises.size();i++){
			descripcionPaises.add(paises.get(i).getNombre());
		}
		
	}
	
	public TreeNode obtenerMenuVistas(){
		
	    TreeNode root = new CheckboxTreeNode("", null);
	    List<TreeNode> nodos=new ArrayList<TreeNode>();
		for(int i=0;i<menus.size();i++){
			if(menus.get(i).getIdpadre().intValue()==0){
				TreeNode temp=new CheckboxTreeNode(menus.get(i).getDescripcion(), root);
				encontrarHijos(temp,menus.get(i).getIdmenu().intValue());
				//nodos.add(temp);
			}
		}
		
		return root;
	}
	
	public void encontrarHijos(TreeNode temp, int id ){
		System.out.println("Entró a encontrar hijos, id "+id);
		for(int i=0;i<menus.size();i++){
			System.out.println("Entró al for, id "+id +" Menu "+menus.get(i).getIdpadre().intValue());
			if(menus.get(i).getIdpadre().intValue()==id){
				System.out.println("Entró los if D:");
				
				TreeNode nodo=new CheckboxTreeNode("text",new RelacionVistasArbol(menus.get(i).getDescripcion(),menus.get(i).getIdmenu().intValue()),temp);//menus.get(i).getDescripcion(), temp);
				encontrarHijos(nodo,menus.get(i).getIdmenu().intValue());
			}
		}
	
	}
	
	public void encontrarHijosManto(TreeNode temp, int id ){
		System.out.println("Entró a encontrar hijos, id "+id);
		for(int i=0;i<listaMantoMenuRol.size();i++){
			
			for(int j=0;j<menus.size();j++){
				if((listaMantoMenuRol.get(i).getIdmenu().intValue()==menus.get(j).getIdmenu().intValue())&&menus.get(j).getIdpadre().intValue()==id){
					System.out.println("Entró al for, id "+id +" Menu "+menus.get(j).getIdpadre().intValue()+" "+menus.get(j).getDescripcion());
					TreeNode nodo=new CheckboxTreeNode("text",new RelacionVistasArbol(menus.get(j).getDescripcion(),menus.get(j).getIdmenu().intValue()),temp);//menus.get(i).getDescripcion(), temp);
					if(listaMantoMenuRol.get(i).getEstatus().intValue()==1){
						//nodo.setSelected(true);
						StringBuilder sb = new StringBuilder();
				        sb.append("PrimeFaces.widgets.treeSingleWidget.toggleCheckboxNode(");
				        sb.append("$(\"#form1\\\\:arbol\\\\:");
				        sb.append(nodo.getRowKey());
				        sb.append("\")");
				        sb.append(", true)");
				        RequestContext.getCurrentInstance().execute(sb.toString());
				        System.out.println(sb.toString());
						//menuVistasSeleccionadasManto[i]=new CheckboxTreeNode("text",new RelacionVistasArbol(menus.get(j).getDescripcion(),menus.get(j).getIdmenu().intValue()),temp);
					}
					encontrarHijosManto(nodo,menus.get(j).getIdmenu().intValue());
					j=menus.size();
					
				}
				
			}
			
			
			//System.out.println("Entró al for, id "+id +" Menu "+menus.get(i).getIdpadre().intValue());
			//if(listaMantoMenuRol.get(i).getIdrol().intValue()==id){
				//System.out.println("Entró los if D:");
				//Aquí paso algo raro D:
				//Se debe de cambiar la lógico en los recorridos
				//TreeNode nodo=new CheckboxTreeNode("text",new RelacionVistasArbol(menus.get(i).getDescripcion(),menus.get(i).getIdmenu().intValue()),temp);//menus.get(i).getDescripcion(), temp);
				//encontrarHijosManto(nodo,menus.get(i).getIdmenu().intValue());
			//}
		}
	
	}
	
public List<Integer>obtenerIdVistasAsignadas(List<RelacionVistasArbol> vistasAsignadas){
		
		List<Integer> menusAsignados=new ArrayList<Integer>();
		for(int i=0;i<vistasAsignadas.size();i++){
			for(int j=0;j<menus.size();j++){
				if(vistasAsignadas.get(i).getId()==menus.get(i).getIdmenu().intValue()){//vistasAsignadas.get(i).getVista().equals(menus.get(j).getDescripcion())){
					menusAsignados.add(menus.get(j).getIdmenu().intValue());
					j=menus.size();
				}
				
			}	
		}
			System.out.println("Menus seleccionados"+ menusAsignados.size());
		return menusAsignados;
	}
	
	//Setters and Getters
	public List<CatRol> getListaRoles() {
		return listaRoles;
	}
	
	public List<String> getDescripcionMantoMenuRol() {
		return descripcionMantoMenuRol;
	}

	public void setDescripcionMantoMenuRol(List<String> descripcionMantoMenuRol) {
		this.descripcionMantoMenuRol = descripcionMantoMenuRol;
	}

	public void setListaRoles(List<CatRol> listaRoles) {
		this.listaRoles = listaRoles;
	}

	public String getDescripcion() {
		return descripcion;
	}

	public void setDescripcion(String descripcion) {
		this.descripcion = descripcion;
	}

	public CatRol getCatRol() {
		return catRol;
	}

	public void setCatRol(CatRol catRol) {
		this.catRol = catRol;
	}

	public BigDecimal getIdRol() {
		return idRol;
	}

	public void setIdRol(BigDecimal idRol) {
		this.idRol = idRol;
	}

	public String getDescripcionInserta() {
		return descripcionInserta;
	}

	public List<CatMantoMenuRol> getListaMantoMenuRol() {
		return listaMantoMenuRol;
	}

	public void setListaMantoMenuRol(List<CatMantoMenuRol> listaMantoMenuRol) {
		this.listaMantoMenuRol = listaMantoMenuRol;
	}

	public void setDescripcionInserta(String descripcionInserta) {
		this.descripcionInserta = descripcionInserta;
	}

	public List<String> getDescripcionesSeleccionadas() {
		return descripcionesSeleccionadas;
	}

	public void setDescripcionesSeleccionadas(List<String> descripcionesSeleccionadas) {
		this.descripcionesSeleccionadas = descripcionesSeleccionadas;
	}

	public List<CatMenu> getMenus() {
		return menus;
	}

	public void setMenus(List<CatMenu> menus) {
		this.menus = menus;
	}

	public List<String> getDescripcionMenus() {
		return descripcionMenus;
	}

	public void setDescripcionMenus(List<String> descripcionMenus) {
		this.descripcionMenus = descripcionMenus;
	}

	public List<String> getDescripcionMenusSeleccionados() {
		return descripcionMenusSeleccionados;
	}

	public void setDescripcionMenusSeleccionados(List<String> descripcionMenusSeleccionados) {
		this.descripcionMenusSeleccionados = descripcionMenusSeleccionados;
	}

	public List<String> getDescripcionObjetos() {
		return descripcionObjetos;
	}

	public void setDescripcionObjetos(List<String> descripcionObjetos) {
		this.descripcionObjetos = descripcionObjetos;
	}

	public List<String> getDescripcionObjetosSeleccionados() {
		return descripcionObjetosSeleccionados;
	}

	public void setDescripcionObjetosSeleccionados(List<String> descripcionObjetosSeleccionados) {
		this.descripcionObjetosSeleccionados = descripcionObjetosSeleccionados;
	}

	public List<String> getDescripcionPaises() {
		return descripcionPaises;
	}

	public void setDescripcionPaises(List<String> descripcionPaises) {
		this.descripcionPaises = descripcionPaises;
	}

	public List<String> getDescripcionPaisesSeleccionados() {
		return descripcionPaisesSeleccionados;
	}

	public void setDescripcionPaisesSeleccionados(List<String> descripcionPaisesSeleccionados) {
		this.descripcionPaisesSeleccionados = descripcionPaisesSeleccionados;
	}

	public List<CatMantoMenuRolObj> getObjetos() {
		return objetos;
	}

	public void setObjetos(List<CatMantoMenuRolObj> objetos) {
		this.objetos = objetos;
	}

	public List<CatPais> getPaises() {
		return paises;
	}

	public void setPaises(List<CatPais> paises) {
		this.paises = paises;
	}

	public TreeNode getMenuVistas() {
		return menuVistas;
	}

	public void setMenuVistas(TreeNode menuVistas) {
		this.menuVistas = menuVistas;
	}

	public TreeNode[] getMenuVistasSeleccionadas() {
		return menuVistasSeleccionadas;
	}

	public void setMenuVistasSeleccionadas(TreeNode[] menuVistasSeleccionadas) {
		this.menuVistasSeleccionadas = menuVistasSeleccionadas;
	}

	public TreeNode getMenuVistasManto() {
		return menuVistasManto;
	}

	public void setMenuVistasManto(TreeNode menuVistasManto) {
		this.menuVistasManto = menuVistasManto;
	}

	public TreeNode[] getMenuVistasSeleccionadasManto() {
		return menuVistasSeleccionadasManto;
	}

	public void setMenuVistasSeleccionadasManto(TreeNode[] menuVistasSeleccionadasManto) {
		this.menuVistasSeleccionadasManto = menuVistasSeleccionadasManto;
	}

	public List<String> getDescripcionObjetosManto() {
		return descripcionObjetosManto;
	}

	public void setDescripcionObjetosManto(List<String> descripcionObjetosManto) {
		this.descripcionObjetosManto = descripcionObjetosManto;
	}

	public List<String> getDescripcionObjetosSeleccionadosManto() {
		return descripcionObjetosSeleccionadosManto;
	}

	public void setDescripcionObjetosSeleccionadosManto(List<String> descripcionObjetosSeleccionadosManto) {
		this.descripcionObjetosSeleccionadosManto = descripcionObjetosSeleccionadosManto;
	}

	public List<CatMantoMenuRolObj> getObjetosManto() {
		return objetosManto;
	}

	public void setObjetosManto(List<CatMantoMenuRolObj> objetosManto) {
		this.objetosManto = objetosManto;
	}
	 
	
}

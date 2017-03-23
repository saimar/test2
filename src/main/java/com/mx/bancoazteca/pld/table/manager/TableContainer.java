package com.mx.bancoazteca.pld.table.manager;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.jdbc.core.namedparam.SqlParameterSource;

import com.mx.bancoazteca.pld.jdbc.StoredProcedure;
import com.mx.bancoazteca.pld.jdbc.TableVO;
import com.mx.bancoazteca.pld.util.IConstantesPLD;


public class TableContainer implements Serializable {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 4474816952468833711L;
	private Map<String, TableVO> data;
	private String nEmp;
	
	private int MIN_PAGINATION_SIZE;

	private int MIN_PAGE_SIZE;
	
	private int idModuloActual;
	private Map<String, Object> moduleTools=new HashMap<String,Object>();
	
	
	public int getIdModuloActual() {
		return idModuloActual;
	}

	public void setIdModuloActual(int idModuloActual) {
		this.idModuloActual = idModuloActual;
	}

	public Map<String, Object> getModuleTools() {
		return moduleTools;
	}

	public void setModuleTools(Map<String, Object> moduleTools) {
		this.moduleTools = moduleTools;
	}

	private static final Logger LOG = LoggerFactory.getLogger(TableContainer.class);

	
	public TableContainer(String nEmp,int minPagination, int minPageSize) {
		//super();
		this.nEmp=nEmp;
		this.MIN_PAGINATION_SIZE=minPagination;
		this.MIN_PAGE_SIZE=minPageSize;
		this.data=new HashMap<String, TableVO>();
		LOG.info("@TableContainer :: TableContainer :: NuAnalista => {}",nEmp);
		LOG.info("@TableContainer :: TableContainer :: Min Pagination size => {}",minPagination);
		LOG.info("@TableContainer :: TableContainer :: Min page size => {}",minPageSize);
	}

	public String getnEmp() {
		return nEmp;
	}

	public void setnEmp(String nEmp) {
		this.nEmp = nEmp;
	}
	

public void loadDataToContainer(String key, TableVO query){
	
	LOG.info("@TableContainer :: loadDataToContainer :: {}"+key);
	
	if(data.get(key)==null){//No existen datos en el contenedor
		data.put(key,query);
	}else{
		data.get(key).getResultset().clear();
		data.get(key).clear();//Se asugura de borrar los datos
		data.remove(key);
		data.put(key,query);
		
	}
	
}

public TableVO getDataByKeyName(String keyName,PaginationParams params){
	TableVO dataPaginated=null;
	char action=params.getAction().toCharArray()[0];
	
	if(data.get(keyName)!=null){
		
		LOG.info("@TableContainer :: getDataByKeyName :: {}",action+" :: "+keyName);
		
		switch (action) {
			case IConstantesPLD.SIMPLE_PAGINATION:
				dataPaginated=getPageBySimplePagination(params.getPageSize(),params.getCurrentPage(),keyName,moduleTools); 
				break;
			case IConstantesPLD.ASCENDING_ORDERING:
				orderPageBy(params.getCollumToOrder(),true,keyName);
				dataPaginated=getPageBySimplePagination(params.getPageSize(),params.getCurrentPage(),keyName,moduleTools);
				break;
			case IConstantesPLD.DESCENDING_ORDERING:
				orderPageBy(params.getCollumToOrder(),false,keyName);
				dataPaginated=getPageBySimplePagination(params.getPageSize(),params.getCurrentPage(),keyName,moduleTools);
				break;
			case IConstantesPLD.SEARCH_VALUE:
				dataPaginated=getSearchTable(params.getSearchText(),keyName);
				break;
			case IConstantesPLD.RELOAD_DATA:
				
				if(data.get(keyName).getRowCount()>MIN_PAGINATION_SIZE){
					dataPaginated=getPageBySimplePagination(params.getPageSize(),0,keyName,moduleTools);
					
				}else{
					
					dataPaginated=data.get(keyName);//NO HAY PAGINACION
					
					if(dataPaginated.getState().getSuccess()){
						dataPaginated.buildJson(moduleTools);	
					}
				}
				break;
			default:
				dataPaginated=getPageBySimplePagination(params.getPageSize(),params.getCurrentPage(),keyName,moduleTools);
				break;
			}
		
	}else{
		dataPaginated= new TableVO();
		dataPaginated.getState().enabledErrorApp();
		dataPaginated.getState().setMessage("La llave especificada no ha sido dada de alta en el contenedor");
		dataPaginated.getMessage().setInfo("La llave "+ keyName +" no se encuentrá asociada al contenedor, porfavor revisa tu programación.");
	}
	
	LOG.info("@TableContainer :: getDataByKeyName :: TableVO => {}",dataPaginated.toString());
	
	return dataPaginated;
}
		
public void loadData(StoredProcedure dbConnection,SqlParameterSource inParams,String sp,String tipo){
		
		if(data.get(tipo)==null){//No existen datos en el contenedor
			//System.out.println("Tools..."+this.moduleTools.toString());
			data.put(tipo,dbConnection.queryForTableVO(sp, inParams));
		}else{
			data.get(tipo).getResultset().clear();
			data.get(tipo).clear();//Se asugura de borrar los datos
			data.remove(tipo);
			//System.out.println("Tools..."+this.moduleTools.toString());
			data.put(tipo,dbConnection.queryForTableVO(sp,  inParams));
			
		}
		
	}
	
	public void cleanContainer(){
		if(this.data!=null){
		
		for(String key:this.data.keySet()){
			LOG.info("@TableContainer :: cleanContainer :: Se limpian datos de la tabla => {}",key);
			this.data.get(key).clear();
		}
			this.data.clear();
			LOG.info("@TableContainer :: cleanContainer :: Se limpio el contenedor de datos => {}",nEmp);
		}else{
			LOG.info("@TableContainer :: cleanContainer :: El contenedor se encuentrá vacío => {}",nEmp);
		}
		
	}
		
	public TableVO getPageBySimplePagination(int pageSize, int page,String tipo,Map<String, Object> moduleTools){
		
		
		TableVO displayedPage= new TableVO();
			
			displayedPage.setPaginated(true);
		
			pageSize=(pageSize<MIN_PAGE_SIZE)?MIN_PAGE_SIZE:pageSize;//evita divisiones entre cero
			
			/*LOG.info("@TableContainer :: buildSimplePagination :: pageSize = {}",pageSize);
			
			for(String key:data.keySet()){
				LOG.info("@TableContainer :: buildSimplePagination :: data.key = {}",key);	
			}*/
			
			int nPages;
			int rows=data.get(tipo).getRowCount();
			LOG.info("@TableContainer :: buildSimplePagination :: rows = {}",rows);
			if(rows>0){
			
				if(rows%pageSize==0){
					nPages=(rows/pageSize)-1;//105
				}else{
					nPages=(int)Math.floor(rows/(double)pageSize);//105
				}
				
			
			//LOG.info("@TableContainer :: buildSimplePagination :: nPages = {}",nPages); 
			
			List<Map<String,Object>> pageRows=new ArrayList<Map<String,Object>>();
			
			// pageSize=10, currentPage=105,
			//initial page=0
			if(pageSize*page<rows-pageSize)
				for(int i=pageSize*page;i<pageSize*page+pageSize;i++){
					pageRows.add(data.get(tipo).getResultset().get(i));
				}
			else{
				for(int i=(nPages)*pageSize;i<rows;i++){
					pageRows.add(data.get(tipo).getResultset().get(i));
				}
			}
			
			//LOG.info("@TableContainer :: buildSimplePagination :: pageRows.size = {}",pageRows.size());
			//displayedPage.setMaxPages(nPages+1);
			displayedPage.setResultset(pageRows);
			
			}
			displayedPage.setState(data.get(tipo).getState());
			displayedPage.setMessage(data.get(tipo).getMessage());
			
			
			displayedPage.buildJson(moduleTools);
			displayedPage.setRowCount(data.get(tipo).getResultset().size());
			
			LOG.info("@TableContainer buildSimplePagination :: TableVO => {} :: TotalRows : {}",displayedPage.getState().toString(),displayedPage.getRowCount());
			return displayedPage;
		
	}
	
	public void orderPageBy(String orderCollumn,boolean asc, String tipo){
		
		LOG.info("@TableContainer :: orderPageBy :: {} ",orderCollumn+" , ascending : "+asc);
		try{
			if(asc){
				Collections.sort(data.get(tipo).getResultset(),getAscMapComparartor(orderCollumn.trim())); 
			}else{
				Collections.sort(data.get(tipo).getResultset(),getDescMapComparartor(orderCollumn.trim()));
			}	
		}catch(ClassCastException e){
			LOG.info("@TableContainer :: orderPageBy :: ClassCastException {}", e.getMessage());
		}catch(IllegalArgumentException e){			
			LOG.info("@TableContainer :: orderPageBy :: IllegalArgumentException {}", e.getMessage());
		}catch(IllegalStateException e){			
			LOG.info("@TableContainer :: orderPageBy :: IllegalStateException {}", e.getMessage());
		}catch(IndexOutOfBoundsException e){
			LOG.info("@TableContainer :: orderPageBy :: IndexOutOfBoundsException {}", e.getMessage());
		}
		
}

public TableVO getSearchTable(String searchText, String tipo){
			
	LOG.info("@TableContainer :: getSearchTable :: searchText : "+searchText);
	
	 List<Map<String,Object>> values= new ArrayList<Map<String,Object>>();
	 TableVO tableSearch=null;
	 try{
		 if(data.get(tipo).getResultset().size()>0){
		 for(Map<String,Object> row:data.get(tipo).getResultset()){
			 //LOG.info("@TableContainer :: getSearchTable :: row : {}",row);
			 String busqueda="";
			 for(String key:row.keySet()){
				 //System.out.println("Key: "+key);
				 if(row.get(key)!=null){
					 if(StringUtils.containsIgnoreCase(row.get(key).toString(),searchText)){
						 values.add(row);
						 break;
					 }else{
						 if(!StringUtils.isNumeric(row.get(key).toString()))
						 busqueda+=row.get(key).toString();//solo concatena valores NO numericos
			     	}
				 }
			 }
			 //System.out.println("Busqueda : "+busqueda);
			 if(StringUtils.containsIgnoreCase(busqueda.trim().replaceAll(" ",""),searchText.trim().replaceAll(" ",""))){
				 values.add(row);
			 }
			
		 }
	 }
	 LOG.info("@TableContainer :: getSearchTable :: busqueda finalizada : ");		 
	 if(values.size()<1){//no hay recultados en la busqueda
		 tableSearch=new TableVO(); 
		 tableSearch.getState().enabledError("La busqueda no produjó resultados","alert-warning","fa fa-search-minus");
		 tableSearch.getMessage().setInfo("Intenté nuevamente con otro patrón de busqueda");
		 tableSearch.getState().setStatuCode(HttpStatus.OK);//envia respuesta exitosa para poder dezplegar el mensaje
		 //tableSearch.buildJson();
	 }else{
		 tableSearch= new TableVO(values);
		 tableSearch.setState(data.get(tipo).getState());
		 tableSearch.setMessage(data.get(tipo).getMessage());
		 tableSearch.buildJson(moduleTools);
	 }
	LOG.info("@TableContainer :: getSearchTable :: TableVO");
	}catch(ClassCastException e){
		LOG.info("@TableContainer :: getSearchTable :: ClassCastException {}", e.getMessage());
	}catch(IllegalArgumentException e){			
		LOG.info("@TableContainer :: getSearchTable :: IllegalArgumentException {}", e.getMessage());
	}catch(IllegalStateException e){			
		LOG.info("@TableContainer :: getSearchTable :: IllegalStateException {}", e.getMessage());
	}catch(IndexOutOfBoundsException e){
		LOG.info("@TableContainer :: getSearchTable :: IndexOutOfBoundsException {}", e.getMessage());
	}
	 LOG.info("@TableContainer getSearchTable :: TableVO => {}",tableSearch.getJsonResult().size());
	 return tableSearch;
}

public TableVO getDataContainedFrom(String tipo,String searchText){
	if(data.get(tipo)!=null){
		if(searchText.isEmpty()){
			return data.get(tipo);
		}else{
			return getSearchTable(searchText, tipo);
		}
	}
	else{
		TableVO tablerror= new TableVO();
			tablerror.getState().enabledErrorApp();
			tablerror.getState().setMessage("La fuente del archivo excel no fue localizada.");
			tablerror.getMessage().setInfo("Actualize la pagina y realice la busqueda nuevamente.");
		return tablerror;
		}
}

private Comparator<Map<String, Object>> getAscMapComparartor(final String key){
	return new Comparator<Map<String, Object>>(){
		public int compare(Map<String, Object> m1,Map<String, Object> m2){
	     String s1=(m1.get(key)==null)?"":m1.get(key).toString().trim().replaceAll(" ","");
	     String s2=(m2.get(key)==null)?"":m2.get(key).toString().trim().replaceAll(" ","");

	     if(key.equalsIgnoreCase("noCliente") && key.equalsIgnoreCase("MTCN") && StringUtils.isNumeric(s1) && StringUtils.isNumeric(s2)){
	    	 int n1=Integer.parseInt(s1);
		     int n2=Integer.parseInt(s2);
		     //System.out.println("numeric");
		     return n1-n2;
	     }else{
	    	 //System.out.println("alfabetic");
	    	 return s1.compareTo(s2);
	     }
		}
	};
}

private Comparator<Map<String, Object>> getDescMapComparartor(final String key){
	return new Comparator<Map<String, Object>>(){
		public int compare(Map<String, Object> m1,Map<String, Object> m2){
			String s1=(m1.get(key)==null)?"":m1.get(key).toString().trim().replaceAll(" ","");
		    String s2=(m2.get(key)==null)?"":m2.get(key).toString().trim().replaceAll(" ","");
			
		    if(key.equalsIgnoreCase("noCliente") && key.equalsIgnoreCase("MTCN") && StringUtils.isNumeric(s1) && StringUtils.isNumeric(s2)){
		    	 int n1=Integer.parseInt(s1);
			     int n2=Integer.parseInt(s2);
			    //System.out.println("numeric");
			     return n2-n1;
		     }else{
		    	 //System.out.println("alfabetic");
		    	 return s2.compareTo(s1);
		     }
		}
	};
}
		
}

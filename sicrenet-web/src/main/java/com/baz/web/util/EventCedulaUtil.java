package com.baz.web.util;

import javax.el.ELContext;
import javax.el.ExpressionFactory;
import javax.el.MethodExpression;
import javax.faces.application.Application;
import javax.faces.context.FacesContext;

import org.primefaces.component.behavior.ajax.AjaxBehavior;
//import org.primefaces.component.behavior.ajax.AjaxBehavior;
import org.primefaces.component.behavior.ajax.AjaxBehaviorListenerImpl;

public class EventCedulaUtil {
	public static final AjaxBehavior getEventCedulaFuente(Long etapa, int catPanelEl){
		
		  System.out.println("Valor del parametro:::getEventCedulaId::::" + catPanelEl);
	      FacesContext context = FacesContext.getCurrentInstance();
	      ELContext elContext = context.getELContext();
	      Application app = context.getApplication();
	      ExpressionFactory expressionFactory = app.getExpressionFactory();
		  AjaxBehavior ajax = new AjaxBehavior();

		  MethodExpression ex = expressionFactory.
				  createMethodExpression(elContext, "#{panelDeControlCedulaMB.obtenerCedula(" + etapa + "," +catPanelEl+")}", null, 
						  new Class[]{Long.class, Long.class});
		  ajax.setOnstart("Waiting(true, 'Cargando Información...')");
		  ajax.setOncomplete("Waiting(false, 'Cargando Información...')");
		  ajax.addAjaxBehaviorListener(new AjaxBehaviorListenerImpl(ex, ex));
		  		  
		  return ajax;
	}
	
	public static final AjaxBehavior getEventCedulaFuenteCarga(String idComponet){
		
		  System.out.println("Valor del parametro:::getEventCedulaId::::" + idComponet);
	      FacesContext context = FacesContext.getCurrentInstance();
	      ELContext elContext = context.getELContext();
	      Application app = context.getApplication();
	      ExpressionFactory expressionFactory = app.getExpressionFactory();
		  AjaxBehavior ajax = new AjaxBehavior();
		  MethodExpression ex = expressionFactory.
				  createMethodExpression(elContext, "#{panelControl.executeCarga("+idComponet+")}", null, 
						  new Class[]{String.class});
//		  ajax.setOnstart("Waiting(true, 'Cargando Información...')");
//		  ajax.setOncomplete("Waiting(false, 'Cargando Información...')");
		  ajax.setAsync(true);
		  ajax.addAjaxBehaviorListener(new AjaxBehaviorListenerImpl(ex, ex));
		  		  
		  return ajax;
	}
	
	public static final AjaxBehavior getEventCedulaProceso(Long etapa, int catPanelEl){
		
		System.out.println("Valor del parametro:::getEventCedulaId::::" + catPanelEl);
		FacesContext context = FacesContext.getCurrentInstance();
		ELContext elContext = context.getELContext();
		Application app = context.getApplication();
		ExpressionFactory expressionFactory = app.getExpressionFactory();
		AjaxBehavior ajax = new AjaxBehavior();
//		ajax.setUpdate(":form1:panelCedulaProceso");
		MethodExpression ex = expressionFactory.
				createMethodExpression(elContext, "#{panelDeControlCedulaProcesoMB.obtenerCedulaProceso(" + etapa + "," +catPanelEl+")}", null, 
						new Class[]{Long.class, Long.class});
		
		ajax.addAjaxBehaviorListener(new AjaxBehaviorListenerImpl(ex, ex));
		ajax.setImmediate(true);
//		ajax.setProcess("@this");
		
		return ajax;
	}
	
	public static final AjaxBehavior getEventDetalleReprocesos(Long etapa, int catPanelEl){
		
		  System.out.println("Valor del parametro:::getEventDetalleReprocesos::::" + catPanelEl);
	      FacesContext context = FacesContext.getCurrentInstance();
	      ELContext elContext = context.getELContext();
	      Application app = context.getApplication();
	      ExpressionFactory expressionFactory = app.getExpressionFactory();
		  AjaxBehavior ajax = new AjaxBehavior();
		  ajax.setOnstart("PF('dlgDetalleReprocesos').show();");

		  MethodExpression ex = expressionFactory.
				  createMethodExpression(elContext, "#{panelDeControlCedulaMB.obtenerCedula(" + etapa + "," +catPanelEl+")}", null, 
						  new Class[]{Long.class, Long.class});
		  
//		  ajax.setOnstart("Waiting(true, 'Cargando Información...')");
//		  ajax.setOncomplete("Waiting(false, 'Cargando Información...')");
		  
		  ajax.addAjaxBehaviorListener(new AjaxBehaviorListenerImpl(ex, ex));
		  		  
		  return ajax;
	}
}

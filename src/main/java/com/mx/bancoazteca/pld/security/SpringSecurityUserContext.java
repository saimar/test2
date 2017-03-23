package com.mx.bancoazteca.pld.security;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import com.mx.bancoazteca.pld.table.manager.TableContainer;



@Component
public class SpringSecurityUserContext  {
    
	//private static final Logger LOG = LoggerFactory.getLogger(RestModuloMonitoreo.class);
	
    public CustomUser getCurrentUser() {
    	
    	
    	Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        
        if (authentication == null) {
            return null;
        }else if(!(authentication.getPrincipal() instanceof CustomUser)){
        	return null;
        }else{
        	CustomUser customUser = (CustomUser) authentication.getPrincipal();
        	return customUser;
        }
    }
    
    public TableContainer getCurrentContainer() {
    	
    	Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        
        if (authentication == null) {
            return null;
        }else if(!(authentication.getPrincipal() instanceof CustomUser)){
        	return null;
        }else{
        	CustomUser customUser = (CustomUser) authentication.getPrincipal();
        	return customUser.getContainer();
        }
    }
  

}

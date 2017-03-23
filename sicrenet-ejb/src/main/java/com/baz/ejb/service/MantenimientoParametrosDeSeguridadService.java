package com.baz.ejb.service;

import java.math.BigDecimal;
import java.util.List;

import javax.ejb.Remote;
import com.baz.commons.domain.CatParametrosDeSeguridad;
@Remote
public interface MantenimientoParametrosDeSeguridadService {

	public List<CatParametrosDeSeguridad> getParametrosDeSeguridad();
	
	public void editarParametrosDeSeguridad(BigDecimal idparametros,BigDecimal maxlongpass,BigDecimal minlongpass,BigDecimal diasvenpass,
				BigDecimal maxusrintfallidos,BigDecimal maxipintfallidos,BigDecimal ipdiasbloqueo,BigDecimal timeout);		
	
}

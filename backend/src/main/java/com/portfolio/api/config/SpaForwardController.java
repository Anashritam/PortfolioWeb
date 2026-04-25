package com.portfolio.api.config;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

/**
 * Forwards all non-API, non-static routes to the React SPA index.html.
 * This allows client-side routing (e.g. /admin) to work when the
 * frontend is served from the Spring Boot JAR in production.
 */
@Controller
public class SpaForwardController {
    @GetMapping(value = {"/", "/admin", "/admin/**", "/blog/**"})
    public String forward() {
        return "forward:/index.html";
    }
}
